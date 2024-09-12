import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StyledCard, StyledTitle, StyledBackButton } from './Data'; // Import your styled components

export default function QuizPage({ handleBackClick }) {
  const [remainingTime, setRemainingTime] = useState(120); // 2 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const quizData = [
    {
      question: 'What is the primary focus of artificial intelligence (AI)?',
      options: [
        'All of the above',
        'Developing machines that can perform tasks with explicit instructions.',
        'Replicating human intelligence through algorithms like machine learning and deep learning.',
        'Creating complex neural networks to replace human brains.',
        'Automating all tasks to eliminate human intervention.',
      ],
    },
    {
      question: 'What distinguishes AI systems from human intelligence?',
      options: [
        'All of the above',
        'Human intelligence processes information faster than AI systems.',
        'AI systems are limited by emotions and biases.',
        'AI systems are incapable of learning from experience.',
        'Human intelligence is more flexible and adaptable.',
      ],
    },
    {
      question: 'What is the remaining challenge for AI to surpass human intelligence?',
      options: [
        'All of the above',
        'Emotional intelligence and creative reasoning.',
        'Complex problem solving without supervision.',
        'Faster and more efficient processing power.',
        'None of the above.',
      ],
    },
  ];

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <StyledCard>
      <Box sx={{ padding: 3 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          {/* Back Button */}
          <StyledBackButton onClick={handleBackClick}>
            <ArrowBackIcon />
          </StyledBackButton>
          
          {/* Timer */}
          <StyledTitle variant="body2" sx={{ fontWeight: 'bold' }}>
            Remaining Time : {formatTime(remainingTime)}
          </StyledTitle>
        </Box>

        {/* Quiz Content */}
        <StyledTitle variant="h6" sx={{ mb: 3 }}>
          Total Question: {quizData.length}
        </StyledTitle>

        <Box sx={{ mb: 3 }}>
          <StyledTitle variant="h6" sx={{ mb: 1 }}>
            {currentQuestion + 1}. {quizData[currentQuestion].question}
          </StyledTitle>

          <FormControl component="fieldset">
            <RadioGroup name={`question-${currentQuestion}`}>
              {quizData[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Save & Next Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestion}
          disabled={currentQuestion === quizData.length - 1}
        >
          Save & Next
        </Button>
      </Box>
    </StyledCard>
  );
}
