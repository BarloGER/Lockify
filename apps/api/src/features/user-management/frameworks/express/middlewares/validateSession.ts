import { UnauthorizedError } from "../../../../../utils/errors";
import { Request, Response, NextFunction } from "express";

export const validateSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.userId) {
    throw new UnauthorizedError();
  }

  if (req.session.cookie.expires && req.session.cookie.expires < new Date()) {
    throw new UnauthorizedError();
  }

  next();
};
