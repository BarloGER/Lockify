export class RegisteredUser {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly emailVerificationToken: string
  ) {}

  static create(
    id: number,
    email: string,
    emailVerificationToken: string
  ): RegisteredUser {
    return new RegisteredUser(id, email, emailVerificationToken);
  }
}
