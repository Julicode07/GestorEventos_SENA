import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";

export interface ISpace {
    id_space: number | undefined,
    name: string,
    capacity: number,
    type: string,
    status: string,
    details: string
}

export async function createSpacesSchema(): Promise<Number> {
    const connection:PoolConnection = await getConnection(pool);
    try {
        await connection.query(`CREATE TABLE IF NOT EXISTS spaces(
            id_space INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(45) NOT NULL,
            capacity INT,
            type VARCHAR(45),
            status VARCHAR(64) NOT NULL,
            details VARCHAR(255)
        )`);
        console.log(`[events repository - models]: CREATED spaces SCHEMA.`);
        return 1;
    } catch (err) {
        console.error(`[events repository - models]: ERROR CREATING spaces SCHEMA: ` + err);
        return -1;
    } finally {
        connection.release();
    }
}