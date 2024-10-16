import session from "express-session";
import { sessionStore } from "./sessionStore";

const sessionSecrets = process.env.SESSION_SECRETS.split(", ");

export const sessionConfig = session({
  store: sessionStore,
  secret: sessionSecrets,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "none",
  },
});
