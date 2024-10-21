import { ValidationError } from "../../../../utils/errors";

export class Email {
  private readonly email: string;

  constructor(email: string) {
    if (!this.isValid(email)) {
      throw new ValidationError();
    }
    this.email = email;
  }

  private isValid(email: string): boolean {
    if (typeof email !== "string") {
      return false;
    }

    const maxLength = 320;
    if (email.length > maxLength) {
      return false;
    }

    // RFC 5322 compliant e-mail validation
    const regex =
      // eslint-disable-next-line no-control-regex
      /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|[0-9]{1,3}(?:\.[0-9]{1,3}){3})$/;

    return regex.test(email);
  }

  getValue(): string {
    return this.email;
  }
}
