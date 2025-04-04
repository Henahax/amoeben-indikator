import { hash } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db/db';
import { users } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    if (event.locals.user) {
        return redirect(302, '/');
    }

    return {};
};

export const actions: Actions = {
    register: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (!validateUsername(username)) {
            return fail(400, { message: 'Ungültiger Benutzername' });
        }
        if (!validatePassword(password)) {
            return fail(400, { message: 'Ungültiges Passwort' });
        }

        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        try {
            const result = await db.insert(users).values({ username, passwordHash }).returning();

            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, result[0].id);
            auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
        } catch (e: any) {
            return fail(500, { message: 'Das Konto existiert bereits', error: e.message, stack: e.stack });
        }
        return redirect(302, '/');
    }
};

function validateUsername(username: unknown): username is string {
    return (
        typeof username === 'string' &&
        username.length >= 3 &&
        username.length <= 31 &&
        /^[a-zA-Z0-9_-]+$/.test(username)
    );
}

function validatePassword(password: unknown): password is string {
    return typeof password === 'string' && password.length >= 4 && password.length <= 255;
}
