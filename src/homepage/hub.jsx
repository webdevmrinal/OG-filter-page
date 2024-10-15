import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Grid,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import OrganizationIcon from '@mui/icons-material/AccountTree';
import WorkLearnIcon from '@mui/icons-material/School';
import TrackIcon from '@mui/icons-material/Timeline';
import TeamIcon from '@mui/icons-material/Group';
import hub from '../assets/hub.jpg';

// Styled components
const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: "20px",
  padding: "6px 16px",
  textTransform: "none",
  fontWeight: "bold",
  boxShadow:
    variant === "contained" ? "0px 2px 4px rgba(0, 0, 0, 0.1)" : "none",
  "&:hover": {
    boxShadow:
      variant === "contained" ? "0px 4px 8px rgba(0, 0, 0, 0.15)" : "none",
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
  padding: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  "&:hover": {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
    backgroundColor: '#0000000a'
  },
}));

// Feature card component using Avatar
const CardFeature = ({ IconComponent, title }) => (
  <FeatureCard>
    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, marginRight: 2 }}>
      <IconComponent fontSize="small" />
    </Avatar>
    <Typography variant="subtitle1">{title}</Typography>
  </FeatureCard>
);

// Main hub component containing all feature cards
const Hub = () => {
  return (
    <Box sx={{
      my: 6,
      overflow: "hidden",
      px: 2.5,
      boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      py: 2.5,
      borderRadius: 2,
    }}>
      {/* Heading */}
      <Typography variant="h5" gutterBottom fontWeight={'bold'} sx={{ textAlign: 'center' }} fontSize={'1.65rem'}>
        OpenGrowth Hub: Virtual collaboration platform for experts and startups
      </Typography>

      {/* Subheading */}
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Streamline, organize, and seamlessly connect with your team using our all-in-one virtual collaboration tool.
      </Typography>

      {/* Content Section */}
      <Grid container spacing={4} justifyContent="center" px={2}>
        {/* Left Section: Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '90%',
              height: '90%',
              minHeight: { xs: '200px', md: '300px' },
              backgroundImage: `url(${hub})`, // Replace with your image URL or import
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
            }}
          />
        </Grid>

        {/* Right Section: Feature Cards and Buttons */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Feature Cards: Two per row */}
            <Grid item xs={12} sm={6}>
              <CardFeature IconComponent={OrganizationIcon} title="Get organized" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardFeature IconComponent={WorkLearnIcon} title="Work & Learn" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardFeature IconComponent={TrackIcon} title="Stay on track" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardFeature IconComponent={TeamIcon} title="Collaborate with team" />
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <StyledButton variant="contained" color="secondary" sx={{
                  backgroundColor: '#f9bb02', "&:hover": {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(-2px)',
                    backgroundColor: '#f9bb02'
                  },
                }}>
                  Know more
                </StyledButton>
                <StyledButton variant="contained" color="primary" sx={{"&:hover": {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(-2px)',
                  },}}>
                  Sign up for free
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hub;
