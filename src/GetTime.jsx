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
}));
const TimeButton = styled(ToggleButton)(({ available }) => ({
  border: `2px solid ${available ? "skyblue" : "#e0e0e0"}`,
  color: available ? "skyblue" : "#e0e0e0",
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

const ConfirmationBox = styled(Paper)({
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff', // Default background
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledSummaryBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.grey[300]}`,
}));

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
  const [mobileNumber, setMobileNumber] = useState('');


  const MobileNumberInput = () => {
    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const inputRef = useRef(null);
  
    useEffect(() => {
      const loadCountries = () => {
        const countryList = getCountries().map(code => ({
          code,
          name: code,
          dialCode: getCountryCallingCode(code)
        }));
        setCountries(countryList);
        if (!countryCode && countryList.length > 0) {
          setCountryCode(countryList[0].dialCode); 
        }
      };
  
      loadCountries();
    }, []);
  
    useEffect(() => {
      inputRef.current && inputRef.current.focus();
    }, []);
  
    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create an account, or log in
        </Typography>
        <Typography variant="body1" gutterBottom>
          Start by entering your mobile number. We'll send you a 4-digit code to verify:
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <TextField
            select
            label="Country Code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            sx={{ width: '200px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphoneOutlined />
                </InputAdornment>
              ),
            }}
          >
            {countries.map(option => (
              <MenuItem key={option.code} value={option.dialCode}>
                {option.name} ({option.dialCode})
              </MenuItem>
            ))}
          </TextField>
          <TextField
            inputRef={inputRef}
            fullWidth
            variant="outlined"
            label="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="234 567 8900"
          />
        </Box>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body1" fontWeight={'bold'} gutterBottom>
        Why a mobile number?</Typography>
        <Typography variant="body1" gutterBottom>
        It's less complicated than remembering an email and password, and to verify that you're a real person</Typography>
        </Box>
        <Box>
          <Button variant="" color="primary" onClick={() => setView('summary')}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={() => setView('userdetails')}>
            Confirm Number
          </Button>
        </Box>  
        </Box>
      </Paper>
    );
  };

  const UserDetailsForm = ({ }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cardDetails, setCardDetails] = useState('');
    const [showPromoCode, setShowPromoCode] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const handleApplyPromoCode = () => {
      console.log('Promo Code Applied:', promoCode);
    };
  
    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Almost There...
        </Typography>
        <Typography variant="body1" gutterBottom>
        Please enter the information below
        </Typography>
        
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        </Box>
        {!showPromoCode ? (
        <Button
          variant="text"
          onClick={() => setShowPromoCode(true)}
          sx={{ mb: 2 }}
        >
          Apply Promo Code
        </Button>
      ) : (
        <TextField
          label="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleApplyPromoCode}
                  color="primary"
                  size="small"
                >
                  Apply
                </Button>
              </InputAdornment>
            )
          }}
        />
      )}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="1234 5678 9101 1121"
        />
        <TextField
          label="Expiry Date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="MM/YY"
        />
        <Tooltip title="Last three digits on back of your card" placement="top" arrow>
          <TextField
            label="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="CVV"
          />
        </Tooltip>
      </Box>
        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
          <Button variant="" color="primary" onClick={() => setView('mobileInput')}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={() => setView('confirmation')}>
            Confirm your slot
          </Button>
        </Box> 
      </Paper>
    );
  };

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
    const appointment = {
      professorName,
      duration,
      selectedTimes,
      isGift,
      date: new Date().toLocaleString(),
    };

    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointment]));

    setView("mobileInput");
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
  const visibleDays = showAllDays ? days : days.slice(0, 3);
  const [profileData, setProfileData] = useState(null);
  const expertEmail = location.state?.expertEmail;

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
      } finally {
          setLoading(false);
      }
  };

  if (expertEmail) {
      fetchProfileData();
  }
}, [expertEmail]);
const getDurationLabel = (duration) => {
  switch (duration) {
      case "15":
          return "Quick - 15 Min";
      case "30":
          return "Regular - 30 Min";
      case "45":
          return "Extra - 45 Min";
      case "60":
          return "All Access - 60 Min";
      default:
          return `${duration} Min`;
  }
};

  return (
    <>
      {view === "confirmation" ? (
        <StyledSummaryBox sx={{}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleOutlineIcon sx={{ color: 'green', verticalAlign: 'middle', marginBottom: '0.40rem', transform: 'scale(1.1)' }} />
            <Typography variant="h5" gutterBottom component="span">
                Confirmed
            </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
                src={`https://academy.opengrowth.com/assets/images/users/${profileData?.img}`}
                alt={profileData?.name}
                sx={{ width: 60, height: 60, mr: 2 }}
            />
            <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
                {professorName}
            </Typography>
        </Box>

        {/* Selected Times */}
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Selected Times:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {selectedTimes.map((timeSlot, index) => {
                    const [date, time] = timeSlot.split("_");
                    return (
                        <DateButton key={index} value={time} disabled selected>
                            {formatTimeSlot(timeSlot)}
                        </DateButton>
                    );
                })}
            </Box>
        </Box>

        {/* Duration */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Duration:
            </Typography>
            <ToggleButtonGroup
                value={duration}
                exclusive
                aria-label="call duration"
            >
                <DurationButton
                    value={duration}
                    aria-label={`${duration} minutes`}
                    disabled selected
                >
                    {getDurationLabel(duration)}
                </DurationButton>
            </ToggleButtonGroup>
        </Box>

        {/* <SelectedDurationButton>
{duration === "15"
? "Quick - 15 Min"
: duration === "30"
? "Regular - 30 Min"
: duration === "45"
? "Extra - 45 Min"
: "All Access - 60 Min"}
</SelectedDurationButton> */}

        {isGift && (
            <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold", color: "green" }}
            >
                This is a gift.
            </Typography>
        )}

        <Box
            sx={{ mt: 3, display: "flex", justifyContent: "space-between", gap: 2 }}
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
            <Box sx={{ gap: 2 }}>

                <Button variant="contained" color="primary" onClick={() => setView('getTime')}>
                    Book Another Slot
                </Button>
            </Box>
        </Box>
    </StyledSummaryBox>
      ) : view === "summary" ? (
        <Summary
          professorName={professorName}
          selectedTimes={selectedTimes}
          duration={duration}
          isGift={isGift}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      ) :  view === "mobileInput" ? (
        <MobileNumberInput />
      ) : 
      view === "userdetails" ? (
        <UserDetailsForm />
      ) :
      (
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
         
          {visibleDays.map((day, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle2">{day.date}</Typography>
            <ScrollableBox>
              {day.times.map((time) => (
                <TimeButton
                  key={`${day.date}_${time.label}`}
                  value={time.label}
                  available={time.available}
                  selected={selectedTimes?.includes(
                      `${day.date}_${time.label}`
                  )}
                  onChange={() => handleTimeToggle(day, time)}
                  sx={{ mr: 1, width: "max-content" }}
              >
                  {time.label}
                </TimeButton>
              ))}
            </ScrollableBox>
          </Box>
    ))}
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
