import { ITranslator } from "@global-services/translation";
import {
  IRegisterGuestResponseModel,
  IRegisterGuestOutputPort,
} from "@user-management-use-cases/register-guest";

export class RegisterGuestPresenter implements IRegisterGuestOutputPort {
  private responseModel: IRegisterGuestResponseModel | null = null;

  async present(responseModel: IRegisterGuestResponseModel): Promise<void> {
    this.responseModel = responseModel;
  }

  getResponse(translator: ITranslator): IRegisterGuestResponseModel | null {
    if (!this.responseModel) {
      return null;
    }

    return {
      ...this.responseModel,
      message: translator.translate(this.responseModel.message),
    };
  }
}
