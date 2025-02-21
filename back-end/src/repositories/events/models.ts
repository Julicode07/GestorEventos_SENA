import { PoolConnection } from "mysql2/promise";
import { getConnection, pool } from "../../db/connection";

export interface IGlobalEvent {
  id_global_event: number | undefined;
  id_user: number | undefined;
  name: string;
  details: string;
  status: string;
}

type SubEvent = {
  id_sub_event: number;
  sub_event_name: string;
  headquarters: string;
  start_date: string; // Usa el tipo adecuado si es un tipo de fecha
  end_date: string; // Usa el tipo adecuado si es un tipo de fecha
  sub_event_description: string;
  sub_event_status: string;
  insumes?: Insume[];
  organizers?: Organizer[];
  spaces?: Space[];
};

type Insume = {
  id_insumes: number;
  insume_name: string;
  insume_quantity: number;
};

type Organizer = {
  id_organizers: number;
  organizer_name: string;
  organizer_rol: string;
  organizer_email: string;
  organizer_address: string;
};

type Space = {
  id_space: number;
  space_name: string;
  space_capacity: number;
  type: string;
  space_status: string;
  space_details: string;
  inventory?: Inventory[];
};

type Inventory = {
  id_inventory: number;
  article_name: string;
  inventory_description: string;
  inventory_quantity: number;
  inventory_type: string;
};

// Tipo para el evento global completo
export type GlobalEventInfo = {
  id_global_event: number;
  global_event_name: string;
  global_event_observations: string;
  global_event_status: string;
  id_host_user: number;
  host_name: string;
  sub_events?: SubEvent[];
};

export async function createGlobalEventsSchema(): Promise<Number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS global_events(
            id_global_event INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            id_user INT NOT NULL,
            name VARCHAR(64) NOT NULL,
            details VARCHAR(255),
            status VARCHAR(45),
            CONSTRAINT fk_global_event_has_user FOREIGN KEY (id_user) REFERENCES users(id_user)
        )`);
    console.log(`[events repository - models]: CREATED global events SCHEMA.`);
    return 1;
  } catch (err) {
    console.error(
      `[events repository - models]: ERROR CREATING global events SCHEMA: ` +
      err
    );
    return -1;
  } finally {
    connection.release();
  }
}
