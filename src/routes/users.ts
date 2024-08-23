import express, { Express, Request, Response } from "express";
import { CreateUserController } from "../controllers/users";
import { databaseRegex } from "../helpers/regex.helper";

const UsersRouter: Express = express();

// Create new web profile endpoint.
UsersRouter.post("/", async (req: Request, res: Response) => {
    try {
        if ( databaseRegex.users.phone.test(req.body.phone)
            && databaseRegex.users.document.test(req.body.document)
            && databaseRegex.users.name.test(req.body.name)
            && databaseRegex.users.last_names.test(req.body.last_names)
            && databaseRegex.users.email.test(req.body.email)
            && databaseRegex.users.password.test(req.body.password)
            && databaseRegex.users.role.test(req.body.role)
        ) { CreateUserController(req, res); }
        else return res.status(400).end(JSON.stringify({ message: "Los parámetros enviados al servidor son incorrectos :(" }));
    } catch (err) {
        res.status(500).end(JSON.stringify({ message: "Error interno del servidor :("}));
    }
});

/*
WebProfileRouter.get("/:id_user", async (req: Request, res: Response) => {
    if (databaseRegex.web_profiles.id_user.test(req.params.id_user)) GetWebProfileController(req, res);
    else return res.status(400).end(JSON.stringify({ message: "Los parámetros enviados al servidor son incorrectos :(" }));
});
*/

export default UsersRouter;