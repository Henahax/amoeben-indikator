import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from "$lib/server/db/db";
import { scales, users, roles, entries } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";


export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    }

    const myUser = await db.select().from(users).leftJoin(roles, eq(roles.id, users.roleId)).where(eq(users.id, event.locals.user.id)).limit(1);

    if (myUser[0].users.roleId === 3) {
        return redirect(302, '/');
    }

    const myScales = await db.select().from(scales).orderBy(scales.value);

    return {
        user: event.locals.user,
        scales: myScales
    };
};

export const actions: Actions = {
    new: async (event) => {

        const formData = await event.request.formData();
        const scaleId = formData.get('value');
        const comment = formData.get('comment');

        if (!event.locals.user) {
            return fail(500, { message: 'Ein Fehler ist aufgetreten 1' });
        }

        const myUser = await db.select().from(users).leftJoin(roles, eq(roles.id, users.roleId)).where(eq(users.id, event.locals.user.id)).limit(1);

        if (myUser[0].users.roleId === 3 || Number(scaleId) === 0) {
            return fail(500, { message: 'Ein Fehler ist aufgetreten 2' });
        }

        if (!comment || comment.toString().length < 1) {
            return fail(500, { message: 'Kommentar benötigt 3' });
        }

        let response;

        try {
            response = await db.insert(entries).values({
                userId: myUser[0].users.id,
                scaleId: Number(scaleId),
                comment: comment.toString()
            });
        } catch (e) {
            console.log(response);
            return fail(500, { message: 'Ein Fehler ist aufgetreten 4' });
        }
        return redirect(302, '/');
    }
};
