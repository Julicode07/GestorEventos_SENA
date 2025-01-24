import {
  LogInController,
  CheckSessionController,
  LogOutController,
} from "../controllers/auth";
import express, { Express, Request, Response } from "express";
import { databaseRegex } from "../helpers/regex.helper";

const AuthRouter: Express = express();

AuthRouter.post("/login", async (req: Request, res: Response) => {
  try {
    if (
      databaseRegex.users.document.test(req.body.document) &&
      databaseRegex.users.password.test(req.body.password)
    ) {
      await LogInController(req, res);
    } else
      return res.status(400).end(
        JSON.stringify({
          message: "Los parámetros enviados al servidor son incorrectos :(",
        })
      );
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

AuthRouter.get("/check-my-session", async (req: Request, res: Response) => {
  try {
    await CheckSessionController(req, res);
  } catch (err) {
    res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

AuthRouter.get("/logout", async (req: Request, res: Response) => {
  try {
    await LogOutController(req, res);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

export default AuthRouter;
