import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
  constructor(messageKey = "errors.unauthorizedError") {
    super(401, messageKey);
  }
}
