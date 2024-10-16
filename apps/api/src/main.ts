import { createServer, startServer } from "./frameworks/express/server";
import { initializeI18n } from "./frameworks/i18next";

console.log("NODE_ENV", process.env.NODE_ENV);

const initializeServer = async () => {
  try {
    const PORT: number = Number(process.env.PORT) || 8080;

    await initializeI18n();

    // Create express server
    const app = createServer();

    startServer(app, PORT);
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

initializeServer();
