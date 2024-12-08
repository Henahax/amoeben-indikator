// src/models/types.ts
import type { InferSelectModel } from 'drizzle-orm';
import { entries } from './schema.ts';

export type Entry = InferSelectModel<typeof entries>;