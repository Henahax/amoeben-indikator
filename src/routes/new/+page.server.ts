import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from "$lib/server/db/db";
import { scales } from "$lib/server/db/schema";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    }

    const myScales = await db.select().from(scales).orderBy(scales.value);

    return {
        user: event.locals.user,
        scales: myScales
    };
};

export const actions: Actions = {
    logout: async (event) => {
        if (!event.locals.session) {
            return fail(401);
        }
        await auth.invalidateSession(event.locals.session.id);
        auth.deleteSessionTokenCookie(event);

        return redirect(302, '/demo/lucia/login');
    }
};
