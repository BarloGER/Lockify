import { IPasswordHasher } from "../../services/password-hasher/IPasswordHasher";
import bcrypt from "bcrypt";

export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly SALT_ROUNDS: number;

  constructor() {
    const saltRoundsEnv = process.env.SALT_ROUNDS;
    if (!saltRoundsEnv) {
      throw new Error("SALT_ROUNDS environment variable is not set!");
    }

    const saltRounds = parseInt(saltRoundsEnv, 10);
    if (isNaN(saltRounds) || saltRounds <= 0) {
      throw new Error("SALT_ROUNDS must be a positive integer");
    }

    this.SALT_ROUNDS = saltRounds;
  }

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
