import { LandingViewModel } from "@landing-interface-adapters/view-models";

export class LandingPresenter {
  getViewModel(): LandingViewModel {
    return new LandingViewModel();
  }
}
