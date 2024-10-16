import { initializeApp } from "./frameworks/react/App";
import { initializeI18n } from "./frameworks/i18next";

const initializeClient = async (): Promise<void> => {
  try {
    await initializeI18n();
    initializeApp();
  } catch (error) {
    console.error("Failed to initialize the client app:", error);
    process.exit(1);
  }
};

initializeClient();
