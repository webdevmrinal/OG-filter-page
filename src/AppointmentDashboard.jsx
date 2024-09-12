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
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RejectedRequestComponent from "./RejectedRequestComponent";
import AttendedAppointments from "./AttendedAppointments";
import axios from "axios";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { StyledTabs, StyledTab, StyledDivider } from './Course-Modules/Data';

const appointmentsData = [
  { id: 1, name: "Vanshika Yadav", time: "02:29 PM - 02:59 PM" },
  { id: 2, name: "Vinay Kumar", time: "03:00 PM - 03:30 PM" },
  { id: 3, name: "Ruchi Pandey", time: "04:15 PM - 04:45 PM" },
  { id: 4, name: "Rakhi Kumari", time: "05:30 PM - 06:00 PM" },
  { id: 5, name: "Pooja Verma", time: "06:45 PM - 07:15 PM" },
  { id: 6, name: "Gunjan Sinha", time: "08:00 PM - 08:30 PM" },
  { id: 7, name: "Rahul Kumar", time: "09:15 PM - 09:45 PM" },
];

// const StyledTabs = styled(Tabs)(({ theme }) => ({
//   "& .MuiTab-root": {
//     textTransform: "none",
//     minHeight: "48px",
//     padding: "6px 16px",
//     fontWeight: "normal",
//     fontSize: "14px",
//     color: "#5f6368",
//     "&:hover": {
//       color: "#202124",
//       opacity: 1,
//     },
//     "&.Mui-selected": {
//       color: "#25387c",
//       fontWeight: "medium",
//     },
//   },
//   "& .MuiTabs-flexContainer": {
//     flexDirection: { xs: "column", sm: "row" },
//   }
// }));

// const StyledTab = styled(Tab)({
//   "& .MuiSvgIcon-root": {
//     marginRight: "8px",
//   },
// });

const AppointmentItem = styled(Box)(({ theme, isSelected }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  margin: "8px 0",
  borderRadius: "4px",
  transition: "all 0.3s ease",
  backgroundColor: isSelected ? "#f5f5f5" : "transparent",
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
  flexDirection: { xs: 'column', sm: 'row' },
  gap: { xs: 2, sm: 0 },
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
  };

  return (
    <>
      <Box sx={{
        width: "100%",
        bgcolor: "#f4f7f9",
        minHeight: "100vh",
        p: { xs: 2, sm: 3 },
      }}>
        
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          p: 2,
          borderColor: "divider",
        }}>
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
          
        </Box>
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
      sx={{
        display: 'flex', 
        alignItems: 'flex-start', 
        p: { xs: 2, sm: 2 },
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        height: { xs: 'auto', sm: '19vh' },
        flexDirection: { xs: 'column', sm: 'row' },
        mb: 2,
        "&:hover": {
          backgroundColor: "#0000000a",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Avatar
        src="https://academy.opengrowth.com/assets/images/users/user_39_student_vi.png"
        sx={{  mr: 2, height: { xs: "60px", sm: "90px" }, width: { xs: "60px", sm: "90px" },alignSelf: { xs: 'center', sm: 'center' }, }}
      />
      <Box sx={{ flexGrow: 1, mt: { xs: 1, sm: 0 } }}>
        <Typography variant="subtitle1">{name}</Typography>
        <Box display='flex'>
          <CalendarTodayIcon sx={{ width: '0.5em', height: '0.7em', mr: 0.3, color: 'text.secondary' }}/>
          <Typography variant="body2" color="text.secondary">
            Thursday, August 08, 2024 | {time}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Requirement: Specific requirement details here, Specific requirement details here, Specific requirement details here, Specific requirement details here,Specific requirement details here
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          mt: { xs: 1, sm: 0 },
          backgroundColor: '#505f96',
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
