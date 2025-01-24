import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { IOrganizers } from "./models";

export async function createOrganizers(
  organizersData: IOrganizers
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
       INSERT INTO organizers (id_sub_event, name, rol, email, address) VALUES (?,?,?,?,?)`,
      [
        organizersData.id_sub_event,
        organizersData.name,
        organizersData.rol,
        organizersData.email,
        organizersData.address,
      ]
    );
    switch (result.affectedRows) {
      case 1:
        console.log(
          `[organizers repository]: organizers INSERTED SUCCESSFULLY.`
        );
        return 1;
      default:
        console.error(`[organizers repository]: ERROR CREATING organizers`);
        return -1;
    }
  } catch (err) {
    console.error(`[organizers repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function getOrganizers(): Promise<any[] | number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const [rows] = await connection.query(`
      SELECT 
        org.id_organizers,
        org.name AS organizer_name, 
        su.name AS sub_event_name,
        org.rol,
        org.email,
        org.address
      FROM organizers org
      INNER JOIN sub_events su
      ON org.id_sub_event = su.id_sub_event
    `);
    console.log("Organizers fetched:", rows);
    return rows.length === 0 ? [] : rows;
  } catch (err) {
    console.error(`[organizers repository]: ERROR GETTING organizers: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
