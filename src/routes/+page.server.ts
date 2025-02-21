import { db } from '$lib/server/db';
import { scales, entries, users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getScore } from '$lib/functions';

let myScales = await db.select().from(scales).orderBy(scales.value);
let myEntries = await db.select()
    .from(entries)
    .leftJoin(users, eq(entries.userId, users.id))
    .orderBy(desc(entries.timestamp))
    .limit(5);

export const load = async () => {
    return {
        scales: myScales,
        entries: myEntries,
        score: getScore(myEntries, myScales)
    };
};
