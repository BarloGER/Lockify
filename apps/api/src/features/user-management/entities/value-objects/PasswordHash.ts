export class PasswordHash {
  private readonly passwordHash: string;

  constructor(passwordHash: string) {
    if (!this.isValid(passwordHash)) {
      throw new Error("errors.unknownError");
    }
    this.passwordHash = passwordHash;
  }

  private isValid(passwordHash: string): boolean {
    if (typeof passwordHash !== "string" || passwordHash.trim() === "") {
      return false;
    }

    // Check for valid hash length (e.g. bcrypt has 60 characters)
    const expectedLength = 60;
    if (passwordHash.length !== expectedLength) {
      return false;
    }

    return true;
  }

  getValue(): string {
    return this.passwordHash;
  }
}
