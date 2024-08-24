import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import OrganizationIcon from '@mui/icons-material/AccountTree';
import WorkLearnIcon from '@mui/icons-material/School';
import TrackIcon from '@mui/icons-material/Timeline';
import TeamIcon from '@mui/icons-material/Group';

// Styled components
const MainCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  borderRadius: "8px",
  overflow: "hidden",
  margin: 'auto',
  padding: '0px 0px',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(1),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#ffffff', // Ensuring a solid background for the hover effect
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
    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, marginRight: 1 }}>
      <IconComponent fontSize="small" />
    </Avatar>
    <Typography variant="subtitle1">{title}</Typography>
  </FeatureCard>
);

// Main hub component containing all feature cards
const Hub = () => {
  return (
    <Box sx={{ my: 6,  }}>
        <Typography variant="h6" gutterBottom fontWeight={'bold'} sx={{ textAlign: 'center' }}>
          OpenGrowth Hub: Virtual Collaboration Platform
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
          Streamline your Startup's Operations with our Digital HQ for Efficient Collaboration and Growth
        </Typography>
        <Grid container spacing={2} justifyContent="center" px={2}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <CardFeature IconComponent={OrganizationIcon} title="Get Organized" />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <CardFeature IconComponent={WorkLearnIcon} title="Work & Learn" />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <CardFeature IconComponent={TrackIcon} title="Stay on Track" />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <CardFeature IconComponent={TeamIcon} title="Collaborate with Team" />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: 4, pb: 3, gap: 2 }}>
          <Button variant="contained" color="secondary" sx={{backgroundColor: '#f9bb02'}}>Know More</Button>
          <Button variant="contained" color="primary">Sign Up For Free</Button>
          
        </Box>
    </Box>
  );
};

export default Hub;
