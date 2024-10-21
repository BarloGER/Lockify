import { ValidationError } from "../../../../utils/errors";

export class Terms {
  private readonly termsAcceptedAt: Date;

  constructor(termsAccepted: boolean) {
    if (!this.isValid(termsAccepted)) {
      throw new ValidationError();
    }

    this.termsAcceptedAt = new Date();
  }

  private isValid(termsAccepted: boolean): boolean {
    return termsAccepted === true;
  }

  getDate(): Date {
    return this.termsAcceptedAt;
  }
}
