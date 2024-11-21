import express, { Express, Request, Response } from "express";
import { databaseRegex } from "../helpers/regex.helper";
import { isInstructor } from "../middlewares/auth";
import { CreateSpaceController, GetSpacesController } from "../controllers/spaces";

const SpacesRouter: Express = express();

// Create new web profile endpoint.
SpacesRouter.post("/new", async (req: Request, res: Response) => {
    try {
       if(  databaseRegex.spaces.name.test(req.body.name)
         && databaseRegex.spaces.capacity.test(req.body.capacity)
         && databaseRegex.spaces.type.test(req.body.type)
         && databaseRegex.spaces.status.test(req.body.status)
         && databaseRegex.spaces.details.test(req.body.details)
        ) { CreateSpaceController(req, res) }
    } catch (err) {
        return res.status(500).end(JSON.stringify({ message: "Error interno del servidor :("}));
    }
});

SpacesRouter.get("/all", async (req:Request, res:Response) => {
    try {
        return GetSpacesController(req, res);
    } catch (err) {
        return res.status(500).end(JSON.stringify({ message: "Error interno del servidor :("}));
    }
});

export default SpacesRouter;
