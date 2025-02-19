import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const sessions = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const scales = sqliteTable('scales', {
	id: text('id').primaryKey(),
	name: text('name').notNull().unique(),
	value: real('value').unique(),
	icon: text('icon').notNull()
});

export const entries = sqliteTable('entries', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id),
	scaleId: text('scale_id').notNull().references(() => scales.id),
	comment: text('comment').notNull()
})

export type EntriesSelect = typeof entries.$inferSelect
export type EntriesInsert = typeof entries.$inferInsert

export type ScalesSelect = typeof scales.$inferSelect;
export type ScalesInsert = typeof scales.$inferInsert;


export type SessionsSelect = typeof sessions.$inferSelect;
export type SessionsInsert = typeof sessions.$inferInsert;

export type UsersSelect = typeof users.$inferSelect;
export type UsersInsert = typeof users.$inferInsert;
