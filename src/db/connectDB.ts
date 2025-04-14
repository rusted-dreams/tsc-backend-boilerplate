import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export const testDBConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("DB connection successful");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error);
  }
};

export default pool;
