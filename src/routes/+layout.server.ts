import type { Actions, PageServerLoad } from './$types';
import { db } from "../lib/server/db/db";
import { roles, users } from "../lib/server/db/schema";
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {

    let user = event.locals.user;

    const myUser = await db.select().from(users).leftJoin(roles, eq(roles.id, users.roleId)).where(eq(users.id, user.id)).limit(1);

    return {
        user: myUser[0]
    };
};

export const actions: Actions = {
    logout: async (event) => {
        if (!event.locals.session) {
            return fail(401);
        }
        await auth.invalidateSession(event.locals.session.id);
        auth.deleteSessionTokenCookie(event);

        return redirect(302, '/');
    }
};