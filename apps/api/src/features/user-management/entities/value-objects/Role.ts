import { ValidationError } from "../../../../utils/errors";

export class Role {
  private readonly role: string;

  private readonly allowedRoles = ["user", "premium-user", "support", "admin"];

  constructor(role: string) {
    if (!this.isValid(role)) {
      throw new ValidationError();
    }
    this.role = role;
  }

  private isValid(role: string): boolean {
    return typeof role === "string" && this.allowedRoles.includes(role);
  }

  getValue(): string {
    return this.role;
  }
}