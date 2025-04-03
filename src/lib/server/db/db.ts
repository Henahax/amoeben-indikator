import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

let client: postgres.Sql<{}> | null = null;

async function initializeDb() {
    if (!client) {
        client = postgres(env.DATABASE_URL!, { max: 10 });
        console.log('Testing database connection...');
        await client`SELECT 1`; // Test query to ensure the connection is ready
        console.log('Database connection is ready');
    }
}

await initializeDb();

export const db = drizzle(client!, { schema });