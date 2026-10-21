import { config } from 'dotenv';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { and, eq } from 'drizzle-orm';
import { entries, roles, scales, sessions, users } from './schema';
import { seedRoles, seedScales } from './seed-data';

// Load env vars
config();

const databasePath = process.env.DATABASE_URL || './data/amoeben-indikator.db';
mkdirSync(dirname(databasePath), { recursive: true });
const client = new Database(databasePath);
const db = drizzle(client);

const main = async () => {
	try {
		// Insert or update
		for (const scale of seedScales) {
			await db.insert(scales).values(scale).onConflictDoUpdate({ target: scales.name, set: scale });
			console.log(`✅ Scale: ${scale.name}`);
		}

		for (const role of seedRoles) {
			await db.insert(roles).values(role).onConflictDoUpdate({ target: roles.name, set: role });
			console.log(`✅ Role: ${role.name}`);
		}

		for (const seededUsername of ['Rainer', 'Henahax']) {
			const [seededUser] = await db
				.select({ id: users.id })
				.from(users)
				.where(eq(users.username, seededUsername))
				.limit(1);

			if (seededUser) {
				await db
					.update(entries)
					.set({ userId: null, authorName: 'Rainer' })
					.where(eq(entries.userId, seededUser.id));
				await db.delete(sessions).where(eq(sessions.userId, seededUser.id));
				await db.delete(users).where(eq(users.id, seededUser.id));
			}
		}

		const [existingAdmin] = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.roleId, 1))
			.limit(1);
		if (!existingAdmin) {
			const [firstUser] = await db.select({ id: users.id }).from(users).orderBy(users.id).limit(1);
			if (firstUser) {
				await db.update(users).set({ roleId: 1 }).where(eq(users.id, firstUser.id));
			}
		}

		const [humanScale] = await db
			.select({ id: scales.id })
			.from(scales)
			.where(eq(scales.name, 'Mensch'))
			.limit(1);

		const birthEntry = {
			userId: null,
			authorName: 'Rainer',
			scaleId: humanScale.id,
			date: new Date('1984-09-22T00:00:00.000Z'),
			comment: 'Geburt'
		};

		const [existingBirthEntry] = await db
			.select({ id: entries.id })
			.from(entries)
			.where(and(eq(entries.authorName, 'Rainer'), eq(entries.comment, 'Geburt')))
			.limit(1);

		if (existingBirthEntry) {
			await db.update(entries).set(birthEntry).where(eq(entries.id, existingBirthEntry.id));
		} else {
			await db.insert(entries).values(birthEntry);
		}
		console.log('✅ Entry: Geburt (22.09.1984 00:00)');

		console.log('🎉 Seeding complete!');
	} catch (err) {
		console.error('❌ Seeding failed:', err);
		throw err;
	} finally {
		client.close();
	}
};

main().catch(() => process.exit(1));
