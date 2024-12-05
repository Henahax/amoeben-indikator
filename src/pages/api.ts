let value = 0;

import { db, Entry, desc } from "astro:db";

const entries = await db.select().from(Entry).orderBy(desc(Entry.date)).limit(5);

value = getValue(entries);

function getValue(entries: any) {
    let temp = 0;

    entries.forEach((entry: any) => {
        temp += entry.value;
    });

    return temp / entries.length;
}

export async function GET({ }) {
    return new Response(value.toString());
}