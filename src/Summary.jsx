import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Summary = ({ professorName, selectedTimes, duration, isGift, date, onCancel, onConfirm }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 2 }}>
      <Box
        sx={{
          maxWidth: '600px',
          width: '100%',
          bgcolor: 'background.paper',
          p: 3,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Confirm Your Request
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Professor: {professorName}
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Call Duration: {duration} minutes
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Selected Times: {selectedTimes.join(", ")}
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Date: {date}
        </Typography>

        {isGift && (
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'green' }}>
            This is a gift.
          </Typography>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Summary;
