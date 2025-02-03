import {
  CreateSubeventsController,
  GetSubEventsByIdController,
  UpdateSubEventsByIdController,
  GetSubEventsByGlobalEventIdController,
  GetAllSubEventsController,
  CreateSubEventsHasSpacesController,
} from "../controllers/subEvents";
import express, { Express, Request, Response } from "express";
import { databaseRegex } from "../helpers/regex.helper";
import { ISubEvent } from "../repositories/subEvents/models";

const SubEventsRouter: Express = express();

// create a new subevent
SubEventsRouter.post("/create/:id_global_event", async (req: Request, res: Response) => {
  try {
    const subEvent: ISubEvent[] = req.body;

    if (!Array.isArray(subEvent)) {
      return res.status(400).json({
        message: "El cuerpo de la solicutud debe ser un array de subeventos.",
      });
    }

    const firstItem: ISubEvent = subEvent[0];
    if (
      firstItem &&
      firstItem.name &&
      firstItem.headquarters &&
      firstItem.start_date &&
      firstItem.end_date &&
      firstItem.description &&
      firstItem.subeventConfirmation
    ) {
      if (!databaseRegex.subEvents.id_global_event.test(req.params.id_global_event!.toString())) {
        return res.status(400).json({
          message: "El campo id_global_event no es válido.",
        });
      }
    } else {
      return res.status(400).json({
        message: "El primer objeto debe contener solo 'id_global_event'.",
      });
    }

    const validateData = subEvent.every((item, index) => {
      const validations = [
        {
          field: "name",
          valid: databaseRegex.subEvents.name.test(item.name),
        },
        {
          field: "headquarters",
          valid: databaseRegex.subEvents.headquarters.test(item.headquarters),
        },
        {
          field: "start_date",
          valid: databaseRegex.subEvents.start_date.test(item.start_date),
        },
        {
          field: "end_date",
          valid: databaseRegex.subEvents.end_date.test(item.end_date),
        },
        {
          field: "description",
          valid: databaseRegex.subEvents.description.test(item.description),
        },
        {
          field: "subeventConfirmation",
          valid: databaseRegex.subEvents.subeventConfirmation.test(
            item.subeventConfirmation
          ),
        },
      ];

      const invalidField = validations.find((validation) => !validation.valid);
      if (invalidField) {
        return res.status(400).json({
          message: `El campo '${invalidField.field}' en el articulo ${
            index + 2
          } no es válido.`,
        });
      }

      return true;
    });

    if (validateData) {
      await CreateSubeventsController(req, res);
    } else {
      return res.status(400).json({
        message: "Los parámetros enviados al servidor son incorrectos :(",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor :(" });
  }
});

SubEventsRouter.get("/:id_sub_event", async (req: Request, res: Response) => {
  try {
    return await GetSubEventsByIdController(req, res);
  } catch (err) {
    return res.status(500).json({ message: "Error interno del servidor :(" });
  }
});

SubEventsRouter.get(
  "/globalEvent/:id_global_event",
  async (req: Request, res: Response) => {
    try {
      return await GetSubEventsByGlobalEventIdController(req, res);
    } catch (err) {
      return res.status(500).json({ message: "Error interno del servidor :(" });
    }
  }
);

SubEventsRouter.patch(
  "/update/:id_sub_event",
  async (req: Request, res: Response) => {
    try {
      return await UpdateSubEventsByIdController(req, res);
    } catch (err) {
      return res
        .status(500)
        .end(JSON.stringify({ message: `Error interno en el servidor :(` }));
    }
  }
);

SubEventsRouter.get("/get/all", async (req: Request, res: Response) => {
  try {
    return await GetAllSubEventsController(req, res);
  } catch (err) {
    return res
      .status(500)
      .send(JSON.stringify({ message: "Error interno del servidor :(" }));
  }
});
export default SubEventsRouter;

SubEventsRouter.post(
  "/createHasSpaces",
  async (req: Request, res: Response) => {
    try {
      if (
        databaseRegex.subEvents_has_spaces.id_sub_event.test(
          req.body.id_sub_event
        ) &&
        databaseRegex.subEvents_has_spaces.id_space.test(req.body.id_space)
      ) {
        await CreateSubEventsHasSpacesController(req, res);
      } else {
        return res.status(400).end(
          JSON.stringify({
            message: "Los parámetros enviados al servidor son incorrectos :(",
          })
        );
      }
    } catch (err) {
      return res
        .status(500)
        .end(JSON.stringify({ message: "Error interno del servidor :(" }));
    }
  }
);
