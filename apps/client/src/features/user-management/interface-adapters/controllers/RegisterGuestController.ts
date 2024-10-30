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
      masterPassword,
      newsletterAccepted,
      termsAccepted,
    } = rawData;

    const requestModel: IRegisterGuestRequestModel = {
      username,
      email,
      password,
      masterPassword,
      newsletterAccepted,
      termsAccepted,
    };

    await this.interactor.registerGuest(requestModel);
  }
}
