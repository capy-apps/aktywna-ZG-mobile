import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerNotifications } from "./utils/notifications";
import { initializeApp } from "firebase/app";

registerNotifications();

const firebaseConfig = {
  apiKey: "AIzaSyBHLoQmnL2IKrVXDGPscJf3xue27gCf6Vg",
  authDomain: "aktywna-zg.firebaseapp.com",
  projectId: "aktywna-zg",
  storageBucket: "aktywna-zg.appspot.com",
  messagingSenderId: "220013259537",
  appId: "1:220013259537:web:c842feb4fc0884b3853ab0",
  measurementId: "G-RFHB1MPLEX"
};

const app = initializeApp(firebaseConfig);

const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
