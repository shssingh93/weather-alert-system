import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./components/dashboard";
import { Settings } from "./components/settings";
import Login from "./components/login";
import { Upload } from "antd";
import UploadForm from "./components/upload";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/temperature?-19.23,74.45" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/upload-form" element={<UploadForm />} />
      <Route path="/dashboard" element={<App />} />
      {/* <Route path="/settings" element={<Settings />} /> */}
      <Route path="/temperature" element={<App />} />
      <Route path="/pressure" element={<App />} />
      <Route path="/wind" element={<App />} />
      <Route path="/clouds" element={<App />} />
      <Route path="/precipitation" element={<App />} />
      <Route path="/rain" element={<App />} />
      {/* <Route path="/forecast-temperature" element={<App />} />
      <Route path="/forecast-pressure" element={<App />} />
      <Route path="/forecast-wind" element={<App />} />
      <Route path="/forecast-precipitation" element={<App />} />
      <Route path="/forecast-clouds" element={<App />} />
      <Route path="/forecast-wind" element={<App />} />
      <Route path="/forecast-rain" element={<App />} /> */}
      ``
    </Routes>
  </BrowserRouter>
);
