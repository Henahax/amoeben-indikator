// src/utils/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { entries } from "../models/schema.ts";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, {
  schema: {
    entries,
  },
});
 
const result = await db.execute('select 1');