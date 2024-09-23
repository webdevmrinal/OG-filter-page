import React, { useState, useEffect } from 'react';
import {
  Box,
  CardContent,
  Rating,
  useMediaQuery,
  useTheme,
  Skeleton
} from '@mui/material';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TabNavigation from './TabNav'; // Ensure TabNavigation can update state
import InClassActivity from './InClassActivity'; // Import the components for each activity type
import CumulativeActivity from './CumulativeActivity';
import QuizActivity from './QuizActivity';
import {
  inClassActivities,
  cumulativeActivities,
  quizzes,
  StyledDivider,
  StyledCard,
  StyledIconContainer,
  StyledTitle,
  StyledChip,
  StyledMainCard
} from './Data';

export default function CourseAssignment() {
  const [activeTab, setActiveTab] = useState('In-Class Activities');
  const [selectedActivity, setSelectedActivity] = useState(null); // State to track selected activity
  const [loading, setLoading] = useState(true); // Loading state

  const tabDataMapping = {
    'In-Class Activities': inClassActivities,
    'Cumulative Activities': cumulativeActivities,
    Quizzes: quizzes,
  };

  useEffect(() => {
    // Simulate data loading (replace with your actual data fetching logic)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

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
      <StyledCard
        onClick={() => handleCardClick(activity)}
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          padding: isMobile ? 2 : 1, // Adjust padding for better spacing on mobile
        }}
      >
        {/* Icon Section */}
        <StyledIconContainer
          sx={{
            mb: isMobile ? 2 : 0, // Add margin-bottom on mobile
          }}
        >
          {loading ? (
            <Skeleton variant="circular" width={64} height={64} />
          ) : (
            <FilePresentIcon sx={{ fontSize: '4.5em' }} />
          )}
        </StyledIconContainer>

        {/* Main Content Section */}
        <Box
          sx={{
            px: { xs: 0, sm: 2 },
            flex: 1,
            ml: isMobile ? 0 : 0.5,
            py: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Chip */}
          {loading ? (
            <Skeleton variant="rectangular" width={60} height={20} />
          ) : (
            activity.chip && <StyledChip label={activity.chip} />
          )}

          {/* Title */}
          {loading ? (
            <Skeleton variant="text" width="80%" height={24} />
          ) : (
            activity.title && (
              <StyledTitle variant="subtitle1">
                {activity.title}
              </StyledTitle>
            )
          )}

          {/* Description */}
          {loading ? (
            <Skeleton variant="text" width="60%" height={20} />
          ) : (
            activity.description && (
              <StyledTitle variant="subtitle2">
                {activity.description}
              </StyledTitle>
            )
          )}

          {/* File Submission */}
          {loading ? (
            <Skeleton variant="text" width="40%" height={20} />
          ) : (
            activity.fileSubmission && (
              <StyledTitle variant="body2" color="textSecondary" sx={{ mt: 0.8 }}>
                File Submission: {activity.fileSubmission}
              </StyledTitle>
            )
          )}

          {loading ? (
            <Skeleton variant="text" width="50%" height={20} />
          ) : (
            activity.duration && (
              <StyledTitle variant="body2" color="textSecondary" sx={{ mt: 0.8 }}>
                Duration: {activity.duration}
              </StyledTitle>
            )
          )}

          {loading ? (
            <Skeleton variant="text" width="30%" height={20} />
          ) : (
            activity.hasOwnProperty('grade') && (
              <Rating
                value={activity.grade !== undefined ? activity.grade : 0} // Show stars even if grade is 0 or missing
                readOnly
                precision={0.5}
                max={10}
                sx={{ fontSize: '1.2rem', mt: 1.2 }}
              />
            )
          )}
        </Box>

        {/* Grade, Status, and Chevron (aligned vertically) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'center',
            mr: isMobile ? 0 : 2,
            mt: isMobile ? 2 : 0.5, // Add margin-top on mobile
          }}
        >
          {/* Render stars even if grade is 0 or undefined */}
          {loading ? (
            <Skeleton variant="text" width="40%" height={20} />
          ) : (
            activity.status && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <StyledTitle variant="body2">
                  Status:
                </StyledTitle>
                <StyledTitle variant="body2" color="textSecondary">{activity.status}</StyledTitle>
              </Box>
            )
          )}
          {loading ? (
            <Skeleton variant="circular" width={30} height={30} sx={{ mt: 1.5 }} />
          ) : (
            <ChevronRightIcon sx={{ fontSize: 30, color: '#c4c4c4', marginTop: 1.5 }} />
          )}
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
          {loading ? (
            // Render Skeletons while loading
            <>
              {[...Array(3)].map((_, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                  <Skeleton variant="circular" width={64} height={64} />
                  <Box sx={{ flex: 1, ml: 2 }}>
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="50%" height={20} />
                    <Skeleton variant="text" width="30%" height={20} />
                  </Box>
                  <Skeleton variant="circular" width={30} height={30} />
                </Box>
              ))}
            </>
          ) : (
            selectedActivity ? (
              // Render the appropriate selected activity component
              renderSelectedActivity()
            ) : (
              // Render the list of activities based on the active tab
              tabDataMapping[activeTab]?.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            )
          )}
        </CardContent>
      </StyledMainCard>
    </Box>
  );
}
