import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StyledCard, StyledTitle, StyledBackButton } from './Data';
import QuizPage from './QuizPage';

export default function QuizActivity({ activity, handleBackClick }) {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  // Initialize theme and media query
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detects if the screen is small

  if (isQuizStarted) {
    return <QuizPage handleBackClick={handleBackClick} />;
  }

  return (
    <StyledCard>
      <Box sx={{ padding: 2, width: '100%' }}>
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'space-between',
            alignItems: 'center',
            mb: 4,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0, // Add gap between elements on mobile
          }}
        >
          {/* Back Button and Activity Title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            <StyledBackButton onClick={handleBackClick}>
              <ArrowBackIcon />
            </StyledBackButton>
            <Box sx={{ ml: isMobile ? 0 : 2, mt: isMobile ? 1 : 0 }}>
              <StyledTitle variant="h6">{activity.title}</StyledTitle>
              <Typography variant="body2" color="textSecondary">
                {activity.description}
              </Typography>
            </Box>
          </Box>

          {/* Start Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              minWidth: 130,
              height: 40,
              alignSelf: isMobile ? 'stretch' : 'auto', // Stretch the button on mobile
            }}
            onClick={handleStartQuiz}
          >
            Start Now
          </Button>
        </Box>

        {/* Quiz Details Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: 2,
            alignItems: isMobile ? 'flex-start' : 'flex-start',
          }}
        >
          {/* Left Section with Quiz Details */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: isMobile ? '100%' : '48%',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <StyledTitle variant="subtitle1">Attempts:</StyledTitle>
              <Typography variant="body2" color="textSecondary">
                2 every 24 hours
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <StyledTitle variant="subtitle1">Attempts left:</StyledTitle>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: isMobile ? 'left' : 'right',
              alignItems: isMobile ? 'flex-start' : 'flex-end',
              gap: 1,
              width: isMobile ? '100%' : '48%',
            }}
          >
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
