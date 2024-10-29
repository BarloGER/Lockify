export class TermsAccepted {
  private readonly termsAcceptedAt: Date;

  constructor(termsAccepted: boolean) {
    if (!this.isValid(termsAccepted)) {
      throw new Error("errors.unknownError");
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
