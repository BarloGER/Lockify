import { IRegisterGuestOutputPort } from "../../use-cases/register-guest/IRegisterGuestOutputPort";
import { IRegisterGuestResponseModel } from "../../use-cases/register-guest/IRegisterGuestResponseModel";
import { RegisterGuestViewModel } from "../view-models/RegisterGuestViewModel";

export class RegisterGuestPresenter implements IRegisterGuestOutputPort {
  private viewModel: RegisterGuestViewModel;
  private onViewModelUpdated:
    | ((viewModel: RegisterGuestViewModel) => void)
    | null = null;

  constructor() {
    this.viewModel = new RegisterGuestViewModel();
  }

  setOnViewModelUpdated(
    callback: (viewModel: RegisterGuestViewModel) => void
  ): void {
    this.onViewModelUpdated = callback;
    // Initiales ViewModel an die View senden
    this.onViewModelUpdated?.(this.viewModel);
  }

  async present(responseModel: IRegisterGuestResponseModel): Promise<void> {
    this.viewModel = {
      ...this.viewModel,
      responseData: {
        success: responseModel.success,
        message: responseModel.message || "",
      },
    };
    this.onViewModelUpdated?.(this.viewModel);
  }

  updateFormData(
    fieldName: keyof RegisterGuestViewModel["formData"],
    value: string | boolean
  ): void {
    this.viewModel = {
      ...this.viewModel,
      formData: {
        ...this.viewModel.formData,
        [fieldName]: value,
      },
    };
    this.onViewModelUpdated?.(this.viewModel);
  }

  getViewModel(): RegisterGuestViewModel {
    return this.viewModel;
  }
}
