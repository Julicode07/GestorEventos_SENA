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
  spaces?: Array<any> | undefined;
  insumes?: Array<any> | undefined;
  organizers: Array<any> | undefined;
}

export interface ISubEventHasSpace {
  id_sub_event_has_space: number | undefined;
  id_sub_event: number | undefined;
  id_space: number | undefined;
}

export interface Iinsumes {
  id_insumes: number | undefined;
  id_sub_event: number | undefined;
  name: string;
  quantity: number;
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
    subeventConfirmation VARCHAR(65) NOT NULL,
    CONSTRAINT fk_sub_events_has_global_events FOREIGN KEY(id_global_event) REFERENCES global_events(id_global_event)
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

export async function createSubEventHasSpaceSchema(): Promise<Number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS sub_events_has_spaces (
      id_sub_event_has_space INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      id_sub_event INT NOT NULL,
      id_space INT NOT NULL,
      CONSTRAINT fk_sub_events_has_spaces FOREIGN KEY (id_sub_event) REFERENCES sub_events(id_sub_event),
      CONSTRAINT fk_spaces_has_sub_events FOREIGN KEY (id_space) REFERENCES spaces(id_space)
    )`);

    console.log(
      `[subevents_has_spaces repository - models]: CREATED subevents_has_spaces SCHEMA.`
    );
    return 1;
  } catch (err) {
    console.error(
      `[subevents_has_spaces repository - models]: ERROR CREATING subevents_has_spaces SCHEMA: ` +
        err
    );
    return -1;
  } finally {
    connection.release();
  }
}

export async function createInsumesSchema(): Promise<Number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS insumes (
    id_insumes INT AUTO_INCREMENT PRIMARY KEY,
    id_sub_event INT NULL,
    name VARCHAR(45) NULL,
    quantity INT NULL,
    CONSTRAINT fk_insumes_has_sub_events FOREIGN KEY (id_sub_event) REFERENCES sub_events(id_sub_event))`);
    console.log(`[insumes repository - models]: CREATED insumes SCHEMA.`);
    return 1;
  } catch (err) {
    console.log(
      `[insumes repository - models]: ERROR CREATING insumes SCHEMA: ${err}`
    );
    return -1;
  } finally {
    connection.release();
  }
}
