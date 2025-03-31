import { defineConfig } from 'drizzle-kit';
import { building } from '$app/environment';

if (!process.env.DATABASE_URL && !building) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	out: "./drizzle",
	schema: "./src/lib/server/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL || 'postgresql://dummy'
	},
	verbose: true,
	strict: true
});
