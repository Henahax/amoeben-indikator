import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';
import { scales, users, entries } from '$lib/server/db/schema';
import { count } from 'drizzle-orm';

const client = new Database(env.DATABASE_URL);
export const db = drizzle(client);

main();

async function main() {

    const myScales = [
        {
            id: 1,
            name: "Amöbe",
            value: 0,
            icon: "fa-solid fa-bacterium"
        },
        {
            id: 2,
            name: "Baum",
            value: 0.2,
            icon: "fa-solid fa-tree"
        },
        {
            id: 3,
            name: "Wurm",
            value: 0.4,
            icon: "fa-solid fa-worm"
        },
        {
            id: 4,
            name: "Frosch",
            value: 0.6,
            icon: "fa-solid fa-frog"
        },
        {
            id: 5,
            name: "Hund",
            value: 0.8,
            icon: "fa-solid fa-dog"
        },
        {
            id: 6,
            name: "Mensch",
            value: 1,
            icon: "fa-solid fa-person"
        }
    ];

    const myUsers = [{
        id: 1,
        username: "Henahax",
        passwordHash: "$argon2id$v=19$m=19456,t=2,p=1$oz7nt4RmGERDhcfJONhfXQ$o0xhN09VyoboDZ+d+BHQM+JSAy2b0zW8ADdfFnTv/aE"
    },
    {
        id: 2,
        username: "Waetsch",
        passwordHash: "$argon2id$v=19$m=19456,t=2,p=1$z+sIUY0Ywj3SMwhVIOd3KA$uI5Am3k5LPdUBa3jarYysm1NvYMox0hYObqfmNTig1g"
    }];

    const myEntries = [
        {
            id: 1,
            userId: 1,
            scaleId: 3,
            timestamp: "2024-12-09T09:55:02.235Z",
            comment: "Kaffee verschüttet"
        },
        {
            id: 2,
            userId: 2,
            scaleId: 2,
            timestamp: "2024-12-10T16:22:40Z",
            comment: "Wieder Unmengen an unsinningen Nahrungsmitteln auf dem Tisch"
        }
    ];

    const countScales = await db.select({ count: count() }).from(scales);
    const countUsers = await db.select({ count: count() }).from(users);
    const countEntries = await db.select({ count: count() }).from(entries);

    if (countScales[0].count === 0) {
        for (const myScale of myScales) {
            await db.insert(scales).values(myScale);
        }
    }

    if (countUsers[0].count === 0) {
        for (const myUser of myUsers) {
            await db.insert(users).values(myUser);
        };
    }

    if (countEntries[0].count === 0) {
        for (const myEntry of myEntries) {
            await db.insert(entries).values(myEntry);
        };
    }

}