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

const ScrollableBox = styled(Box)({
  display: "flex",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
});

const GetTime = ({ setShowGetTime }) => {
  const [duration, setDuration] = useState("15");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [isGift, setIsGift] = useState(false);

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

  const times = ["7-8p", "8-9p", "9-10p", "10-11p", "11-12a"];

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
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
        <Typography variant="subtitle2">Wednesday 8/7</Typography>
        <Button size="small">Select all</Button>
      </Box>
      <ScrollableBox>
        {times.map((time) => (
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
          <Button variant="contained" color="primary">
            Request
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default GetTime;
