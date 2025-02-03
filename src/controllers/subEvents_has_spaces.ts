import { createSubEventHasSpace } from "../repositories/subEvents_has_spaces/repository";
import { Request, Response } from "express";
import { ISubEventHasSpace } from "../repositories/subEvents_has_spaces/models";
import { bigIntReplacer } from "../helpers/json.helper";

export async function CreateSubEventsHasSpacesController(
  req: Request,
  res: Response
) {
  try {
    const result = await createSubEventHasSpace(req.body);
    return result.length === 1
      ? res
          .status(200)
          .send(JSON.stringify({ message: "Creado correctamente" }))
      : res
          .status(500)
          .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}
