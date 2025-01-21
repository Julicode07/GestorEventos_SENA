import { createSubEvent } from "../repositories/subEvents/repository";
import { Request, Response } from "express";
import { ISubEvent } from "../repositories/subEvents/models";
import { bigIntReplacer } from "../helpers/json.helper";

export async function CreateSubeventsController(req: Request, res: Response) {
  try {
    const subEvent: ISubEvent[] = req.body;
    const idGlobalEvent: number | undefined = subEvent[0].id_global_event;

    if (idGlobalEvent === undefined) {
      return res.status(400).json({ message: "Falta el id_global_event" });
    }

    const subEventData: ISubEvent[] = subEvent
      .slice(1)
      .map((item: ISubEvent) => ({
        ...item,
        id_global_event: idGlobalEvent,
      }));

    const result = await Promise.all(
      subEventData.map((item: ISubEvent) => createSubEvent(item))
    );
    const successCount = result.filter((result) => result === 1).length;
    return successCount === subEventData.length
      ? res
          .status(200)
          .end(JSON.stringify({ message: "Subevento creado correctamente" }))
      : res.status(500).end(
          JSON.stringify({
            message: "Error interno del servidor al crear el subevento",
          })
        );
  } catch (err) {
    return res
      .status(500)
      .end(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
}
