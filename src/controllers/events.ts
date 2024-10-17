import { createGlobalEvent, findAllGlobalEvents } from '../repositories/events/repository';
import { findUserByDocument } from '../repositories/users/repository';
import { Request, Response } from 'express';

export async function CreateGlobalEventController(req:Request, res:Response) {
    try {
        const user_check = await findUserByDocument(req.session.user!.document as number);
        console.log(user_check[0], req.session.user!.document);
        if (user_check.length < 1) return res.status(409).end(JSON.stringify({ message: "Acceso no autorizado" }));
        else {
            console.log("Arrived to create global event function")
            const result = await createGlobalEvent({
                id_global_event: undefined,
                id_user: user_check[0].id_user,
                name: req.body.name,
                details: req.body.details,
            });
            return (result == 1) ? res.status(200).end(JSON.stringify({ message: "Evento creado correctamente" })) : res.status(500).end(JSON.stringify({ message: "Error interno del servidor al crear el evento" }));
        }
    } catch (err) {
        return res.status(500).end(JSON.stringify({ message: "Error interno del servidor :("}));
    }
    
}

export async function GetGlobalEventsController(req:Request, res:Response) {
    try {
        const global_events_results = await findAllGlobalEvents();
        return res.status(200).send(JSON.stringify(global_events_results)).end();
    } catch(err) {
        return res.status(500).end(JSON.stringify({ message: "Error interno del servidor :("}));
    }
}
