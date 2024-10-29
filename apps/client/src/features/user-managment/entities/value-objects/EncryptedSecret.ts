export class EncryptedSecret {
  private readonly encryptedSecret: string;

  constructor(encryptedSecret: string) {
    if (!this.isValid(encryptedSecret)) {
      throw new Error("userManagement.valueObjects.encryptedSecret");
    }
    this.encryptedSecret = encryptedSecret;
  }

  private isValid(encryptedSecret: string): boolean {
    if (typeof encryptedSecret !== "string" || encryptedSecret.trim() === "") {
      return false;
    }

    // Optional: Überprüfen, ob der String ein gültiger Base64-String ist
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(encryptedSecret);
  }

  getValue(): string {
    return this.encryptedSecret;
  }
}
