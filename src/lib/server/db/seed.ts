import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { scales, users, entries } from "./schema";

// Load environment variables from .env file
config();

// Create a new connection for seeding
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const client = postgres(connectionString);
const db = drizzle(client);

const seedScales = [
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
        value: 0.8,
        icon: "fa-solid fa-person"
    }
];

const seedUsers = [{
    id: 1,
    username: "Henahax",
    passwordHash: "$argon2id$v=19$m=19456,t=2,p=1$oz7nt4RmGERDhcfJONhfXQ$o0xhN09VyoboDZ+d+BHQM+JSAy2b0zW8ADdfFnTv/aE"
},
{
    id: 2,
    username: "Waetsch",
    passwordHash: "$argon2id$v=19$m=19456,t=2,p=1$z+sIUY0Ywj3SMwhVIOd3KA$uI5Am3k5LPdUBa3jarYysm1NvYMox0hYObqfmNTig1g"
}];

const seedEntries = [{
    id: 1,
    userId: 1,
    scaleId: 3,
    date: new Date("2024-12-09T09:55:02.235Z"),
    comment: "Kaffee verschüttet"
}, {
    id: 2,
    userId: 2,
    scaleId: 2,
    date: new Date("2024-12-10T16:22:40Z"),
    comment: "Wieder Unmengen an unsinningen Nahrungsmitteln auf dem Tisch"
}];

const main = async () => {

    try {
        for (const scale of seedScales) {
            await db
                .insert(scales)
                .values(scale)
                .onConflictDoUpdate({
                    target: scales.name,
                    set: scale
                });
            console.log(`Processed scale: ${scale.name}`);
        }

        for (const user of seedUsers) {
            await db
                .insert(users)
                .values(user)
                .onConflictDoUpdate({
                    target: users.username,
                    set: user
                });
            console.log(`Processed user: ${user.username}`);
        }

        for (const entry of seedEntries) {
            await db
                .insert(entries)
                .values(entry)
                .onConflictDoUpdate({
                    target: entries.id,
                    set: entry
                });
            console.log(`Processed user: ${entry.comment}`);
        }

        console.log('Database seeding completed');

        await client.end();

    } catch (error) {
        console.error('Error seeding database:', error);
        await client.end();
        throw error;
    }
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
