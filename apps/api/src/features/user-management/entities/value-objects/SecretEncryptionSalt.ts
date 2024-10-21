import { ValidationError } from "../../../../utils/errors/ValidationError";

export class SecretEncryptionSalt {
  private readonly salt: string;

  constructor(salt: string) {
    if (!this.isValid(salt)) {
      throw new ValidationError();
    }
    this.salt = salt;
  }

  private isValid(salt: string): boolean {
    if (typeof salt !== "string" || salt.trim() === "") {
      return false;
    }

    // Salt should be Base64-encoded and correspond to 16 bytes
    const buffer = Buffer.from(salt, "base64");
    return buffer.length === 16;
  }

  getValue(): string {
    return this.salt;
  }
}
