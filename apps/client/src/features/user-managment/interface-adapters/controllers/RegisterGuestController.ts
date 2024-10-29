import { IRegisterGuestInputPort } from "../../use-cases/register-guest/IRegisterGuestInputPort";
import { IRegisterGuestRequestModel } from "../../use-cases/register-guest/IRegisterGuestRequestModel";

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
