import express, { Express, Request, Response } from "express";
import AuthRouter from "./src/routes/auth";
import createSchemas from "./src/db/schema.handler";
import session from "express-session";
import UsersRouter from "./src/routes/users";
import MariaDBStore from "express-session-mariadb-store";
import { pool } from "./src/db/connection";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import cors from "cors";
import fs from "fs";
import EventsRouter from "./src/routes/events";
import SpacesRouter from "./src/routes/spaces";
import InventoryRouter from "./src/routes/inventory";
import SubEventsRouter from "./src/routes/subEvents";
import OrganizersRouter from "./src/routes/organizers";
import compression from "compression";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  console.error("❌ ERROR: SESSION_SECRET no está definido en .env");
  process.exit(1);
}

// Middleware
app.use(compression());
app.use(
  cors({
    origin: ["https://gestro-eventos-sena.netlify.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.static(path.join(__dirname, "public_views")));
app.use(helmet()); // Seguridad

// Configuración de la sesión con MariaDB
const sessionStore = new MariaDBStore({
  pool,
  table: "sessions",
  clearExpired: true,
  checkExpirationInterval: 900000,
}) as unknown as session.Store;

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 días de duración de la sesión
      httpOnly: true,
      secure: process.env.NODE_ENV === "produccion",
      sameSite: "none",
    },
  })
);



// Definición de la interfaz para los datos de sesión
declare module "express-session" {
  interface SessionData {
    user: {
      document: number | null;
      role: string | null;
      id_user: number | null;
      name: string | null;
      last_name: string | null;
    };
  }
}

// Rutas
app.use("/api/users/", UsersRouter);
app.use("/api/auth/", AuthRouter);
app.use("/api/events/", EventsRouter);
app.use("/api/spaces/", SpacesRouter);
app.use("/api/inventory/", InventoryRouter);
app.use("/api/subEvents/", SubEventsRouter);
app.use("/api/organizers/", OrganizersRouter);

// Manejo de rutas estáticas
app.get("/404.html", (req: Request, res: Response) => {
  const viewFile = path.join(__dirname, "public_views", "404.html");
  res.sendFile(fs.existsSync(viewFile) ? viewFile : path.join(__dirname, "public_views", "index.html"));
});

app.get("/*", (_req: Request, res: Response) => {
  const viewFile = path.join(__dirname, "public_views", "index.html");
  if (fs.existsSync(viewFile)) {
    res.sendFile(viewFile);
  } else {
    res.status(403).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Estamos en mantenimiento</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                  background-color: #111827;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
              }
              .container {
                  text-align: center;
                  background-color: #ffffff;
                  padding: 40px;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  font-size: 24px;
                  color: #333;
              }
              p {
                  font-size: 18px;
                  color: #666;
              }
              .button {
                  margin-top: 20px;
                  padding: 10px 20px;
                  background-color: #007BFF;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
              }
              .button:hover {
                  background-color: #0056b3;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>🚧 Estamos en mantenimiento</h1>
              <p>Vuelve pronto para seguir agendando.</p>
              <a href="https://google.com" class="button">Salir</a>
          </div>
      </body>
      </html>
    `);
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Crear esquemas en la base de datos
createSchemas();
