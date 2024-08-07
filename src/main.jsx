import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import ProfilePage from "./ProfilePage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppointmentDashboard from "./AppointmentDashboard.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#25387c",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="bg-zinc-200 p-4 h-screen w-screen overflow-x-hidden">
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile/:expertName" element={<ProfilePage />} />
            <Route path="/appointments" element={<AppointmentDashboard />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
