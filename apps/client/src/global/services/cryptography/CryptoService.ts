import { ICryptoService } from "./ICryptoService";
import { IEncryptData } from "./IEncryptData";
import { IEncryptedObj } from "./IEncryptedObj";
import { IDecryptData } from "./IDecryptData";
import { IDecryptedObj } from "./IDecryptedObj";
import { IDecryptionFailed } from "./IDecryptionFailed";

export class CryptoService implements ICryptoService {
  private iterations = 100000;
  private keyLength = 256;
  private hash = "SHA-256";

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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

  async encrypt(encryptData: IEncryptData): Promise<IEncryptedObj> {
    const { masterPassword, data } = encryptData;
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const enc = new TextEncoder();

    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(masterPassword),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: this.iterations,
        hash: this.hash,
      },
      keyMaterial,
      { name: "AES-GCM", length: this.keyLength },
      false,
      ["encrypt", "decrypt"]
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      enc.encode(data)
    );

    return {
      encryptedData: this.arrayBufferToBase64(encrypted),
      iv: this.arrayBufferToBase64(iv.buffer),
      salt: this.arrayBufferToBase64(salt.buffer),
    };
  }

  async decrypt(
    decryptData: IDecryptData
  ): Promise<IDecryptedObj | IDecryptionFailed> {
    const { masterPassword, encryptedData, iv, salt } = decryptData;
    try {
      const dec = new TextDecoder();
      const enc = new TextEncoder();

      const saltBuffer = this.base64ToArrayBuffer(salt);
      const ivBuffer = this.base64ToArrayBuffer(iv);
      const encryptedBuffer = this.base64ToArrayBuffer(encryptedData);

      const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(masterPassword),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
      );

      const key = await window.crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: new Uint8Array(saltBuffer),
          iterations: this.iterations,
          hash: this.hash,
        },
        keyMaterial,
        { name: "AES-GCM", length: this.keyLength },
        false,
        ["encrypt", "decrypt"]
      );

      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: new Uint8Array(ivBuffer),
        },
        key,
        encryptedBuffer
      );

      return {
        success: true,
        data: dec.decode(decrypted),
      };
    } catch (error) {
      console.error("Decryption failed:", error);
      return { success: false };
    }
  }
}
