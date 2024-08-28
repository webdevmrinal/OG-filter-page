import React from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  CardMedia,
  Button,
  Chip,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from "react-router-dom";
import OrganizationIcon from '@mui/icons-material/AccountTree';
import WorkLearnIcon from '@mui/icons-material/School';
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ProfilePage from '../ProfilePage';
import Header from '../signup-login/Header';

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

const Banner = () => {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2c489b', // Blue background
        color: '#fff',
        padding: '2rem 6.3rem 2.1rem 2rem', // Adjust padding as needed
        height: '440px',
        borderRadius: 2,
      }}>
        <Box sx={{ width: '50%' }}>
          <img 
            src="https://www.opengrowth.com/assets/public/opengrowth/images/banner/experts-banner.png" 
            alt="Banner Image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box sx={{ width: '42%', textAlign: 'left', mr: 8.85 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Unlock Expert Insights and Propel your Business Growth</Typography>
          <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>Hire, network, and collaborate with global industry experts</Typography>
          <Button variant="contained" sx={{ backgroundColor: '#f9bb02', '&:hover': { backgroundColor: '#d6a302' }, borderRadius: '50px',
        color: 'black', fontSize: '0.8em', fontWeight: '600', boxShadow: "0 4px 6px rgba(0,0,0,0.2)", }}>
            Find An Expert
          </Button>
        </Box>
        
      </Box>
    );
  };
  

const CardFeature = ({ IconComponent, title, subtitle }) => (
  <FeatureCard>
    <Avatar sx={{ bgcolor: '#f9bb02', width: 60, height: 60, marginRight: 2 }}>
      <IconComponent fontSize="large" />
    </Avatar>
    <Box>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="subtitle1" color={'text.secondary'} gutterBottom>
        {subtitle}
      </Typography>
    </Box>
  </FeatureCard>
);

const HowItWorksCard = ({ icon, title, description }) => (
    <Card
      sx={{
        width: 320,
        height: 280,
        textAlign: "center",
        m: 1,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Card>
  );

  const HowItWorks = () => (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        How it works?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <HowItWorksCard
          icon={<SearchIcon sx={{ fontSize: 50, color: "#25387c" }} />}
          title="Find an expert"
          description="Discover and choose from our list of the world's most in-demand experts."
        />
        <HowItWorksCard
          icon={<EventAvailableIcon sx={{ fontSize: 50, color: "#25387c" }} />}
          title="Book a video call"
          description="Select a time that works for both you and your expert's schedule."
        />
        <HowItWorksCard
          icon={<VideoCallIcon sx={{ fontSize: 50, color: "#25387c" }} />}
          title="Virtual consultation"
          description="Join the 1-on-1 video call, ask questions, and get expert advice."
        />
      </Box>
    </Box>
  );

  const ExpertCard = ({ name, industry, img, email, }) => {
    const navigate = useNavigate();
const handleRequestCall = () => {
    navigate(`/profile/${name}`, {
      state: {
        expertEmail: email
      }
    });
  };
    return (
    
    <Card
      sx={{
        width: 300,
        margin: 2,
        
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        "&:hover": {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
        position: 'relative', // Ensures that the position of children can be absolute in relation to this card
        overflow: 'hidden' // Ensures that no content spills out of the card boundary
      }}
    >
      <CardMedia
        component="img"
        height="290"
        image={`https://academy.opengrowth.com/assets/images/users/${img}`}
        alt={name}
        sx={{
          objectFit: 'cover' // Ensures the image covers the designated area without distortion
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          
          bottom: 65, 
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.6)', 
          color: 'white',
          textAlign: 'center', 
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2">
          {industry}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 2,
          textAlign: 'center', // Centers the button within its container
          mt: 'auto' // Pushes the button container to the bottom of the card
        }}
      >
        <Button
          variant="contained"
          onClick={handleRequestCall}
          sx={{
            color: 'white',
            fontSize: '0.8em',
            fontWeight: '500',
            borderRadius: '35px',
            "&:hover": {
                color: 'black',
              backgroundColor: '#f2a603',
            },
          }}
        >
          Request a Call
        </Button>
      </Box>
    </Card>
  )};
  

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
    <Box sx={{ p: 3, pt: 0}}>
      <Header />
      <Banner />
      <MainCard sx={{ py: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom fontWeight={'bold'} sx={{ textAlign: 'center' }}>
          Grow your startup with On-Demand and Fractional Executives as Your Success Partners
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
          At OpenGrowth, our mission is to connect you with top global experts across diverse domains, including Marketing, HR, Finance, Legal, and Branding to catalyze your startup growth journey empowered by cutting-edge AI technologies.
        </Typography>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item xs={12} sm={10} md={5.5} margin={0.5}>
            <CardFeature IconComponent={OrganizationIcon} title="Hire Fractional Executives" subtitle="Hire an Expert to solve your startup’s specific problems at a fractional cost."/>
          </Grid>
          <Grid item xs={12} sm={10} md={5.5} margin={0.5} sx={{paddingLeft: '0px !important'}}>
            <CardFeature IconComponent={WorkLearnIcon} title="On Demand Expert" subtitle="Easily schedule a one-on-one session with an Expert for quick resolution."/>
          </Grid>
        </Grid>
      </MainCard>
      <HowItWorks />

      {/* Top Experts Card */}
      <Card sx={{ mt: 4, p: 3, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", borderRadius: "12px" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, ml: 4, textAlign: 'left' }}>
          Top Experts
        </Typography>
        <Divider sx={{mb: 2, width: '98%', ml: 2}}/>
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', }}>
        {experts.map((expert, index) => {
  console.log(expert); // This will log each expert object to the console
  return <ExpertCard key={index} {...expert} />;
})}
        </Box>
      </Card>
    </Box>
  );
};

export default AllExperts;
