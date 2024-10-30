export class MasterPassword {
  private readonly masterPassword: string;

  constructor(masterPassword: string) {
    if (!this.isValid(masterPassword)) {
      throw new Error("userManagement.valueObjects.masterPassword");
    }
    this.masterPassword = masterPassword;
  }

  private isValid(masterPassword: string): boolean {
    if (typeof masterPassword !== "string") {
      return false;
    }

    // Will work on safe password guidelines later on, fucking annoying in testing
    const minLength = 8;
    const maxLength = 128;
    if (
      masterPassword.length < minLength ||
      masterPassword.length > maxLength
    ) {
      return false;
    }

    // Password must contain at least one uppercase letter, one lowercase letter, one number and one special character
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

    return regex.test(masterPassword);
  }

  getValue(): string {
    return this.masterPassword;
  }
}
