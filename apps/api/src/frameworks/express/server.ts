import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { i18nMiddleware } from "./middlewares/i18nMiddleware";
import { userRouter } from "../../features/user-management/frameworks/express/routes/userRouter";
import { sessionConfig } from "../express-session/sessionConfig";
import { errorHandler } from "./middlewares/errorHandler";

export const createServer = () => {
  const app: Express = express();

  const corsOptions: CorsOptions = {
    origin: "*",
  };

  app.use(cors(corsOptions));
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(i18nMiddleware);
  app.use(sessionConfig);

  app.get("/", (req: Request, res: Response) => {
    const greeting = req.t("greeting");
    res.send(`<h1>${greeting}</h1>`);
  });

  app.use("/user", userRouter);

  app.use("*", (req: Request, res: Response) => {
    const notFoundMessage = req.t("notFound");
    res.status(404).send(`<h1>404! ${notFoundMessage}</h1>`);
  });

  app.use(errorHandler);

  return app;
};

export const startServer = (app: Express, PORT: number | string): void => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
