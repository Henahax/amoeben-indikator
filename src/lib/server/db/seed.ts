import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { scales, users, entries, roles } from "./schema";

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
        value: 1,
        icon: "fa-solid fa-person"
    }
];

const seedRoles = [{
    name: "Administrator",
    icon: "fa-solid fa-user-tie"
},
{
    name: "Mitglied",
    icon: "fa-solid fa-check"
},
{
    name: "nicht verifiziert",
    icon: "fa-solid fa-xmark"
}];

const seedUsers = [{
    username: "Henahax",
    passwordHash: "$argon2id$v=19$m=19456,t=2,p=1$oz7nt4RmGERDhcfJONhfXQ$o0xhN09VyoboDZ+d+BHQM+JSAy2b0zW8ADdfFnTv/aE",
    roleId: 1
}];

const seedEntries = [{
    userId: 1,
    scaleId: 3,
    date: new Date("2024-12-09T09:55:02.235Z"),
    comment: "Kaffee verschüttet"
}, {
    userId: 1,
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

        for (const role of seedRoles) {
            await db
                .insert(roles)
                .values(role)
                .onConflictDoUpdate({
                    target: roles.name,
                    set: role
                });
            console.log(`Processed user: ${role.name}`);
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

        await client`SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users))`;
        await client`SELECT setval(pg_get_serial_sequence('roles', 'id'), (SELECT MAX(id) FROM roles))`;
        await client`SELECT setval(pg_get_serial_sequence('scales', 'id'), (SELECT MAX(id) FROM scales))`;
        await client`SELECT setval(pg_get_serial_sequence('entries', 'id'), (SELECT MAX(id) FROM entries))`;

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
