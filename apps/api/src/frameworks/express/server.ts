import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from "cors";

export const createServer = () => {
  const app: Express = express();

  const corsOptions: CorsOptions = {
    origin: "*",
  };

  app.use(cors(corsOptions));
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Lockify API</h1>");
  });

  /* Routes
    here
  */

  app.use("*", (req: Request, res: Response) => {
    res.status(404).send(`<h1>404! Resource not found!</h1>`);
  });

  /* Global error handler
    here
  */

  return app;
};

export const startServer = (app: Express, PORT: number | string): void => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
