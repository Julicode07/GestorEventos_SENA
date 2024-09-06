import express, { Express, Request, Response } from "express";
import { UserRole } from "./src/repositories/users/models";
import AuthRouter from "./src/routes/auth";
import { createSchemas } from "./src/db/schema.handler";
import session from "express-session";
import UsersRouter from "./src/routes/users";
import MariaDBStore from 'express-session-mariadb-store';
import { pool } from "./src/db/connection"
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import cors from "cors";
import fs from "fs";
import EventsRouter from "./src/routes/events";

dotenv.config();

const app:Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public_views')));

// Some security options.
app.set('x-powered-by', false);
app.use(helmet({ contentSecurityPolicy: false }));

// MariaDB session store configuration
const sessionStore = new MariaDBStore({
  pool,                                   // using the pool instance from DB connection setup
  table: 'session',
  clearExpired: true,                     // automatically clear expired sessions
  checkExpirationInterval: 900000,        // how frequently expired sessions will be cleared; in milliseconds
}) as unknown as session.Store;           // Casting to session.Store to satisfy TypeScript.



// Session initializing and type declarations.
app.use(session({
  name: 'ssid_dont_share',
  secret: process.env.SESSION_SECRET as string,
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3
  }
}));

type UserSession = {
  document: number;
  role: string;
};

declare module "express-session" { // Augment express-session with a custom SessionData object
  interface SessionData {
    user: UserSession;
  }
}

// ROUTES.
app.use("/api/users/", UsersRouter);
app.use("/api/auth/", AuthRouter);
app.use("/api/events/", EventsRouter)

app.get("/404.html", (req:Request, res:Response) => {
  const viewFile = path.join(__dirname, 'public_views', '404.html');
    if (fs.existsSync(viewFile)) res.sendFile(viewFile);
    else res.redirect(path.join(__dirname, 'public_views', 'index.html'));
})
app.get("/*", (_req: Request, res: Response) => {
    const viewFile = path.join(__dirname, 'public_views', 'index.html');
    if (fs.existsSync(viewFile)) res.sendFile(viewFile);
    else res.sendFile(path.join(__dirname, 'public_views', '404.html'));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

createSchemas();