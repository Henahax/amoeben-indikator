import { db } from '$lib/db/db.server';
import { scale, users } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const myUsers = await db.select({
        id: users.id,
        name: users.name,
        password: users.password
    })
        .from(users)
        .orderBy(users.name)

    const myScale = await db.select({
        id: scale.id,
        name: scale.name,
        value: scale.value,
        icon: scale.icon
    })
        .from(scale)
        .orderBy(scale.value)

    return {
        users: myUsers,
        scale: myScale
    };
}) satisfies PageServerLoad;
