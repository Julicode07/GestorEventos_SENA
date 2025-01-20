import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { IGlobalEvent } from "./models";

export async function createGlobalEvent(
  globalEventData: IGlobalEvent
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
            INSERT INTO
                global_events
                (id_user, name, details, status)
            VALUES
                (?,?,?,?)`,
      [
        globalEventData.id_user,
        globalEventData.name,
        globalEventData.details,
        globalEventData.status,
      ]
    );
    switch (result.affectedRows) {
      case 1:
        console.log(
          `[events repository]: Global event ${result.insertId}: INSERTED SUCCESSFULLY.`
        );
        return 1;
      default:
        console.error(`[events repository]: ERROR CREATING GLOBAL EVENT`);
        return -1;
    }
  } catch (err) {
    console.error(`[events repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function findAllGlobalEvents(): Promise<IGlobalEvent[]> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    return await connection.query(`
            SELECT
                ge.name,
                ge.details,
                ge.status, 
                ge.id_global_event,
                us.name as host_name,
                us.last_names as host_last_names,
                us.id_user as id_host_user
            FROM 
                global_events ge
            JOIN
                users us ON us.id_user = ge.id_user
           `);
  } catch (err) {
    console.error(`[events repository]: ${err}`);
    return [];
  } finally {
    connection.release();
  }
}

export async function updateGlobalEventById(
  id_event: number,
  eventData: IGlobalEvent
): Promise<Number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
        UPDATE
            global_events
        SET
            id_user = IFNULL(?, id_user),
            name = IFNULL(?, name),
            details = IFNULL(?, details),
            status = IFNULL(?, status),
        WHERE id_global_event = ?`,
      [
        eventData.id_user,
        eventData.name,
        eventData.details,
        eventData.status,
        id_event,
      ]
    );
    if (result.affectedRows > 0) return 1;
    else throw new Error(`Could not update global event ${id_event}`);
  } catch (err) {
    console.error(`[inventory repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function getGlobalEventById(id_event: number): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
      SELECT
          global_events.id_global_event,
          users.id_user,
          users.name,
          users.last_names,
          global_events.name,
          global_events.details
          FROM
              global_events
              INNER JOIN users
              ON global_events.id_user = users.id_user
              WHERE global_events.id_global_event = ?`,
      [id_event]
    );
    return result.length == 0 ? [] : result;
  } catch (err) {
    console.log(
      `[global events repository]: ERROR GETTING global events INVENTORY: ${err}`
    );
    return -1;
  } finally {
    connection.release();
  }
}
