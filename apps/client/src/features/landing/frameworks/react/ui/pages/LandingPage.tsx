import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { MainTemplate } from "@global-ui/templates/MainTemplate";
import { LandingPresenter } from "@landing-interface-adapters/presenters";

export const LandingPage = (): JSX.Element => {
  const { t } = useTranslation();

  const presenter = useMemo(() => new LandingPresenter(), []);
  const viewModel = presenter.getViewModel();

  return (
    <MainTemplate>
      <section className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-textColor">{t(viewModel.labels.greeting)}</h1>
      </section>
    </MainTemplate>
  );
};
