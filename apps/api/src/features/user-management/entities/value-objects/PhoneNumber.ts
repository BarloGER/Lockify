import { ValidationError } from "../../../../utils/errors";

export class PhoneNumber {
  private readonly phoneNumber: string;

  constructor(phoneNumber: string) {
    if (!this.isValid(phoneNumber)) {
      throw new ValidationError();
    }
    this.phoneNumber = phoneNumber;
  }

  private isValid(phoneNumber: string): boolean {
    if (typeof phoneNumber !== "string") {
      return false;
    }

    // Validation in E.164 format
    const regex = /^\+?[1-9]\d{1,14}$/; // Maximum 15 digits
    return regex.test(phoneNumber);
  }

  getValue(): string {
    return this.phoneNumber;
  }
}
