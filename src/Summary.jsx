import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
  Rating
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { DurationButton, StyledSummaryBox, TimeButton } from "./Experts/Components/TimeStyles";
import { OgAvatar } from "./Experts/Components/AppointmentStyle";

const Summary = ({
  professorName,
  selectedTimes,
  duration,
  isGift,
  date,
  onCancel,
  onConfirm,
}) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const expertEmail = location.state?.expertEmail;

  const formatTimeSlot = (timeSlot) => {
    const [date, time] = timeSlot.split("_");
    return `${date} at ${time}`;
  };
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
    <StyledSummaryBox sx={{}}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Confirm Your Request
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <OgAvatar
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
                            <TimeButton key={index} value={time} disabled selected sx={{mr: {xs: 0, sm: 2} , my: {xs: 1, sm: 0}}}>
                                {formatTimeSlot(timeSlot)}
                            </TimeButton>
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
                <Box sx={{gap: 2 }}>
          <Button variant="outlined" color="primary" onClick={onCancel} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
          </Box>
        </Box>
      </Box>
    </StyledSummaryBox>
  );
};

export default Summary;
