import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { IGlobalEvent, GlobalEventInfo } from "./models";

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
    status = IFNULL(?, status)
WHERE id_global_event = ?
`,
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
          global_events.name AS event_name,
          global_events.details,
          global_events.status AS global_event_status
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

export async function getAllInfoGLobalEventsById(
  idGlobalEvent: number
): Promise<GlobalEventInfo | null> {
  // Aquí definimos el tipo de retorno
  const connection: PoolConnection = await getConnection(pool);

  try {
    const result = await connection.query(
      `SELECT 
        ge.id_global_event,
        ge.name AS global_event_name,
        ge.details AS global_event_observations,
        ge.status AS global_event_status,
        
        se.id_sub_event,
        se.name AS sub_event_name,
        se.headquarters,
        se.start_date,
        se.end_date,
        se.description AS sub_event_description,
        se.subeventConfirmation AS sub_event_status,
        
        ins.id_insumes,
        ins.name AS insume_name,
        ins.quantity AS insume_quantity,
        
        org.id_organizers,
        org.name AS organizer_name,
        org.rol AS organizer_rol,
        org.email AS organizer_email,
        org.address AS organizer_address,
        
        sp.id_space,
        sp.name AS space_name,
        sp.capacity AS space_capacity,
        sp.type,
        sp.status AS space_status,
        sp.details AS space_details,
        
        si.id_inventory,
        si.article_name,
        si.description AS inventory_description,
        si.quantity AS inventory_quantity,
        si.type AS inventory_type
      FROM global_events ge
      LEFT JOIN sub_events se ON ge.id_global_event = se.id_global_event
      LEFT JOIN insumes ins ON se.id_sub_event = ins.id_sub_event
      LEFT JOIN organizers org ON se.id_sub_event = org.id_sub_event
      LEFT JOIN sub_events_has_spaces ses ON se.id_sub_event = ses.id_sub_event
      LEFT JOIN spaces sp ON ses.id_space = sp.id_space
      LEFT JOIN space_inventory si ON sp.id_space = si.id_space
      WHERE ge.id_global_event = ?`,
      [idGlobalEvent]
    );

    if (result.length === 0) return null;

    const globalEvent: GlobalEventInfo = {
      id_global_event: result[0].id_global_event,
      global_event_name: result[0].global_event_name,
      global_event_observations: result[0].global_event_observations,
      global_event_status: result[0].global_event_status,
      sub_events: [],
    };

    // Agrupar la información
    result.forEach((row: any) => {
      // Agrupar sub_eventos
      let subEvent = globalEvent.sub_events?.find(
        (se) => se.id_sub_event === row.id_sub_event
      );

      if (!subEvent) {
        subEvent = {
          id_sub_event: row.id_sub_event,
          sub_event_name: row.sub_event_name,
          headquarters: row.headquarters,
          start_date: row.start_date,
          end_date: row.end_date,
          sub_event_description: row.sub_event_description,
          sub_event_status: row.sub_event_status,
          insumes: [],
          organizers: [],
          spaces: [],
        };
        globalEvent.sub_events?.push(subEvent);
      }
      // Agrupar insumos
      if (
        row.id_insumes &&
        !subEvent.insumes?.some(
          (insume) => insume.id_insumes === row.id_insumes
        )
      ) {
        subEvent.insumes?.push({
          id_insumes: row.id_insumes,
          insume_name: row.insume_name,
          insume_quantity: row.insume_quantity,
        });
      }

      // Agrupar organizadores
      if (
        row.id_organizers &&
        !subEvent.organizers?.some(
          (organizer) => organizer.id_organizers === row.id_organizers
        )
      ) {
        subEvent.organizers?.push({
          id_organizers: row.id_organizers,
          organizer_name: row.organizer_name,
          organizer_rol: row.organizer_rol,
          organizer_email: row.organizer_email,
          organizer_address: row.organizer_address,
        });
      }

      // Agrupar espacios
      let space = subEvent?.spaces?.find(
        (space) => space.id_space === row.id_space
      );

      if (!space && row.id_space) {
        space = {
          id_space: row.id_space,
          space_name: row.space_name,
          space_capacity: row.space_capacity,
          type: row.type,
          space_status: row.space_status,
          space_details: row.space_details,
          inventory: [],
        };
        if (!subEvent.spaces) subEvent.spaces = [];
        subEvent.spaces?.push(space);
      }
      // Agrupar inventario
      if (
        row.id_inventory &&
        space &&
        (!space.inventory ||
          !space.inventory.some((inv) => inv.id_inventory === row.id_inventory))
      ) {
        if (!space.inventory) space.inventory = [];
        space.inventory.push({
          id_inventory: row.id_inventory,
          article_name: row.article_name,
          inventory_description: row.inventory_description,
          inventory_quantity: row.inventory_quantity,
          inventory_type: row.inventory_type,
        });
      }
    });

    return globalEvent;
  } catch (err) {
    console.error(`[global events repository]: ${err}`);
    return null;
  } finally {
    connection.release();
  }
}

export async function getAllGlobalEventsByUserId(
  id_user: number
): Promise<GlobalEventInfo | null> {
  // Aquí definimos el tipo de retorno
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `SELECT 
    ge.id_global_event,
    ge.name AS global_event_name,
    ge.details AS global_event_observations,
    ge.status AS global_event_status,
    ge.id_user, 

    se.id_sub_event,
    se.name AS sub_event_name,
    se.headquarters,
    se.start_date,
    se.end_date,
    se.description AS sub_event_description,
    se.subeventConfirmation AS sub_event_status,

    ins.id_insumes,
    ins.name AS insume_name,
    ins.quantity AS insume_quantity,

    org.id_organizers,
    org.name AS organizer_name,
    org.rol AS organizer_rol,
    org.email AS organizer_email,
    org.address AS organizer_address,

    sp.id_space,
    sp.name AS space_name,
    sp.capacity AS space_capacity,
    sp.type,
    sp.status AS space_status,
    sp.details AS space_details,

    si.id_inventory,
    si.article_name,
    si.description AS inventory_description,
    si.quantity AS inventory_quantity,
    si.type AS inventory_type
    FROM global_events ge
    LEFT JOIN sub_events se ON ge.id_global_event = se.id_global_event
    LEFT JOIN users u ON ge.id_user = u.id_user 
    LEFT JOIN insumes ins ON se.id_sub_event = ins.id_sub_event
    LEFT JOIN organizers org ON se.id_sub_event = org.id_sub_event
    LEFT JOIN sub_events_has_spaces ses ON se.id_sub_event = ses.id_sub_event
    LEFT JOIN spaces sp ON ses.id_space = sp.id_space
    LEFT JOIN space_inventory si ON sp.id_space = si.id_space
    WHERE u.id_user = ?;  
