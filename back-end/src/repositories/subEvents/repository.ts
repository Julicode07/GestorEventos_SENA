import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { ISubEvent, Iinsumes } from "./models";

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
        console.log(`[subevents repository]: subevent INSERTED SUCCESSFULLY.`);
        return result.insertId;
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
      se.subeventConfirmation,
      us.id_user as id_host_user,
      us.name as host_name
    FROM
      sub_events se
      INNER JOIN global_events ge
      ON se.id_global_event = ge.id_global_event 
      INNER JOIN users us ON ge.id_user = us.id_user
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
      ge.status AS global_event_status,
      us.id_user as id_host_user,
      us.name as host_name
    FROM
      sub_events se
      INNER JOIN global_events ge
      ON se.id_global_event = ge.id_global_event 
      INNER JOIN users us
      ON ge.id_user = us.id_user
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

export async function findAllSubEvents(): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(`SELECT
      sub.id_sub_event,
      gle.name AS globalEventName,
      sub.name AS subEventName,
      sub.headquarters,
      sub.start_date,
      sub.end_date,
      sub.description,
      sub.subeventConfirmation FROM sub_events sub
      INNER JOIN global_events gle ON sub.id_global_event = gle.id_global_event 
      `);
    return result.length == 0 ? [] : result;
  } catch (err) {
    console.error(`[subevents repository]: ERROR GETTING subevents: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function createSubEventHasSpace(
  id_sub_event: number,
  id_space: number
): Promise<Boolean> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const results = await connection.query(
      `INSERT INTO sub_events_has_spaces (id_sub_event, id_space) VALUES (?,?)`,
      [id_sub_event, id_space]
    );
    return results.affectedRows === true;
  } catch (err) {
    console.error(`[subevents_has_spaces repository]: ${err}`);
    return false;
  } finally {
    connection.release();
  }
}

export async function createInsumes(
  id_sub_event: number,
  insumesData: Iinsumes
): Promise<Boolean> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const results = await connection.query(
      `INSERT INTO insumes (id_sub_event, name, quantity) VALUES (?,?,?)`,
      [id_sub_event, insumesData.name, insumesData.quantity]
    );
    return results.affectedRows === true;
  } catch (err) {
    console.error(`[insumes repository]: ${err}`);
    return false;
  } finally {
    connection.release();
  }
}

export async function getInsumesBySubEventId(
  idSubEvent: number
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `SELECT 
      ins.id_insumes,
      ins.id_sub_event,
      ins.name AS insumes_name,
      ins.quantity AS insumes_quantity,
      sub.name AS sub_event_name,
      ge.id_user AS id_host_user
    FROM insumes ins
    INNER JOIN sub_events sub
    ON ins.id_sub_event = sub.id_sub_event
    INNER JOIN global_events ge ON sub.id_global_event = ge.id_global_event
    WHERE ins.id_sub_event = ?`,
      [idSubEvent]
    );
    return result.length == 0 ? [] : result;
  } catch (err) {
    console.error(`[insumes repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
