import { ValidationError } from "../../../../utils/errors";

export class Newsletter {
  private readonly newsletter: boolean;

  constructor(newsletter: boolean) {
    if (!this.isValid(newsletter)) {
      throw new ValidationError();
    }
    this.newsletter = newsletter;
  }

  private isValid(newsletter: boolean): boolean {
    return typeof newsletter === "boolean";
  }

  getValue(): boolean {
    return this.newsletter;
  }
}
