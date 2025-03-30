import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const isBuild = process.env.NODE_ENV === 'production' && process.env.BUILD_TIME === 'true';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);

// Wrap your database initialization in a condition
export const db = isBuild ? null : drizzle(client, {
    schema
})