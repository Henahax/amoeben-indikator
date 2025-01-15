import { type Database } from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { scales, users, entries } from './schema';
import type {scale, user, entry} from '$lib/types'

const initUsers:user[] = [
    {
        id: 1,
        name: "Henahax",
        password: "$2a$12$5.cuuld5m3frtT1NnrDQnuccg2r2z/P/Ias2LaiaAG1zONXPxpphC"
    },
    {
        id: 2,
        name: "Waetsch",
        password: "$2a$12$1lq0aFtYXbgOr4yR0W47GOuAnEanMGFc03R0x8vUu26EmyzjBl5hu"
    }
];

const initScales:scale[] = [
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

const initEntries:entry[] = [
    {
        user_id : 1,
        scale_id: 3,
        date: "2024-12-09T09:55:02.235Z",
        description : "Kaffee verschüttet"
    },
    {
        user_id : 2,
        scale_id: 2,
        date : "2024-12-10T16:22:40Z",
        description : "Wieder Unmengen an unsinningen Nahrungsmitteln auf dem Tisch"
    }
];

export async function seed(db: Database) {
    const d = drizzle(db);

    // Clear existing data
    await d.delete(entries);
    await d.delete(users);
    await d.delete(scales);

    // Insert new data
    await d.insert(users).values(initUsers);
    await d.insert(scales).values(initScales);
    await d.insert(entries).values(initEntries);

    console.log('Database seeded successfully');
}
