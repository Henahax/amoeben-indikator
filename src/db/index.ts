import { drizzle } from "drizzle-orm/node-postgres";
import { entries } from "../models/schema.ts";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/test_db",
});

const db = drizzle(pool, {
  schema: {
    entries,
  },
});

// Function to synchronize the schema
async function initializeDb() {
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
