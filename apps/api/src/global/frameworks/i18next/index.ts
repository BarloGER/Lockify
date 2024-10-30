import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { LanguageDetector } from "i18next-http-middleware";
import path from "path";

export const initializeI18n = async () => {
  const localesPath = path.join(
    __dirname,
    "../../apps/api/locales/{{lng}}/translation.json"
  );

  try {
    await i18next
      .use(Backend)
      .use(LanguageDetector)
      .init({
        backend: {
          loadPath: localesPath,
        },
        fallbackLng: "en",
        preload: ["en", "de"],
        interpolation: {
          escapeValue: false,
        },
        debug: false,
      });
  } catch (error) {
    console.error("Failed to initialize i18next:", error);
    throw error;
  }
};

export { i18next };
