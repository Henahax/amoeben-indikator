import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

let db: ReturnType<typeof drizzle>;

if (!building && !process.env.SKIP_DB) {
    if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
    const client = postgres(env.DATABASE_URL);
    db = drizzle(client, { schema });
} else {
    // Provide a mock or fallback `db` object to avoid null references
    db = drizzle(postgres('postgresql://dummy'), { schema });
}

export { db };
