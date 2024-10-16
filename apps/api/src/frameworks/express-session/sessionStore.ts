import session from "express-session";
import connectPgSimple, { PGStore } from "connect-pg-simple";
import { pgClient } from "../db/postgres";

const pgSessionStore = connectPgSimple(session);

export const sessionStore: PGStore = new pgSessionStore({
  pool: pgClient,
  tableName: "sessions",
});
