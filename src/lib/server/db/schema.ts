import { sql } from "drizzle-orm";
import { sqliteTable, int, real, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: int('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const scales = sqliteTable('scales', {
	id: int('id').primaryKey(),
	name: text('name').notNull().unique(),
	value: real('value').unique(),
	icon: text('icon').notNull()
});

export const entries = sqliteTable('entries', {
	id: int('id').primaryKey(),
	userId: int('user_id').references(() => users.id),
	scaleId: int('scale_id').references(() => scales.id),
	timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
	comment: text('comment').notNull()
})

export type EntriesSelect = typeof entries.$inferSelect
export type EntriesInsert = typeof entries.$inferInsert

export type ScalesSelect = typeof scales.$inferSelect;
export type ScalesInsert = typeof scales.$inferInsert;

export type UsersSelect = typeof users.$inferSelect;
export type UsersInsert = typeof users.$inferInsert;
