import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { ISubEvent } from "./models";

export async function createSubEvent(subEventData: ISubEvent): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
        INSERT INTO
            sub_events (id_global_event, name, headquarters, start_date, end_date, description) VALUES (?,?,?,?,?,?)`,
      [
        subEventData.id_global_event,
        subEventData.name,
        subEventData.headquarters,
        subEventData.start_date,
        subEventData.end_date,
        subEventData.description,
      ]
    );
    switch (result.affectedRows) {
      case 1:
        console.log(`[subevents repository]: subevents INSERTED SUCCESSFULLY.`);
        return 1;
      default:
        console.error(`[subevents repository]: ERROR CREATING subevents`);
        return -1;
    }
  } catch (err) {
    console.error(`[subevents repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function getSubEventsByGlobalEventId(
  id_global_event: number
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
    SELECT
      se.id_sub_event,
      ge.name as global_event_name,
      se.name,
      se.headquarters,
      se.start_date,
      se.end_date,
      se.description
    FROM
      sub_events se
      INNER JOIN global_events ge
      ON se.id_global_event = ge.id_global_event 
    WHERE 
      se.id_global_event = ?
  `,
      [id_global_event]
    );

    return result.length == 0 ? [] : result;
  } catch (err) {
    console.log(`[subevents repository]: ERROR GETTING subEvents ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
