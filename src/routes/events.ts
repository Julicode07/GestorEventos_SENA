import express, { Express, Request, Response } from "express";
import { CreateGlobalEventController, GetGlobalEventsController } from "../controllers/events";
import { databaseRegex } from "../helpers/regex.helper";
import { isAuthenticated } from "../middlewares/auth";

const EventsRouter: Express = express();

// Create new web profile endpoint.
EventsRouter.post("/global", isAuthenticated, async (req: Request, res: Response) => {
    try {
        if (databaseRegex.global_events.name.test(req.body.name)
            && databaseRegex.global_events.details.test(req.body.details)
        ) { CreateGlobalEventController(req, res); }
        else return res.status(400).end(JSON.stringify({ message: "Los parámetros enviados al servidor son incorrectos :(" }));
    } catch (err) {
        res.status(500).end(JSON.stringify({ message: "Error interno del servidor :("}));
    }
});

EventsRouter.get("/global/all", async (req:Request, res:Response) => {
    try {
        GetGlobalEventsController(req, res);
    } catch (err) {
        res.status(500).end(JSON.stringify({ message: "Error interno del servidor :("}));
    }
});

export default EventsRouter;
