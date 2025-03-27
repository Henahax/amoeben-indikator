import type { Actions, PageServerLoad } from './$types';
import { db } from "../lib/server/db/db";
import { roles } from "../lib/server/db/schema";

export const load: PageServerLoad = async (event) => {

    let user = event.locals.user;
    const myRoles = await db.select().from(roles);

    if (!user) {
        user = null;
    }

    return {
        user: user,
        roles: myRoles
    };
};
