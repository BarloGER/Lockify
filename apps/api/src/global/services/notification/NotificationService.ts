import { IEmailVerificationMail } from "./IEmailVerificationMail";
import { INotificationService } from "./INotificationService";

export class NotificationService implements INotificationService {
  async sendEmailVerificationMail(
    emailAddress: string,
    emailVerificationToken: string
  ): Promise<IEmailVerificationMail> {
    try {
      console.log(
        `Email with email verification token ${emailVerificationToken} successfuly send to ${emailAddress}`
      );

      return {
        success: true,
        message: `Email with email verification token ${emailVerificationToken} successfuly send to ${emailAddress}`,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: `Error while sending email verification mail to ${emailAddress}`,
      };
    }
  }
}
