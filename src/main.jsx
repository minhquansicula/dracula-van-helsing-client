import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Tạm thời tắt StrictMode để tránh SignalR connect 2 lần trong lúc dev
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </React.StrictMode>,
);
