import mariadb, { PoolConfig, Pool } from 'mariadb';
import dotenv from "dotenv";

dotenv.config();

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  acquireTimeout: 10000
};

const pool: Pool = mariadb.createPool(poolConfig);

async function getConnection(pool: Pool) {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    console.error('Error getting a connection from the pool:', err);
    throw err;
  }
}

export { pool, getConnection };
