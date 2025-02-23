import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";

export type UserRole = "Repartidor" | "Administrador";
export interface IUser {
    id_user: number | undefined,
    document: number,
    name: string,
    last_names: string,
    email: string,
    phone: number,
    role: string,
    password: string,
    resetPasswordToken: string | undefined,
    resetTokenExpireAt: number | undefined
}

export async function createUsersSchema(): Promise<Number> {
    const connection: PoolConnection = await getConnection();
    try {
        await connection.query(`CREATE TABLE IF NOT EXISTS users(
            id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            document BIGINT(16) NOT NULL UNIQUE,
            name VARCHAR(64) NOT NULL,
            last_names VARCHAR(64) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone BIGINT(16) NOT NULL,
            role VARCHAR(45) NOT NULL,
            password VARCHAR(512) NOT NULL,
            resetPasswordToken VARCHAR(64),
            resetTokenExpireAt BIGINT
        )`);
        console.log(`[user repository - models]: CREATED users SCHEMA.`);
        return 1;
    } catch (err) {
        console.error(`[user repository - models]: ERROR CREATING users SCHEMA: ` + err);
        return -1;
    } finally {
        connection.release();
    }
}