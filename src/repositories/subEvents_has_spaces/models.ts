import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";

export interface ISubEventHasSpace {
  id_sub_event_has_space: number | undefined;
  id_sub_event: number | undefined;
  id_space: number | undefined;
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
