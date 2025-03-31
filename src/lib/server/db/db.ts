import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

// Prevent connection during build
const client = process.env.SKIP_DB === 'true' ? null : postgres(env.DATABASE_URL);
export const db = client ? drizzle(client, { schema }) : null;