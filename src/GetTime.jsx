// GetTime.jsx
import React, { useState, useEffect, useRef } from "react";
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
  Avatar,
  TextField,
  InputAdornment,
  MenuItem,
  Tooltip
} from "@mui/material";
import { styled } from "@mui/system";
import Summary from "./Summary";
import { addDays, format } from "date-fns";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PhoneIphoneOutlined from "@mui/icons-material/PhoneIphoneOutlined";
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MobileNumberInput from "./Profile-Slot-Booking/MobileInput";
import UserDetailsForm from "./Profile-Slot-Booking/UserDetailsForm";
import PaymentComponent from "./Profile-Slot-Booking/PaymentPage";
import { StyledConfirmationBox, StyledSummaryBox } from "./Experts/Components/TimeStyles";
import SummaryConfirmationView from "./SummaryConfirmationView";

const DateButton = styled(ToggleButton)(({ theme }) => ({
  border: `2px solid #e0e0e0`,
  borderRadius: "8px",
  height: "40px",
  width: "max-content",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const TimeButton = styled(ToggleButton)(({ available, theme }) => ({
  border: `2px solid ${available ? "#25387c" : "#e0e0e0"}`,
  color: available ? "#25387c" : "#e0e0e0",
  opacity: available ? 1 : 0.6,
  pointerEvents: available ? "auto" : "none",
  position: "relative",
  borderRadius: "8px",
  height: "40px",
  width: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:after": {
    content: available ? '""' : '""',
    position: "absolute",
    bottom: "4px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#e0e0e0",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 'auto',
  },
}));

const DurationButton = styled(ToggleButton)(({ theme }) => ({
  border: `2px solid #e0e0e0`,
  color: theme.palette.primary.main,
  borderRadius: "4px",
  padding: theme.spacing(1, 2),
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  "&.Mui-selected": {
    backgroundColor: '#e2e2e2',
    color: theme.palette.common.black,
  },
}));

const ScrollableBox = styled(Box)({
  display: "flex",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
});

const GetTime = ({ setShowGetTime, professorName, profileType }) => {
  const [duration, setDuration] = useState("15");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isGift, setIsGift] = useState(false);
  const [view, setView] = useState("selection");
  const [userData, setUserData] = useState({});

  const handleDurationChange = (event, newDuration) => {
    if (newDuration !== null) {
      setDuration(newDuration);
    }
  };

  const handleTimeToggle = (day, time) => {
    if (time.available) {
      setSelectedTimes((prev) => {
        const timeKey = `${day.date}_${time.label}`;
        return prev.includes(timeKey)
          ? prev.filter((t) => t !== timeKey)
          : [...prev, timeKey];
      });
    }
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
    if (profileType === 'inner') {
      // Proceed directly to confirmation
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
    } else {
      // For outer profile, proceed to mobile input
      setView('mobileInput');
    }
  };

  // Handler for MobileNumberInput
  const handleMobileInputSubmit = (mobileData) => {
    setUserData((prevData) => ({ ...prevData, ...mobileData }));
    setView('userdetails');
  };

  // Handler for "Go Back" from MobileNumberInput to Summary
  const handleMobileInputGoBack = () => {
    setView('summary');
  };

  // Handler for UserDetailsForm
  const handleUserFormSubmit = (formData) => {
    setUserData((prevData) => ({ ...prevData, ...formData }));
    setView('payment');
  };

  // Handler for "Go Back" from UserDetailsForm to MobileNumberInput
  const handleUserFormGoBack = () => {
    setView('mobileInput');
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
      userData,
    };

    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointment]));

    setView("confirmation");
  };

  // Handler for "Go Back" from PaymentComponent to UserDetailsForm
  const handlePaymentGoBack = () => {
    setView('userdetails');
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
  const [showAllDays, setShowAllDays] = useState(false);

  const generateNext10Days = () => {
    const days = [];
    for (let i = 0; i < 10; i++) {
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
  const [days, setDays] = useState(generateNext10Days);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const visibleDays = showAllDays ? days : days.slice(0, 3);
  const [profileData, setProfileData] = useState(null);
  const expertEmail = location.state?.expertEmail;
  const [openContactModal, setOpenContactModal] = useState(false);

  const handleOpenContactModal = () => {
    setOpenContactModal(true);
  };

  const handleCloseContactModal = () => {
    setOpenContactModal(false);
  };

  const formatTimeSlot = (timeSlot) => {
    const [date, time] = timeSlot.split("_");
    return `${date} at ${time}`;
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "https://academy.opengrowth.com/api/get_user",
          {
            email: expertEmail,
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (expertEmail) {
      fetchProfileData();
    }
  }, [expertEmail]);

  const resetAndBookAnotherSlot = () => {
    setSelectedTimes([]);
    setIsGift(false);
    setDate(new Date().toLocaleDateString());
    setDuration("15");
    setView('selection');
  };

  return (
    <>
      {view === "confirmation" ? (
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
      ) : view === "summary" ? (
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
      ) : view === "mobileInput" ? (
        <MobileNumberInput
          onFormSubmit={handleMobileInputSubmit}
          onGoBack={handleMobileInputGoBack}
        />
      ) : view === "userdetails" ? (
        <UserDetailsForm
          onFormSubmit={handleUserFormSubmit}
          onGoBack={handleUserFormGoBack}
        />
      ) : view === "payment" ? (
        <PaymentComponent
          onPaymentSuccess={handlePaymentSuccess}
          onGoBack={handlePaymentGoBack}
        />
      ) : (
        <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Select a time
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
                sx={{ pr: 1, pl: 1, ml: 2 }}
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
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Box>
              {visibleDays.map((day, index) => (
                <Box key={index} sx={{ mb: 2, mt: 1 }}>
                  <Typography variant="subtitle2">{day.date}</Typography>
                  <ScrollableBox>
                    {day.times.map((time) => (
                      <TimeButton
                        key={`${day.date}_${time.label}`}
                        value={time.label}
                        available={time.available}
                        selected={selectedTimes.includes(`${day.date}_${time.label}`)}
                        onChange={() => handleTimeToggle(day, time)}
                        sx={{ mr: 1, mt: 0.7, width: "max-content" }}
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
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box>
                <Button size="small" onClick={handleSelectAll}>
                  Select All
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
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
              <Button variant="contained" color="primary" onClick={handleRequest}>
                Next
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default GetTime;
