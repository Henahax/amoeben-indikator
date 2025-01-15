import { integer, sqliteTable, text, numeric } from "drizzle-orm/sqlite-core";

const scales = sqliteTable("scales", {
    id: integer().primaryKey(),
    name: text(),
    value: numeric(),
    icon: text()
});

const users = sqliteTable("users", {
    id: integer().primaryKey(),
    name: text(),
    passwordHash: numeric()
});

const entries = sqliteTable("entries", {
    user_id: integer(),
    scale_id: integer(),
    description: text(),
    date: text()
});

export { scales, users, entries };
