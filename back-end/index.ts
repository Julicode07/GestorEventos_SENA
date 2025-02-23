import express, { Express, Request, Response } from "express";
import AuthRouter from "./src/routes/auth";
import createSchemas from "./src/db/schema.handler";
import session from "express-session";
import UsersRouter from "./src/routes/users";
import MariaDBStore from "express-session-mariadb-store";
import { getConnection, pool } from "./src/db/connection";
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

// Cargar las variables de entorno
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "SESSION_SECRET"];
requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ ERROR: Falta la variable de entorno ${envVar}`);
    process.exit(1);
  }
});


// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || ["http://localhost:5173"],
    credentials: true, // Permitir cookies y autenticación
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public_views")));
app.set("x-powered-by", false);
app.use(helmet({ contentSecurityPolicy: false }));

// Seguridad: Deshabilitar la cabecera x-powered-by y aplicar políticas de seguridad con Helmet
app.set("x-powered-by", false);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ["http://localhost:5173"] }));

// Configuración del almacenamiento de sesiones en MariaDB
const sessionStore = new MariaDBStore({
  pool,
  table: "session",
  clearExpired: true,
  checkExpirationInterval: 900000,
}) as unknown as session.Store;


app.use(
  session({
    name: "ssid_dont_share",
    secret: process.env.SESSION_SECRET as string,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      secure: process.env.NODE_ENV === "production", // Secure solo en producción
      httpOnly: true,
      sameSite: "lax",
    },
  })
);


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

// Endpoint de prueba de conexión a la base de datos
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const conn = await getConnection();
    const result = await conn.query("SELECT 1 AS test");
    conn.release();
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

// Página 404 personalizada
app.get("/404.html", (req: Request, res: Response) => {
  const viewFile = path.join(__dirname, "public_views", "404.html");
  if (fs.existsSync(viewFile)) res.sendFile(viewFile);
  else res.redirect(path.join(__dirname, "public_views", "index.html"));
});

// Página de mantenimiento (si no existe la vista principal)
app.get("/*", (_req: Request, res: Response) => {
  const viewFile = path.join(__dirname, "public_views", "index.html");
  if (fs.existsSync(viewFile)) res.sendFile(viewFile);
  else {
    return res.status(403).send(`<!DOCTYPE html>
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
                  background-color: #f0f0f0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #111827;
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
                  color: #333333;
                  margin-bottom: 20px;
              }

              p {
                  font-size: 18px;
                  color: #666666;
                  margin-bottom: 20px;
              }

              .button {
                  margin-top: 45px;
                  padding: 10px 20px;
                  background-color: #007BFF;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
              }

              .button:hover {
                  background-color: #0056b3;
              }
  
              .emoji {
                font-size: 32px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1 class="emoji">🚧👷🏻‍♂️</h1>
              <h1>Estamos en mantenimiento</h1>
              <p>Vuelve pronto para seguir agendando.</p>
              <a href="https://google.com" class="button">Salir</a>
          </div>
      </body>
      </html>
      `);
  }
});

// Levantar el servidor
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Crear las tablas en la base de datos
createSchemas();
