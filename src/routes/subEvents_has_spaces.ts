import express, { Express, Request, Response } from "express";
import { CreateSubEventsHasSpacesController } from "../controllers/subEvents_has_spaces";
import { databaseRegex } from "../helpers/regex.helper";

const SubEventsHasSpacesRouter: Express = express();

SubEventsHasSpacesRouter.post("/new", async (req: Request, res: Response) => {
  try {
    if (
      databaseRegex.subEvents_has_spaces.id_sub_event.test(
        req.body.id_sub_event
      ) &&
      databaseRegex.subEvents_has_spaces.id_space.test(req.body.id_space)
    ) {
      await CreateSubEventsHasSpacesController(req, res);
    } else {
      return res.status(400).end(
        JSON.stringify({
          message: "Los parámetros enviados al servidor son incorrectos :(",
        })
      );
    }
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

export default SubEventsHasSpacesRouter;
