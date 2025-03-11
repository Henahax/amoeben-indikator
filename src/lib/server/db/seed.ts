import { db } from "./db.ts";
import { scales } from "./schema.ts";

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
    try {
        for (const scale of seedScales) {
            await db.insert(scales).values(scale);
            console.log(`Inserted scale: ${scale.name}`);
        }
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
}

main()
    .catch((err) => {
        console.error(err);
    });
