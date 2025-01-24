import { createOrganizers } from "../repositories/organizers/repository";
import { Request, Response } from "express";
import { IOrganizers } from "../repositories/organizers/models";
import { bigIntReplacer } from "../helpers/json.helper";

export async function CreateOrganizersController(req: Request, res: Response) {
  try {
    const result = await createOrganizers({
      id_organizers: undefined,
      id_sub_event: req.body.id_sub_event,
      name: req.body.name,
      rol: req.body.rol,
      email: req.body.email,
      address: req.body.address,
    });
    return result == 1
      ? res
          .status(200)
          .end(JSON.stringify({ message: "Organizador creado correctamente" }))
      : res
          .status(500)
          .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}
