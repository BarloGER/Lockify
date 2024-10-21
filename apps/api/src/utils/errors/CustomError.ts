// errors/CustomError.ts

export class CustomError extends Error {
  public statusCode: number;
  public messageKey: string; // Schlüssel für die Übersetzung

  constructor(statusCode: number, messageKey: string) {
    super(messageKey);
    this.statusCode = statusCode;
    this.messageKey = messageKey;

    // Erhält den korrekten Stack-Trace (nur in V8-Engines)
    Error.captureStackTrace(this, this.constructor);
  }
}
