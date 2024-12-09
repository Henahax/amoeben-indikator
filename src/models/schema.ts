// Import necessary types and functions from Drizzle ORM for PostgreSQL
import { serial, varchar, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const entries = pgTable("entries", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow(),
  name: varchar("name").notNull(),
  value: doublePrecision("value").default(0),
  description: varchar("description").notNull(),
});