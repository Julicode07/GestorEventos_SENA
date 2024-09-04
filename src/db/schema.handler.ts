import { getConnection, pool } from "./connection";
import { createUsersSchema } from "../repositories/users/models";
import { createWebSessionsSchema } from "../repositories/web-sessions/models";
import { createGlobalEventsSchema } from "../repositories/events/models";
import { SqlError } from "mariadb";
import dotenv from 'dotenv';

dotenv.config();

export default async function createSchemas(): Promise<Number> {

      const sqlConnection = await getConnection(pool);
      sqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err: SqlError, rows: any) => {
         if (err) { console.log("ERROR IN SCHEMA HANDLER: "); throw err; }
         console.log(rows);
      });

      try {
            if(await createUsersSchema() == -1) throw new Error("Couldn't create users schema.")
            else if(await createWebSessionsSchema() == -1) throw new Error("Couldn't create web sessions schema.")  
            else if(await createGlobalEventsSchema() == -1) throw new Error("Couldn't create global events schema.")
            return 1;
      } catch (err) {
            console.error(`[schema handler]: ERROR CREATING SCHEMAS: ${err}`);
            return -1;
      }

}

export { createSchemas };