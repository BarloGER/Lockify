import { IRegisterGuestResponseModel } from "./IRegisterGuestResponseModel";

export interface IRegisterGuestOutputPort {
  present(responseModel: IRegisterGuestResponseModel): Promise<void>;
}
