export class SecretEncryptionSalt {
  private readonly salt: string;

  constructor(salt: string) {
    if (!this.isValid(salt)) {
      throw new Error("userManagement.valueObjects.secretEncryptionSalt");
    }
    this.salt = salt;
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private isValid(salt: string): boolean {
    if (typeof salt !== "string" || salt.trim() === "") {
      return false;
    }

    try {
      const decodedBuffer = this.base64ToArrayBuffer(salt);
      // Salt sollte 16 Bytes lang sein
      return decodedBuffer.byteLength === 16;
    } catch (error) {
      return false;
    }
  }

  getValue(): string {
    return this.salt;
  }
}
