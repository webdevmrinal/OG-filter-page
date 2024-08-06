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
    <Box sx={{ p: 4, width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Appointments
      </Typography>
      {appointments.length > 0 ? (
        <Grid container spacing={3}>
          {appointments.map((appointment, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                width: '100%',  
                mx: 'auto', 
                p: 3,
              }}>
                <CardContent sx={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  p: 2 
                }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    Professor: {appointment.professorName}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No appointments found.</Typography>
      )}
    </Box>
  );
};

export default AppointmentsPage;
