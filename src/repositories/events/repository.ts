import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { IGlobalEvent } from "./models";

export async function createGlobalEvent(globalEventData: IGlobalEvent): Promise<number> {
    const connection:PoolConnection = await getConnection(pool);
    try{
        const result = await connection.query(`
            INSERT INTO
                global_events
                (id_user, name, details)
            VALUES
                (?,?,?)`, 
            [globalEventData.id_user, globalEventData.name, globalEventData.details])
        switch (result.affectedRows) {
            case 1:
                console.log(`[events repository]: Global event ${result.insertId}: INSERTED SUCCESSFULLY.`); 
                return 1;
            default:
                console.error(`[events repository]: ERROR CREATING GLOBAL EVENT`);
                return -1 
        }
    } catch (err) {
        console.error(`[events repository]: ${err}`);
        return -1;
    } finally {
        connection.release();
    }
}

export async function findAllGlobalEvents(): Promise<IGlobalEvent[]> {
    const connection:PoolConnection = await getConnection(pool);
    try {
        return await connection.query(`
            SELECT
                ge.name,
                ge.details,
                ge.id_global_event,
                us.name as host_name,
                us.last_names as host_last_names,
                us.id_user as id_host_user
            FROM 
                global_events ge
            JOIN
                users us ON us.id_user = ge.id_user
           `)
    } catch (err) {
        console.error(`[events repository]: ${err}`);
        return [];
    } finally {
        connection.release();
    }
}
