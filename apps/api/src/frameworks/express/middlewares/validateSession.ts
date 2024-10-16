import { Request, Response, NextFunction } from "express";

export const validateSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    console.error("no cookie");
  }

  const isExpired =
    req.session.expires && new Date(req.session.expires).getTime() < Date.now();
  if (isExpired) {
    console.error("expired session");
  }

  const userId = req.session.userId;
  if (!userId) {
    console.error("no user id provided");
  }

  next();
};
