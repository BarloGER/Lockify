import { ITranslator } from "../../../../services/translation/ITranslator";
import { IRegisterGuestOutputPort } from "../../use-cases/register-guest/IRegisterGuestOutputPort";
import { IRegisterGuestResponseModel } from "../../use-cases/register-guest/IRegisterGuestResponseModel";

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
