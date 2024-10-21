import { createServer, startServer } from "./frameworks/express/server";
import { initializeI18n } from "./frameworks/i18next";
import { validateEnv } from "./configs/validateEnv";

console.log("NODE_ENV", process.env.NODE_ENV);

const initializeServer = async () => {
  try {
    // Validates if every defined env variable is available
    validateEnv();

    // Initializes localization
    await initializeI18n();

    // Create express server
    const app = createServer();
    const PORT: number = Number(process.env.PORT) || 8080;
    startServer(app, PORT);
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

initializeServer();
