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

export async function getOrganizers(): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(`SELECT 
        org.id_organizers,
        org.name AS organizer_name,
        su.name AS sub_event_name,
        org.rol,
        org.email,
        org.address
      FROM 
        organizers org
        INNER JOIN sub_events su
        ON org.id_sub_event = su.id_sub_event`);
    console.log(result);
    return result.length == 0 ? [] : result;
  } catch (err) {
    console.error(`[organizers repository]: ERROR GETTING organizers: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function getOrganizerById(id_organizers: number): Promise<IOrganizers | null> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
      SELECT 
        org.id_organizers,
        org.id_sub_event,
        org.name,
        org.rol,
        org.email,
        org.address,
        su.name AS sub_event_name
      FROM 
        organizers org
        INNER JOIN sub_events su
        ON org.id_sub_event = su.id_sub_event
      WHERE org.id_organizers = ?
      `,
      [id_organizers]
    );

    if (result.length === 1) {
      console.log(`[organizers repository]: Organizer FOUND.`);
      return result[0];
    } else {
      console.error(`[organizers repository]: Organizer NOT FOUND.`);
      return null;
    }
  } catch (err) {
    console.error(`[organizers repository]: ERROR GETTING organizer: ${err}`);
    return null;
  } finally {
    connection.release();
  }
}

export async function getOrganizersBySubEventId(id_sub_event: number): Promise<IOrganizers | null> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
      SELECT 
        org.id_organizers,
        org.id_sub_event,
        org.name,
        org.rol,
        org.email,
        org.address,
        su.name AS sub_event_name
      FROM 
        organizers org
        INNER JOIN sub_events su
        ON org.id_sub_event = su.id_sub_event
      WHERE org.id_sub_event = ?
      `,
      [id_sub_event]
    );

    if (result.length > 0) {
      console.log(`[organizers repository]: Organizer FOUND.`);
      return result;
    } else {
      console.error(`[organizers repository]: Organizer NOT FOUND.`);
      return null;
    }
  } catch (err) {
    console.error(`[organizers repository]: ERROR GETTING organizer: ${err}`);
    return null;
  } finally {
    connection.release();
  }
}


export async function updateOrganizerById(id_organizer: number, organizersData: Partial<IOrganizers>): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    // Build the query dynamically to include only the fields being updated
    const fieldsToUpdate = [];
    const values: (string | number)[] = [];

    if (organizersData.id_sub_event !== undefined) {
      fieldsToUpdate.push("id_sub_event = ?");
      values.push(organizersData.id_sub_event);
    }
    if (organizersData.name) {
      fieldsToUpdate.push("name = ?");
      values.push(organizersData.name);
    }
    if (organizersData.rol) {
      fieldsToUpdate.push("rol = ?");
      values.push(organizersData.rol);
    }
    if (organizersData.email) {
      fieldsToUpdate.push("email = ?");
      values.push(organizersData.email);
    }
    if (organizersData.address) {
      fieldsToUpdate.push("address = ?");
      values.push(organizersData.address);
    }

    // Ensure there is something to update
    if (fieldsToUpdate.length === 0) {
      console.error("[organizers repository]: No fields to update.");
      return -1;
    }

    // Add the id_organizers to the values array
    values.push(id_organizer);
    const query = `UPDATE organizers SET ${fieldsToUpdate.join(", ")} WHERE id_organizers = ?`;
    const result = await connection.query(query, values);

    if (result.affectedRows === 1) {
      console.log(`[organizers repository]: Organizer UPDATED SUCCESSFULLY.`);
      return 1;
    } else {
      console.error(`[organizers repository]: ERROR UPDATING organizer.`);
      return -1;
    }
  } catch (err) {
    console.error(`[organizers repository]: ERROR UPDATING organizer: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
