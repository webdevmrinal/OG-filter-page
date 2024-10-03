// AppointmentDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Skeleton,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"; // Corrected import
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RejectedRequestComponent from "./RejectedRequestComponent";
import AttendedAppointments from "./AttendedAppointments";
import axios from "axios";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { StyledTabs, StyledTab, StyledDivider } from './Course-Modules/Data';
import { AppointmentItem, OgAvatar } from "./Experts/Components/AppointmentStyle";

// Sample appointments data (you might fetch this from an API)
const appointmentsData = [
  { id: 1, name: "Vanshika Yadav", time: "02:29 PM - 02:59 PM" },
  { id: 2, name: "Vinay Kumar", time: "03:00 PM - 03:30 PM" },
  { id: 3, name: "Ruchi Pandey", time: "04:15 PM - 04:45 PM" },
  { id: 4, name: "Rakhi Kumari", time: "05:30 PM - 06:00 PM" },
  { id: 5, name: "Pooja Verma", time: "06:45 PM - 07:15 PM" },
  { id: 6, name: "Gunjan Sinha", time: "08:00 PM - 08:30 PM" },
  { id: 7, name: "Rahul Kumar", time: "09:15 PM - 09:45 PM" },
];

// Styled Components (Assuming these are correctly defined in their respective files)
const AppointmentItemComp = ({
  id,
  name,
  time,
  isSelected,
  setSelectedAppointment,
}) => {
  return (
    <AppointmentItem
      isSelected={isSelected}
      onClick={() => setSelectedAppointment(id)}
    >
      <OgAvatar
        src="https://academy.opengrowth.com/assets/images/users/user_39_student_vi.png"
        sx={{
          mr: 2,
          height: { xs: "60px", sm: "90px" },
          width: { xs: "60px", sm: "90px" },
          alignSelf: { xs: 'center', sm: 'center' },
        }}
      />
      <Box sx={{ flexGrow: 1, mt: { xs: 1, sm: 0 } }}>
        <Typography variant="subtitle1">{name}</Typography>
        <Box display='flex' alignItems='center'>
          <CalendarTodayIcon sx={{ width: '0.5em', height: '0.7em', mr: 0.3, color: 'text.secondary' }}/>
          <Typography variant="body2" color="text.secondary">
            Thursday, August 08, 2024 | {time}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Requirement: Specific requirement details here, Specific requirement details here, Specific requirement details here, Specific requirement details here, Specific requirement details here
        </Typography>
      </Box>
    </AppointmentItem>
  );
};

