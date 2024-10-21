import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
  constructor(messageKey = "errors.validationError") {
    super(400, messageKey);
  }
}
