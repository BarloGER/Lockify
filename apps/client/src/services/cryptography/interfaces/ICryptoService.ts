import { IDecryptedObj } from "./IDecryptedObj";
import { IDecryptionFailed } from "./IDecryptionFailed";
import { IEncryptedObj } from "./IEncryptedObj";
import { IEncryptData } from "./IEncryptData";
import { IDecryptData } from "./IDecryptData";

export interface ICryptoService {
  encrypt(encryptData: IEncryptData): Promise<IEncryptedObj>;
  decrypt(
    decryptData: IDecryptData
  ): Promise<IDecryptedObj | IDecryptionFailed>;
}
