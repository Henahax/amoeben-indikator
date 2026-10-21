import { sqliteTable, integer, text, real, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable(
	'users',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		username: text('username').notNull(),
		passwordHash: text('password_hash').notNull(),
		roleId: integer('role_id')
			.notNull()
			.references(() => roles.id)
			.default(3)
	},
	(table) => [uniqueIndex('users_username_lower_unique').on(sql`lower(${table.username})`)]
);

export const roles = sqliteTable('roles', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	icon: text('icon').notNull()
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey().notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull()
});

export const scales = sqliteTable('scales', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	value: real('value').notNull(),
	icon: text('icon').notNull()
});

export const entries = sqliteTable('entries', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id').references(() => users.id),
	authorName: text('author_name'),
	scaleId: integer('scale_id')
		.notNull()
		.references(() => scales.id),
	comment: text('comment').notNull(),
	date: integer('date', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(unixepoch() * 1000)`)
});

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
export type Role = typeof roles.$inferSelect;
export type Scale = typeof scales.$inferSelect;
export type Entry = typeof entries.$inferSelect;

export type SessionInsert = typeof sessions.$inferInsert;
export type RoleInsert = typeof roles.$inferInsert;
export type UserInsert = typeof users.$inferInsert;
export type ScaleInsert = typeof scales.$inferInsert;
export type EntryInsert = typeof entries.$inferInsert;
