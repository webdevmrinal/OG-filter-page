import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { GoogleMeetIcon } from "./Icon";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RejectedRequestComponent from "./RejectedRequestComponent";
import AttendedAppointments from "./AttendedAppointments";
import axios from "axios";
import Header from "./Header";

const appointmentsData = [
  { id: 1, name: "Vanshika Yadav", time: "02:29 PM - 02:59 PM" },
  { id: 2, name: "Vinay Kumar", time: "03:00 PM - 03:30 PM" },
  { id: 3, name: "Ruchi Pandey", time: "04:15 PM - 04:45 PM" },
  { id: 4, name: "Rakhi Kumari", time: "05:30 PM - 06:00 PM" },
  { id: 5, name: "Pooja Verma", time: "06:45 PM - 07:15 PM" },
  { id: 6, name: "Gunjan Sinha", time: "08:00 PM - 08:30 PM" },
  { id: 7, name: "Rahul Kumar", time: "09:15 PM - 09:45 PM" },
];

const StyledTabs = styled(Tabs)({
  "& .MuiTab-root": {
    textTransform: "none",
    minHeight: "48px",
    padding: "6px 16px",
    fontWeight: "normal",
    fontSize: "14px",
    color: "#5f6368",
    "&:hover": {
      color: "#202124",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#25387c",
      fontWeight: "medium",
    },
  },
});

const StyledTab = styled(Tab)({
  "& .MuiSvgIcon-root": {
    marginRight: "8px",
  },
});

const iconStyle = (color) => ({
  color: color,
  marginRight: "8px",
});

const AppointmentItem = styled(Box)(({ theme, isSelected }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  margin: "8px 0",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  border: isSelected ? "2px solid #25387c" : "1px solid #e0e0e0",
  backgroundColor: isSelected ? "#f5f5f5" : "transparent",
  boxShadow: isSelected ? "0 2px 4px rgba(0,0,0,0.15)" : "none",
  "&:hover": {
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
    border: "2px solid rgba(37, 56, 124, 0.5)",
  },
}));

const AppointmentDashboard = () => {
  const [value, setValue] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [tabCounts, setTabCounts] = useState({
    attended: 0,
    pending: 0,
    rejected: 0,
    upcoming: 0,
  });

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
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderContent = () => {
    switch (value) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upcoming Appointments
            </Typography>
            <Divider sx={{ width: "100%", mb: 2, alignSelf: "center" }} />
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
  };

  return (
    <>
      <Header />
      <Box sx={{ width: "100%", bgcolor: "#f4f7f9", minHeight: "100vh", p: 3 }}>
        <Box sx={{ display: "flex", p: 2, borderColor: "divider" }}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="appointment tabs"
          >
            <StyledTab
              icon={<EventAvailableIcon sx={{ color: "green" }} />}
              iconPosition="start"
              label={`Upcoming Appoinments (${tabCounts.upcoming})`}
            />
            <StyledTab
              icon={<EventBusyIcon sx={{ color: "red" }} />}
              iconPosition="start"
              label={`Rejected Request (${tabCounts.rejected})`}
            />
            <StyledTab
              icon={<EventNoteIcon sx={{ color: "blue" }} />}
              iconPosition="start"
              label={`Attended Appointments (${tabCounts.attended})`}
            />
          </StyledTabs>
        </Box>
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
          {renderContent()}
        </Paper>
      </Box>
    </>
  );
};

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
      sx={{ cursor: "pointer" }}
    >
      <Avatar
        src="https://academy.opengrowth.com/assets/images/users/user_791_student_collaborate.png"
        sx={{ bgcolor: "#3f51b5", mr: 2, height: "80px", width: "80px" }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Thursday, August 08, 2024 | {time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Requirement : Specific requirement details here
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#3f51b5",
          color: "white",
          textTransform: "none",
          "&:hover": { bgcolor: "#303f9f" },
        }}
      >
        Join With Google Meet
      </Button>
    </AppointmentItem>
  );
};

export default AppointmentDashboard;
