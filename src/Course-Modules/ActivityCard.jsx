import React from 'react';
import { Grid, Rating, Box, Typography} from '@mui/material';
import { StyledCard, StyledIconContainer, StyledTitle, StyledFileSubmission, StyledChip, StyledChevronButton } from './Data';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function ActivityCard({ activity }) {
  return (
    <StyledCard>
      <Grid container spacing={2}>
        {/* Left Side - Icon */}
        <Grid
          item
          xs={12}
          sm={2}
          md={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StyledIconContainer>
            <FilePresentIcon
              sx={{
                fontSize: 50,
                color: '#3f51b5',
                '@media (max-width: 600px)': {
                  fontSize: 60,
                },
              }}
            />
          </StyledIconContainer>
        </Grid>

        {/* Right Side - Content */}
        <Grid item xs={12} sm={10} md={11}>
          <Box sx={{ paddingBottom: '16px !important' }}>
            {/* Activity Title, File Submission, and Chip in the same row */}
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" sx={{ mb: 1 }}>
              {/* Activity Title */}
              <StyledTitle variant="subtitle1">
                {activity.title}
              </StyledTitle>

              {/* File Submission */}
              {activity.fileSubmission && (
                <StyledFileSubmission variant="body1">
                  File Submission: <Typography variant="body2" component="span" color="textSecondary">{activity.fileSubmission}</Typography>
                </StyledFileSubmission>
              )}

              {/* Badge */}
              {activity.grade !== undefined && (
                <StyledChip label="In-Class Activity" />
              )}
            </Box>

            {/* Activity Description */}
            <Typography
              variant="subtitle2"
              color="textSecondary"
              paragraph
              sx={{
                '@media (max-width: 600px)': { fontSize: '12px' },
              }}
            >
              {activity.description}
            </Typography>

            {/* Right Section - Status, Grade, and Chevron */}
            <Box display="flex" justifyContent={activity.status || activity.grade ? "space-between" : "flex-end"} alignItems="center" flexWrap="wrap" sx={{ mt: { xs: 2, sm: 0 }, width: '100%' }}>
              {/* Status */}
              {activity.status && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: { sm: 4 }, marginBottom: { xs: 2, sm: 0 }, flex: 1 }}>
                  <Typography variant="body1" sx={{ marginRight: 1, '@media (max-width: 600px)': { fontSize: '14px' } }}>
                    Status:
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ '@media (max-width: 600px)': { fontSize: '12px' } }}>
                    {activity.status}
                  </Typography>
                </Box>
              )}

              {/* Grade */}
              {activity.grade !== undefined && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: { sm: 4 }, marginBottom: { xs: 2, sm: 0 }, flex: 1 }}>
                  <Typography variant="body1" sx={{ marginRight: 1, '@media (max-width: 600px)': { fontSize: '14px' } }}>
                    Grade:
                  </Typography>
                  <Rating value={activity.grade} readOnly precision={0.5} max={10} sx={{ fontSize: '1.2rem', '@media (max-width: 600px)': { fontSize: '1rem' } }} />
                </Box>
              )}

              {/* Chevron for navigation */}
              <StyledChevronButton>
                <ChevronRightIcon sx={{ fontSize: 30, color: '#c4c4c4', '@media (max-width: 600px)': { fontSize: 24 } }} />
              </StyledChevronButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </StyledCard>
  );
}
