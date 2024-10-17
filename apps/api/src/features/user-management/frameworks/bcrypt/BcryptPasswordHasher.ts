import { IPasswordHasher } from "../../services/IPasswordHasher";
import bcrypt from "bcrypt";

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS);
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
