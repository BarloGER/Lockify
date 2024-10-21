import { ValidationError } from "../../../../utils/errors";

export class SecretEncryptionIv {
  private readonly iv: string;

  constructor(iv: string) {
    if (!this.isValid(iv)) {
      throw new ValidationError();
    }
    this.iv = iv;
  }

  private isValid(iv: string): boolean {
    if (typeof iv !== "string" || iv.trim() === "") {
      return false;
    }

    // IV should be Base64-encoded and correspond to 12 bytes
    const buffer = Buffer.from(iv, "base64");
    return buffer.length === 12;
  }

  getValue(): string {
    return this.iv;
  }
}
