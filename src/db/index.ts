// src/utils/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { entries } from "../models/schema.ts";


const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/test_db",
});

const db = drizzle(pool, {
  schema: {
    entries,
  },
});

export { db };