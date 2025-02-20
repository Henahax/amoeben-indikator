import { db } from '$lib/server/db';
import { scales, entries, users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load = async () => {
    return {
        scales: await db.select().from(scales).orderBy(scales.value),
        entries: await db.select()
            .from(entries)
            .leftJoin(users, eq(entries.userId, users.id))
            .orderBy(desc(entries.timestamp))
            .limit(5)
    };
};
