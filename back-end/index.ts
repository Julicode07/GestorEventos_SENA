import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import { pool } from "./src/db/connection";
import createSchemas from "./src/db/schema.handler";

import AuthRouter from "./src/routes/auth";
import UsersRouter from "./src/routes/users";
import EventsRouter from "./src/routes/events";
import SpacesRouter from "./src/routes/spaces";
import InventoryRouter from "./src/routes/inventory";
import SubEventsRouter from "./src/routes/subEvents";
import OrganizersRouter from "./src/routes/organizers";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(compression());

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(helmet());

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "public_views")));

const sessionStore = new MySQLStore({}, pool);
app.use(
  session({
    name: "ssid_dont_share",
    secret: process.env.SESSION_SECRET || "default_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
  })
);

type UserSession = {
  document: number | null;
  role: string | null;
  id_user: number | null;
  name: string | null;
  last_name: string | null;
};

declare module "express-session" {
  interface SessionData {
    user: UserSession;
  }
}

app.use("/api/users", UsersRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/events", EventsRouter);
app.use("/api/spaces", SpacesRouter);
app.use("/api/inventory", InventoryRouter);
app.use("/api/subEvents", SubEventsRouter);
app.use("/api/organizers", OrganizersRouter);

app.get("/404.html", (_req: Request, res: Response) => {
  const viewFile = path.resolve(__dirname, "public_views", "404.html");
  fs.existsSync(viewFile) ? res.sendFile(viewFile) : res.status(404).send("Página no encontrada");
});

app.use("*", (_req: Request, res: Response) => {
  const viewFile = path.resolve(__dirname, "public_views", "index.html");
  if (fs.existsSync(viewFile)) {
    res.sendFile(viewFile);
  } else {
    res.status(503).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Estamos en mantenimiento</title>
          <style>
              body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #111827;
                  color: white;
                  text-align: center;
                  font-family: Arial, sans-serif;
              }
              .container {
                  padding: 20px;
                  border-radius: 10px;
                  background-color: #1f2937;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 { font-size: 24px; }
              p { font-size: 18px; margin: 10px 0; }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007BFF;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  margin-top: 15px;
              }
              .button:hover { background-color: #0056b3; }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>🚧 Mantenimiento en progreso 🚧</h1>
              <p>Volvemos pronto.</p>
              <a href="https://google.com" class="button">Salir</a>
          </div>
      </body>
      </html>
    `);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server running at http://localhost:${port}`);
});

createSchemas();
