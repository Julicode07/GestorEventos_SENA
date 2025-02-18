import { findUserByDocument, findUserByResetPasswordToken, getUserById, updateResetPasswordTokenByUserId, updateUser, updateUserPassword } from "../repositories/users/repository";
import { Request, Response } from "express";
import { hasActiveSession } from "../helpers/session.checker";
import { bigIntReplacer } from "../helpers/json.helper";
import { sendEmail } from "../helpers/email";
import { findUserByEmail } from "../repositories/users/repository";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function LogInController(req: Request, res: Response) {
  if (!hasActiveSession(req, "*")) {
    const user_result = await findUserByDocument(parseInt(req.body.document));
    if (user_result.length === 0)
      return res
        .status(403)
        .end(JSON.stringify({ message: "Usuario o contraseña incorrectos" }));
    else {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user_result[0].password
      );
      if (!isPasswordValid) {
        return res
          .status(403)
          .json({ message: "Usuario o contraseña incorrectos" });
      } else {
        req.session.user = {
          document: parseInt(req.body.document),
          role: user_result[0].role,
          id_user: Number(user_result[0].id_user),
          name: user_result[0].name,
          last_name: user_result[0].last_names,
        };
        const responseData = {
          message: "Sesión iniciada correctamente",
          data: {
            document: parseInt(req.body.document),
            role: user_result[0].role,
          },
        };
        return res.status(200).send(JSON.stringify(responseData)).end();
      }
    }
  } else
    return res.status(401).send({
      message: "No puedes iniciar sesión cuando ya tienes una sesión ya activa",
    });
}

export async function CheckSessionController(req: Request, res: Response) {
  if (!hasActiveSession(req, "*"))
    return res
      .status(401)
      .send({
        message: "No cuentas con una sesión activa",
        data: {
          document: null,
          role: null,
          id_user: null,
          name: null,
          last_name: null,
        },
      })
      .end();
  else
    return res
      .status(200)
      .send({
        message: "Tienes una sesión activa",
        data: {
          document: req.session.user?.document,
          role: req.session.user?.role,
          id_user: req.session.user?.id_user,
          name: req.session.user?.name,
          last_name: req.session.user?.last_name,
        },
      })
      .end();
}

export async function LogOutController(req: Request, res: Response) {
  if (hasActiveSession(req, "*")) {
    req.session.user = {
      document: null,
      role: null,
      id_user: null,
      name: null,
      last_name: null,
    };
    return res
      .status(200)
      .send({
        message: "Sesión cerrada correctamente",
        data: { phone: null, role: null },
      })
      .end();
  } else
    return res
      .status(400)
      .send({
        message: "No tienes una sesión activa",
        data: { phone: null, role: null },
      })
      .end();
}

export async function ForgotPasswordController(req: Request, res: Response){
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);

    if (user.length == 0) {
      return res.status(400).json({
        success: false,
        message: "No existe un usuario vinculado a esa cuenta.",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000;
    await updateResetPasswordTokenByUserId(user[0].id_user as number, resetToken, resetTokenExpireAt);

    const resetPasswordHTML = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Restablecimiento de Contraseña</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 20px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              h2 {
                  color: #333;
              }
              p {
                  color: #555;
                  line-height: 1.6;
              }
              .button {
                  display: inline-block;
                  padding: 12px 20px;
                  margin-top: 10px;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Solicitud de Restablecimiento de Contraseña</h2>
              <p>Hola,</p>
              <p>Hemos recibido una solicitud para restablecer tu contraseña. Para continuar con el proceso, haz clic en el siguiente enlace:</p>
              <p><a href="${process.env.VITE_API_URL}/restablecercontrasena/nuevacontrasena/${resetToken}" class="button">Restablecer Contraseña</a></p>
              <p>Si no realizaste esta solicitud, puedes ignorar este mensaje. El enlace expirará en 1 hora.</p>
              <p>Gracias,</p>
              <p>El equipo de Soporte</p>
              <p class="footer">Si tienes problemas con el botón, copia y pega el siguiente enlace en tu navegador: <br> <a href="{{resetLink}}">{{resetLink}}</a></p>
          </div>
      </body>
      </html>
    `;

    await sendEmail(
      user[0].email,
      `Restablecimiento de contraseña - Gestor de Eventos SENA`,
      resetPasswordHTML
    );

    return res.status(200).json({
      success: true,
      message: "Se envió el link de restablecimiento de contraseña a tu correo.",
    });
  } catch (error) {
    console.error("Error resetting password", error);
    res.status(400).json({
      message: "Ocurrió un error interno.",
    });
  }
};

export async function ResetPasswordController(req: Request, res: Response) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await findUserByResetPasswordToken(token);

    if (user.length == 0 || Date.now() > (user[0].resetTokenExpireAt as number)) {
      return res.status(400).json({
        success: false,
        message: "Token inválido o expirado.",
      });
    }
    await updateUserPassword(user[0].id_user as number, password);

    sendEmail(user[0].email, "¡Contraseña restablecida!", `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contraseña Restablecida</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 20px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              h2 {
                  color: #333;
              }
              p {
                  color: #555;
                  line-height: 1.6;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>¡Tu contraseña ha sido restablecida con éxito!</h2>
              <p>Hola,</p>
              <p>Te informamos que tu contraseña ha sido cambiada correctamente.</p>
              <p>Si realizaste este cambio, no es necesario que tomes ninguna acción adicional.</p>
              <p>Si no realizaste esta solicitud o tienes algún problema, por favor contacta al coordinador de tu sistema lo antes posible.</p>
              <p>Gracias,</p>
              <p>Gestor de eventos - SENA</p>
              <p class="footer">Si necesitas asistencia, o no fuiste quien cambió la contraseña, no dudes en comunicarte con los coordinadores de tu centro.</p>
          </div>
      </body>
      </html>
        
    `)

    return res.status(200).json({
      success: true,
      message: "Contraseña cambiada correctamente.",
    });
  } catch (error) {
    console.error("Error resetting password", error);
    res.status(400).json({
      success: false,
      message: "Error al actualizar la contraseña.",
    });
  }
};
