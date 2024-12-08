// src/models/schema.ts
import { sql } from "drizzle-orm";
import { text, sqliteTable, integer, real, SQLiteTimestamp } from 'drizzle-orm/sqlite-core';

export const entries = sqliteTable('entr', {
  id: integer('id').primaryKey(),
  date: text().default(sql`(CURRENT_TIMESTAMP)`),
  value: real('value').default(0),
  name: text('name').notNull(),
  description: text('description').notNull()
});