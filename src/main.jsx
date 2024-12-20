import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode FallbackComponent={ErrorFallback}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
