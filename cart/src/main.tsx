import { AuthProvider, queryClient, QueryDevTool } from "@mf-demo/shared";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider customSession={{ id: 1, token: "asd" }}>
      <QueryClientProvider client={queryClient}>
        <App />
        <QueryDevTool />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
