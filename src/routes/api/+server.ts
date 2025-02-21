import { db } from '$lib/server/db';
import { scales, entries, users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { json } from "@sveltejs/kit";
import { getScore } from '$lib/functions';

let data = {
    scales: await db.select().from(scales).orderBy(scales.value),
    entries: await db.select()
        .from(entries)
        .leftJoin(users, eq(entries.userId, users.id))
        .orderBy(desc(entries.timestamp))
        .limit(5)
}

let api = { "score": 0 };
api.score = getScore(data.entries, data.scales);

export function GET() {
    return json(api);
}