const AppointmentDashboard = () => {
  const [value, setValue] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [tabCounts, setTabCounts] = useState({
    attended: 0,
    pending: 0,
    rejected: 0,
    upcoming: 0,
  });
  const [initialLoading, setInitialLoading] = useState(true); // Handles initial load
  const [tabLoading, setTabLoading] = useState(false); // Handles tab change loading
  const theme = useTheme(); // Corrected theme import
  const isFirstRender = useRef(true); // To prevent loading on initial mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://academy.opengrowth.com/api/get_tab_request_count",
          {
            user: "mentor",
            m_id: "1",
          }
        );
        setTabCounts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setInitialLoading(false); // Set initial loading to false after fetching
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevent loading on initial mount
      return;
    }

    setTabLoading(true); // Start loading when tab changes

    // Simulate data fetching delay (e.g., API call)
    const timer = setTimeout(() => {
      setTabLoading(false); // End loading after delay
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderContent = () => {
    if (initialLoading) {
      // Render Skeletons for initial load (e.g., fetching tabCounts)
      return (
        <Box sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
          <Skeleton
            variant="text"
            width="30%"
            height={30}
            sx={{ mb: 1 }}
            animation="wave"
            aria-hidden="true"
          />
          <Divider sx={{ width: "100%", mb: 3 }} />
          <Grid container spacing={2}>
            {Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    bgcolor: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                    p: 1,
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={60}
                    height={60}
                    sx={{ mr: 2 }}
                    animation="wave"
                    aria-hidden="true"
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={24}
                      sx={{ mb: 1 }}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={20}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Skeleton
                      variant="text"
                      width="90%"
                      sx={{ mt: 1 }}
                      animation="wave"
                      aria-hidden="true"
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
          >
            You have seen it all
          </Typography>
        </Box>
      );
    }

    if (tabLoading) {
      // Render Skeletons for tab content loading
      switch (value) {
        case 0:
          // Upcoming Appointments Skeletons
          return (
            <Box sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Upcoming Appointments
              </Typography>
              <Divider sx={{ width: "100%", mb: 3 }} />
              <Grid container spacing={2}>
                {Array.from(new Array(3)).map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        bgcolor: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        borderRadius: "8px",
                        p: 1,
                      }}
                    >
                      <Skeleton
                        variant="circular"
                        width={60}
                        height={60}
                        sx={{ mr: 2 }}
                        animation="wave"
                        aria-hidden="true"
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton
                          variant="text"
                          width="80%"
                          height={24}
                          sx={{ mb: 1 }}
                          animation="wave"
                          aria-hidden="true"
                        />
                        <Skeleton
                          variant="text"
                          width="60%"
                          height={20}
                          animation="wave"
                          aria-hidden="true"
                        />
                        <Skeleton
                          variant="text"
                          width="90%"
                          sx={{ mt: 1 }}
                          animation="wave"
                          aria-hidden="true"
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="body2"
                sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
              >
                You have seen it all
              </Typography>
            </Box>
          );
        case 1:
          // Rejected Requests Skeletons
          return (
            <Box sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Rejected Requests
              </Typography>
              <Divider sx={{ width: "100%", mb: 3 }} />
              <Grid container spacing={2}>
                {Array.from(new Array(3)).map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        bgcolor: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        borderRadius: "8px",
                        p: 1,
                      }}
                    >
                      <Skeleton
                        variant="circular"
                        width={60}
                        height={60}
                        sx={{ mr: 2 }}
                        animation="wave"
                        aria-hidden="true"
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton
                          variant="text"
                          width="80%"
                          height={24}
                          sx={{ mb: 1 }}
                          animation="wave"
                          aria-hidden="true"
                        />
                        <Skeleton
                          variant="text"
                          width="60%"
                          height={20}
                          animation="wave"
                          aria-hidden="true"
                        />
                        <Skeleton
                          variant="text"
                          width="90%"
                          sx={{ mt: 1 }}
                          animation="wave"
                          aria-hidden="true"
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="body2"
                sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
              >
                You have seen it all
              </Typography>
            </Box>
          );
        case 2:
          // Attended Appointments Skeletons
          return (
            <Box sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Attended Appointments
              </Typography>
              <Divider sx={{ width: "100%", mb: 3 }} />
              <Grid container spacing={2}>
                {Array.from(new Array(3)).map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        bgcolor: "#fff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        borderRadius: "8px",
                        p: 1,
                      }}
                    >
                      <Skeleton
                        variant="circular"
                        width={60}
                        height={60}
                        sx={{ mr: 2 }}
                        animation="wave"
                        aria-hidden="true"
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton
                          variant="text"
                          width="80%"
                          height={24}
                          sx={{ mb: 1 }}
                          animation="wave"
                          aria-hidden="true"
                        />
                        <Skeleton
                          variant="text"
                          width="60%"
                          height={20}
                          animation="wave"
                          aria-hidden="true"
                        />
                        <Skeleton
                          variant="text"
                          width="90%"
                          sx={{ mt: 1 }}
                          animation="wave"
                          aria-hidden="true"
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="body2"
                sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
              >
                You have seen it all
              </Typography>
            </Box>
          );
        default:
          return null;
      }
    };

    if (!initialLoading && !tabLoading) {
      // Render actual content when not loading
      switch (value) {
        case 0:
          return (
            <Box sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Upcoming Appointments
              </Typography>
              <Divider sx={{ width: "100%", mb: 3 }} />
              {appointmentsData.map((appointment) => (
                <AppointmentItemComp
                  key={appointment.id}
                  id={appointment.id}
                  name={appointment.name}
                  time={appointment.time}
                  isSelected={selectedAppointment === appointment.id}
                  setSelectedAppointment={setSelectedAppointment}
                />
              ))}
              <Typography
                variant="body2"
                sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
              >
                You have seen it all
              </Typography>
            </Box>
          );
        case 1:
          return <RejectedRequestComponent />;
        case 2:
          return <AttendedAppointments />;
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#f4f7f9",
          minHeight: "100vh",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              p: 2,
              borderColor: "divider",
            }}
          >
            {initialLoading ? (
              // Render Skeletons for Tabs while initial loading
              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <Skeleton
                  variant="rectangular"
                  width={250}
                  height={48}
                  sx={{ borderRadius: 2 }}
                  animation="wave"
                  aria-hidden="true"
                />
                <Skeleton
                  variant="rectangular"
                  width={250}
                  height={48}
                  sx={{ borderRadius: 2 }}
                  animation="wave"
                  aria-hidden="true"
                />
                <Skeleton
                  variant="rectangular"
                  width={250}
                  height={48}
                  sx={{ borderRadius: 2 }}
                  animation="wave"
                  aria-hidden="true"
                />
              </Box>
            ) : (
              // Render actual StyledTabs when not loading
              <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="appointment tabs"
                variant="scrollable" // Makes the tabs scrollable
                scrollButtons="auto" // Shows scroll buttons automatically if needed
                allowScrollButtonsMobile // Enables scroll buttons on mobile as well
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  marginBottom: { xs: 2, sm: 0 },
                }}
              >
                <StyledTab
                  icon={<EventAvailableIcon sx={{ color: "#81c784" }} />}
                  iconPosition="start"
                  label={`Upcoming Appointments (${tabCounts.upcoming})`}
                />
                <StyledTab
                  icon={<EventBusyIcon sx={{ color: "#e57373" }} />}
                  iconPosition="start"
                  label={`Rejected Requests (${tabCounts.rejected})`}
                />
                <StyledTab
                  icon={<EventNoteIcon sx={{ color: "#505f96" }} />}
                  iconPosition="start"
                  label={`Attended Appointments (${tabCounts.attended})`}
                />
              </StyledTabs>
            )}
          </Box>
          {renderContent()}
        </Paper>
      </Box>
    </>
  );
};

export default AppointmentDashboard;
