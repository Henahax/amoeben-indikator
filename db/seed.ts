import { db, Entry } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

	await db.insert(Entry).values([
		{id: 1, name: "TobiasH", value: 40, date: new Date(2024,11,4,11,34,0), description: "Kaffee verschüttet"}
	]);
}

