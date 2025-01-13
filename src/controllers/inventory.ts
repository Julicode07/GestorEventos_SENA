import { createSpaceInventory } from "../repositories/inventory/repository";
import { Request, Response } from "express";

export async function CreateSpaceInventoryController(
  req: Request,
  res: Response
) {
  try {
    const result = await createSpaceInventory({
      id_inventory: undefined,
      id_space: req.body.id_space,
      article_name: req.body.article_name,
      description: req.body.description,
      quantity: req.body.quantity,
      type: req.body.type,
    });
    return result == 1
      ? res
          .status(200)
          .end(JSON.stringify({ message: "Inventario creado correctamente" }))
      : res.status(500).end(
          JSON.stringify({
            message: "Error interno del servidor al crear el inventario",
          })
        );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}
