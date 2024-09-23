import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Icon for file upload
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledCard, StyledTitle, StyledBackButton } from './Data'; // Keeping your existing design components

export default function InClassActivity({ activity, handleBackClick }) {
  // State to manage whether the form is displayed
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(false); // To manage the expanded accordion

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detects if the screen is small

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFormOpen = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  const handleFormClose = () => {
    setShowForm(false); // Close the form when needed
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {/* Left Side: Activity Content */}
      <Box
        sx={{
          width: showForm
            ? isMobile
              ? '100%' // On mobile, take full width when form is shown
              : '65%' // On desktop, take 65% width
            : '100%',
          transition: 'width 0.3s ease',
        }}
      >
        <StyledCard>
          <Box sx={{ padding: 2, width: '100%' }}>
            {/* Header Section */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                flexDirection: isMobile ? 'column' : 'row', // Stack buttons on mobile
                gap: isMobile ? 2 : 0, // Add gap between buttons on mobile
              }}
            >
              {/* Back Button */}
              <StyledBackButton onClick={handleBackClick}>
                <ArrowBackIcon />
              </StyledBackButton>

              {/* Upload Button */}
              {!showForm && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: 180 }}
                  onClick={handleFormOpen}
                >
                  Upload Assignment Now
                </Button>
              )}
            </Box>

            {/* Title in the Center */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <StyledTitle variant="h5" sx={{ mb: 4 }}>
                {activity.header}
              </StyledTitle>
            </Box>

            {/* Main Content Section (Image and Accordions Side by Side on Desktop, Stacked on Mobile) */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                gap: 3,
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  flexShrink: 0,
                  width: isMobile ? '100%' : '35%',
                  height: '100%',
                }}
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    marginBottom: isMobile ? '16px' : '0px',
                  }}
                />
              </Box>

              {/* Accordion Section for Instructions, About, and Scenario */}
              <Box
                sx={{
                  width: isMobile ? '100%' : '65%',
                }}
              >
                {/* Instructions Accordion */}
                <Accordion
                  expanded={expanded === 'panel1'}
                  onChange={handleAccordionChange('panel1')}
                  sx={{ mb: '0px !important' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">
                      Instructions
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle1">{activity.instructions}</Typography>
                  </AccordionDetails>
                </Accordion>

                {/* About Section (if exists) */}
                {activity.about && (
                  <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleAccordionChange('panel2')}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" fontWeight="bold">
                        About
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">{activity.about}</Typography>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* Scenario Section (if exists) */}
                {activity.scenario && (
                  <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleAccordionChange('panel3')}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" fontWeight="bold">
                        Scenario
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">{activity.scenario}</Typography>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* Grading Section */}
                <Accordion
                  expanded={expanded === 'panel4'}
                  onChange={handleAccordionChange('panel4')}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">
                      Grading
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {activity.grading.map((criteria, index) => (
                        <li key={index}>
                          <Typography variant="body2">{criteria}</Typography>
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
        </StyledCard>
      </Box>

      {/* Right Side: Form (only visible when showForm is true) */}
      {showForm && (
        <Box
          sx={{
            width: isMobile ? '100%' : '35%',
            padding: 2,
            ml: isMobile ? 0 : 2,
            mt: isMobile ? 2 : -2, // Add top margin on mobile to separate from content
            transition: 'width 0.3s ease',
          }}
        >
          <StyledCard
            sx={{
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h6">Submit Assignment</Typography>
              <StyledBackButton onClick={handleFormClose}>
                <ArrowBackIcon />
              </StyledBackButton>
            </Box>

            {/* Assignment Form */}
            <TextField fullWidth label="Title" variant="outlined" sx={{ mb: 2 }} />
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
              sx={{ mb: 2, justifyContent: 'space-between' }} // Adds space between text and icon
              endIcon={<UploadFileIcon />} // Icon placed on the right
            >
              Click to upload file
            </Button>

            {/* Checkbox with label aligned properly */}
            <FormControlLabel
              control={<Checkbox name="agree" sx={{ pl: 1, pt: 0 }} />}
              label="I understand that submitting another’s work as my own can result in zero credit for this assignment. Repeated violations of the Opengrowth Academy Honor Code may result in removal from this course or deactivation of my Opengrowth Academy account."
              sx={{ alignItems: 'flex-start', mb: 3 }}
            />

            <Button variant="contained" color="primary" fullWidth>
              Submit Assignment
            </Button>
          </StyledCard>
        </Box>
      )}
    </Box>
  );
}
