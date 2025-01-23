import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";

export interface ISubEvent {
  id_sub_event: number | undefined;
  id_global_event: number | undefined;
  name: string;
  headquarters: string;
  start_date: string;
  end_date: string;
  description: string;
  subeventConfirmation: string;
}

export async function createSubeventSchema(): Promise<Number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS sub_events (
    id_sub_event INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_global_event INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    headquarters VARCHAR(80) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    description VARCHAR(255),
    subeventConfirmation  VARCHAR(65) NOT NULL
)`);
    console.log(`[subevents repository - models]: CREATED subevents SCHEMA.`);
    return 1;
  } catch (err) {
    console.log(
      `[subevents repository - models]: ERROR CREATING subevents SCHEMA: ` + err
    );
    return -1;
  } finally {
    connection.release();
  }
}
