import { UserRole } from "../repositories/users/models";
import { Request } from "express";

export const hasActiveSession = (req: Request, expected_role: UserRole | "*") => req.session.user && ((req.session.user.role != null) && (expected_role == "*" || req.session.user.role == expected_role)); 