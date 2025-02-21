import mysql, { PoolOptions, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const poolConfig: PoolOptions = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT) || 3306,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
};

const pool: Pool = mysql.createPool(poolConfig);

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (err) {
    console.error('❌ Error getting a connection from the pool:', err);
    throw err;
  }
}

export { pool, getConnection };
