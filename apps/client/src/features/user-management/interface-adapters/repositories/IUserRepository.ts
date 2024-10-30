import { IRegisterGuestResponse } from "./IRegisterGuestResponse";

export interface IUserRepository {
  sendRegisterGuestRequest(
    validUsername: string,
    validEmail: string,
    validPassword: string,
    validEncryptedSecret: string,
    validSecretEncryptionIv: string,
    validSecretEncryptionSalt: string,
    validNewsletterAccepted: boolean,
    validTermsAccepted: boolean
  ): Promise<IRegisterGuestResponse>;
}
