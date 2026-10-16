import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const databasePath = env.DATABASE_URL || './data/amoeben-indikator.db';
mkdirSync(dirname(databasePath), { recursive: true });
const client = new Database(databasePath);
client.pragma('journal_mode = WAL');

export const db = drizzle(client, { schema });
