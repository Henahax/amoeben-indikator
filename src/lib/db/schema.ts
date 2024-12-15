import { pgTable, serial, text, integer, numeric, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').unique().notNull(),
	password: text('password').notNull()
});

export const scale = pgTable('scale', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	value: numeric('value', { precision: 3, scale: 2 }).notNull().unique(),
	icon: text('icon')
});

export const entries = pgTable('entries', {
	id: serial('id').primaryKey(),
	user_id: integer('user_id').references(() => users.id).notNull(),
	scale_id: integer('scale_id').references(() => scale.id).notNull(),
	description: text('description').notNull(),
	date: timestamp('date').notNull().defaultNow()
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type SelectScale = typeof entries.$inferSelect;
export type InsertScalee = typeof entries.$inferInsert;

export type SelectEntry = typeof entries.$inferSelect;
export type InsertEntry = typeof entries.$inferInsert;
