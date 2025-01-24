import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { ISubEvent } from "./models";

export async function createSubEvent(subEventData: ISubEvent): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
        INSERT INTO
            sub_events (id_global_event, name, headquarters, start_date, end_date, description, subeventConfirmation) VALUES (?,?,?,?,?,?,?)`,
      [
        subEventData.id_global_event,
        subEventData.name,
        subEventData.headquarters,
        subEventData.start_date,
        subEventData.end_date,
        subEventData.description,
        subEventData.subeventConfirmation,
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
  id_sub_event: number
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
    SELECT
      se.id_sub_event,
      ge.name as global_event_name,
      se.name,
      ge.id_global_event,
      se.headquarters,
      se.start_date,
      se.end_date,
      se.description,
      se.subeventConfirmation
    FROM
      sub_events se
      INNER JOIN global_events ge
      ON se.id_global_event = ge.id_global_event 
    WHERE 
      se.id_sub_event = ?
  `,
      [id_sub_event]
    );

    return result.length == 0 ? [] : result;
  } catch (err) {
    console.log(`[subevents repository]: ERROR GETTING subEvents ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function getSubEventsByIdGlobalEvent(
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
      ge.id_global_event,
      se.headquarters,
      se.start_date,
      se.end_date,
      se.description,
      se.subeventConfirmation,
      ge.status AS global_event_status
    FROM
      sub_events se
      INNER JOIN global_events ge
      ON se.id_global_event = ge.id_global_event 
    WHERE 
      ge.id_global_event = ?`,
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

export async function updateSubEventsById(
  id_sub_event: number,
  subEventsdata: ISubEvent
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
      UPDATE 
        sub_events
      SET
        id_global_event = IFNULL(?, id_global_event),
        name = IFNULL(?, name),
        headquarters = IFNULL(?, headquarters),
        start_date = IFNULL(?, start_date),
        end_date = IFNULL(?, end_date),
        description = IFNULL(?, description),
        subeventConfirmation = IFNULL(?, subeventConfirmation)
      WHERE id_sub_event = ?`,
      [
        subEventsdata.id_global_event,
        subEventsdata.name,
        subEventsdata.headquarters,
        subEventsdata.start_date,
        subEventsdata.end_date,
        subEventsdata.description,
        subEventsdata.subeventConfirmation,
        id_sub_event,
      ]
    );
    if (result.affectedRows > 0) return 1;
    else throw new Error(`Could not update sub_event ${id_sub_event}`);
  } catch (err) {
    console.error(`[subEvent repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
