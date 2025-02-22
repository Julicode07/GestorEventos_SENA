import { bigIntReplacer } from "../helpers/json.helper";
import {
  createUser,
  findAllUsers,
  findUserByDocument,
  findUserByEmail,
  findUserById,
  updateUser,
  getUserById,
} from "../repositories/users/repository";
import { Request, Response } from "express";

export async function CreateUserController(req: Request, res: Response) {
  const user_document_check = await findUserByDocument(req.body.document);
  const user_email_check = await findUserByEmail(req.body.email);
  if (user_document_check.length == 1)
    return res
      .status(409)
      .end(
        JSON.stringify({ message: "Ya existe una cuenta con ese documento" })
      );
  else if (user_email_check.length == 1)
    return res.status(409).end(
      JSON.stringify({
        message: "Ya existe una cuenta con ese correo electrónico",
      })
    );
  else {
    const result = await createUser({
      id_user: undefined,
      document: req.body.document,
      name: req.body.name,
      last_names: req.body.last_names,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      password: req.body.password,
      resetPasswordToken: undefined,
      resetTokenExpireAt: undefined
    });
    return result == 1
      ? res
          .status(200)
          .end(JSON.stringify({ message: "Perfil creado correctamente" }))
      : res.status(500).end(
          JSON.stringify({
            message: "Error interno del servidor al crear el perfil",
          })
        );
  }
}

export async function UpdateUserController(req: Request, res: Response) {
  try {
    const { id_user } = req.params;
    const user = await findUserById(parseInt(req.params.id_user));
    console.log("user to update:", req.params.id_user);
    if (user == undefined) {
      return res
        .status(404)
        .send(JSON.stringify({ message: "El usuario no existe." }));
    }
    const users = await updateUser(Number(id_user), req.body);
    return users == 1
      ? res.status(200).send(
          JSON.stringify({
            message: `Se actualizo el usuario ${id_user}.`,
            data: users,
          })
        )
      : res.status(400).send(
          JSON.stringify({
            message: `No se actualizo el usuario ${id_user}.`,
          })
        );
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetSelfUserController(req: Request, res: Response) {
  const users = await findUserById(req.session.user!.id_user as number);
  return res.status(200).send(JSON.stringify(users, bigIntReplacer));
}

export async function GetUsersController(req: Request, res: Response) {
  const users = await findAllUsers();
  return res.status(200).send(JSON.stringify(users, bigIntReplacer));
}

export async function getUserByIdController(req: Request, res: Response) {
  try {
    const { id_user } = req.params;
    const user = await getUserById(parseInt(id_user));
    return res.status(200).send(JSON.stringify(user, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}
