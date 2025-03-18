import { db } from "../lib/server/db/db";
import { scales, users, entries } from "../lib/server/db/schema";

export const load = async () => {
    const myScales = await db.select().from(scales).orderBy(scales.value);
    const myUsers = await db.select().from(users).orderBy(users.id);
    const myEntries = await db.select().from(entries).orderBy(entries.id);
    return {
        scales: myScales,
        users: myUsers,
        entries: myEntries
    };
};