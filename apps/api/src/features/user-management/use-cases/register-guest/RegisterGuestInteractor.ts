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
  Newsletter,
  EncryptedSecret,
  SecretEncryptionIv,
  SecretEncryptionSalt,
  Terms,
} from "../../entities/value-objects";
import { INotificationService } from "../../../../services/notification/INotificationService";
import { CustomError } from "../../../../utils/errors";

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
      newsletter,
      encryptedSecret,
      secretEncryptionIv,
      secretEncryptionSalt,
      terms,
    } = requestModel;

    const validRole = new Role("user");
    const validStatus = new Status("pending_verification");
    const validUsername = new Username(username);
    const validEmail = new Email(email);
    const validPassword = new Password(password);
    const hashedPassword = await this.passwordHasher.hash(
      validPassword.getValue()
    );
    const validHashedPassword = new PasswordHash(hashedPassword);
    const validNewsletter = new Newsletter(newsletter);
    const validEncryptedSecret = new EncryptedSecret(encryptedSecret);
    const validSecretEncryptionIv = new SecretEncryptionIv(secretEncryptionIv);
    const validSecretEncryptionSalt = new SecretEncryptionSalt(
      secretEncryptionSalt
    );
    const termsAcceptedAt = new Terms(terms);

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
      throw new CustomError(
        409,
        "userManagement.registration.userOrEmailExists"
      );
    }

    const registeredUser = await this.userRepository.createUser(
      validRole.getValue(),
      validStatus.getValue(),
      validUsername.getValue(),
      validEmail.getValue(),
      emailVerificationTokenObj.token,
      emailVerificationTokenObj.expiresAt,
      validHashedPassword.getValue(),
      validNewsletter.getValue(),
      validEncryptedSecret.getValue(),
      validSecretEncryptionIv.getValue(),
      validSecretEncryptionSalt.getValue(),
      termsAcceptedAt.getDate()
    );

    await this.notificationService.sendEmailVerificationMail(
      registeredUser.email,
      registeredUser.emailVerificationToken
    );

    const responseModel: IRegisterGuestResponseModel = {
      success: true,
      message: "userManagement.registration.success",
    };

    await this.outputPort.present(responseModel);
  }
}
