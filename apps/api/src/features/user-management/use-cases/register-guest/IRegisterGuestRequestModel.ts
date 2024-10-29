export interface IRegisterGuestRequestModel {
  username: string;
  email: string;
  password: string;
  newsletterAccepted: boolean;
  encryptedSecret: string;
  secretEncryptionIv: string;
  secretEncryptionSalt: string;
  termsAccepted: boolean;
}
