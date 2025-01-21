import Database from "better-sqlite3";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/better-sqlite3";

dotenv.config();

const client = new Database(process.env.DB_URL);
const db = drizzle(client);

export { db, client as sqlite };
