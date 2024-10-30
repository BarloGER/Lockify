import { IRegisterGuestRequestModel } from "./IRegisterGuestRequestModel";

export interface IRegisterGuestInputPort {
  registerGuest(requestModel: IRegisterGuestRequestModel): Promise<void>;
}
