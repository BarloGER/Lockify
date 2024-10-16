import * as ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ReactNode } from "react";
import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { router } from "./routes/Router";
import i18next from "../i18next";

// Defines the app and renders it
export const App = () => {
  return (
    <StrictMode>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </StrictMode>
  );
};

// Starts the app and renders it in the DOM
export const startApp = (Component: ReactNode): void => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(Component);
};

export const initializeApp = () => {
  startApp(<App />);
};
