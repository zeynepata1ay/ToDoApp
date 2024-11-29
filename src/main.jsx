import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import MainRouter from "./MainRouter.jsx";
import ErrorBoundary from "./components/shared/ErrorBoundary.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <MainRouter />
          </ErrorBoundary>
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
