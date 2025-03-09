import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { users as UserSchema, sessions as SessionSchema, scales as ScaleSchema, entries as EntrySchema } from "./schema.ts";

const { Pool } = pg;

export const db = drizzle({
    client: new Pool({
        connectionString: Deno.env.get("DATABASE_URL"),
    }),
    schema: { UserSchema, SessionSchema, ScaleSchema, EntrySchema },
});