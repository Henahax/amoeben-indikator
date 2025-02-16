import { users, scales } from "$lib/server/db/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";


const db = drizzle(process.env.DATABASE_URL!);

async function main() {

    const myScales = [
        {
            id: "1",
            name: "Amöbe",
            value: 0,
            icon: "fa-solid fa-bacterium"
        },
        {
            id: "2",
            name: "Baum",
            value: 0.2,
            icon: "fa-solid fa-tree"
        },
        {
            id: "3",
            name: "Wurm",
            value: 0.4,
            icon: "fa-solid fa-worm"
        },
        {
            id: "4",
            name: "Frosch",
            value: 0.6,
            icon: "fa-solid fa-frog"
        },
        {
            id: "5",
            name: "Hund",
            value: 0.8,
            icon: "fa-solid fa-dog"
        },
        {
            id: "6",
            name: "Mensch",
            value: 1,
            icon: "fa-solid fa-person"
        }
    ];

    const myUsers = [{
        id: "1",
        username: "Henahax",
        passwordHash: "$2a$12$5.cuuld5m3frtT1NnrDQnuccg2r2z/P/Ias2LaiaAG1zONXPxpphC"
    },
    {
        id: "2",
        username: "Waetsch",
        passwordHash: "$2a$12$1lq0aFtYXbgOr4yR0W47GOuAnEanMGFc03R0x8vUu26EmyzjBl5hu"
    }];

    for (const myScale of myScales) {
        await db.insert(scales).values(myScale);
    }

    for (const myUser of myUsers) {
        await db.insert(users).values(myUser);
    };
}

