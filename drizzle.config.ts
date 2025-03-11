import { defineConfig } from 'drizzle-kit';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',

	dbCredentials: {
		url: env.DATABASE_URL
	},

	verbose: true,
	strict: true,
	dialect: "postgresql"
});