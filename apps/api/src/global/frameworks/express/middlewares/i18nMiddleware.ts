import i18nextMiddleware from "i18next-http-middleware";
import { i18next } from "@global-frameworks/i18next";

export const i18nMiddleware = i18nextMiddleware.handle(i18next);
