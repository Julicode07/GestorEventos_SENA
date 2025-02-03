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
import { createSubEventHasSpaceSchema } from "../repositories/subEvents_has_spaces/models";

dotenv.config();

export default async function createSchemas(): Promise<Number> {
  const sqlConnection = await getConnection(pool);
  sqlConnection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
    (err: SqlError, rows: any) => {
      if (err) {
        console.log("ERROR IN SCHEMA HANDLER: ");
        throw err;
      }
      console.log(rows);
    }
  );

  try {
    if ((await createUsersSchema()) == -1)
      throw new Error("Couldn't create users schema.");
    else if ((await createWebSessionsSchema()) == -1)
      throw new Error("Couldn't create web sessions schema.");
    else if ((await createGlobalEventsSchema()) == -1)
      throw new Error("Couldn't create global events schema.");
    else if ((await createSpacesSchema()) == -1)
      throw new Error("Couldn't create spaces schema.");
    else if ((await createSpaceInventorySchema()) == -1)
      throw new Error("Couldn't create space inventories schema.");
    else if ((await createSubeventSchema()) == -1)
      throw new Error("Couldn't create sub events schema.");
    else if ((await createSubEventHasSpaceSchema()) == -1)
      throw new Error("Couldn't create subEvents_has_spaces schema.");
    else if ((await createOrganizersSchema()) == -1)
      throw new Error("Couldn't create organizers schema.");
    return 1;
  } catch (err) {
    console.error(`[schema handler]: ERROR CREATING SCHEMAS: ${err}`);
    return -1;
  }
}

export { createSchemas };
