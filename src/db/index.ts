import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import pRetry from "p-retry";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/test_db",
});

const db = drizzle(pool);

async function initializeDb() {
  await pRetry(
    async () => {
      await pool.query("SELECT 1"); // Simple query to check connectivity
      console.log("Database is ready.");
    },
    { retries: 5, onFailedAttempt: (err) => console.log("Retrying DB connection...") }
  );

  // Create tables or run migrations here
  await db.execute(`
    CREATE TABLE IF NOT EXISTS entries (
      id SERIAL PRIMARY KEY,
      date TIMESTAMP DEFAULT NOW(),
      name VARCHAR NOT NULL,
      value DOUBLE PRECISION DEFAULT 0,
      description VARCHAR NOT NULL
    );
  `);
}

export { db, initializeDb };