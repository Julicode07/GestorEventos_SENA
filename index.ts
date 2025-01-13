import express, { Express, Request, Response } from "express";
import { UserRole } from "./src/repositories/users/models";
import AuthRouter from "./src/routes/auth";
import { createSchemas } from "./src/db/schema.handler";
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

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public_views")));

// Some security options.
app.set("x-powered-by", false);
app.use(helmet({ contentSecurityPolicy: false }));

// MariaDB session store configuration
const sessionStore = new MariaDBStore({
  pool, // using the pool instance from DB connection setup
  table: "session",
  clearExpired: true, // automatically clear expired sessions
  checkExpirationInterval: 900000, // how frequently expired sessions will be cleared; in milliseconds
}) as unknown as session.Store; // Casting to session.Store to satisfy TypeScript.

// Session initializing and type declarations.
app.use(
  session({
    name: "ssid_dont_share",
    secret: process.env.SESSION_SECRET as string,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
    },
  })
);

type UserSession = {
  document: number | null;
  role: string | null;
};

declare module "express-session" {
  // Augment express-session with a custom SessionData object
  interface SessionData {
    user: UserSession;
  }
}

// ROUTES.
app.use("/api/users/", UsersRouter);
app.use("/api/auth/", AuthRouter);
app.use("/api/events/", EventsRouter);
app.use("/api/spaces/", SpacesRouter);
app.use("api/inventory/", InventoryRouter);

app.get("/404.html", (req: Request, res: Response) => {
  const viewFile = path.join(__dirname, "public_views", "404.html");
  if (fs.existsSync(viewFile)) res.sendFile(viewFile);
  else res.redirect(path.join(__dirname, "public_views", "index.html"));
});
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
                <p>Vuelve pronto para seguir comprando.</p>
                <a href="https://google.com" class="button">Salir</a>
            </div>
        </body>
        </html>
        `);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

createSchemas();
