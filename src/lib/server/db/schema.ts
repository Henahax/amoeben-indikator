import { pgTable, serial, text, integer, timestamp, real } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const sessions = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const scales = pgTable('scales', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	value: real('value').notNull(),
	icon: text('icon').notNull()
});

export const entries = pgTable('entries', {
	id: serial('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	scaleId: integer('scale_id').notNull().references(() => scales.id),
	description: text('description').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
export type Scale = typeof scales.$inferSelect;
export type Entry = typeof entries.$inferSelect;

export type SessionInsert = typeof sessions.$inferInsert;
export type UserInsert = typeof users.$inferInsert;
export type ScaleInsert = typeof scales.$inferInsert;
export type EntryInsert = typeof entries.$inferInsert;

