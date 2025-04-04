import { verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db/db';
import { users } from '$lib/server/db/schema';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username');
        const password = formData.get('password');
        if (!password || typeof password !== 'string') {
            return fail(400, { message: 'Passwort wird benötigt' });
        }

        const results = await db.select()
            .from(users)
            .where(sql`LOWER(${users.username}) = LOWER(${username})`);

        const existingUser = results.at(0);
        if (!existingUser) {
            return fail(400, { message: 'Falscher Benutzername oder Passwort' });
        }

        const validPassword = await verify(existingUser.passwordHash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        if (!validPassword) {
            return fail(400, { message: 'Falscher Benutzername oder Passwort' });
        }

        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, existingUser.id);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

        return redirect(302, '/');
    }
};
