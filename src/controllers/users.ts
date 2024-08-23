import { createUser, findUserByDocument, findUserByEmail } from '../repositories/users/repository';
import { Request, Response } from 'express';

export async function CreateUserController(req: Request, res: Response) {
    const user_document_check = await findUserByDocument(req.body.document);
    const user_email_check = await findUserByEmail(req.body.email);
    if (user_document_check.length == 1) return res.status(409).end(JSON.stringify({ message: "Ya existe una cuenta con ese documento" }));
    else if (user_email_check.length == 1) return res.status(409).end(JSON.stringify({ message: "Ya existe una cuenta con ese correo electrónico" }));
    else {
        const result = await createUser({
            id_user: undefined,
            document: req.body.document,
            name: req.body.name,
            last_names: req.body.last_names,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            password: req.body.password,
        });
        return (result == 1) ? res.status(200).end(JSON.stringify({ message: "Perfil creado correctamente" })) : res.status(500).end(JSON.stringify({ message: "Error interno del servidor al crear el perfil" }));
    }
}
