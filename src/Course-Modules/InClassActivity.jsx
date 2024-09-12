import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Icon for file upload
import { StyledCard, StyledTitle, StyledBackButton } from './Data'; // Keeping your existing design components

export default function InClassActivity({ activity, handleBackClick }) {
  // State to manage whether the form is displayed
  const [showForm, setShowForm] = useState(false);

  const handleFormOpen = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  const handleFormClose = () => {
    setShowForm(false); // Close the form when needed
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* Left Side: Activity Content */}
      <Box sx={{ width: showForm ? '65%' : '100%', transition: 'width 0.3s ease' }}>
        <StyledCard>
          <Box sx={{ padding: 2, width: '100%' }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              {/* Back Button */}
              <StyledBackButton onClick={handleBackClick}>
                <ArrowBackIcon />
              </StyledBackButton>

              {/* Upload Button */}
              {!showForm && (
                <Button variant="contained" color="primary" sx={{ minWidth: 180 }} onClick={handleFormOpen}>
                  Upload Assignment Now
                </Button>
              )}
            </Box>

            {/* Main Content Section */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {/* Task description */}
              <StyledTitle variant="h6" sx={{ mb: 4 }}>
                {activity.header}
              </StyledTitle>

              {/* Image */}
              <img
                src={activity.image}
                alt={activity.title}
                style={{ width: '100%', maxWidth: '600px', marginBottom: '16px', height: 'auto' }}
              />
            </Box>

            {/* Instructions Section */}
            <Box sx={{ mt: 5 }}>
              <StyledTitle variant="subtitle1" sx={{ mb: 2 }}>
                Instructions:
              </StyledTitle>
              <StyledTitle variant="body2" sx={{ mb: 2 }}>
                {activity.instructions}
              </StyledTitle>

              {/* Grading Criteria */}
              <StyledTitle variant="subtitle1" sx={{ mb: 2 }}>
                Grading:
              </StyledTitle>
              <ul>
                {activity.grading.map((criteria, index) => (
                  <li key={index}>
                    <StyledTitle variant="body2">{criteria}</StyledTitle>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </StyledCard>
      </Box>

      {/* Right Side: Form (only visible when showForm is true) */}
      {showForm && (
        <StyledCard sx={{ width: '35%', padding: 2, ml: 2, display: 'flex', flexDirection: 'column', height: 'auto' }}>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Submit Assignment</Typography>
            <StyledBackButton onClick={handleFormClose}>
              <ArrowBackIcon />
            </StyledBackButton  >
          </Box>

          {/* Assignment Form */}
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" sx={{ mb: 2 }}>
            Author will accept only pdf for this activity (Maximum upload file size: 100KB).
          </Typography>

          {/* File Upload Button with Icon */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mb: 2, justifyContent: 'space-between' }}  // Adds space between text and icon
            endIcon={<UploadFileIcon />} // Icon placed on the right
          >
            Click to upload file
          </Button>

          {/* Checkbox with label aligned properly */}
          <FormControlLabel
            control={<Checkbox name="agree" sx={{pl:1 , pt: 0}}/>}
            label="I understand that submitting another’s work as my own can result in zero credit for this assignment. Repeated violations of the Opengrowth Academy Honor Code may result in removal from this course or deactivation of my Opengrowth Academy account."
            sx={{ alignItems: 'flex-start', mb: 3 }} // Ensures the checkbox is at the start of the label
          />

          <Button variant="contained" color="primary" fullWidth>
            Submit Assignment
          </Button>
        </StyledCard>
      )}
    </Box>
  );
}
