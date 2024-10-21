import { initializeApp } from "./frameworks/react/App";
import { initializeI18n } from "./frameworks/i18next";
import { validateEnv } from "./configs/validateEnv";

const initializeClient = async (): Promise<void> => {
  try {
    // Validates if every defined env variable is available
    validateEnv();

    // Initializes localization
    await initializeI18n();

    initializeApp();
  } catch (error) {
    console.error("Failed to initialize the client app:", error);
    process.exit(1);
  }
};

initializeClient();
