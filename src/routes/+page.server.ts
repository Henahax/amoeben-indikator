import { db } from "../lib/server/db/db.ts";
import { scales } from "../lib/server/db/schema.ts";

export const load = async () => {
    const myScales = await db.select().from(scales).orderBy(scales.value);

    return {
        scales: myScales,
    };
};