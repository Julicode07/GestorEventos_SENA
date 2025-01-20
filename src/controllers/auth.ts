import { findUserByDocument } from "../repositories/users/repository";
import { Request, Response } from "express";
import { hasActiveSession } from "../helpers/session.checker";
import bcrypt from "bcrypt";

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
