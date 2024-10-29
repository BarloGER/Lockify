import { LandingViewModel } from "../view-models/LandingViewModel";

export class LandingPresenter {
  getViewModel(): LandingViewModel {
    return new LandingViewModel();
  }
}
