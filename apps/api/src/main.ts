import { createServer, startServer } from "./frameworks/express/server";

const initializeServer = async () => {
  try {
    const PORT: number = Number(process.env.PORT) || 8080;
    const app = createServer();

    startServer(app, PORT);
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

initializeServer();
