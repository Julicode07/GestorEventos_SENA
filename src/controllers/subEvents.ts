import {
  createSubEvent,
  getSubEventsByGlobalEventId,
  updateSubEventsById,
  getSubEventsByIdGlobalEvent,
  findAllSubEvents,
  createSubEventHasSpace,
} from "../repositories/subEvents/repository";
import { Request, Response } from "express";
import { ISubEvent, ISubEventHasSpace } from "../repositories/subEvents/models";
import { bigIntReplacer } from "../helpers/json.helper";

export async function CreateSubeventsController(req: Request, res: Response) {
  try {
    const subEvents: ISubEvent[] = req.body;
    //const idGlobalEvent: number | undefined = subEvent[0].id_global_event;

    if (req.params.id_global_event === undefined) {
      return res.status(400).json({ message: "Falta el ID de evento global :(" });
    }

    // Add global event id to each subevent
    const subEventsData: ISubEvent[] = subEvents.map((item: ISubEvent) => ({
        ...item,
        id_global_event: Number(req.params.id_global_event),
      }));

    // Insert all sub events
    const result = await Promise.all(
      subEventsData.map((item: ISubEvent) => createSubEvent(item))
    );

    const successCount = result.filter((result) => result === 1).length;
    subEventsData.forEach((subEvent) => {
      subEvent.spaces!.forEach((space) => createSubEventHasSpace(subEvent.id_sub_event as number, space))
    })
    return successCount === subEventsData.length ? res.status(200).end(JSON.stringify({ message: "Subevento creado correctamente" }))
      : res.status(500).end(JSON.stringify({ message: "Error interno del servidor al crear el subevento" }));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetSubEventsByIdController(req: Request, res: Response) {
  try {
    const { id_sub_event } = req.params;
    const subEvents = await getSubEventsByGlobalEventId(Number(id_sub_event));
    return res.status(200).send(JSON.stringify(subEvents, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function GetSubEventsByGlobalEventIdController(
  req: Request,
  res: Response
) {
  try {
    const { id_global_event } = req.params;
    const subEvents = await getSubEventsByIdGlobalEvent(
      Number(id_global_event)
    );
    return res.status(200).send(JSON.stringify(subEvents, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function UpdateSubEventsByIdController(
  req: Request,
  res: Response
) {
  try {
    const { id_sub_event } = req.params;
    const subEvents = await updateSubEventsById(Number(id_sub_event), req.body);
    return subEvents == 1
      ? res.status(200).send(
          JSON.stringify({
            message: `Se actualizo el sub evento ${id_sub_event}`,
            data: subEvents,
          })
        )
      : res.status(400).end(
          JSON.stringify({
            message: `No se actulizo el sub evento ${id_sub_event}`,
          })
        );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor" }));
  }
}

export async function GetAllSubEventsController(_req: Request, res: Response) {
  try {
    const subEvents = await findAllSubEvents();
    if (subEvents === -1) {
      return res
        .status(500)
        .send(
          JSON.stringify({ message: "Error al obtener los organizadores." })
        );
    }
    return res.status(200).send(JSON.stringify(subEvents, bigIntReplacer));
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}

export async function CreateSubEventsHasSpacesController(
  req: Request,
  res: Response
) {
  try {
    const subEventHasSpace: ISubEventHasSpace[] = req.body;
    
  } catch (err) {}
}
