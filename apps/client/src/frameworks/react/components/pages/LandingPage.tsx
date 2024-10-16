import { useTranslation } from "react-i18next";

export const LandingPage = (): JSX.Element => {
  const { t } = useTranslation();

  return <h1>{t("landingPage.greeting")}</h1>;
};
