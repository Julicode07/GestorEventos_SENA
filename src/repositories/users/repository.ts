import { PoolConnection } from "mariadb";
import { getConnection, pool } from "../../db/connection";
import { IUser } from "./models";
import bcrypt from "bcrypt";

export async function createUser(user: IUser): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const salt_rounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, salt_rounds);
    const result = await connection.query(
      `
            INSERT INTO
                users (document, name, last_names, email, phone, role, password)
            VALUES
                (?,?,?,?,?,?,?)`,
      [
        user.document,
        user.name,
        user.last_names,
        user.email,
        user.phone,
        user.role,
        hashedPassword,
      ]
    );
    switch (result.affectedRows) {
      case 1:
        console.log(
          `[user repository]: PROFILE ID ${result.insertId}: INSERTED SUCCESSFULLY.`
        );
        return 1;
      default:
        console.error(`[user repository]: ERROR CREATING USER PROFILE`);
        return -1;
    }
  } catch (err) {
    console.error(`[user repository]: ERROR CREATING USER PROFILE: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function updateUser(
  id: number,
  userData: Partial<IUser>
): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `
            UPDATE
                users
            SET
                document = IFNULL (?, document),
                name = IFNULL (?, name),
                last_names = IFNULL (?, last_names),
                email = IFNULL (?, email),
                phone = IFNULL (?, phone),
                role = IFNULL (?, role),
            WHERE id_user = ?`,
      [
        userData.document,
        userData.name,
        userData.last_names,
        userData.email,
        userData.phone,
        userData.role,
        id,
      ]
    );
    if (result.affectedRows > 0) return 1;
    else throw new Error(`Could not update user ${id}`);
  } catch (err) {
    console.error(`[user repository]: ERROR UPDATING USER PROFILE: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}

export async function findAllUsers(): Promise<IUser[]> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const results = await connection.query(
      `SELECT id_user, document, name, last_names, email, phone, role FROM users`
    );
    return results.length === 0 ? [] : results;
  } catch (err) {
    console.error(`[user repository]: ${err}`);
    return [];
  } finally {
    connection.release();
  }
}

export async function findUserByDocument(document: number): Promise<IUser[]> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const results = await connection.query(
      `SELECT * FROM users WHERE document = ?`,
      [document]
    );
    return results.length === 0 ? [] : results;
  } catch (err) {
    console.error(`[user repository]: ${err}`);
    return [];
  } finally {
    connection.release();
  }
}

export async function findUserByEmail(email: string): Promise<IUser[]> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const results = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return results.length === 0 ? [] : results;
  } catch (err) {
    console.error(`[user repository]: ${err}`);
    return [];
  } finally {
    connection.release();
  }
}

export async function findUserById(id_user: number): Promise<IUser[]> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const results = await connection.query(
      `SELECT * FROM users WHERE id_user = ?`,
      [id_user]
    );
    return results.length === 0 ? [] : results[0];
  } catch (err) {
    console.error(`[user repository]: ${err}`);
    return [];
  } finally {
    connection.release();
  }
}

export async function getUserById(id_user: number): Promise<number> {
  const connection: PoolConnection = await getConnection(pool);
  try {
    const result = await connection.query(
      `SELECT * FROM users WHERE id_user = ?`,
      [id_user]
    );
    return result.length === 0 ? [] : result[0];
  } catch (err) {
    console.error(`[user repository]: ${err}`);
    return -1;
  } finally {
    connection.release();
  }
}
