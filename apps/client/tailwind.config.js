const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: "var(--color-background)",
        primaryColor: "var(--color-primary)",
        accentColor: "var(--color-accent)",
        textColor: "var(--color-text)",
        successColor: "var(--color-success)",
        errorColor: "var(--color-error)",
      },
      fontFamily: {
        sans: ['"Space Mono"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
