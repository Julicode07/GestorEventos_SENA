import express, { Express, Request, Response } from "express";
import { createSchemas } from "./src/db/schema.handler";
import UsersRouter from "./src/routes/users";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import cors from "cors";
import fs from "fs";

dotenv.config();

const app:Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:4321"] }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public_views')));

// Some security options.
app.set('x-powered-by', false);
app.use(helmet({ contentSecurityPolicy: false }));

//app.use("/api/accounts", AccountsRouter);

app.use("/api/users/", UsersRouter);
/*
app.use("/api/categories", CategoriesRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/auth", LogInRouter);
app.use("/images/", ImagesRouter);
*/

app.get("/*", (_req: Request, res: Response) => {
    const viewFile = path.join(__dirname, 'public_views', 'index.html');
    if (fs.existsSync(viewFile)) res.sendFile(viewFile);
    else res.redirect("https://google.com");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

createSchemas();

/*
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
  phone: number;
  role: UserRole
};

declare module "express-session" { // Augment express-session with a custom SessionData object
  interface SessionData {
    user: UserSession;
  }
}
*/

/*
// MariaDB session store configuration
const sessionStore = new MariaDBStore({
  pool,                                   // using the pool instance from DB connection setup
  table: 'session',
  clearExpired: true,                     // automatically clear expired sessions
  checkExpirationInterval: 900000,        // how frequently expired sessions will be cleared; in milliseconds
}) as unknown as session.Store;           // Casting to session.Store to satisfy TypeScript.
*/

