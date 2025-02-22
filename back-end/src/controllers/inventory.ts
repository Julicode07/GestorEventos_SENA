import {
  createSpaceInventory,
  getSpaceInventoryByIdSpace,
  updateSpaceInventoryById,
  getSpaceInventoryById,
  getInventoryByIdSpace,
} from "../repositories/inventory/repository";
import { Request, Response } from "express";
import { ISpaceInventory } from "../repositories/inventory/models";
import { bigIntReplacer } from "../helpers/json.helper";

export async function CreateSpaceInventoryController(
  req: Request,
  res: Response
) {
  try {
    const inventory: ISpaceInventory[] = req.body;
    const idSpace: number | undefined = inventory[0].id_space;

    if (idSpace === undefined) {
      return res.status(400).json({ message: "Falta el id_space" });
    }

    const inventoryData: ISpaceInventory[] = inventory
      .slice(1)
      .map((item: ISpaceInventory) => ({
        ...item,
        id_space: idSpace,
      }));

    const result = await Promise.all(
      inventoryData.map((item: ISpaceInventory) => createSpaceInventory(item))
    );

    const successCount = result.filter((result) => result === 1).length;
    return successCount === inventoryData.length
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

export async function GetSpaceInventoryByIdSpaceController(
  req: Request,
  res: Response
) {
  try {
    const { id_space } = req.params;
    const spaceInventory = await getSpaceInventoryByIdSpace(Number(id_space));
    return res.status(200).send(JSON.stringify(spaceInventory, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function updateSpaceInventoryByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const spaceInventory = await updateSpaceInventoryById(Number(id), req.body);
    return spaceInventory == 1
      ? res.status(200).send(
          JSON.stringify({
            message: `Se actualizo el inventario ${id}`,
            data: spaceInventory,
          })
        )
      : res.status(400).end(
          JSON.stringify({
            message: `No se pudo actualizar el inventario ${id}`,
          })
        );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor" }));
  }
}

export async function GetSpaceInventoryByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id_inventory } = req.params;
    const spaceInventory = await getSpaceInventoryById(Number(id_inventory));
    return res.status(200).send(JSON.stringify(spaceInventory, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetInventoryByIdSpaceController(
  req: Request,
  res: Response
) {
  try {
    const { id_space } = req.params;
    const inventory = await getInventoryByIdSpace(Number(id_space));
    return res.status(200).send(JSON.stringify(inventory, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}
