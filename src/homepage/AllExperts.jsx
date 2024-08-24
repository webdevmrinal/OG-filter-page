import React from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  CardMedia,
  Button,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from "react-router-dom";
import OrganizationIcon from '@mui/icons-material/AccountTree';
import WorkLearnIcon from '@mui/icons-material/School';
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

// Styled components
const MainCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  borderRadius: "8px",
  overflow: "hidden",
  margin: 'auto',
  padding: '0px',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  width: '100%',
  "&:hover": {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
    backgroundColor: '#0000000a'
  },
}));

const CardFeature = ({ IconComponent, title, subtitle }) => (
  <FeatureCard>
    <Avatar sx={{ bgcolor: '#f9bb02', width: 60, height: 60, marginRight: 2 }}>
      <IconComponent fontSize="large" />
    </Avatar>
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        {subtitle}
      </Typography>
    </Box>
  </FeatureCard>
);

const HowItWorksCard = ({ icon, title, description }) => (
  <Box
    sx={{
      flex: 1,
      textAlign: "center",
      padding: 2,
      borderRight: "1px solid #e0e0e0", 
      "&:last-child": {
        borderRight: "none", 
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 2,
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

const HowItWorks = () => (
  <Card sx={{ textAlign: "center", mt: 4, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", borderRadius: "12px", mr: 0, ml: 0}}>
    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ pt: 3 }}>
      How it works?
    </Typography>
    <Box sx={{ display: "flex", p: 2 }}>
      <HowItWorksCard
        icon={<SearchIcon sx={{ fontSize: 50, color: "#25387c" }} />}
        title="Find an expert"
        description="Discover and choose from our list of the world's most in-demand"
      />
      <HowItWorksCard
        icon={<EventAvailableIcon sx={{ fontSize: 50, color: "#25387c" }} />}
        title="Book a video call"
        description="Select a time that works for both you and your expert's schedule"
      />
      <HowItWorksCard
        icon={<VideoCallIcon sx={{ fontSize: 50, color: "#25387c" }} />}
        title="Virtual consultation"
        description="Join the 1-on-1 video call, ask questions and get expert advice"
      />
    </Box>
  </Card>
);

const ExpertCard = ({ name, industry, img }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: 300,
      m: 2,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative', // Add relative positioning to the card
      "&:hover": {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
    }}
  >
    <CardMedia
      component="img"
      height="300"
      image={`https://academy.opengrowth.com/assets/images/users/${img}`}
      alt={name}
      sx={{
        borderRadius: 0,
        objectFit: 'cover',
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
        color: 'white',
        padding: '8px',
        borderRadius: '4px', // Rounded bottom-right corner
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="body2" color="white">
        {industry}
      </Typography>
    </Box>
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        color: 'white',
        padding: '8px',
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#f9bb02',
          color: 'black',
          fontSize: '0.67em',
          fontWeight: '600',
          borderRadius: '50px',
          "&:hover": {
            backgroundColor: '#f2a603',
          },
        }}
      >
        Request a Call
      </Button>
    </Box>
  </Card>
);

const AllExperts = ({ }) => {
  const location = useLocation();
  const { experts } = location.state || {};
  const chipLabels = [
    "Personal Branding",
    "Entrepreneurship",
    "Marketing",
    "Mentorship",
    "Demand Generation",
    "Legal Solutions",
    "Fundraising",
    "Brand Development",
    "HR Strategy",
    "Business Consulting",
    "Talent Acquisition",
  ];

  return (
    <Box sx={{ p: 3 }}>
      <MainCard sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={'bold'} sx={{ textAlign: 'center' }}>
          Grow your startup with On-Demand and Fractional Executives as Your Success Partners
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
          At OpenGrowth, our mission is to connect you with top global experts across diverse domains, including Marketing, HR, Finance, Legal, and Branding to catalyze your startup growth journey empowered by cutting-edge AI technologies.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={10} md={5.5} margin={0.5}>
            <CardFeature IconComponent={OrganizationIcon} title="Hire Fractional Executives" subtitle="Hire an Expert to solve your startup’s specific problems at a fractional cost."/>
          </Grid>
          <Grid item xs={12} sm={10} md={5.5} margin={0.5}>
            <CardFeature IconComponent={WorkLearnIcon} title="On Demand Expert" subtitle="Easily schedule a one-on-one session with an Expert for quick resolution."/>
          </Grid>
        </Grid>
      </MainCard>
      <HowItWorks />

      {/* Top Experts Card */}
      <Card sx={{ mt: 4, p: 3, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", borderRadius: "12px" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, ml: 4, textAlign: 'left' }}>
          Top Experts
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', ml:4, gap: 1 }}>
          {chipLabels.map((label, index) => (
            <Chip
              key={index}
              label={label}
              variant="contained"
              sx={{
                height: '35px',
                width: '155px',
                fontSize: '0.9rem',
                borderRadius: '20px',
              }}
            />
          ))}
        </Box>
        {/* Displaying Experts inside the same card */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {experts.map((expert, index) => (
            <ExpertCard key={index} {...expert} />
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default AllExperts;
