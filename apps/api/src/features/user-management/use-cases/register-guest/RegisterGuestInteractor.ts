import { IUserRepository } from "../../interface-adapters/repositories/IUserRepository";
import { IPasswordHasher } from "../../services/password-hasher/IPasswordHasher";
import { ITokenGenerator } from "../../services/token-generator/ITokenGenerator";
import { IRegisterGuestInputPort } from "./IRegisterGuestInputPort";
import { IRegisterGuestOutputPort } from "./IRegisterGuestOutputPort";
import { IRegisterGuestRequestModel } from "./IRegisterGuestRequestModel";
import { IRegisterGuestResponseModel } from "./IRegisterGuestResponseModel";
import {
  Role,
  Status,
  Username,
  Email,
  Password,
  PasswordHash,
  NewsletterAccepted,
  EncryptedSecret,
  SecretEncryptionIv,
  SecretEncryptionSalt,
  TermsAccepted,
} from "../../entities/value-objects";
import { INotificationService } from "../../../../services/notification/INotificationService";

export class RegisterGuestInteractor implements IRegisterGuestInputPort {
  constructor(
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly notificationService: INotificationService,
    private readonly userRepository: IUserRepository,
    private readonly outputPort: IRegisterGuestOutputPort
  ) {}

  async registerGuest(requestModel: IRegisterGuestRequestModel): Promise<void> {
    const {
      username,
      email,
      password,
      encryptedSecret,
      secretEncryptionIv,
      secretEncryptionSalt,
      newsletterAccepted,
      termsAccepted,
    } = requestModel;

    let responseModel: IRegisterGuestResponseModel = {
      success: false,
      message: "errors.unknownError",
    };

    try {
      const validRole = new Role("user");
      const validStatus = new Status("pending_verification");
      const validUsername = new Username(username);
      const validEmail = new Email(email);
      const validPassword = new Password(password);
      const hashedPassword = await this.passwordHasher.hash(
        validPassword.getValue()
      );
      const validHashedPassword = new PasswordHash(hashedPassword);
      const validEncryptedSecret = new EncryptedSecret(encryptedSecret);
      const validSecretEncryptionIv = new SecretEncryptionIv(
        secretEncryptionIv
      );
      const validSecretEncryptionSalt = new SecretEncryptionSalt(
        secretEncryptionSalt
      );
      const validNewsletterAccepted = new NewsletterAccepted(
        newsletterAccepted
      );
      const termsAcceptedAt = new TermsAccepted(termsAccepted);

      const TOKEN_LENGTH = 8;
      const TOKEN_LIFETIME_IN_MINUTES = 10;
      const emailVerificationTokenObj = await this.tokenGenerator.generateToken(
        TOKEN_LENGTH,
        TOKEN_LIFETIME_IN_MINUTES
      );

      const isUsernameAvailable = await this.userRepository.isUsernameAvailable(
        validUsername.getValue()
      );

      const isEmailAvailable = await this.userRepository.isEmailAvailable(
        validEmail.getValue()
      );

      if (!isUsernameAvailable || !isEmailAvailable) {
        throw new Error("userManagement.registerGuest.userOrEmailExists");
      }

      const registeredUser = await this.userRepository.createUser(
        validRole.getValue(),
        validStatus.getValue(),
        validUsername.getValue(),
        validEmail.getValue(),
        emailVerificationTokenObj.token,
        emailVerificationTokenObj.expiresAt,
        validHashedPassword.getValue(),
        validEncryptedSecret.getValue(),
        validSecretEncryptionIv.getValue(),
        validSecretEncryptionSalt.getValue(),
        validNewsletterAccepted.getValue(),
        termsAcceptedAt.getDate()
      );

      await this.notificationService.sendEmailVerificationMail(
        registeredUser.email,
        registeredUser.emailVerificationToken
      );

      responseModel = {
        success: true,
        message: "userManagement.registerGuest.success",
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
