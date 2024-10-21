import { IToken } from "./IToken";

export interface ITokenGenerator {
  generateToken(length: number, lifetimeInMinutes: number): Promise<IToken>;
}
