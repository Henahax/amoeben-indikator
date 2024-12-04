import { db, Entry } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

	await db.insert(Entry).values([
		{id: 1, name: "TobiasH", value: 40, date: new Date, comment: "Kaffee verschüttet"},
		{id: 2, name: "RainerG", value: 100, date: new Date, comment: "Video hochgeladen"}
	]);
}

