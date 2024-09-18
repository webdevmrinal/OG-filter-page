import React, { useState } from 'react';
import { Box, CardContent, Rating,useMediaQuery,
  useTheme } from '@mui/material';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TabNavigation from './TabNav'; // Ensure TabNavigation can update state
import InClassActivity from './InClassActivity'; // Import the components for each activity type
import CumulativeActivity from './CumulativeActivity';
import QuizActivity from './QuizActivity';
import { inClassActivities, cumulativeActivities, quizzes, StyledDivider } from './Data';
import { StyledCard, StyledIconContainer, StyledTitle, StyledChip, StyledMainCard } from './Data';

export default function CourseAssignment() {
  const [activeTab, setActiveTab] = useState('In-Class Activities');
  const [selectedActivity, setSelectedActivity] = useState(null); // State to track selected activity

  const tabDataMapping = {
    'In-Class Activities': inClassActivities,
    'Cumulative Activities': cumulativeActivities,
    Quizzes: quizzes,
  };

  const handleCardClick = (activity) => {
    setSelectedActivity(activity); // Set the selected activity when clicked
  };

  const handleBackClick = () => {
    setSelectedActivity(null); // Reset selected activity to go back to the list
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSelectedActivity(null); // Reset the selected activity when the tab changes
  };

  const ActivityCard = ({ activity }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
      <StyledCard onClick={() => handleCardClick(activity)}>
        {/* Icon Section */}
        <StyledIconContainer>
          <FilePresentIcon sx={{mr: isMobile ? 0 : 0, mb: isMobile ? 0 : 0, fontSize: '4.5em',  }} /> {/* File Icon */}
        </StyledIconContainer>

        {/* Main Content Section */}
        <Box sx={{ px: { xs: 0, sm: 2 }, flex: 1, ml: 0.5, py: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Chip */}


          {/* Title */}
          {activity.title && (
            <StyledTitle variant="subtitle1">
              {activity.title}
            </StyledTitle>
          )}

          {/* Description */}
          {activity.description && (
            <StyledTitle variant="subtitle2">
              {activity.description}
            </StyledTitle>
          )}

          {/* File Submission */}
          {activity.fileSubmission && (
            <StyledTitle variant="body2" color="textSecondary" sx={{ mt: 0.8 }}>
              File Submission: {activity.fileSubmission}
            </StyledTitle>
          )}
          {activity.duration && (
            <StyledTitle variant="body2" color="textSecondary" sx={{ mt: 0.8 }}>
              Duration: {activity.duration}
            </StyledTitle>
          )}

          {activity.hasOwnProperty('grade') && (
            <Rating
              value={activity.grade !== undefined ? activity.grade : 0}  // Show stars even if grade is 0 or missing
              readOnly
              precision={0.5}
              max={10}
              sx={{ fontSize: '1.2rem', mt: 1.2 }}
            />
          )}
        </Box>

        {/* Grade, Status, and Chevron (aligned vertically) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', mr: 2, mt: 0.5 }}>
          {/* Render stars even if grade is 0 or undefined */}

          {activity.status && (
            <Box sx={{display: 'flex', gap: 1}}>
            <StyledTitle variant="body2">
              Status: 
            </StyledTitle>
            <StyledTitle variant="body2" color="textSecondary">{activity.status}</StyledTitle>
            </Box>
          )}
          <ChevronRightIcon sx={{ fontSize: 30, color: '#c4c4c4', marginTop: 1.5 }} /> {/* Chevron Icon */}
        </Box>
      </StyledCard>
    );
  };

  // Function to render the appropriate activity component based on type
  const renderSelectedActivity = () => {
    if (selectedActivity?.type === 'In-Class Activity') {
      return <InClassActivity activity={selectedActivity} handleBackClick={handleBackClick} />;
    }
    if (selectedActivity?.type === 'Cumulative Activity') {
      return <CumulativeActivity activity={selectedActivity} handleBackClick={handleBackClick} />;
    }
    if (selectedActivity?.type === 'Quizzes') {
      return <QuizActivity activity={selectedActivity} handleBackClick={handleBackClick} />;
    }
    return null;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <StyledMainCard>
        <CardContent>
          {/* Pass the handleTabChange function to TabNavigation */}
          <TabNavigation activeTab={activeTab} setActiveTab={handleTabChange} />
          <StyledTitle variant="h6">
            AI Basics
          </StyledTitle>
          <StyledDivider />
          {/* Conditionally render either the selected activity or the activity list */}
          {selectedActivity ? (
            // Render the appropriate selected activity component
            renderSelectedActivity()
          ) : (
            // Render the list of activities based on the active tab
            tabDataMapping[activeTab]?.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          )}
        </CardContent>
      </StyledMainCard>
    </Box>
  );
}
