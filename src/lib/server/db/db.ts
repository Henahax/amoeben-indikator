import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { users as UserSchema, sessions as SessionSchema, scales as ScaleSchema, entries as EntrySchema } from "./schema.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const DATABASE_URL = env["DATABASE_URL"] || Deno.env.get("DATABASE_URL");

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
}

const { Pool } = pg;

export const db = drizzle({
    client: new Pool({
        connectionString: DATABASE_URL,
    }),
    schema: { UserSchema, SessionSchema, ScaleSchema, EntrySchema },
});
