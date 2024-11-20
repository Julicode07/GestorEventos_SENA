import { Request, Response } from 'express';
import { createSpace } from '../repositories/spaces/repository';

export async function CreateSpaceController(req:Request, res:Response) {
    try {
            const result = await createSpace({
                id_space: undefined,
                name: req.body.name,
                capacity: req.body.capacity,
                type: req.body.type,
                status: req.body.status,
                details: req.body.details
            });
            return (result == 1) ? res.status(200).end(JSON.stringify({ message: "Evento creado correctamente" })) : res.status(500).end(JSON.stringify({ message: "Error interno del servidor al crear el evento" }));
    } catch (err) {
        return res.status(500).end(JSON.stringify({ message: "Error interno del servidor :("}));
    }
    
}
