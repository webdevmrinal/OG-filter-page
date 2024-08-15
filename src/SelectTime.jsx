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
    IconButton,
    Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import GetTime from "./GetTime";
import Summary from "./Summary";
import { addDays, format } from "date-fns";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const SuccessMessage = styled(Typography)({
    backgroundColor: "#dff0d8",
    padding: "16px",
    borderRadius: "8px",
    color: "#3c763d",
    fontWeight: "bold",
});
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

const StyledConfirmationBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    border: `1px solid ${theme.palette.grey[300]}`,
}));

const StyledSummaryBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    border: `1px solid ${theme.palette.grey[300]}`,
}));
const SelectTime = ({ setShowGetTime, professorName }) => {
    const [duration, setDuration] = useState("15");
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [isGift, setIsGift] = useState(false);
    const [showGetTime1, setShowGetTime1] = useState(false);
    const [view, setView] = useState("selection");
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [showAllDays, setShowAllDays] = useState(false);

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

        const existingAppointments =
            JSON.parse(localStorage.getItem("appointments")) || [];
        localStorage.setItem(
            "appointments",
            JSON.stringify([...existingAppointments, appointment])
        );

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

    function formatTimeRange(input) {
        const formatTime = (time) => {
            const [hour, period] = time.split(/(am|pm)/i);
            return `${hour.padStart(2, "0").toUpperCase()}${period.toUpperCase()}`;
        };

        return input
            .map((item) => {
                const match = item.match(/(\d{1,2}[ap]m)-(\d{1,2}[ap]m)/i);
                if (match) {
                    return `${formatTime(match[1])}-${formatTime(match[2])}`;
                }
                return null;
            })
            .filter(Boolean)
            .join(",");
    }

    const times = [
        { label: "7pm-8pm", available: true },
        { label: "8pm-9pm", available: false },
        { label: "9pm-10pm", available: true },
        { label: "10pm-11pm", available: true },
        { label: "11pm-12am", available: false },
    ];

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

    const [days, setDays] = useState(generateNext10Days);
    const visibleDays = showAllDays ? days : days.slice(0, 3);
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

        <Box sx={{ width: "100%", p: 2 }}>

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

                            <Button variant="contained" color="primary">
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
                    date={date}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            ) : (
                <>
                    {showGetTime1 ? (
                        <GetTime
                            setShowGetTime1={setShowGetTime1}
                            professorName={professorName}
                        />
                    ) : (
                        <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
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
                                        sx={{ml: 2, paddingRight: 1, pl: 1}}
                                    />
                                }
                                label="Tap to send this as a gift"
                                sx={{ mt: 2}}
                            />

                            {/* <Box>
                <Typography variant="subtitle2">Wednesday 8/7</Typography>
                <ScrollableBox>
                  {times.map((time) => (
                    <TimeButton
                      key={time.label}
                      value={time.label}
                      available={time.available}
                      selected={selectedTimes.includes(time.label)}
                      onChange={() => toggleToggle(time)}
                      sx={{ mr: 1 }}
                    >
                      {time.label}
                    </TimeButton>
                  ))}
                </ScrollableBox>
              </Box> */}   <Box display={'flex'} sx={{marginTop: 2}}>
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
                                                sx={{ mr: 1,mt: 0.7, width: "max-content" }}
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
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleRequest}
                                    >
                                        Request
                                    </Button>
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
