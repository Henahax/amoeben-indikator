import { db } from '$lib/server/db';
import { scales, users, entries } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import * as argon2 from '@node-rs/argon2';

let myScales = await db.select().from(scales).orderBy(scales.value);
let myUsers = await db.select().from(users);

export const load = async () => {
    return {
        scales: myScales,
        users: myUsers
    };
};

export const actions = {
    default: async ({ request }) => {

        let data = await request.formData();

        let userId = Number(data.get("user"));
        let scaleId = Number(data.get("scale"));
        let description = data.get("description")?.toString();
        let password = data.get("password")?.toString();

        if (userId < 1) {
            return fail(400, { userId, userInvalid: true, scaleId, description });
        }

        if (scaleId < 1) {
            return fail(400, { scaleId, scaleInvalid: true, userId, description });
        }

        if (!description || description.length < 1) {
            return fail(400, { description, descriptionInvalid: true, userId, scaleId });
        }

        if (!password || password.length < 1) {
            return fail(400, { password, passwordInvalid: true, userId, scaleId, description });
        }

        const user = myUsers.find(user => Number(user.id) === userId);

        try {
            if (!user || !(await argon2.verify(user.passwordHash, password))) {
                return fail(400, { password, passwordInvalid: true, userId, scaleId, description });
            }
        } catch (error) {
            console.error('Password verification error:', error);
            return fail(400, { password, passwordInvalid: true, userId, scaleId, description });
        }

        let entry: any = { "user_id": userId, "scale_id": scaleId, "date": new Date().toISOString(), "description": description };

        await db.insert(entries).values(entry);

        redirect(303, "/");
    }
}