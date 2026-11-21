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
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        products: {
          type: "module",
          name: "products",
          entry: "http://localhost:3001/remoteEntry.js",
        },
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react/": { singleton: true },
        "react-dom/": { singleton: true },
        "@mf-demo/shared": { singleton: true },
        "@tanstack/react-query": { singleton: true },
      },
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
    origin: "http://localhost:3000",
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
