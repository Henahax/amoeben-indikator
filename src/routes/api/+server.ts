import { db } from '$lib/server/db/db';
import { eq, desc } from "drizzle-orm";
import { entries, scales } from "$lib/server/db/schema";
import { calculateScore } from '$lib/score';
import { json } from '@sveltejs/kit';

export async function GET() {
    const myEntries = await db.select().from(entries).leftJoin(scales, eq(scales.id, entries.scaleId)).orderBy(desc(entries.date)).limit(5);
    const api = { score: calculateScore(myEntries.map((entry) => entry.scales?.value)) };

    return json(api);
}
