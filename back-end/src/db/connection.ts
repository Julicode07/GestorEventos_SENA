import mariadb, { PoolConfig, Pool } from 'mariadb';
import dotenv from "dotenv";

dotenv.config();

const poolConfig: PoolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  connectionLimit: 50,
  ssl: { rejectUnauthorized: true }
};

const pool: Pool = mariadb.createPool(poolConfig);

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    console.error('❌ Error obteniendo conexión de la base de datos:', err);
    throw err;
  }
}

export { pool, getConnection };
