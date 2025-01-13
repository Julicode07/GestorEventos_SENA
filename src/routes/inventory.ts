import { CreateSpaceInventoryController } from "../controllers/inventory";
import express, { Express, Request, Response } from "express";
import { databaseRegex } from "../helpers/regex.helper";

const InventoryRouter: Express = express();

//Cretae new inventory endpoint.
InventoryRouter.post(
  "/spacesInventory",
  async (req: Request, res: Response) => {
    try {
      if (
        databaseRegex.inventory.article_name.test(req.body.article_name) &&
        databaseRegex.inventory.description.test(req.body.description) &&
        databaseRegex.inventory.quantity.test(req.body.quantity) &&
        databaseRegex.inventory.type.test(req.body.type)
      ) {
        CreateSpaceInventoryController(req, res);
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

export default InventoryRouter;
