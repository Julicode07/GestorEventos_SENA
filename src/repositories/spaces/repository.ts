import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { ISpace } from "./models";

export async function createSpace(space: ISpace): Promise<number> {
    const connection:PoolConnection = await getConnection(pool);
    try {
        const result = await connection.query(`
            INSERT INTO
                places (name, capacity, type, status, details)
            VALUES
                (?,?,?,?,?)`, 
            [space.name, space.capacity, space.type, space.status, space.details])
        switch (result.affectedRows) {
            case 1:
                console.log(`[user repository]: PLACE ${result.insertId}: INSERTED SUCCESSFULLY.`); 
                return 1;
            default:
                console.error(`[user repository]: ERROR CREATING PLACES`);
                return -1 
        }
    } catch (err) {
        console.error(`[user repository]: ERROR CREATING PLACE: ${err}`);
        return -1;
    } finally {
        connection.release();
    }
}
