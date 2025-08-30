import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Global styles
import DescriptiveProjectPage from "./pages/DescriptiveProjectPage";
import { ThemeProvider } from "./contexts/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/project/:id" element={<DescriptiveProjectPage />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
