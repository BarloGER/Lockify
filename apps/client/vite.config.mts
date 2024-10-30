/// <reference types='vitest' />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import path from "path";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/client",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@global-frameworks": path.resolve(__dirname, "./src/global/frameworks"),
      "@global-ui": path.resolve(__dirname, "./src/global/frameworks/react/ui"),
      "@global-services": path.resolve(__dirname, "./src/global/services"),

      "@user-management-entities": path.resolve(
        __dirname,
        "./src/features/user-management/entities"
      ),
      "@user-management-ui": path.resolve(
        __dirname,
        "./src/features/user-management/frameworks/react/ui"
      ),
      "@user-management-interface-adapters": path.resolve(
        __dirname,
        "./src/features/user-management/interface-adapters"
      ),
      "@user-management-use-cases": path.resolve(
        __dirname,
        "./src/features/user-management/use-cases"
      ),

      "@landing-ui": path.resolve(
        __dirname,
        "./src/features/landing/frameworks/react/ui"
      ),
      "@landing-interface-adapters": path.resolve(
        __dirname,
        "./src/features/landing/interface-adapters"
      ),
    },
  },

  server: {
    port: 4200,
    host: "0.0.0.0",
  },

  preview: {
    port: 4300,
    host: "localhost",
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../dist/apps/client",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
