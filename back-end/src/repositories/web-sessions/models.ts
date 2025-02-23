import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";

export async function createWebSessionsSchema(): Promise<number> {
    const connection: PoolConnection = await getConnection();
    try {
        await connection.query(`CREATE TABLE IF NOT EXISTS session(
            sid varchar(255) NOT NULL,
            session text NOT NULL,
            lastSeen timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (sid),
            KEY expire (lastSeen)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
        console.log(`[user repository - models]: CREATED web sessions SCHEMA.`);
        return 1;
    } catch (err) {
        console.error(`[web sessions - model]: COULD NOT CREATE WEB SESSIONS STORE TABLE: ${err}`);
        return -1;
    } finally {
        connection.release();
    }
}