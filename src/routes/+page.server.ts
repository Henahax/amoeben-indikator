// +page.server.ts
import { db } from '$lib/db/db.server';
import { users, scaleValues, entries } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    await db.insert(scaleValues).values([
        { name: "Amöbe", value: "0", icon: "fa-solid fa-bacterium" },
        { name: "Baum", value: "0.2", icon: "fa-solid fa-tree" },
        { name: "Wurm", value: "0.4", icon: "fa-solid fa-worm" },
        { name: "Frosch", value: "0.6", icon: "fa-solid fa-frog" },
        { name: "Hund", value: "0.8", icon: "fa-solid fa-dog" },
        { name: "Mensch", value: "1", icon: "fa-solid fa-person" }
    ]).onConflictDoNothing();

    await db.insert(users).values([
        { name: "waetsch", password: "password123" },
        { name: "henahax", password: "password456" }
    ]).onConflictDoNothing();

    return {
        success: true
    };
}) satisfies PageServerLoad;

