import { db } from '$lib/server/db';
import { scales, users } from '$lib/server/db/schema';

let myScales = await db.select().from(scales).orderBy(scales.value);
let myUsers = await db.select().from(users);

export const load = async () => {
    return {
        scales: myScales,
        users: myUsers
    };
};
