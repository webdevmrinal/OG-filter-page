import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Divider,
} from "@mui/material";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = () => {
      const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
      setAppointments(storedAppointments);
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format the date as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  };

  return (
    <Box sx={{ p: 4, width: '100vw', height: '100vh', overflow: 'auto', backgroundColor: '#fff' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#000' }}>
        Appointments
      </Typography>
      {appointments.length > 0 ? (
        <Grid container spacing={3}>
          {appointments.map((appointment, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ 
                backgroundColor: 'rgba(173, 216, 230, 0.3)', // Slightly transparent blue background
                color: '#000',
                borderRadius: '8px', 
                overflow: 'hidden', 
                mx: 'auto', 
                p: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}>
                <CardContent sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', // Arrange items in column
                  alignItems: 'flex-start', // Align items to start of column
                  p: 2 
                }}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    Professor: {appointment.professorName}
                  </Typography>
                  <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                    <Chip
                      label={`Date: ${formatDate(appointment.date)}`}
                      color="primary"
                      sx={{ borderRadius: '16px', px: 1.5, py: 1 }}
                    />
                    <Chip
                      label={`Times: ${appointment.selectedTimes.join(", ")}`}
                      color="primary"
                      sx={{ borderRadius: '16px', px: 1.5, py: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                    <Chip
                      label={`Duration: ${appointment.duration} minutes`}
                      color="secondary"
                      sx={{ borderRadius: '16px', px: 1.5, py: 1 }}
                    />
                    <Chip
                      label={`Gift: ${appointment.isGift ? "Yes" : "No"}`}
                      color={appointment.isGift ? "success" : "default"}
                      sx={{ borderRadius: '16px', px: 1.5, py: 1 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ color: '#000' }}>No appointments found.</Typography>
      )}
    </Box>
  );
};

export default AppointmentsPage;
