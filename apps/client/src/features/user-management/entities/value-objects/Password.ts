export class Password {
  private readonly password: string;

  constructor(password: string) {
    if (!this.isValid(password)) {
      throw new Error("userManagement.valueObjects.password");
    }
    this.password = password;
  }

  private isValid(password: string): boolean {
    if (typeof password !== "string") {
      return false;
    }

    // Will work on safe password guidelines later on, fucking annoying in testing
    const minLength = 8;
    const maxLength = 128;
    if (password.length < minLength || password.length > maxLength) {
      return false;
    }

    // Password must contain at least one uppercase letter, one lowercase letter, one number and one special character
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

    return regex.test(password);
  }

  getValue(): string {
    return this.password;
  }
}
