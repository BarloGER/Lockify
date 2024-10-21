import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../../utils/errors/CustomError";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction /* eslint-disable-line */
) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  // Verwenden Sie den messageKey, falls vorhanden, ansonsten 'internalServerError'
  const messageKey = err.messageKey || "internalServerError";

  // Senden Sie die übersetzte Fehlermeldung an den Client
  res.status(statusCode).json({
    message: req.t(messageKey),
  });
};
