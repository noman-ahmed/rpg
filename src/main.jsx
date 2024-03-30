import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./auth/AuthContext"; // Adjust the import path as necessary
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
