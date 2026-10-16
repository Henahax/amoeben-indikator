/// <reference types="node" />

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: process.env.DATABASE_URL || './data/amoeben-indikator.db'
	},

	verbose: true,
	strict: true
});
