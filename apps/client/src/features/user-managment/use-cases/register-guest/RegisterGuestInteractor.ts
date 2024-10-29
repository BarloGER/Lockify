import { ICryptoService } from "../../../../services/cryptography/interfaces/ICryptoService";
import {
  Username,
  Email,
  Password,
  MasterPassword,
  NewsletterAccepted,
  TermsAccepted,
  EncryptedSecret,
  SecretEncryptionIv,
  SecretEncryptionSalt,
} from "../../entities/value-objects";
import { IUserRepository } from "../../interface-adapters/repositories/IUserRepository";
import { IRegisterGuestInputPort } from "./IRegisterGuestInputPort";
import { IRegisterGuestOutputPort } from "./IRegisterGuestOutputPort";
import { IRegisterGuestRequestModel } from "./IRegisterGuestRequestModel";
import { IRegisterGuestResponseModel } from "./IRegisterGuestResponseModel";

export class RegisterGuestInteractor implements IRegisterGuestInputPort {
  constructor(
    private readonly cryptoService: ICryptoService,
    private readonly userRepository: IUserRepository,
    private readonly outputPort: IRegisterGuestOutputPort
  ) {}

  async registerGuest(requestModel: IRegisterGuestRequestModel): Promise<void> {
    const {
      username,
      email,
      password,
      masterPassword,
      newsletterAccepted,
      termsAccepted,
    } = requestModel;

    let responseModel: IRegisterGuestResponseModel = {
      success: false,
      message: "errors.unknownError",
    };

    try {
      const validUsername = new Username(username);
      const validEmail = new Email(email);
      const validPassword = new Password(password);
      const validMasterPassword = new MasterPassword(masterPassword);
      const validNewsletterAccepted = new NewsletterAccepted(
        newsletterAccepted
      );
      const validTermsAccepted = new TermsAccepted(termsAccepted);

      const encryptData = {
        masterPassword: validMasterPassword.getValue(),
        data: "TESTSTRING", // It does not matter whether an attacker knows the test string.
      };
      const encryptedObj = await this.cryptoService.encrypt(encryptData);
      const validEncryptedSecret = new EncryptedSecret(
        encryptedObj.encryptedData
      );
      const validSecretEncryptionIv = new SecretEncryptionIv(encryptedObj.iv);
      const validSecretEncryptionSalt = new SecretEncryptionSalt(
        encryptedObj.salt
      );

      const result = await this.userRepository.sendRegisterGuestRequest(
        validUsername.getValue(),
        validEmail.getValue(),
        validPassword.getValue(),
        validEncryptedSecret.getValue(),
        validSecretEncryptionIv.getValue(),
        validSecretEncryptionSalt.getValue(),
        validNewsletterAccepted.getValue(),
        validTermsAccepted.getValue()
      );
      console.log(result);

      responseModel = {
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      let errorMessage = "errors.unknownError";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      responseModel = {
        success: false,
        message: errorMessage,
      };
    } finally {
      await this.outputPort.present(responseModel);
    }
  }
}
