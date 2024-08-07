import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Rating,
} from "@mui/material";
import { styled } from "@mui/system";
import GetTime from "./GetTime";
import Summary from "./Summary";

const ScrollableBox = styled(Box)({
  display: "flex",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
});

const ConfirmationBox = styled(Paper)({
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const SuccessMessage = styled(Typography)({
  backgroundColor: '#dff0d8',
  padding: '16px',
  borderRadius: '8px',
  color: '#3c763d',
  fontWeight: 'bold',
});

const TimeButton = styled(ToggleButton)(({ available }) => ({
  border: `2px solid ${available ? 'skyblue' : '#e0e0e0'}`,
  color: available ? 'skyblue' : '#e0e0e0',
  opacity: available ? 1 : 0.6,
  pointerEvents: available ? 'auto' : 'none',
  position: 'relative',
  borderRadius: '8px',
  height: '40px',
  width: '100px', // Adjust width as needed
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:after': {
    content: available ? '""' : '""',
    position: 'absolute',
    bottom: '4px', // Adjust positioning
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#e0e0e0',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

const SelectTime = ({ setShowGetTime, professorName }) => {
  const [duration, setDuration] = useState("15");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isGift, setIsGift] = useState(false);
  const [showGetTime1, setShowGetTime1] = useState(false);
  const [view, setView] = useState("selection");
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const handleDurationChange = (event, newDuration) => {
    if (newDuration !== null) {
      setDuration(newDuration);
    }
  };

  const handleTimeToggle = (time) => {
    if (time.available) {
      setSelectedTimes((prev) =>
        prev.includes(time.label)
          ? prev.filter((t) => t !== time.label)
          : [...prev, time.label]
      );
    }
  };

  const handleRequest = () => {
    setView("summary");
  };

  const handleCancel = () => {
    setView("selection");
  };

  const handleConfirm = () => {
    const appointment = {
      professorName,
      duration,
      selectedTimes,
      isGift,
      date: new Date().toLocaleString(),
    };

    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointment]));

    setView("confirmation");
  };

  const handleClose = () => {
    setDuration("15");
    setSelectedTimes([]);
    setIsGift(false);
    setDate(new Date().toLocaleDateString());
    setShowGetTime(false);
    setView("selection");
  };

  const times = [
    { label: "7-8p", available: true },
    { label: "8-9p", available: false },
    { label: "9-10p", available: true },
    { label: "10-11p", available: true },
    { label: "11-12a", available: false },
  ];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {view === "confirmation" ? (
        <ConfirmationBox>
          <SuccessMessage variant="h5" gutterBottom>
            Your request has been submitted successfully!
          </SuccessMessage>
          <Typography variant="subtitle1" gutterBottom>
            Professor: {professorName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Call Duration: {duration} minutes
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Selected Times: {selectedTimes.join(", ")}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Date: {date}
          </Typography>
          {isGift && (
            <Typography variant="subtitle1" gutterBottom>
              This is a gift.
            </Typography>
          )}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </ConfirmationBox>
      ) : view === "summary" ? (
        <Summary
          professorName={professorName}
          selectedTimes={selectedTimes}
          duration={duration}
          isGift={isGift}
          date={date}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      ) : (
        <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
          {showGetTime1 ? (
            <GetTime setShowGetTime1={setShowGetTime1} professorName={professorName} />
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                Book a Video Call
              </Typography>

              <ToggleButtonGroup
                value={duration}
                exclusive
                onChange={handleDurationChange}
                aria-label="call duration"
              >
                <ToggleButton value="15" aria-label="15 minutes">
                  Quick - 15 Min
                </ToggleButton>
                <ToggleButton value="30" aria-label="30 minutes">
                  Regular - 30 Min
                </ToggleButton>
                <ToggleButton value="45" aria-label="45 minutes">
                  Extra - 45 Min
                </ToggleButton>
                <ToggleButton value="60" aria-label="60 minutes">
                  All Access - 60 Min
                </ToggleButton>
              </ToggleButtonGroup>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                  />
                }
                label="Tap to send this as a gift"
                sx={{ mt: 2 }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2">Wednesday 8/7</Typography>
                <div>
                  <Typography variant="subtitle2">
                    Looking for a time not listed?
                  </Typography>
                  <Button size="small" onClick={() => setShowGetTime1(true)}>
                    Tap here to see available slots
                  </Button>
                </div>
              </Box>

              <ScrollableBox>
                {times.map((time) => (
                  <TimeButton
                    key={time.label}
                    value={time.label}
                    available={time.available}
                    selected={selectedTimes.includes(time.label)}
                    onChange={() => handleTimeToggle(time)}
                    sx={{ mr: 1 }}
                  >
                    {time.label}
                  </TimeButton>
                ))}
              </ScrollableBox>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Box>
                  <Typography variant="h6" component="span">
                    ₹4,999 • Session
                  </Typography>
                  <Rating value={5} readOnly size="small" sx={{ ml: 1 }} />
                  <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                    5.0 (40)
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={() => setShowGetTime(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRequest}
                  >
                    Request
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SelectTime;
