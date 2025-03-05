import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SessionContextProvider } from "@/context/SessionContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode bas>
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
  </StrictMode>
);
