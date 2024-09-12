import React, {useState} from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
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
      <Box sx={{ padding: 2, width: '100%' }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          {/* Left Side - Back Button and Activity Title/Description */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Back Button */}
            <StyledBackButton onClick={handleBackClick}>
              <ArrowBackIcon />
            </StyledBackButton>

            {/* Activity Title and Description */}
            <Box sx={{ ml: 2 }}>
              <StyledTitle variant="h6">{activity.title}</StyledTitle>
              <Typography variant="body2" color="textSecondary">
                {activity.description}
              </Typography>
            </Box>
          </Box>

          {/* Upload Button */}
          <Button variant="contained" color="primary" sx={{ minWidth: 130 }} onClick={handleStartQuiz}>
            Start Now
          </Button>
        </Box>

        {/* Quiz Details Section */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
          {/* Left Side - Quiz Details */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ mb: 2 }}>
              <StyledTitle variant="subtitle1">Attempts</StyledTitle>
              <StyledTitle variant="body2" color={'textSecondary'}>
                2 every 24 hours
              </StyledTitle>
            </Box>

            <Box sx={{ mb: 2 }}>
              <StyledTitle variant="subtitle1">Attempt left</StyledTitle>
              <StyledTitle variant="body2" color={'textSecondary'}>
                2
              </StyledTitle>
            </Box>

            <Box sx={{ mb: 2 }}>
              <StyledTitle variant="subtitle1">Receive grade</StyledTitle>
              <StyledTitle variant="body2" color={'textSecondary'}>
                To pass 70% or higher (A)
              </StyledTitle>
            </Box>
          </Box>

          {/* Right Side - Duration, Expiration, and Start Button */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
            <Box sx={{ mb: 2 }}>
              <StyledTitle variant="subtitle1">Quiz duration</StyledTitle>
              <StyledTitle variant="body2" color={'textSecondary'}>
                2 Minutes
              </StyledTitle>
            </Box>

            <Box sx={{ mb: 2 }}>
              <StyledTitle variant="subtitle1">Expires on</StyledTitle>
              <StyledTitle variant="body2" color={'textSecondary'}>
                November 13th, 2023
              </StyledTitle>
            </Box>
          </Box>
        </Box>
      </Box>
    </StyledCard>
  );
}
