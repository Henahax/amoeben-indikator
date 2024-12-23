import { db } from '$lib/db/db.server';
import { scale, users, entries } from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { InsertEntry } from '$lib/db/schema';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

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

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const userId = data.get('user_id');
        const scaleId = data.get('scale_id');
        const description = data.get('description');
        const password = data.get('password');

        if (!description) {
            return fail(400, { description, incorrect: true });
        }

        const user = await db.select({
            id: users.id,
            name: users.name,
            password: users.password,
        })
            .from(users)
            .where(eq(users.id, Number(userId)));

        let test = user[0];

        if (!test || !bcrypt.compareSync(password, test.password)) {
            return fail(400, { userId, incorrect: true });
        }

        const insertEntry: InsertEntry = {
            user_id: userId,
            scale_id: scaleId,
            description: description
        };

        try {
            await db.insert(entries).values(insertEntry);
            return { success: true };
        } catch (error) {
            if (error) {
                return fail(400, { error: 'Bad Request' });
            }
        }
        return fail(500, { error: 'Internal Server Error' });
    },
} satisfies Actions;
