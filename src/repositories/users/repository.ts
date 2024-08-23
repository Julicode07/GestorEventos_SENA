import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { IUser } from "./models";

export async function createUser(user: IUser): Promise<number> {
    const connection:PoolConnection = await getConnection(pool);
    try{
        const result = await connection.query(`
            INSERT INTO
                users (document, name, last_names, email, phone, role, password)
            VALUES
                (?,?,?,?,?,?,?)`, 
            [user.document, user.name, user.last_names, user.email, user.phone, user.role, user.password])
        switch (result.affectedRows) {
            case 1:
                console.log(`[user repository]: PROFILE ID ${result.insertId}: INSERTED SUCCESSFULLY.`); 
                return 1;
            default:
                console.error(`[user repository]: ERROR CREATING USER PROFILE`);
                return -1 
        }
    } catch (err) {
        console.error(`[user repository]: ERROR CREATING USER PROFILE: ${err}`);
        return -1;
    } finally {
        connection.release();
    }
}

export async function findUserByDocument(document: number): Promise<IUser[]> {
    const connection:PoolConnection = await getConnection(pool);
    try {
        const results = await connection.query(`SELECT * FROM users WHERE document = ?`, [document]);
        return (results.length === 0) ? [] : results;
    } catch (err) {
        console.error(`[user repository]: ${err}`);
        return [];
    } finally {
        connection.release();
    }
}

export async function findUserByEmail(email: string): Promise<IUser[]> {
    const connection:PoolConnection = await getConnection(pool);
    try {
        const results = await connection.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return (results.length === 0) ? [] : results;
    } catch (err) {
        console.error(`[user repository]: ${err}`);
        return [];
    } finally {
        connection.release();
    }
}