import { db } from '#lib/server/db/db.js';
import { eq, desc } from 'drizzle-orm';
import { entries, scales } from '#lib/server/db/schema.js';
import { calculateScore } from '#lib/score.js';

export async function GET() {
	const myEntries = await db
		.select()
		.from(entries)
		.leftJoin(scales, eq(scales.id, entries.scaleId))
		.orderBy(desc(entries.date))
		.limit(5);
	const api = { score: calculateScore(myEntries.map((entry) => entry.scales?.value)) };

	return Response.json(api);
}
