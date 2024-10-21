export interface IRegisterGuestRequestModel {
  username: string;
  email: string;
  password: string;
  newsletter: boolean;
  encryptedSecret: string;
  secretEncryptionIv: string;
  secretEncryptionSalt: string;
  terms: boolean;
}
