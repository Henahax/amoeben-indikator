import type { PageServerLoad } from './$types';
import { db } from "../lib/server/db/db";
import { roles, users } from "../lib/server/db/schema";
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async (event: RequestEvent) => {

    let id = 0;

    if (event.locals.user) {
        id = event.locals.user.id;
    }

    const myUser = await db.select().from(users).leftJoin(roles, eq(roles.id, users.roleId)).where(eq(users.id, id)).limit(1);

    return {
        user: myUser[0]
    };
};
