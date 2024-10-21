import { ValidationError } from "../../../../utils/errors/ValidationError";

export class EncryptedSecret {
  private readonly encryptedSecret: string;

  constructor(encryptedSecret: string) {
    if (!this.isValid(encryptedSecret)) {
      throw new ValidationError();
    }
    this.encryptedSecret = encryptedSecret;
  }

  private isValid(encryptedSecret: string): boolean {
    if (typeof encryptedSecret !== "string" || encryptedSecret.trim() === "") {
      return false;
    }

    // Check whether it is a valid Base64 string
    try {
      Buffer.from(encryptedSecret, "base64");
      return true;
    } catch (error) {
      return false;
    }
  }

  getValue(): string {
    return this.encryptedSecret;
  }
}
