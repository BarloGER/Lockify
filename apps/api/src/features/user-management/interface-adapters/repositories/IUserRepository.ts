import { RegisteredUser } from "../../entities/RegisteredUser";

export interface IUserRepository {
  isUsernameAvailable(username: string): Promise<boolean>;
  isEmailAvailable(email: string): Promise<boolean>;
  createUser(
    role: string,
    status: string,
    username: string,
    email: string,
    emailVerificationToken: string,
    emailVerificationTokenExpiresAt: Date,
    hashedPassword: string,
    newsletter: boolean,
    encryptedSecret: string,
    secretEncryptionIv: string,
    secretEncryptionSalt: string,
    termsAcceptedAt: Date
  ): Promise<RegisteredUser>;
}
