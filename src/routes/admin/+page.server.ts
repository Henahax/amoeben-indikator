import { db } from "$lib/server/db/db";
import { scales, users, entries, roles } from "$lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user || event.locals.user.roleId !== 1) {
        return redirect(302, '/login');
    }


    const myUsers = await db.select().from(users).leftJoin(roles, eq(roles.id, users.roleId)).orderBy(users.id);
    const myEntries = await db.select().from(entries).leftJoin(scales, eq(scales.id, entries.scaleId)).leftJoin(users, eq(users.id, entries.userId)).orderBy(desc(entries.date));

    return {
        users: myUsers,
        entries: myEntries
    };
};
