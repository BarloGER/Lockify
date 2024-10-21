import { Pool } from "pg";
import { IUserRepository } from "./IUserRepository";
import { RegisteredUser } from "../../entities/RegisteredUser";
import { CustomError } from "../../../../utils/errors";

export class UserRepository implements IUserRepository {
  constructor(private readonly dbClient: Pool) {}

  async isUsernameAvailable(username: string): Promise<boolean> {
    try {
      const query = `SELECT 1 FROM users WHERE username = $1`;
      const values = [username];
      const result = await this.dbClient.query(query, values);

      if (result.rows.length > 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    try {
      const query = `SELECT 1 FROM users WHERE email = $1`;
      const values = [email];
      const result = await this.dbClient.query(query, values);

      if (result.rows.length > 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createUser(
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
  ): Promise<RegisteredUser> {
    try {
      const query = `INSERT INTO users (
        role,
        status,
        username,
        email,
        email_verification_token,
        email_verification_token_expires_at,
        hashed_password,
        encrypted_secret,
        secret_encryption_iv,
        secret_encryption_salt,
        newsletter,
        terms_accepted_at,
        created_at,
        updated_at   
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW()) RETURNING id, email, email_verification_token`;
      const values = [
        role,
        status,
        username,
        email,
        emailVerificationToken,
        emailVerificationTokenExpiresAt,
        hashedPassword,
        encryptedSecret,
        secretEncryptionIv,
        secretEncryptionSalt,
        newsletter,
        termsAcceptedAt,
      ];

      const result = await this.dbClient.query(query, values);
      const row = result.rows[0];

      const registeredUser = RegisteredUser.create(
        row.id,
        row.email,
        row.email_verification_token
      );

      return registeredUser;
    } catch (error) {
      console.error("Error creating registeredUser:", error);
      throw new CustomError(400, "userManagement.registration.failed");
    }
  }
}
