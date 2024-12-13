// src/lib/db/schema.ts

import { pgTable,serial,text } from "drizzle-orm/pg-core";

export const myTable = pgTable("myTableName",{
    id:serial("id").primaryKey(),
    name:text("name").notNull(),
})

/*
// src/lib/db/schema.ts
import { pgTable, serial, text, integer, numeric } from 'drizzle-orm/pg-core';

export const scaleValues = pgTable('scaleValues', {
	id: serial('id').primaryKey(),
	value: numeric('value', { precision: 3, scale: 2 }),
	icon: text('icon')
});

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	age: integer('age')
});

export const entries = pgTable('entries', {
	id: serial('id').primaryKey(),
	userId: integer('userId').references(() => users.id),
	scaleValue: integer('userId').references(() => scaleValues.id)
});
*/