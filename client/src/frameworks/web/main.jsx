import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { validateEnvs } from "../configs/envConfig";
import "../configs/i18n";

validateEnvs();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
