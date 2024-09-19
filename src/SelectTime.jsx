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
} from "@mui/material";
import { addDays, format } from "date-fns";
import GetTime from "./GetTime";
import SummaryConfirmationView from "./SummaryConfirmationView";
import {
  TimeButton,
  ScrollableBox,
} from "./Experts/Components/TimeStyles";
import PaymentComponent from "./Profile-Slot-Booking/PaymentPage";
import UserDetailsForm from "./Profile-Slot-Booking/UserDetailsForm";
import { ButtonContainer } from "./Experts/Components/ProfileStyles";
import MobileNumberInput from "./Profile-Slot-Booking/MobileInput";

const SelectTime = ({ setShowGetTime, professorName, profileType }) => {
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
      // Proceed directly to confirmation
      const appointment = {
        professorName,
        duration,
        selectedTimes,
        isGift,
        date: new Date().toLocaleString(),
      };

      const existingAppointments =
        JSON.parse(localStorage.getItem("appointments")) || [];
      localStorage.setItem(
        "appointments",
        JSON.stringify([...existingAppointments, appointment])
      );

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
    // Save the appointment data now
    const appointment = {
      professorName,
      duration,
      selectedTimes,
      isGift,
      date: new Date().toLocaleString(),
      userData, // Include userData collected from UserForm
    };

    const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
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

  const generateNext10Days = () => {
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
  const [profileData, setProfileData] = useState(null);

  const formatTimeSlot = (timeSlot) => {
    const [date, time] = timeSlot.split("_");
    return `${date} at ${time}`;
  };

  useEffect(() => {
    // Fetch profile data if needed
  }, []);

  const [days, setDays] = useState(generateNext10Days);
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
          profileData={profileData}
          selectedTimes={selectedTimes}
          duration={duration}
          isGift={isGift}
          formatTimeSlot={formatTimeSlot}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          resetAndBookAnotherSlot={resetAndBookAnotherSlot}
          openContactModal={openContactModal}
          handleOpenContactModal={handleOpenContactModal}
          handleCloseContactModal={handleCloseContactModal}
        />
      ) : view === 'summary' ? (
        <SummaryConfirmationView
          view={view}
          professorName={professorName}
          profileData={profileData}
          selectedTimes={selectedTimes}
          duration={duration}
          isGift={isGift}
          formatTimeSlot={formatTimeSlot}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
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
        <>
          {showGetTime1 ? (
            <GetTime
              setShowGetTime1={setShowGetTime1}
              professorName={professorName}
              profileType={profileType}
            />
          ) : (
            <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
              <Typography variant="h5" gutterBottom>
                Request a Video Call
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
                    sx={{ ml: 2, paddingRight: 1, pl: 1 }}
                  />
                }
                label="Tap to send this as a gift"
                sx={{ mt: 2 }}
              />
              <Box display={isMobile ? 'block' : 'flex'} sx={{ marginTop: 2, width: { xs: '107vw', sm: 'inherit' }, }}>
                <Box>
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
                            sx={{ mr: 1, mt: 0.7, width: "max-content", fontSize: { xs: '0.8em', sm: 'inherit' }, px: { xs: '4px', sm: '11px' } }}
                          >
                            {time.label}
                          </TimeButton>
                        ))}
                      </ScrollableBox>
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: isMobile ? "none" : "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2">
                      Looking for a time not listed?
                    </Typography>
                    <Button size="small" onClick={() => setShowGetTime1(true)}>
                      Tap here to see available slots
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box sx={{
                display: "flex",
                justifyContent: isMobile ? "space-between" : "flex-start",
                alignItems: "flex-start",
                mt: 2,
                flexDirection: isMobile ? "row" : "column",
              }}>
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
                {isMobile && (
                  <Button size="small" onClick={() => setShowGetTime1(true)}>
                    Tap here to see available slots
                  </Button>
                )}
              </Box>

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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <ButtonContainer>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setShowGetTime(false)}
                      sx={{ flexGrow: 1 }}  // Ensures the button stretches in column layout
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleRequest}
                      sx={{ flexGrow: 1 }}  // Ensures the button stretches in column layout
                    >
                      Request
                    </Button>
                  </ButtonContainer>
                </Box>
              </Box>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default SelectTime;
