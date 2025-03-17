import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { scales } from "./schema";

// Load environment variables from .env file
config();

// Create a new connection for seeding
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const client = postgres(connectionString);
const db = drizzle(client);

const seedScales = [
    {
        name: "Amöbe",
        value: 0,
        icon: "fa-solid fa-bacterium"
    },
    {
        name: "Baum",
        value: 0.2,
        icon: "fa-solid fa-tree"
    },
    {
        name: "Wurm",
        value: 0.4,
        icon: "fa-solid fa-worm"
    },
    {
        name: "Frosch",
        value: 0.6,
        icon: "fa-solid fa-frog"
    },
    {
        name: "Hund",
        value: 0.8,
        icon: "fa-solid fa-dog"
    },
    {
        name: "Mensch",
        value: 0.8,
        icon: "fa-solid fa-person"
    }
];

const main = async () => {

    console.log(db.$client);

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
