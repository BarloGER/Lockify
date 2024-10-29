export class TermsAccepted {
  private readonly termsAccepted: boolean;

  constructor(termsAccepted: boolean) {
    if (!this.isValid(termsAccepted)) {
      throw new Error("userManagement.valueObjects.termsAccepted");
    }
    this.termsAccepted = termsAccepted;
  }

  private isValid(termsAccepted: boolean): boolean {
    return termsAccepted ? true : false;
  }

  getValue(): boolean {
    return this.termsAccepted;
  }
}
