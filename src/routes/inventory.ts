import { CreateSpaceInventoryController } from "../controllers/inventory";
import express, { Express, Request, Response } from "express";
import { databaseRegex } from "../helpers/regex.helper";

const InventoryRouter: Express = express();

//Create new inventory endpoint.
InventoryRouter.post(
  "/spacesInventory",
  async (req: Request, res: Response) => {
    try {
      const inventory = req.body;

      const validateData =
        Array.isArray(inventory) &&
        inventory.every(
          (item) =>
            databaseRegex.inventory.article_name.test(item.article_name) &&
            databaseRegex.inventory.description.test(item.description) &&
            databaseRegex.inventory.quantity.test(item.quantity) &&
            databaseRegex.inventory.type.test(item.type)
        );

      if (validateData) {
        await CreateSpaceInventoryController(req, res);
      } else
        return res.status(400).end(
          JSON.stringify({
            message: "Los parámetros enviados al servidor son incorrectos :(",
          })
        );
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .end(JSON.stringify({ message: "Error interno del servidor :(" }));
    }
  }
);

export default InventoryRouter;
