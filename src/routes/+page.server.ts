// +page.server.ts
import { db } from '$lib/db/db.server';
import { eq, desc } from 'drizzle-orm';
import { scale, users, entries } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    await db.insert(scale).values([
        { id: 1, name: "Amöbe", value: "0", icon: "fa-solid fa-bacterium" },
        { id: 2, name: "Baum", value: "0.2", icon: "fa-solid fa-tree" },
        { id: 3, name: "Wurm", value: "0.4", icon: "fa-solid fa-worm" },
        { id: 4, name: "Frosch", value: "0.6", icon: "fa-solid fa-frog" },
        { id: 5, name: "Hund", value: "0.8", icon: "fa-solid fa-dog" },
        { id: 6, name: "Mensch", value: "1", icon: "fa-solid fa-person" }
    ]).onConflictDoNothing();

    await db.insert(users).values([
        { id: 1, name: "Henahax", password: "password123" },
        { id: 2, name: "Waetsch", password: "password456" }
    ]).onConflictDoNothing();

    await db.insert(entries).values([
        { id: 1, user_id: 1, scale_id: 3, description: 'Kafee verschüttet', date: new Date('2024-12-09T09:55:02.235Z') },
        { id: 2, user_id: 2, scale_id: 2, description: 'Wieder Unmengen an unsinningen Nahrungsmitteln auf dem Tisch', date: new Date('2024-12-10T16:22:40Z') }
    ]).onConflictDoNothing();

    // Fetch the latest 5 entries, sorted by date descending
    const latestEntries = await db.select({
        id: entries.id,
        description: entries.description,
        date: entries.date,
        userName: users.name,
        scaleName: scale.name,
        scaleIcon: scale.icon,
        scaleValue: scale.value
    })
        .from(entries)
        .leftJoin(users, eq(users.id, entries.user_id))
        .leftJoin(scale, eq(scale.id, entries.scale_id))
        .orderBy(desc(entries.date)) // Sort by date descending
        .limit(5); // Limit to 5 entries


    const myScale = await db.select({
        id: scale.id,
        name: scale.name,
        value: scale.value,
        icon: scale.icon
    })
        .from(scale)
        .orderBy(scale.value)

    return {
        entries: latestEntries,
        scale: myScale
    };
}) satisfies PageServerLoad;
