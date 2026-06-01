import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // MUST exist

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProctoringProvider } from "./context/ProctoringContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProctoringProvider>
          <App />
        </ProctoringProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
