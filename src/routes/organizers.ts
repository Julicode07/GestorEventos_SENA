import express, { Express, Request, Response } from "express";
import { databaseRegex } from "../helpers/regex.helper";
import { CreateOrganizersController } from "../controllers/organizers";

const OrganizersRouter: Express = express();

//Create new organizer
OrganizersRouter.post("/new", async (req: Request, res: Response) => {
  try {
    if (
      databaseRegex.organizers.name.test(req.body.name) &&
      databaseRegex.organizers.rol.test(req.body.rol) &&
      databaseRegex.organizers.email.test(req.body.email) &&
      databaseRegex.organizers.address.test(req.body.address)
    ) {
      await CreateOrganizersController(req, res);
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

export default OrganizersRouter;
