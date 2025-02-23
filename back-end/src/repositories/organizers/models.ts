import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";

export interface IOrganizers {
  id_organizers: number | undefined;
  id_sub_event: number | undefined;
  name: string;
  rol: string;
  email: string;
  address: string;
}

export async function createOrganizersSchema(): Promise<number> {
  const connection: PoolConnection = await getConnection();
  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS organizers (
    id_organizers INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_sub_event INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    address VARCHAR(150),
    CONSTRAINT fk_organizers_has_sub_events 
        FOREIGN KEY (id_sub_event) 
        REFERENCES sub_events(id_sub_event)
)`);
    console.log(`[organizers repository - models]: CREATED organizers SCHEMA.`);
    return 1;
  } catch (err) {
    console.error(
      `[organizers repository - models]: ERROR CREATING organizers SCHEMA: ` +
      err
    );
    return -1;
  } finally {
    connection.release();
  }
}
