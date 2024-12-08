import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite", // "mysql" | "sqlite" | "postgresql" | "turso" | "singlestore"
  schema: "./src/models/*",
  out: "./drizzle",
});