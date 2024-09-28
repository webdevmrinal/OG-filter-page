// SelectTime.jsx
import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  useTheme,
  Grid,
  Divider,
} from "@mui/material";
import { addDays, format } from "date-fns";
import SummaryConfirmationView from "./SummaryConfirmationView";
import {
  TimeButton,
  ScrollableBox,
} from "./Experts/Components/TimeStyles";
import PaymentComponent from "./Profile-Slot-Booking/PaymentPage";
import UserDetailsForm from "./Profile-Slot-Booking/UserDetailsForm";
import { ButtonContainer } from "./Experts/Components/ProfileStyles";
import MobileNumberInput from "./Profile-Slot-Booking/MobileInput";
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs
import { Link } from "react-router-dom";

const SelectTime = ({ setShowGetTime, professorName, profileType, expertImage }) => {
  const [duration, setDuration] = useState("15");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isGift, setIsGift] = useState(false);
  const [showGetTime1, setShowGetTime1] = useState(false);
  const [view, setView] = useState("selection");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [showAllDays, setShowAllDays] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openContactModal, setOpenContactModal] = useState(false);
  const [userData, setUserData] = useState({}); // Initialize as an empty object

  const handleOpenContactModal = () => {
    setOpenContactModal(true);
  };

  const handleCloseContactModal = () => {
    setOpenContactModal(false);
  };

  const handleDurationChange = (event, newDuration) => {
    if (newDuration !== null) {
      setDuration(newDuration);
    }
  };

  const handleTimeToggle = (day, time) => {
    const timeKey = `${day.date}_${time.label}`;
    setSelectedTimes((prev) =>
      prev.includes(timeKey) ? prev.filter((t) => t !== timeKey) : [...prev, timeKey]
    );
  };

  const handleRequest = () => {
    setView("summary");
  };

  const handleCancel = () => {
    setView("selection");
  };

  const handleConfirm = () => {
    if (profileType === 'inner') {
      // Retrieve current user
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) {
        alert("No user logged in. Please log in to book a session.");
        return;
      }

      // Create appointment object
      const appointment = {
        id: uuidv4(), // Unique identifier
        professorName,
        duration,
        selectedTimes,
        isGift,
        date: new Date().toLocaleString(),
        user: currentUser, // Include current user's information
        expertImage,
      };

      // Fetch existing appointments from localStorage
      const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

      // Append the new appointment
      localStorage.setItem("appointments", JSON.stringify([...existingAppointments, appointment]));

      setView("confirmation");
    } else {
      // For outer profile, proceed to mobile input
      setView('mobileinput');
    }
  };

  // Handler for MobileNumberInput
  const handleMobileInputSubmit = (mobileData) => {
    setUserData((prevData) => ({ ...prevData, ...mobileData }));
    setView('userForm');
  };

  // Handler for "Go Back" from MobileNumberInput to Summary
  const handleMobileInputGoBack = () => {
    setView('summary');
  };

  // Handler for UserDetailsForm
  const handleUserFormSubmit = (formData) => {
    setUserData((prevData) => ({ ...prevData, ...formData }));
    // Proceed to payment
    setView('payment');
  };

  // Handler for "Go Back" from UserDetailsForm to MobileNumberInput
  const handleUserFormGoBack = () => {
    setView('mobileinput');
  };

  // Handler for PaymentComponent
  const handlePaymentSuccess = () => {
    // Retrieve current user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("No user logged in. Please log in to book a session.");
      return;
    }

    // Create appointment object
    const appointment = {
      id: uuidv4(), // Unique identifier
      professorName,
      duration,
      selectedTimes,
      isGift,
      date: new Date().toLocaleString(),
      user: currentUser, // Include current user's information
      userData, // Include userData collected from UserForm
      expertImage
    };

    // Fetch existing appointments from localStorage
    const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Append the new appointment
    localStorage.setItem("appointments", JSON.stringify([...existingAppointments, appointment]));

    setView("confirmation");
  };

  // Handler for "Go Back" from PaymentComponent to UserDetailsForm
  const handlePaymentGoBack = () => {
    setView('userForm');
  };

  const times = [
    { label: "7pm-8pm", available: true },
    { label: "8pm-9pm", available: true },
    { label: "9pm-10pm", available: true },
    { label: "10pm-11pm", available: true },
    { label: "11pm-12am", available: true },
  ];

  const generateNext90Days = () => {
    const days = [];
    for (let i = 0; i < 90; i++) {
      const date = addDays(new Date(), i);
      days.push({
        date: format(date, "EEEE, MMM d"),
        times: [
          { label: "7pm-8pm", available: Math.random() > 0.5 },
          { label: "8pm-9pm", available: Math.random() > 0.5 },
          { label: "9pm-10pm", available: Math.random() > 0.5 },
          { label: "10pm-11pm", available: Math.random() > 0.5 },
          { label: "11pm-12am", available: Math.random() > 0.5 },
        ],
      });
    }
    return days;
  };

  const [days, setDays] = useState(generateNext90Days);
  const visibleDays = showAllDays ? days : days.slice(0, 3);

  const resetAndBookAnotherSlot = () => {
    setSelectedTimes([]);
    setIsGift(false);
    setDate(new Date().toLocaleDateString());
    setDuration("15");
    setView('selection');
  };

  return (
    <Box sx={{ width: "100%", p: 2, pt: 0 }}>
      {view === 'confirmation' ? (
        <SummaryConfirmationView
          view={view}
          professorName={professorName}
          selectedTimes={selectedTimes}
          duration={duration}
          isGift={isGift}
          formatTimeSlot={(timeSlot) => {
            const [date, time] = timeSlot.split("_");
            return `${date} at ${time}`;
          }}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          resetAndBookAnotherSlot={resetAndBookAnotherSlot}
          openContactModal={openContactModal}
          handleOpenContactModal={handleOpenContactModal}
          handleCloseContactModal={handleCloseContactModal}
          expertImage={expertImage}
        />
      ) : view === 'summary' ? (
        <SummaryConfirmationView
          view={view}
          professorName={professorName}
          selectedTimes={selectedTimes}
          duration={duration}
          isGift={isGift}
          formatTimeSlot={(timeSlot) => {
            const [date, time] = timeSlot.split("_");
            return `${date} at ${time}`;
          }}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          expertImage={expertImage}
        />
      ) : view === 'mobileinput' ? (
        <MobileNumberInput
          onFormSubmit={handleMobileInputSubmit}
          onGoBack={handleMobileInputGoBack}
        />
      ) : view === 'userForm' ? (
        <UserDetailsForm
          onFormSubmit={handleUserFormSubmit}
          onGoBack={handleUserFormGoBack}
        />
      ) : view === 'payment' ? (
        <PaymentComponent
          onPaymentSuccess={handlePaymentSuccess}
          onGoBack={handlePaymentGoBack}
        />
      ) : (
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            mt: 1,
            borderRadius: 2,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          }}
        >
          <Box
            display={"flex"}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "center", sm: "space-between" },
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mt: { xs: 4, sm: 0 } }}
            >
              Book a Session with {professorName}
            </Typography>
          </Box>
          {/* Booking Interface */}
          <Box sx={{ px: 2, py: 1 }}>
            <ToggleButtonGroup
              value={duration}
              exclusive
              onChange={handleDurationChange}
              aria-label="call duration"
              sx={{
                flexWrap: 'wrap',
                gap: 1,
                mt: 1,
              }}
            >
              <ToggleButton
                value="15"
                aria-label="15 minutes"
                sx={{ flex: isMobile ? '1 1 45%' : 'none' }}
              >
                Quick - 15 Min
              </ToggleButton>
              <ToggleButton
                value="30"
                aria-label="30 minutes"
                sx={{ flex: isMobile ? '1 1 45%' : 'none' }}
              >
                Regular - 30 Min
              </ToggleButton>
              <ToggleButton
                value="45"
                aria-label="45 minutes"
                sx={{ flex: isMobile ? '1 1 45%' : 'none' }}
              >
                Extra - 45 Min
              </ToggleButton>
              <ToggleButton
                value="60"
                aria-label="60 minutes"
                sx={{ flex: isMobile ? '1 1 45%' : 'none' }}
              >
                All Access - 60 Min
              </ToggleButton>
            </ToggleButtonGroup>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  sx={{ ml: 0, paddingRight: 1, pl: 2 }}
                />
              }
              label="Tap to send this as a gift"
              sx={{ mt: 2 }}
            />

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} md={8}>
                {visibleDays.map((day, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">{day.date}</Typography>
                    <ScrollableBox>
                      {day.times.map((time) => (
                        <TimeButton
                          key={`${day.date}_${time.label}`}
                          value={time.label}
                          available={time.available}
                          selected={selectedTimes.includes(
                            `${day.date}_${time.label}`
                          )}
                          onChange={() => handleTimeToggle(day, time)}
                          sx={{
                            mr: 1,
                            mt: 0.7,
                            width: "max-content",
                            fontSize: { xs: '0.75em', sm: '0.875em' },
                            px: { xs: '6px', sm: '11px' },
                            py: { xs: '4px', sm: '6px' },
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {time.label}
                        </TimeButton>
                      ))}
                    </ScrollableBox>
                  </Box>
                ))}
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: isMobile ? "none" : "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Looking for a time not listed?
                </Typography>
                <Button size="small" onClick={() => setShowGetTime1(true)}>
                  Tap here to see available slots
                </Button>
              </Grid>
            </Grid>

            {isMobile && (
              <Box sx={{ mb: 2 }}>
                <Button size="small" onClick={() => setShowGetTime1(true)} fullWidth>
                  Tap here to see available slots
                </Button>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 2 : 0,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" component="span">
                  ₹4,999 • Session
                </Typography>
                <Rating value={5} readOnly size="small" sx={{ ml: 1 }} />
                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                  5.0 (40)
                </Typography>
              </Box>
              <ButtonContainer sx={{ width: isMobile ? "100%" : "auto" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setView("selection")}
                  sx={{
                    flexGrow: 1,
                    mb: isMobile ? 1 : 0,
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRequest}
                  sx={{
                    flexGrow: 1,
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  Request
                </Button>
              </ButtonContainer>
            </Box>

            {/* Preserve the "Show More Slots" functionality */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                mt: 2,
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 1 : 0,
              }}
            >
              <Button
                variant="text"
                onClick={() => setShowAllDays(!showAllDays)}
                sx={{
                  fontSize: ".75em",
                  fontWeight: "500",
                  textDecoration: "underline",
                }}
              >
                {showAllDays ? "Show Less Slots" : "Show More Slots"}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SelectTime;
