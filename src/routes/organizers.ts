import express, { Express, Request, Response } from "express";
import { databaseRegex } from "../helpers/regex.helper";
import {
  CreateOrganizersController,
  GetOrganizerByIdController,
  GetOrganizersController,
  UpdateOrganizerController,
} from "../controllers/organizers";

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

OrganizersRouter.get("/all", async (req: Request, res: Response) => {
  try {
    return GetOrganizersController(req, res);
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

OrganizersRouter.get("/get/:id_organizers", async (req: Request, res: Response<) => {
  try {
    if (req.params.id_organizers != undefined) return GetOrganizerByIdController(req, res);
    return res.status(400).send(JSON.stringify({ message: "No se envió un ID de organizador." }))
  } 
})

OrganizersRouter.patch("/update", async (req: Request, res: Response) => {
  try {
    return UpdateOrganizerController(req, res);
  } catch (err) {
    return res.status(500).send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});
export default OrganizersRouter;
