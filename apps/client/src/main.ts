import { initializeApp } from "./global/frameworks/react/App";
import { initializeI18n } from "./global/frameworks/i18next";
import { validateEnv } from "./global/configs/validateEnv";
import "./global/frameworks/tailwind/styles.css";

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
