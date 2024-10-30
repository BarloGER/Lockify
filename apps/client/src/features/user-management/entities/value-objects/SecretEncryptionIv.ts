export class SecretEncryptionIv {
  private readonly iv: string;

  constructor(iv: string) {
    if (!this.isValid(iv)) {
      throw new Error("userManagement.valueObjects.secretEncryptionIv");
    }
    this.iv = iv;
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

  private isValid(iv: string): boolean {
    if (typeof iv !== "string" || iv.trim() === "") {
      return false;
    }

    try {
      const decodedBuffer = this.base64ToArrayBuffer(iv);
      // IV sollte 12 Bytes lang sein für AES-GCM
      return decodedBuffer.byteLength === 12;
    } catch (error) {
      return false;
    }
  }

  getValue(): string {
    return this.iv;
  }
}
