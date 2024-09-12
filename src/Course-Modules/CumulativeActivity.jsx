import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function CumulativeActivity({ activity, handleBackClick }) {
  return (
    <Box>
      <Button onClick={handleBackClick}>Back</Button>
      <Typography variant="h6">Cumulative Activity</Typography>
      <Typography variant="subtitle1">{activity.title}</Typography>
      <Typography variant="body1">{activity.description}</Typography>
      <Typography variant="body2">Additional Cumulative details...</Typography>
    </Box>
  );
}
