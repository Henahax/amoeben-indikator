import { hash } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
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

        const [existingUser] = await db
            .select({ id: users.id })
            .from(users)
            .where(sql`LOWER(${users.username}) = LOWER(${username})`)
            .limit(1);
        if (existingUser) {
            return fail(400, { message: 'Dieser Benutzername ist bereits vergeben' });
        }

        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        let userId: number;
        try {
            const [result] = await db
                .insert(users)
                .values({
                    username,
                    passwordHash,
                    roleId: sql<number>`CASE WHEN NOT EXISTS (SELECT 1 FROM ${users}) THEN 1 ELSE 3 END`
                })
                .returning();
            userId = result.id;
        } catch (error: unknown) {
            console.error('Account registration failed:', error);
            if (isUniqueConstraintError(error)) {
                return fail(400, { message: 'Dieser Benutzername ist bereits vergeben' });
            }
            return fail(500, { message: 'Die Registrierung ist fehlgeschlagen. Bitte versuche es später erneut.' });
        }

        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, userId);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

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

function isUniqueConstraintError(error: unknown): boolean {
	return (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		error.code === 'SQLITE_CONSTRAINT_UNIQUE'
	);
}

function validatePassword(password: unknown): password is string {
    return typeof password === 'string' && password.length >= 4 && password.length <= 255;
}
