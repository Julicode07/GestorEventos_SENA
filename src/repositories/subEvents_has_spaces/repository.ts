import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { ISubEventHasSpace } from "./models";

export async function createSubEventHasSpace(
  subEventHasSpace: ISubEventHasSpace
): Promise<ISubEventHasSpace[]> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const results = await connection.query(
      `INSERT INTO sub_events_has_spaces (id_sub_event, id_space) VALUES (?,?)`,
      [subEventHasSpace.id_sub_event, subEventHasSpace.id_space]
    );
    return results.affectedRows === 1 ? [subEventHasSpace] : [];
  } catch (err) {
    console.error(`[subevents_has_spaces repository]: ${err}`);
    return [];
  } finally {
    connection.release();
  }
}
