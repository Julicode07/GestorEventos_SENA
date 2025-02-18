import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { ISpace } from "./models";

export async function createSpace(space: ISpace): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
            INSERT INTO
                spaces (name, capacity, type, status, details)
            VALUES
                (?,?,?,?,?)`,
      [space.name, space.capacity, space.type, space.status, space.details]
    );
    switch (result.affectedRows) {
      case 1:
        console.log(
          `[user repository]: PLACE ${result.insertId}: INSERTED SUCCESSFULLY.`
        );
        return 1;
      default:
        console.error(`[user repository]: ERROR CREATING PLACES`);
        return -1;
    }
  } catch (err) {
    console.error(`[user repository]: ERROR CREATING PLACE: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function getSpaces(): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(`
            SELECT
                *
            FROM
                spaces`);
    return result.length == 0 ? [] : result;
  } catch (err) {
    console.error(`[user repository]: ERROR GETTING PLACES: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function getSpaceById(id_space: number): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
      SELECT * FROM spaces WHERE id_space = ?`,
      [id_space]
    );
    return result.length == 0 ? [] : result;
  } catch (err) {
    console.error(`[space repository]: ERROR GETTING SPACE ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function updateSpaceById(
  id_space: number,
  spaceData: ISpace
): Promise<Number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
      UPDATE
          spaces
      SET 
          name = IFNULL(?, name), 
          capacity = IFNULL(?, capacity), 
          type = IFNULL(?, type), 
          status = IFNULL(?, status), 
          details = IFNULL(?, details)
      WHERE id_space = ?`,
      [
        spaceData.name,
        spaceData.capacity,
        spaceData.type,
        spaceData.status,
        spaceData.details,
        id_space,
      ]
    );
    if (result.affectedRows > 0) return 1;
    else throw new Error(`Could not update space ${id_space}`);
  } catch (err) {
    console.error(`[space repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function getSpacesBySubEventId(
  idSubEvent: number
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
      SELECT
      *
FROM
    spaces s
    INNER JOIN sub_events_has_spaces shs
    ON s.id_space = shs.id_space
WHERE
    shs.id_sub_event = ?
      )`,
      [idSubEvent]
    );
    return result.length == 0 ? [] : result;
  } catch (err) {
    console.error(`[space repository]: ERROR GETTING PLACES: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
