// import { Request, Response, NextFunction } from "express";

// export async function isAuthenticated(req:Request, res:Response, next:NextFunction) {
//     if (req.session && (req.session.user?.role == "Instructor" || req.session.user?.role == "Coordinador")) {
//       // User is authenticated
//       return next(); // Move to the next middleware/route handler
//     } else {
//       // User is not authenticated
//       return res.status(401).json({ message: 'No autorizado' });
//     }
// }


// export async function isInstructor(req:Request, res:Response, next:NextFunction) {
//     if (req.session && req.session.user?.role == "Instructor") {
//       // User is authenticated
//       return next(); // Move to the next middleware/route handler
//     } else {
//       // User is not authenticated
//       return res.status(401).json({ message: 'No autorizado' });
//     }
// }


// export async function isCoordinator(req:Request, res:Response, next:NextFunction) {
//     if (req.session && req.session.user?.role == "Coordinador") {
//       // User is authenticated
//       return next(); // Move to the next middleware/route handler
//     } else {
//       // User is not authenticated
//       return res.status(401).json({ message: 'No autorizado' });
//     }
// }