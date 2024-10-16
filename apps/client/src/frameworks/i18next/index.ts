import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";

// Funktion zur Initialisierung von i18next
export const initializeI18n = async () => {
  try {
    await i18next
      .use(initReactI18next)
      .use(LanguageDetector)
      .init({
        resources: {
          en: { translation: translationEN },
          de: { translation: translationDE },
        },
        fallbackLng: "en",
        supportedLngs: ["en", "de"],
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ["localStorage", "navigator"],
          caches: ["localStorage"],
          lookupLocalStorage: "language",
        },
        debug: true, // Für Entwicklungszwecke aktivieren
      });
  } catch (error) {
    console.error("Failed to initialize i18next:", error);
    throw error;
  }
};

export default i18next;
