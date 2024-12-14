import { pgTable, serial, text, integer, numeric, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').unique().notNull(),
	password: text('password').notNull()
});

export const scaleValues = pgTable('scaleValues', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	value: numeric('value', { precision: 3, scale: 2 }).notNull().unique(),
	icon: text('icon')
});

export const entries = pgTable('entries', {
	id: serial('id').primaryKey(),
	userId: integer('userId').references(() => users.id).notNull(),
	scaleValue: integer('userId').references(() => scaleValues.id).notNull(),
	date: timestamp('date').notNull().defaultNow()
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type SelectScaleValue = typeof entries.$inferSelect;
export type InsertScaleValue = typeof entries.$inferInsert;

export type SelectEntry = typeof entries.$inferSelect;
export type InsertEntry = typeof entries.$inferInsert;
