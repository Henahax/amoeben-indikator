import { db } from "../lib/server/db/db";
import { scales } from "../lib/server/db/schema";

export const load = async () => {
    const myScales = await db.select().from(scales).orderBy(scales.value);

    return {
        scales: myScales,
    };
};