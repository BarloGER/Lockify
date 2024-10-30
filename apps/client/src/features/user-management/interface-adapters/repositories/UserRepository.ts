import { IRegisterGuestResponse } from "./IRegisterGuestResponse";
import { IUserRepository } from "./IUserRepository";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const getLanguage = () => {
  return localStorage.getItem("language") || "en";
};

export class UserRepository implements IUserRepository {
  async sendRegisterGuestRequest(
    validUsername: string,
    validEmail: string,
    validPassword: string,
    validEncryptedSecret: string,
    validSecretEncryptionIv: string,
    validSecretEncryptionSalt: string,
    validNewsletterAccepted: boolean,
    validTermsAccepted: boolean
  ): Promise<IRegisterGuestResponse> {
    const language = getLanguage();

    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          username: validUsername,
          email: validEmail,
          password: validPassword,
          encryptedSecret: validEncryptedSecret,
          secretEncryptionIv: validSecretEncryptionIv,
          secretEncryptionSalt: validSecretEncryptionSalt,
          newsletterAccepted: validNewsletterAccepted,
          termsAccepted: validTermsAccepted,
        }),
      });

      const responseData = await response.json();

      return {
        success: responseData.success,
        message: responseData.message,
      };
    } catch (error) {
      // Netzwerkfehler oder JSON-Parsing-Fehler
      console.error("Network or parsing error:", error);

      return {
        success: false,
        message: "errors.networkError",
      };
    }
  }
}
