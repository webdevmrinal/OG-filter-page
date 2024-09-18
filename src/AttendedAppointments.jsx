import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Paper,
  Divider,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AppointmentItem, AvatarWrapper, OgAvatar } from "./Experts/Components/AppointmentStyle";

const AttendedItemSkeleton = ({ isMobile }) => (
  <AppointmentItem isMobile={isMobile}>
    <Skeleton
      variant="circular"
      width={56}
      height={56}
      sx={{ mr: isMobile ? 0 : 2, mb: isMobile ? 2 : 0 }}
      animation="wave"
    />
    <Box sx={{ flexGrow: 1 }}>
      <Skeleton variant="text" width="40%" animation="wave" />
      <Skeleton variant="text" width="60%" animation="wave" />
      <Skeleton variant="text" width="30%" animation="wave" />
      <Skeleton variant="text" width="50%" animation="wave" />
    </Box>
  </AppointmentItem>
);

const AttendedItem = ({ item, isMobile }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    navigate('/projects'); // Navigate to the Projects page
  };

  return (
    <AppointmentItem onClick={handleCardClick} isMobile={isMobile}>
      <AvatarWrapper>
        <OgAvatar
          src={`https://academy.opengrowth.com/assets/images/users/${item.mentee_img}`}
        />
      </AvatarWrapper>
      <Box>
        <Typography variant="subtitle1">{item.mentee_name}</Typography>
        <Typography variant="subtitle2">{item.idea}</Typography>
        <Box display={"flex"} mt={0.5}>
          <CalendarTodayIcon
            sx={{
              width: "0.5em",
              height: "0.7em",
              mr: 0.5,
              color: "text.secondary",
              paddingTop: "1px",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {item.date_title} | {item.time_title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Requirement: {item.query}
        </Typography>
      </Box>
    </AppointmentItem>
  );
};

const AttendedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's mobile

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://academy.opengrowth.com/api/get_user_specific_mentorship",
        {
          mentee_id: "1",
          start: start,
          end: 10,
          user: "mentor",
          mentorship_type: "attended",
          m_id: "1",
          key: `1_upcoming_mentorship_${start}_to_10`,
        }
      );
      setAppointments((prev) => [...prev, ...response.data]);
      setStart((prev) => prev + 10);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: 2,  width: isMobile ? "100%" : "auto" }}
    >
      <Typography variant="h6" sx={{ px: 3, py: 1 }}>
        Attended Appointments
      </Typography>
      <Divider sx={{ width: "96%", alignSelf: "center", mb: 1, ml: 3 }} />

      <Box sx={{ px: 3, py: 1 }}>
        {appointments.map((item) => (
          <AttendedItem key={item.meet_id} item={item} isMobile={isMobile} />
        ))}
      </Box>
      {loading ? (
        <Box sx={{ px: 3, py: 1 }}>
          <AttendedItemSkeleton isMobile={isMobile} />
          <AttendedItemSkeleton isMobile={isMobile} />
          <AttendedItemSkeleton isMobile={isMobile} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Button variant="outlined" onClick={fetchAppointments}>
            Load More
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default AttendedAppointments;
