import { findUserByDocument } from '../repositories/users/repository';
import { Request, Response } from 'express';
import { hasActiveSession } from '../helpers/session.checker';

export async function LogInController(req: Request, res: Response) {
    if(!hasActiveSession(req, "*")) {
        const user_result = await findUserByDocument(parseInt(req.body.document));
        if (user_result.length === 0) return res.status(403).end(JSON.stringify({ message: "Usuario o contraseña incorrectos" }));
        else {
            if (req.body.password != user_result[0].password) return res.status(403).end(JSON.stringify({ message: "Usuario o contraseña incorrectos" }));
            else {
                req.session.user = {
                    document: parseInt(req.body.document),
                    role: user_result[0].role
                };
                const responseData = {
                    message: "Sesión iniciada correctamente",
                    data: {
                        document: parseInt(req.body.document),
                        role: user_result[0].role
                    }
                };
                return res.status(200).send(JSON.stringify(responseData)).end();
            }
        }

    } else return res.status(401).send({ message: "No puedes iniciar sesión cuando ya tienes una sesión ya activa" });
}