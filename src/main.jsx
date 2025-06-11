import React from "react";
import ReactDOM from "react-dom/client"; // Use this for React 18
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use React 18 API
root.render(
  <React.StrictMode>
    {/* Remove basename if not hosting in a subdirectory */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
