import session from "express-session";
import { sessionStore } from "./sessionStore";

const sessionSecretsEnv = process.env.SESSION_SECRETS;
if (!sessionSecretsEnv) {
  throw new Error("SESSION_SECRETS environment variable is not set");
}

const sessionSecrets = process.env.SESSION_SECRETS.split(", ");
const isProduction = process.env.NODE_ENV === "production";

export const sessionConfig = session({
  store: sessionStore,
  secret: sessionSecrets,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: isProduction ? "lax" : "strict",
  },
});
