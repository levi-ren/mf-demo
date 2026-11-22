import { federation } from "@module-federation/vite";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    federation({
      // dev: {
      //   remoteHmr: true,
      // },
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./cart-button": "./src/cart-button.tsx",
        "./cart-page": "./src/cart-page.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react/": { singleton: true },
        "react-dom/": { singleton: true },
        "react-router": { singleton: true },
        "@mf-demo/shared": { singleton: true },
        "@tanstack/react-query": { singleton: true },
      },
    }),
  ],
  server: {
    port: 3002,
    strictPort: true,
    origin: "http://localhost:3002",
  },
  preview: {
    port: 3002,
    strictPort: true,
  },
});
