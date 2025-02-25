import { db } from '$lib/server/db';
import { scales, users, entries, type EntriesInsert } from '$lib/server/db/schema';
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
        let comment = data.get("description")?.toString();
        let password = data.get("password")?.toString();

        let test = "supergeheim";
        let test2 = await argon2.hash(test);
        console.log(test2);

        if (userId < 1) {
            return fail(400, { userId, userInvalid: true, scaleId, description: comment });
        }

        if (scaleId < 1) {
            return fail(400, { scaleId, scaleInvalid: true, userId, description: comment });
        }

        if (!comment || comment.length < 1) {
            return fail(400, { description: comment, descriptionInvalid: true, userId, scaleId });
        }

        if (!password || password.length < 1) {
            return fail(400, { password, passwordInvalid: true, userId, scaleId, description: comment });
        }

        const user = myUsers.find(user => Number(user.id) === userId);

        try {
            if (!user || !(await argon2.verify(user.passwordHash, password))) {
                return fail(400, { password, passwordInvalid: true, userId, scaleId, description: comment });
            }
        } catch (error) {
            console.error('Password verification error:', error);
            return fail(400, { password, passwordInvalid: true, userId, scaleId, description: comment });
        }

        const entry: EntriesInsert = { userId: userId, scaleId: scaleId, timestamp: new Date().toISOString(), comment: comment };

        await db.insert(entries).values(entry);

        redirect(303, "/");
    }
}