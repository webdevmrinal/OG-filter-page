import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Avatar,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { GoogleMeetIcon } from "./Icons";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RejectedRequestComponent from "./RejectedRequestComponent";
import AttendedAppointments from "./AttendedAppointments";
import axios from "axios";

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
  borderBottom: "1px solid #e0e0e0",
  borderRadius: "8px",
  transition: "all 0.2s ease",
  border: isSelected ? "1px solid #25387c" : "1px solid transparent",
  backgroundColor: isSelected ? "#f5f5f5" : "transparent",
  "&:hover": {
    border: isSelected ? "1px solid #25387c" : "1px solid #e0e0e0",
    backgroundColor: isSelected ? "#f5f5f5" : "#f5f5f5",
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
        return <Typography sx={{ p: 3 }}>No pending requests.</Typography>;
      case 2:
        return <RejectedRequestComponent />;
      case 3:
        return <AttendedAppointments />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#f4f7f9", minHeight: "100vh", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="appointment tabs"
        >
          <StyledTab
            icon={<CalendarTodayIcon sx={iconStyle("#34a853")} />}
            iconPosition="start"
            label={`Upcoming Appoinments (${tabCounts.upcoming})`}
          />
          <StyledTab
            icon={<HourglassEmptyIcon sx={iconStyle("#fbbc04")} />}
            iconPosition="start"
            label={`Pending Request (${tabCounts.pending})`}
          />
          <StyledTab
            icon={<BlockIcon sx={iconStyle("#ea4335")} />}
            iconPosition="start"
            label={`Rejected Request (${tabCounts.rejected})`}
          />
          <StyledTab
            icon={<CheckCircleIcon sx={iconStyle("primary.main")} />}
            iconPosition="start"
            label={`Attended Appointments (${tabCounts.attended})`}
          />
        </StyledTabs>
      </Box>
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
        {renderContent()}
      </Paper>
    </Box>
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
      sx={{ cursor: "pointer", mb: 2 }}
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
          test
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Thursday, August 08, 2024 | {time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Requirement : test
        </Typography>
      </Box>
      <Button
        variant="disabled"
        sx={{
          bgcolor: "#f1f3f4",
          color: "#202124",
          textTransform: "none",
          "&:hover": { bgcolor: "#e8eaed" },
        }}
      >
        <GoogleMeetIcon />
        Join With Google Meet
      </Button>
    </AppointmentItem>
  );
};

export default AppointmentDashboard;
