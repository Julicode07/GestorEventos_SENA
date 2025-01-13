import { createSpaceInventory } from "../repositories/inventory/repository";
import { Request, Response } from "express";
import { ISpaceInventory } from "../repositories/inventory/models";

export async function CreateSpaceInventoryController(
  req: Request,
  res: Response
) {
  try {
    const inventory = req.body;

    const result = await Promise.all(
      inventory.map((item: ISpaceInventory) => createSpaceInventory(item))
    );
    const successCount = result.filter((result) => result === 1).length;
    return successCount === inventory.length
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
