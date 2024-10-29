import { Request, Response } from "express";

export const validateSession = (req: Request, res: Response) => {
  if (!req.session || !req.session.userId) {
    const errorResponse = {
      success: false,
      message: `${req.t("errors.unauthorizedError")}`,
    };
    res.status(403).json(errorResponse);
  }

  if (req.session.cookie.expires && req.session.cookie.expires < new Date()) {
    const errorResponse = {
      success: false,
      message: `${req.t("errors.unauthorizedError")}`,
    };
    res.status(403).json(errorResponse);
  }
};
