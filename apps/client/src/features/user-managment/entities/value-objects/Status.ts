export class Status {
  private readonly status: string;

  private readonly allowedStatuses = [
    "active",
    "inactive",
    "locked",
    "blocked",
    "pending_verification",
  ];

  constructor(status: string) {
    if (!this.isValid(status)) {
      throw new Error("userManagement.valueObjects.status");
    }
    this.status = status;
  }

  private isValid(status: string): boolean {
    return typeof status === "string" && this.allowedStatuses.includes(status);
  }

  getValue(): string {
    return this.status;
  }
}
