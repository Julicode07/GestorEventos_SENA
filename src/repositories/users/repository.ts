import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { IUser } from "./models";
import bcrypt from "bcrypt";

export async function createUser(user: IUser): Promise<number> {
    const connection:PoolConnection = await getConnection(pool);
    try {
        const salt_rounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, salt_rounds);
        const result = await connection.query(`
            INSERT INTO
                users (document, name, last_names, email, phone, role, password)
            VALUES
                (?,?,?,?,?,?,?)`, 
            [user.document, user.name, user.last_names, user.email, user.phone, user.role, hashedPassword])
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

export async function updateUser(id: number, userData: Partial<IUser>): Promise<number> {
    const connection: PoolConnection = await getConnection(pool);
    try {
        // Build the query dynamically to include only the fields being updated
        const fieldsToUpdate: string[] = [];
        const values: (string | number)[] = [];

        if (userData.document !== undefined) {
            fieldsToUpdate.push("document = ?");
            values.push(userData.document);
        }
        if (userData.name !== undefined) {
            fieldsToUpdate.push("name = ?");
            values.push(userData.name);
        }
        if (userData.last_names !== undefined) {
            fieldsToUpdate.push("last_names = ?");
            values.push(userData.last_names);
        }
        if (userData.email !== undefined) {
            fieldsToUpdate.push("email = ?");
            values.push(userData.email);
        }
        if (userData.phone !== undefined) {
            fieldsToUpdate.push("phone = ?");
            values.push(userData.phone);
        }
        if (userData.role !== undefined) {
            fieldsToUpdate.push("role = ?");
            values.push(userData.role);
        }
        if (userData.password !== undefined) {
            const salt_rounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, salt_rounds);
            fieldsToUpdate.push("password = ?");
            values.push(hashedPassword);
        }

        // Ensure there is something to update
        if (fieldsToUpdate.length === 0) {
            console.error("[user repository]: No fields to update.");
            return -1;
        }

        // Add the user ID to the values array
        values.push(id);

        // Construct the query
        const query = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
        const result = await connection.query(query, values);

        // Handle the result
        if (result.affectedRows === 1) {
            console.log(`[user repository]: USER ID ${id}: UPDATED SUCCESSFULLY.`);
            return 1;
        } else {
            console.error(`[user repository]: ERROR UPDATING USER PROFILE.`);
            return -1;
        }
    } catch (err) {
        console.error(`[user repository]: ERROR UPDATING USER PROFILE: ${err}`);
        return -1;
    } finally {
        connection.release();
    }
}

export async function findAllUsers(): Promise<IUser[]> {
    const connection:PoolConnection = await getConnection(pool);
    try {
        const results = await connection.query(`SELECT id_user, document, name, last_names, email, phone, role FROM users`);
        return (results.length === 0) ? [] : results;
    } catch (err) {
        console.error(`[user repository]: ${err}`);
        return [];
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

export async function findUserById(id_user: number): Promise<IUser[]> {
    const connection:PoolConnection = await getConnection(pool);
    try {
        const results = await connection.query(`SELECT * FROM users WHERE id_user = ?`, [id_user]);
        return (results.length === 0) ? [] : results[0];
    } catch (err) {
        console.error(`[user repository]: ${err}`);
        return [];
    } finally {
        connection.release();
    }
}