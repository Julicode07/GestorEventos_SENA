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
    switch (results.affectedRows) {
      case 1:
        console.log(
          `[subevents_has_spaces repository]: INSERTED SUCCESSFULLY.`
        );
        return results;
      default:
        console.error(
          `[subevents_has_spaces repository]: ERROR CREATING subevents_has_spaces`
        );
        return [];
    }
  } catch (err) {
    console.error(`[subevents_has_spaces repository]: ${err}`);
    return [];
  } finally {
    connection.release();
  }
}
