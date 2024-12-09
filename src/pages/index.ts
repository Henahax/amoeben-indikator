import { initializeDb } from "../db/index";

async function startApp() {
  await initializeDb();
  console.log("Starting server...");
  // Your app's startup logic
}

startApp().catch((err) => {
  console.error("App failed to start:", err);
  process.exit(1);
});
