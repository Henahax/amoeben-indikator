import { sqliteTable, text, integer, numeric } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: integer('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const scale = sqliteTable('scale', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	value: numeric('value')
});

export const entry = sqliteTable('entry', {
	id: integer('id').primaryKey(),
	userId: integer('user_id').notNull().references(() => user.id),
	scaleId: integer('scale_id').notNull().references(() => scale.id),
	comment: text('comment').notNull()
})

export type Entry = typeof entry.$inferSelect
export type Scale = typeof scale.$inferSelect;
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
