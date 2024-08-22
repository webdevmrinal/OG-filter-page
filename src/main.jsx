import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./ProfilePage.jsx";
import Appointments from "./Appointments.jsx";
import ExpertPage from "./ExpertPage.jsx";
import ExpertPage2 from "./ExpertPage2.jsx";
import DashboardPage from "./DashboardPage.jsx";
import MyConnections from "./MyConnection.jsx";
import AppointmentDashboard from "./AppointmentDashboard.jsx";
import DetailPage from "./DetailView.jsx";
import TransactionHistory from "./TransactionHistory.jsx";
import Layout from "./Layout.jsx";
import App from "./App.jsx";
import MyFollowers from "./MyFollowers.jsx";
import App2 from "./signup-login/App";
import LoginPage from "./signup-login/LoginPage";
import SignupPage from "./signup-login/SignupNew";
import MyCourse from "./MyCourse.jsx";
import CourseDescription from "./CourseDescription.jsx";
import SearchCourse from "./SearchCourse.jsx";
import CourseDashboard from "./CourseDashboard.jsx";
import Homepage from "./homepage/Homepage.jsx";
import CourseIntroduction from "./Course-Modules/Introduction.jsx";

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
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="profile/:expertName" element={<ProfilePage />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="dashboardpage" element={<DashboardPage />} />
          <Route path="expertPage" element={<ExpertPage />} />
          <Route path="expertPage2" element={<ExpertPage2 />} />
          <Route path="connections" element={<MyConnections />} />
          <Route path="appointmentpage" element={<AppointmentDashboard />} />
          <Route path="detail/:expertName" element={<DetailPage />} />
          <Route path="transaction" element={<TransactionHistory />} />
          <Route path="followers" element={<MyFollowers />} />
          <Route path="get-started" element={<App2 />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="mycourse" element={<MyCourse />} />
          <Route path="searchcourse" element={<SearchCourse />} />
          <Route path="coursedashboard" element={<CourseDashboard />} />
          <Route path="course/:courseId" element={<CourseDescription />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="course-intro" element={<CourseIntroduction />} />
        </Route>
      </Routes>
    </Router>
  </ThemeProvider>
);
