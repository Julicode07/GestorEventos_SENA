import {
  createOrganizers,
  getOrganizers,
  getOrganizerById,
  updateOrganizerById,
  getOrganizersBySubEventId,
} from "../repositories/organizers/repository";
import { bigIntReplacer } from "../helpers/json.helper";
import { Request, Response } from "express";

export async function CreateOrganizersController(req: Request, res: Response) {
  try {
    const result = await createOrganizers(req.body.id_sub_event, {
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
    const organizer = await getOrganizerById(
      parseInt(req.params.id_organizers)
    );
    if (organizer == undefined) {
      return res
        .status(500)
        .send(JSON.stringify({ message: "El organizador no existe." }));
    }
    return res.status(200).send(JSON.stringify(organizer, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetOrganizersBySubEventIdController(
  req: Request,
  res: Response
) {
  try {
    const organizers = await getOrganizersBySubEventId(
      parseInt(req.params.id_sub_event)
    );
    if (organizers == undefined)
      return res
        .status(500)
        .send(JSON.stringify({ message: "El organizador no existe." }));
    return res.status(200).send(JSON.stringify(organizers, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function UpdateOrganizerController(req: Request, res: Response) {
  try {
    const organizer = await getOrganizerById(parseInt(req.params.id_organizer));
    if (organizer == undefined) {
      return res
        .status(500)
        .send(JSON.stringify({ message: "El organizador no existe." }));
    }
    await updateOrganizerById(parseInt(req.params.id_organizer), req.body);
    return res
      .status(200)
      .send(
        JSON.stringify(
          { message: "Organizador actualizado correctamente." },
          bigIntReplacer
        )
      );
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}
