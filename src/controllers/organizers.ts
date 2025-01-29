import { createOrganizers, getOrganizers, getOrganizerById, updateOrganizerById } from "../repositories/organizers/repository";
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

export async function GetOrganizersController(_req: Request, res: Response) {
  try {
    const organizers = await getOrganizers();
    if (organizers === -1) {
      return res
        .status(500)
        .send(
          JSON.stringify({ message: "Error al obtener los organizadores." })
        );
    }
    return res.status(200).send(JSON.stringify(organizers, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetOrganizerByIdController(req: Request, res: Response) {
  try {
    const organizer = await getOrganizerById(parseInt(req.params.id_organizers));
    if (organizer != undefined) {
      return res.status(500).send(JSON.stringify({ message: "El organizador no existe." }));
    }
    return res.status(200).send(JSON.stringify(organizer, bigIntReplacer));
  } catch (err) {
    return res.status(500).send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function UpdateOrganizerController(req: Request, res: Response) {
  try {
    const organizer = await getOrganizerById(req.body.id_organizer);
    if (organizer != undefined) {
      return res.status(500).send(JSON.stringify({ message: "El organizador no existe." }));
    }
    await updateOrganizerById(parseInt(req.body.id_organizer), req.body);
    return res.status(200).send(JSON.stringify({ message: "Organizador actualizado correctamente." }, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}