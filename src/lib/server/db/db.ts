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
    // Provide a mock `db` object that doesn't connect to a real database
    const mockClient = {
        query: async () => [],
        end: async () => { },
    } as unknown as ReturnType<typeof postgres>;
    db = drizzle(mockClient, { schema });
}

export { db };
