import {
  CreateGlobalEventController,
  GetGlobalEventsController,
  updateGlobalEventsByIdController,
} from "../controllers/events";
import express, { Express, Request, Response } from "express";
import { databaseRegex } from "../helpers/regex.helper";
// import { isInstructor } from "../middlewares/auth";
import InventoryRouter from "./inventory";

const EventsRouter: Express = express();

// Create new web profile endpoint.
EventsRouter.post(
  "/global",
  // isInstructor,
  async (req: Request, res: Response) => {
    try {
      if (
        databaseRegex.global_events.name.test(req.body.name) &&
        databaseRegex.global_events.details.test(req.body.details) &&
        databaseRegex.global_events.status.test(req.body.status)
      ) {
        CreateGlobalEventController(req, res);
      } else
        return res.status(400).end(
          JSON.stringify({
            message: "Los parámetros enviados al servidor son incorrectos :(",
          })
        );
    } catch (err) {
      res
        .status(500)
        .end(JSON.stringify({ message: "Error interno del servidor :(" }));
    }
  }
);

EventsRouter.get("/global/all", async (req: Request, res: Response) => {
  try {
    GetGlobalEventsController(req, res);
  } catch (err) {
    res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});

EventsRouter.patch(
  "/update/global/:id",
  async (req: Request, res: Response) => {
    try {
      return updateGlobalEventsByIdController(req, res);
    } catch (err) {
      return res
        .status(500)
        .end(JSON.stringify({ message: "Error interno del servidor :(" }));
    }
  }
);

export default EventsRouter;
