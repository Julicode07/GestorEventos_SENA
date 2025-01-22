import { Request, Response } from "express";
import {
  createSpace,
  getSpaces,
  updateSpaceById,
  getSpaceById,
} from "../repositories/spaces/repository";
import { bigIntReplacer } from "../helpers/json.helper";

export async function CreateSpaceController(req: Request, res: Response) {
  try {
    const result = await createSpace({
      id_space: undefined,
      name: req.body.name,
      capacity: req.body.capacity,
      type: req.body.type,
      status: req.body.status,
      details: req.body.details,
    });
    return result == 1
      ? res
          .status(200)
          .end(JSON.stringify({ message: "Evento creado correctamente" }))
      : res.status(500).end(
          JSON.stringify({
            message: "Error interno del servidor al crear el evento",
          })
        );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetSpacesController(_req: Request, res: Response) {
  try {
    const spaces = await getSpaces();
    return res.status(200).send(JSON.stringify(spaces, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function updateSpaceByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const space = await updateSpaceById(Number(id), req.body);
    return space == 1
      ? res.status(200).send(
          JSON.stringify({
            message: `Se actualizo el espacio ${id}`,
            data: space,
          })
        )
      : res
          .status(400)
          .end(JSON.stringify({ message: `No se actualizo el espacio ${id}` }));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetSpaceByIdController(req: Request, res: Response) {
  try {
    const { id_space } = req.params;
    const spaces = await getSpaceById(Number(id_space));
    return res.status(200).send(JSON.stringify(spaces, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}
