import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

const scales = sqliteTable("scales", {
    id: integer().primaryKey(),
    name: text(),
    value: real(), // Changed from numeric to real
    icon: text()
});

const users = sqliteTable("users", {
    id: integer().primaryKey(),
    name: text(),
    password: text()
});

const entries = sqliteTable("entries", {
    user_id: integer().references(() => users.id),
    scale_id: integer().references(() => scales.id),
    description: text(),
    date: text()
});

export { scales, users, entries };
