import { pgTable, serial, text, real, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey().notNull(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const sessions = pgTable('sessions', {
	id: serial('id').primaryKey().notNull(),
	userId: serial('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const scales = pgTable('scales', {
	id: serial('id').primaryKey().notNull(),
	name: text('name').notNull().unique(),
	value: real('value').notNull(),
	icon: text('icon').notNull()
});

export const entries = pgTable('entries', {
	id: serial('id').primaryKey().notNull(),
	userId: serial('user_id')
		.notNull()
		.references(() => users.id),
	scaleId: serial('scale_id')
		.notNull()
		.references(() => scales.id),
	comment: text('comment').notNull()
});

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
export type Scale = typeof scales.$inferSelect;
export type Entry = typeof entries.$inferSelect;

export type SessionInsert = typeof sessions.$inferInsert;
export type UserInsert = typeof users.$inferInsert;
export type ScaleInsert = typeof scales.$inferInsert;
export type EntryInsert = typeof entries.$inferInsert;
