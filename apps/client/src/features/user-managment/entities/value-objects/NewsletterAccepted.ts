export class NewsletterAccepted {
  private readonly newsletterAccepted: boolean;

  constructor(newsletterAccepted: boolean) {
    if (!this.isValid(newsletterAccepted)) {
      throw new Error("userManagement.valueObjects.newsletterAccepted");
    }
    this.newsletterAccepted = newsletterAccepted;
  }

  private isValid(newsletterAccepted: boolean): boolean {
    return typeof newsletterAccepted === "boolean";
  }

  getValue(): boolean {
    return this.newsletterAccepted;
  }
}
