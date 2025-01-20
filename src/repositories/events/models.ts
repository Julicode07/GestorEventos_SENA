import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";

export interface IGlobalEvent {
    id_global_event: number | undefined,
    id_user: number | undefined,
    name: string,
    details: string
}

export async function createGlobalEventsSchema(): Promise<Number> {
    const connection:PoolConnection = await getConnection(pool);
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
        console.error(`[events repository - models]: ERROR CREATING global events SCHEMA: ` + err);
        return -1;
    } finally {
        connection.release();
    }
}