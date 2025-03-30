import { db } from '$lib/server/db/db';
import { eq, desc } from "drizzle-orm";
import { entries, scales, users } from "$lib/server/db/schema";
import { json } from '@sveltejs/kit';

const myScales = await db.select().from(scales).orderBy(scales.value);
const myEntries = await db.select().from(entries).leftJoin(scales, eq(scales.id, entries.scaleId)).leftJoin(users, eq(users.id, entries.userId)).orderBy(desc(entries.date)).limit(5);


let api = { "score": 0 };
api.score = getScore(myEntries, myScales);

function getScore(entries: any, scales: any) {

    if (entries.length === 0) {
        return 0;
    }

    let totalScore = 0;

    entries.forEach((entry: any) => {
        const scale = scales.find((scale: any) => scale.id === entry.entries.scaleId);
        if (scale) {
            totalScore += scale.value ?? 0;
        }
    });

    return Number((totalScore / entries.length).toFixed(2));
}

export function GET() {
    return json(api);
}