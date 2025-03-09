import { drizzle } from 'drizzle-orm/postgres-js';
import { users as userSchema, scales as scaleSchema, entries as EntrySchema } from './schema';
import pg from "pg";

// Use pg driver.
const { Pool } = pg;

// Instantiate Drizzle client with pg driver and schema.
export const db = drizzle({
    client: new Pool({
        connectionString: Deno.env.get("DATABASE_URL"),
    }),
    schema: { userSchema, scaleSchema, EntrySchema }
});