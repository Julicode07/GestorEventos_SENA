import { getConnection, pool } from "./connection";
import { createUsersSchema } from "../repositories/users/models";
import { createWebSessionsSchema } from "../repositories/web-sessions/models";
import { createGlobalEventsSchema } from "../repositories/events/models";
import { SqlError } from "mariadb";
import dotenv from "dotenv";
import { createSpace } from "../repositories/spaces/repository";
import { createSpacesSchema } from "../repositories/spaces/models";
import { createSpaceInventory } from "../repositories/inventory/repository";
import { createSpaceInventorySchema } from "../repositories/inventory/models";
import { createSubeventSchema } from "../repositories/subEvents/models";
import { createOrganizersSchema } from "../repositories/organizers/models";
import { createSubEventHasSpaceSchema } from "../repositories/subEvents/models";
import { createInsumesSchema } from "../repositories/subEvents/models";
import bcrypt from "bcrypt";
import readline from "readline";
import { createUser } from "../repositories/users/repository";

dotenv.config();

function prompt(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(query, (answer) => {
    rl.close();
    resolve(answer);
  }));
}

async function createDefaultUser(): Promise<void> {
  const sqlConnection = await getConnection();

  try {
    const [result] = await sqlConnection.query(`SELECT COUNT(*) as count FROM users`);
    if (result.count > 0) {
      console.log("[schema handler]: There are users, skipping default user creation");
      return;
    }

    const password = await prompt("Ingrese la contraseña de la cuenta administradora por defecto: ");
    const phone = await prompt("Ingrese el número de teléfono de la cuenta administradora:")

    const defaultUser = {
      id_user: undefined,
      document: 123456789,
      name: "Coordinador",
      last_names: "Por Defecto",
      email: "admin@sena.com",
      phone: Number(phone),
      role: "Coordinador",
      password: password,
      resetPasswordToken: undefined,
      resetTokenExpireAt: undefined
    };

    // Create the default user
    const created = await createUser(defaultUser);
    if (created === 1) {
      console.log("[schema handler]: Default admin user created successfully.");
    } else {
      console.error("[schema handler]: Failed to create default admin user.");
    }
  } catch (err) {
    console.error(`[schema handler]: ERROR CHECKING OR CREATING DEFAULT USER: ${err}`);
  } finally {
    sqlConnection.release();
  }
}

export default async function createSchemas(): Promise<Number> {
  const sqlConnection = await getConnection();

  try {
    await sqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`[schema handler]: Database checked/created.`);

    // Create tables
    if ((await createUsersSchema()) == -1) throw new Error("Couldn't create users schema.");
    if ((await createWebSessionsSchema()) == -1) throw new Error("Couldn't create web sessions schema.");
    if ((await createGlobalEventsSchema()) == -1) throw new Error("Couldn't create global events schema.");
    if ((await createSpacesSchema()) == -1) throw new Error("Couldn't create spaces schema.");
    if ((await createSpaceInventorySchema()) == -1) throw new Error("Couldn't create space inventories schema.");
    if ((await createSubeventSchema()) == -1) throw new Error("Couldn't create sub events schema.");
    if ((await createSubEventHasSpaceSchema()) == -1) throw new Error("Couldn't create subEvents_has_spaces schema.");
    if ((await createInsumesSchema()) == -1) throw new Error("Couldn't create insumes schema.");
    if ((await createOrganizersSchema()) == -1) throw new Error("Couldn't create organizers schema.");

    await createDefaultUser();

    return 1;
  } catch (err) {
    console.error(`[schema handler]: ERROR CREATING SCHEMAS: ${err}`);
    return -1;
  } finally {
    sqlConnection.release();
  }
}
