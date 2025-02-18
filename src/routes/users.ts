import express, { Express, Request, Response } from "express";
import {
  CreateUserController,
  GetSelfUserController,
  GetUsersController,
  UpdateUserController,
  getUserByIdController,
} from "../controllers/users";
import { databaseRegex } from "../helpers/regex.helper";
import { ForgotPasswordController } from "../controllers/auth";

const UsersRouter: Express = express();

UsersRouter.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    if (databaseRegex.users.email.test(req.body.email)) {
      ForgotPasswordController(req, res);
    } else
      return res.status(400).end(
        JSON.stringify({
          message: "Los parámetros enviados al servidor son incorrectos :(",
        })
      );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

UsersRouter.post("/reset-password/:token", async (req: Request, res: Response) => {
  try {
    if (databaseRegex.users.password.test(req.body.password)) {
      ForgotPasswordController(req, res);
    } else
      return res.status(400).end(
        JSON.stringify({
          message: "Los parámetros enviados al servidor son incorrectos :(",
        })
      );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

// Create new web profile endpoint.
UsersRouter.post("/", async (req: Request, res: Response) => {
  try {
    if (
      databaseRegex.users.phone.test(req.body.phone) &&
      databaseRegex.users.document.test(req.body.document) &&
      databaseRegex.users.name.test(req.body.name) &&
      databaseRegex.users.last_names.test(req.body.last_names) &&
      databaseRegex.users.email.test(req.body.email) &&
      databaseRegex.users.password.test(req.body.password) &&
      databaseRegex.users.role.test(req.body.role)
    ) {
      CreateUserController(req, res);
    } else
      return res.status(400).end(
        JSON.stringify({
          message: "Los parámetros enviados al servidor son incorrectos :(",
        })
      );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

UsersRouter.get("/me", async (req: Request, res: Response) => {
  try {
    await GetSelfUserController(req, res);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

UsersRouter.patch("/update/:id_user", async (req: Request, res: Response) => {
  try {
    return await UpdateUserController(req, res);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

UsersRouter.get("/all", async (req: Request, res: Response) => {
  try {
    return GetUsersController(req, res);
  } catch (err) {
    return res.status(500).json({ message: "Error interno del servidor :(" });
  }
});

UsersRouter.get("/:id_user", async (req: Request, res: Response) => {
  try {
    return await getUserByIdController(req, res);
  } catch (err) {
    return res.status(500).json({ message: "Error interno del servidor :(" });
  }
});

/*
WebProfileRouter.get("/:id_user", async (req: Request, res: Response) => {
    if (databaseRegex.web_profiles.id_user.test(req.params.id_user)) GetWebProfileController(req, res);
    else return res.status(400).end(JSON.stringify({ message: "Los parámetros enviados al servidor son incorrectos :(" }));
});
*/

export default UsersRouter;
