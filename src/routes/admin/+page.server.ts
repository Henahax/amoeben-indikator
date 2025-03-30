import { db } from "$lib/server/db/db";
import { scales, users, entries, roles } from "$lib/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {

    if (!event.locals.user) {
        return redirect(302, '/login');
    }

    const myUser = await db.select().from(users).leftJoin(roles, eq(roles.id, users.roleId)).where(eq(users.id, event.locals.user.id)).limit(1);

    if (myUser[0].users.roleId !== 1) {
        return redirect(302, '/');
    }

    const myUsers = await db.select().from(users).leftJoin(roles, eq(roles.id, users.roleId)).orderBy(users.id);
    const myRoles = await db.select().from(roles).orderBy(roles.id);
    const myEntries = await db.select().from(entries).leftJoin(scales, eq(scales.id, entries.scaleId)).leftJoin(users, eq(users.id, entries.userId)).orderBy(desc(entries.date));

    return {
        user: myUser[0],
        users: myUsers,
        roles: myRoles,
        entries: myEntries
    };
};

export const actions: Actions = {
    changeUserRole: async ({ request }) => {

        const formData = await request.formData();
        const userId = Number(formData.get('userId'));
        const roleId = Number(formData.get('roleId'));

        await db.update(users)
            .set({ roleId })
            .where(eq(users.id, userId));

        return { success: true };
    },

    deleteUser: async ({ request }) => {
        console.log("test");
        const formData = await request.formData();
        const userId = Number(formData.get('userId'));

        await db.delete(entries).where(eq(entries.userId, userId));
        await db.delete(users).where(eq(users.id, userId));

        return { success: true };
    },

    deleteEntry: async ({ request }) => {
        const formData = await request.formData();
        const entryId = Number(formData.get('entryId'));

        await db.delete(entries).where(eq(entries.id, entryId));

        return { success: true };
    }
};
