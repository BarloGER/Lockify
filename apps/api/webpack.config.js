const { NxAppWebpackPlugin } = require("@nx/webpack/app-plugin");
const { join } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  output: {
    path: join(__dirname, "../../dist/apps/api"),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: "node",
      compiler: "tsc",
      main: "./src/main.ts",
      tsConfig: "./tsconfig.app.json",
      assets: ["./src/assets"],
      optimization: false,
      outputHashing: "none",
      generatePackageJson: true,
    }),
    // Kopiere die Übersetzungsdateien in den `dist`-Ordner
    new CopyWebpackPlugin({
      patterns: [{ from: "src/frameworks/i18next/locales", to: "locales" }],
    }),
  ],
};
