import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import ProfilePage from "./ProfilePage.jsx";
import Appointments from "./Appointments.jsx";
import ExpertPage from "./ExpertPage.jsx";
import ExpertPage2 from "./ExpertPage2.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./DashboardPage.jsx";
import MyConnections from "./MyConnection.jsx";
import AppointmentDashboard from "./AppointmentDashboard.jsx";
import DetailPage from "./DetailView.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#25387c",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="bg-zinc-200 p-4 h-screen w-screen overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile/:expertName" element={<ProfilePage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/expertPage" element={<ExpertPage />} />
          <Route path="/expertPage2" element={<ExpertPage2 />} />
          <Route path="/dashboardpage" element={<DashboardPage />} />
          <Route path="/connections" element={<MyConnections />} />
          <Route path="/appointmentpage" element={<AppointmentDashboard />} />
          <Route path="/detail" element={<DetailPage />} />
        </Routes>
      </Router>
    </div>
  </ThemeProvider>
);
