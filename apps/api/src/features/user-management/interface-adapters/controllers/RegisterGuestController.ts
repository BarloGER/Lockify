import {
  IRegisterGuestInputPort,
  IRegisterGuestRequestModel,
} from "@user-management-use-cases/register-guest";

export class RegisterGuestController {
  constructor(private readonly interactor: IRegisterGuestInputPort) {}

  async registerGuest(rawData: IRegisterGuestRequestModel): Promise<void> {
    const {
      username,
      email,
      password,
      encryptedSecret,
      secretEncryptionIv,
      secretEncryptionSalt,
      newsletterAccepted,
      termsAccepted,
    } = rawData;

    const requestModel: IRegisterGuestRequestModel = {
      username,
      email,
      password,
      newsletterAccepted,
      encryptedSecret,
      secretEncryptionIv,
      secretEncryptionSalt,
      termsAccepted,
    };

    await this.interactor.registerGuest(requestModel);
  }
}
