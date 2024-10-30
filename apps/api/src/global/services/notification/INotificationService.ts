import { IEmailVerificationMail } from "./IEmailVerificationMail";

export interface INotificationService {
  sendEmailVerificationMail(
    emailAddress: string,
    emailVerificationToken: string
  ): Promise<IEmailVerificationMail>;
}
