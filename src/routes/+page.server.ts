import { db } from "../lib/server/db/db";
import { scales, users, entries, roles } from "../lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {

    const myScales = await db.select().from(scales).orderBy(scales.value);
    const myEntries = await db.select().from(entries).leftJoin(scales, eq(scales.id, entries.scaleId)).leftJoin(users, eq(users.id, entries.userId)).orderBy(desc(entries.date)).limit(5);

    let id = 0;
    if (event.locals.user) {
        id = event.locals.user.id;
    }

    const myUser = await db.select().from(users).leftJoin(roles, eq(roles.id, users.roleId)).where(eq(users.id, id)).limit(1);

    return {
        scales: myScales,
        entries: myEntries,
        user: myUser[0]
    };
};
