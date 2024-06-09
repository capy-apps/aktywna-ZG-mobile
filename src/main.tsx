import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerNotifications } from "./utils/notifications";

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient();

registerNotifications();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
