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
  backgroundColor: '#ffffff', // Default background
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const SuccessMessage = styled(Typography)({
  backgroundColor: '#dff0d8',
  padding: '16px',
  borderRadius: '8px',
  color: '#3c763d', // Green text color
  fontWeight: 'bold',
});

const GetTime = ({ setShowGetTime, professorName }) => {
  const [duration, setDuration] = useState("15");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isGift, setIsGift] = useState(false);
  const [view, setView] = useState("selection");

  const handleDurationChange = (event, newDuration) => {
    if (newDuration !== null) {
      setDuration(newDuration);
    }
  };

  const handleTimeToggle = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSelectAll = () => {
    setSelectedTimes(times);
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

  const getDateString = (date) => date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const formattedToday = getDateString(today);
  const formattedTomorrow = getDateString(tomorrow);
  const formattedDayAfter = getDateString(dayAfterTomorrow);

  const times = {
    [formattedToday]: ["7-8p", "8-9p", "9-10p", "10-11p", "11-12a"],
    [formattedTomorrow]: ["7-8p", "8-9p", "9-10p", "10-11p", "11-12a"],
    [formattedDayAfter]: ["7-8p", "8-9p", "9-10p", "10-11p", "11-12a"]
  };

  return (
    <>
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
          {isGift && (
            <Typography variant="subtitle1" gutterBottom>
              This is a gift.
            </Typography>
          )}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="primary" onClick={() => setShowGetTime(false)}>
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
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Request a time
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            1) Select the call duration:
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
          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            2) Select all of the times you're available for a video session
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle2">{formattedToday}</Typography>
            <Button size="small" onClick={handleSelectAll}>
              Select all
            </Button>
          </Box>
          <ScrollableBox>
            {times[formattedToday].map((time) => (
              <ToggleButton
                key={time}
                value={time}
                selected={selectedTimes.includes(time)}
                onChange={() => handleTimeToggle(time)}
                sx={{ mr: 1 }}
              >
                {time}
              </ToggleButton>
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
                ₹49,999 • Session
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
              <Button variant="contained" color="primary" onClick={handleRequest}>
                Request
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default GetTime;
