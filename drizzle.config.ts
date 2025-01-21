import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

export default {
  schema: "./src/lib/server/database/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: 'src/lib/server/database/sqlite.db' as string,
  },
  out: "./src/lib/server/database/migrations",
} satisfies Config;