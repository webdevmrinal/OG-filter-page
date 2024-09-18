import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StyledCard, StyledTitle, StyledBackButton } from './Data';
import QuizPage from './QuizPage';

export default function QuizActivity({ activity, handleBackClick }) {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  if (isQuizStarted) {
    return <QuizPage handleBackClick={handleBackClick} />;
  }

  return (
    <StyledCard>
      <Box sx={{ padding: 1, width: '100%' }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          {/* Back Button and Activity Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StyledBackButton onClick={handleBackClick}>
              <ArrowBackIcon />
            </StyledBackButton>
            <Box sx={{ ml: 2 }}>
              <StyledTitle variant="h6">{activity.title}</StyledTitle>
              <Typography variant="body2" color="textSecondary">
                {activity.description}
              </Typography>
            </Box>
          </Box>

          {/* Start Button */}
          <Button variant="contained" color="primary" sx={{ minWidth: 130, height: 40 }} onClick={handleStartQuiz}>
            Start Now
          </Button>
        </Box>

        {/* Quiz Details Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'flex-start' }}>
          {/* Left Section with Quiz Details */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <StyledTitle variant="subtitle1">Attempts:</StyledTitle>
              <Typography variant="body2" color="textSecondary">
                2 every 24 hours
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <StyledTitle variant="subtitle1">Attempt left:</StyledTitle>
              <Typography variant="body2" color="textSecondary">
                2
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <StyledTitle variant="subtitle1">Receive grade:</StyledTitle>
              <Typography variant="body2" color="textSecondary">
                To pass 70% or higher (A)
              </Typography>
            </Box>
          </Box>

          {/* Right Section with Duration and Expiration */}
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right', alignItems: 'flex-end', gap: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <StyledTitle variant="subtitle1">Quiz duration:</StyledTitle>
              <Typography variant="body2" color="textSecondary">
                2 Minutes
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <StyledTitle variant="subtitle1">Expires on:</StyledTitle>
              <Typography variant="body2" color="textSecondary">
                November 13th, 2023
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </StyledCard>
  );
}
