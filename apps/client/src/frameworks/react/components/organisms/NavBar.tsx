import { useTranslation } from "react-i18next";

export const NavBar = (): JSX.Element => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <nav className="h-full w-full flex items-center px-4 bg-backgroundColor">
      <span className="text-textColor font-bold text-lg">Navigation</span>
      <button onClick={() => changeLanguage("de")}>DE</button>
      <button onClick={() => changeLanguage("en")}>EN</button>
    </nav>
  );
};
