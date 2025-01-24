import {
  CreateSpaceInventoryController,
  GetSpaceInventoryByIdController,
  updateSpaceInventoryByIdController,
} from "../controllers/inventory";
import express, { Express, Request, Response } from "express";
import { databaseRegex } from "../helpers/regex.helper";
import { ISpaceInventory } from "../repositories/inventory/models";

const InventoryRouter: Express = express();

// Crear nuevo inventario en el endpoint.
InventoryRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const inventory: ISpaceInventory = req.body;

    // Verificar si el cuerpo de la solicitud es un array
    if (!Array.isArray(inventory)) {
      return res.status(400).json({
        message:
          "El cuerpo de la solicitud debe ser un array de artículos de inventario.",
      });
    }

    // Validar si el primer objeto tiene solo id_space
    const firstItem:
      | {
          id_space: string;
          article_name?: string;
          description?: string;
          quantity?: number;
          type?: string;
        }
      | undefined = inventory[0];
    if (
      firstItem &&
      !firstItem.article_name &&
      !firstItem.description &&
      !firstItem.quantity &&
      !firstItem.type
    ) {
      // Validar solo el id_space en el primer objeto
      if (!databaseRegex.inventory.id_space.test(firstItem.id_space)) {
        return res.status(400).json({
          message: "El campo 'id_space' del primer objeto no es válido.",
        });
      }
    } else {
      return res.status(400).json({
        message: "El primer objeto debe contener solo 'id_space'.",
      });
    }

    // Validar el resto de los artículos
    const validateData = inventory.slice(1).every((item, index) => {
      const validations = [
        {
          field: "article_name",
          valid: databaseRegex.inventory.article_name.test(item.article_name),
        },
        {
          field: "description",
          valid: databaseRegex.inventory.description.test(item.description),
        },
        {
          field: "quantity",
          valid:
            databaseRegex.inventory.quantity.test(item.quantity) ||
            !isNaN(Number(item.quantity)),
        },
        {
          field: "type",
          valid: databaseRegex.inventory.type.test(item.type),
        },
      ];

      // Si alguna validación falla, devolver un mensaje de error detallado
      const invalidField = validations.find((validation) => !validation.valid);
      if (invalidField) {
        return res.status(400).json({
          message: `El campo '${invalidField.field}' en el artículo ${
            index + 2
          } no es válido.`, // index + 2 para contar el primer objeto
        });
      }

      return true;
    });

    // Si los datos son válidos, procesar la solicitud
    if (validateData) {
      await CreateSpaceInventoryController(req, res);
    } else {
      return res.status(400).json({
        message: "Los parámetros enviados al servidor son incorrectos :(",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor :(" });
  }
});

InventoryRouter.get("/space/:id_space", async (req: Request, res: Response) => {
  try {
    return await GetSpaceInventoryByIdController(req, res);
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor : (" }));
  }
});

InventoryRouter.patch(
  "/update/space/:id",
  async (req: Request, res: Response) => {
    try {
      return await updateSpaceInventoryByIdController(req, res);
    } catch (err) {
      return res
        .status(500)
        .end(JSON.stringify({ message: "Error interno del servidor :(" }));
    }
  }
);

export default InventoryRouter;
