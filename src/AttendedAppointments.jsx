import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const AvatarWrapper = styled(Box)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const AttendedItem = ({ item }) => (
  <Box sx={{ display: "flex", mb: 2, alignItems: "flex-start" }}>
    <AvatarWrapper>
      <Avatar
        src={`https://academy.opengrowth.com/assets/images/users/${item.mentee_img}`}
        sx={{ width: 56, height: 56, mr: 2 }}
      />
    </AvatarWrapper>
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {item.mentee_name}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "primary.main", fontWeight: "600" }}
      >
        {item.idea}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {item.date_title} | {item.time_title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Requirement: {item.query}
      </Typography>
    </Box>
  </Box>
);

const AttendedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);

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
    <Paper elevation={0} sx={{ borderRadius: 2, border:"1px solid lightgray" }}>
      <Typography variant="h5" sx={{ p: 3, fontWeight: "bold" }}>
        Attended Appointments
      </Typography>
      <Divider />

      <Box sx={{ px: 3, py: 1 }}>
        {appointments.map((item) => (
          <AttendedItem key={item.meet_id} item={item} />
        ))}
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
          <CircularProgress />
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
