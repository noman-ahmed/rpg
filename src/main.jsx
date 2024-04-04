import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext"; // Ensure the path is correct
import "./global.css";

// Ensure 'root' element exists in your index.html
const container = document.getElementById("root");
// Check if container is not null to satisfy TypeScript (if used) and prevent runtime errors
if (container) {
  const root = createRoot(container); // Create a root instance
  root.render(
    <React.StrictMode>
      <AuthProvider>
        {" "}
        {/* Wrap your app in AuthProvider */}
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
