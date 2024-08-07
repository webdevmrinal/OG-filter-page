import React, { useState } from "react";
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

const appointmentsData = [
  { id: 1, name: "Vanshika Yadav", time: "02:29 PM - 02:59 PM" },
  { id: 2, name: "Vinay Kumar", time: "03:00 PM - 03:30 PM" },
  { id: 3, name: "Ruchi Pandey", time: "04:15 PM - 04:45 PM" },
  { id: 4, name: "Rakhi Kumari", time: "05:30 PM - 06:00 PM" },
  { id: 5, name: "Pooja Verma", time: "06:45 PM - 07:15 PM" },
  { id: 6, name: "Gunjan Sinha", time: "08:00 PM - 08:30 PM" },
  { id: 7, name: "Rahul Kumar", time: "09:15 PM - 09:45 PM" },
];

const StyledTab = styled(Tab)({
  textTransform: "none",
  minWidth: 0,
  fontWeight: "normal",
  color: "#5c5c5c",
  "&.Mui-selected": {
    fontWeight: "bold",
  },
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
    border: isSelected ? "1px solid #1976d2" : "1px solid #e0e0e0",
    backgroundColor: isSelected ? "transparent" : "#f5f5f5",
  },
}));

const AppointmentDashboard = () => {
  const [value, setValue] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#f4f7f9", minHeight: "100vh", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
          <StyledTab
            icon={<CalendarTodayIcon />}
            iconPosition="start"
            label={"Upcoming Appoinments (" + appointmentsData.length + ")"}
            color="#ffffff"
          />
          <StyledTab
            icon={<HourglassEmptyIcon />}
            iconPosition="start"
            label="Pending Request (0)"
          />
          <StyledTab
            icon={<BlockIcon />}
            iconPosition="start"
            label="Rejected Request (52)"
          />
          <StyledTab
            icon={<CheckCircleIcon />}
            iconPosition="start"
            label="Attended Appointments (43)"
          />
        </Tabs>
      </Box>
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upcoming Appoinments
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
