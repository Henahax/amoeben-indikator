import { db } from "../lib/server/db/db";
import { scales, users, entries } from "../lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {

    const myScales = await db.select().from(scales).orderBy(scales.value);
    const myEntries = await db.select().from(entries).leftJoin(scales, eq(scales.id, entries.scaleId)).leftJoin(users, eq(users.id, entries.userId)).orderBy(desc(entries.date)).limit(5);
    const user = event.locals.user;

    return {
        scales: myScales,
        entries: myEntries,
        user: user
    };
};
