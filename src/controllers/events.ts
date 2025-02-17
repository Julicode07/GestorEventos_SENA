import { bigIntReplacer } from "../helpers/json.helper";
import {
  createGlobalEvent,
  findAllGlobalEvents,
  getGlobalEventById,
  updateGlobalEventById,
  getAllInfoGLobalEventsById,
  updateStateGlobalEventById,
  getAllGlobalEventsByUserId,
  getAllEventsByMonthAndYear
} from "../repositories/events/repository";
import { findUserByDocument } from "../repositories/users/repository";
import { Request, Response } from "express";

export async function CreateGlobalEventController(req: Request, res: Response) {
  try {
    const user_check = await findUserByDocument(
      req.session.user!.document as number
    );
    console.log(user_check[0], req.session.user!.document);
    if (user_check.length < 1)
      return res
        .status(409)
        .end(JSON.stringify({ message: "Acceso no autorizado" }));
    else {
      console.log("body", req.body.name, req.body.details, req.body.status);
      const result = await createGlobalEvent({
        id_global_event: undefined,
        id_user: user_check[0].id_user,
        name: req.body.name,
        details: req.body.details,
        status: req.body.status,
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
    }
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetGlobalEventsController(req: Request, res: Response) {
  try {
    const global_events_results = await findAllGlobalEvents();
    return res.status(200).send(JSON.stringify(global_events_results)).end();
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetEventsByMonthAndDateController(req: Request, res: Response) {
  try {
    const events_results = await getAllEventsByMonthAndYear(Number(req.params.month), Number(req.params.year));
    return res.status(200).send(JSON.stringify(events_results)).end();
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function updateGlobalEventsByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const globalEvents = await updateGlobalEventById(Number(id), req.body);
    return globalEvents == 1
      ? res.status(200).send(
          JSON.stringify({
            message: `Se actualizo el evento global ${id}`,
            data: globalEvents,
          })
        )
      : res.status(400).end(
          JSON.stringify({
            message: `No se actualizo el evento global ${id}`,
          })
        );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor" }));
  }
}

export async function getGlobalEventByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id_event } = req.params;
    const globalEvent = await getGlobalEventById(Number(id_event));
    return res.status(200).send(JSON.stringify(globalEvent, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function getAllInfoGlobalEventByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id_global_event } = req.params;
    const globalEvent = await getAllInfoGLobalEventsById(
      Number(id_global_event)
    );
    return res.status(200).send(JSON.stringify(globalEvent, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function getAllGlobalEventsByUserIdController(
  req: Request,
  res: Response
) {
  try {
    const id_user = req.session.user?.id_user;
    const globalEvents = await getAllGlobalEventsByUserId(Number(id_user));
    return res.status(200).send(JSON.stringify(globalEvents, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function updateStateGlobalEventByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id_global_event } = req.params;
    const statusData = req.body;
    const subEvents = await updateStateGlobalEventById(
      Number(id_global_event),
      statusData
    );
    return subEvents == 1
      ? res.status(200).send(
          JSON.stringify({
            message: `Se actualizo el sub evento ${id_global_event}`,
            data: subEvents,
          })
        )
      : res.status(400).end(
          JSON.stringify({
            message: `No se actulizo el sub evento ${id_global_event}`,
          })
        );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor" }));
  }
}