`,
      [id_user]
    );

    if (result.length === 0) return null;

    const globalEvent: GlobalEventInfo = {
      id_global_event: result[0].id_global_event,
      global_event_name: result[0].global_event_name,
      global_event_observations: result[0].global_event_observations,
      global_event_status: result[0].global_event_status,
      sub_events: [],
    };

    // Agrupar la información
    result.forEach((row: any) => {
      // Agrupar sub_eventos
      let subEvent = globalEvent.sub_events?.find(
        (se) => se.id_sub_event === row.id_sub_event
      );

      if (!subEvent) {
        subEvent = {
          id_sub_event: row.id_sub_event,
          sub_event_name: row.sub_event_name,
          headquarters: row.headquarters,
          start_date: row.start_date,
          end_date: row.end_date,
          sub_event_description: row.sub_event_description,
          sub_event_status: row.sub_event_status,
          insumes: [],
          organizers: [],
          spaces: [],
        };
        globalEvent.sub_events?.push(subEvent);
      }
      // Agrupar insumos
      if (
        row.id_insumes &&
        !subEvent.insumes?.some(
          (insume) => insume.id_insumes === row.id_insumes
        )
      ) {
        subEvent.insumes?.push({
          id_insumes: row.id_insumes,
          insume_name: row.insume_name,
          insume_quantity: row.insume_quantity,
        });
      }

      // Agrupar organizadores
      if (
        row.id_organizers &&
        !subEvent.organizers?.some(
          (organizer) => organizer.id_organizers === row.id_organizers
        )
      ) {
        subEvent.organizers?.push({
          id_organizers: row.id_organizers,
          organizer_name: row.organizer_name,
          organizer_rol: row.organizer_rol,
          organizer_email: row.organizer_email,
          organizer_address: row.organizer_address,
        });
      }

      // Agrupar espacios
      let space = subEvent?.spaces?.find(
        (space) => space.id_space === row.id_space
      );

      if (!space && row.id_space) {
        space = {
          id_space: row.id_space,
          space_name: row.space_name,
          space_capacity: row.space_capacity,
          type: row.type,
          space_status: row.space_status,
          space_details: row.space_details,
          inventory: [],
        };
        if (!subEvent.spaces) subEvent.spaces = [];
        subEvent.spaces?.push(space);
      }
      // Agrupar inventario
      if (
        row.id_inventory &&
        space &&
        (!space.inventory ||
          !space.inventory.some((inv) => inv.id_inventory === row.id_inventory))
      ) {
        if (!space.inventory) space.inventory = [];
        space.inventory.push({
          id_inventory: row.id_inventory,
          article_name: row.article_name,
          inventory_description: row.inventory_description,
          inventory_quantity: row.inventory_quantity,
          inventory_type: row.inventory_type,
        });
      }
    });

    return globalEvent;
  } catch (err) {
    console.error(`[global events repository]: ${err}`);
    return null;
  } finally {
    connection.release();
  }
}

export async function updateStateGlobalEventById(
  idEvent: number,
  statusData: { status: string }
): Promise<Number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
        UPDATE
            global_events
        SET
            status = IFNULL(?, status)
        WHERE id_global_event = ?`,
      [statusData.status, idEvent]
    );
    if (result.affectedRows > 0) return 1;
    else throw new Error(`Could not update global event ${idEvent}`);
  } catch (err) {
    console.error(`[global events repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
