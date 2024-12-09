let value = 0;

import { entries } from "../models/schema";
import { db } from "../db";
import { desc } from "drizzle-orm";

const cms = await db.query.entries.findMany({
	limit: 5,
  orderBy: desc(entries.date)
});

value = getValue(cms);

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