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
import { styled, useTheme } from '@mui/material/styles'; // Import useTheme hook
import { useLocation, useNavigate } from "react-router-dom";
import OrganizationIcon from '@mui/icons-material/AccountTree';
import WorkLearnIcon from '@mui/icons-material/School';
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
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
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const Banner = () => {
  const theme = useTheme(); // Get the theme using the useTheme hook

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2c489b',
        color: '#fff',
        padding: { xs: '1rem', sm: '2rem 6.3rem 2.1rem 2rem' }, // Adjust padding for small screens
        height: { xs: 'auto', sm: '440px' }, // Adjust height for small screens
        borderRadius: 2,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column-reverse', // Stack text on top of image for small screens
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '42%' }, // Full width for small screens
          textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens
          mr: { sm: 8.85 },
          mb: { xs: 2, sm: 0 }, // Add margin below text on small screens
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
          Unlock Expert Insights and Propel your Business Growth
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, mb: 3, fontSize: { xs: '1rem', sm: '1.5rem' } }}>
          Hire, network, and collaborate with global industry experts
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#f9bb02',
            '&:hover': { backgroundColor: '#d6a302' },
            borderRadius: '50px',
            color: 'black',
            fontSize: { xs: '0.7em', sm: '0.8em' }, // Adjust button text size for small screens
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          }}
        >
          Find An Expert
        </Button>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', sm: '49%' }, // Full width for small screens
          mb: { xs: 2, sm: 0 }, // Add margin below image on small screens
        }}
      >
        <img
          src="https://www.opengrowth.com/assets/public/opengrowth/images/banner/experts-banner.png"
          alt="Banner Image"
          style={{ width: '100%', height: {sm: 'auto', xs: '40vh'}, objectFit: 'cover' }}
        />
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

const HowItWorksCard = ({ icon, title, description }) => {
  const theme = useTheme(); // Get the theme using the useTheme hook

  return (
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
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          height: 'auto',
          marginBottom: '1rem',
          padding: '1em 1em',
        }
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
};

const ExpertCard = ({ name, industry, img, email }) => {
  const theme = useTheme(); // Get the theme using the useTheme hook
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
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          margin: '10px 0',
        },
      }}
    >
      <CardMedia
        component="img"
        height="290"
        image={`https://academy.opengrowth.com/assets/images/users/${img}`}
        alt={name}
        sx={{
          objectFit: 'cover',
          [theme.breakpoints.down('sm')]: {
            height: 'auto',
          },
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
          textAlign: 'center',
          mt: 'auto',
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
  );
};

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

const AllExperts = () => {
  const theme = useTheme(); // Get the theme using the useTheme hook
  const navigate = useNavigate();
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
    <Box sx={{ p: 1, pt: 0 }}>
      <Header />
      <Banner />
      <MainCard sx={{ py: 4, mt: 5,  }}>
        <Typography variant="h5" gutterBottom fontWeight={'bold'} sx={{ textAlign: 'center', m: {xs: 2, sm: 0} }}>
          Grow your startup with On-Demand and Fractional Executives as Your Success Partners
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, textAlign: 'center',m: {xs: 2, sm: 0} }}>
          At OpenGrowth, our mission is to connect you with top global experts across diverse domains, including Marketing, HR, Finance, Legal, and Branding to catalyze your startup growth journey empowered by cutting-edge AI technologies.
        </Typography>
        <Grid container spacing={2} justifyContent="space-evenly" >
          <Grid item xs={12} sm={10} md={5.5} sx={{margin: {xs: 2, sm: 0.5}}}>
            <CardFeature IconComponent={OrganizationIcon} title="Hire Fractional Executives" subtitle="Hire an Expert to solve your startup’s specific problems at a fractional cost." />
          </Grid>
          <Grid item xs={12} sm={10} md={5.5}sx={{ paddingLeft: '0px !important', ml: {xs: 4, sm: 0}, mr: {xs: 2, sm: 0.5}, my: 0.5 }}>
            <CardFeature IconComponent={WorkLearnIcon} title="On Demand Expert" subtitle="Easily schedule a one-on-one session with an Expert for quick resolution." />
          </Grid>
        </Grid>
      </MainCard>
      <HowItWorks />

      {/* Top Experts Card */}
      <Card sx={{ mt: 4, p: 3, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", borderRadius: "12px" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, ml:{sm: 4, xs: 0}, textAlign: 'left' }}>
          Top Experts
        </Typography>
        <Divider sx={{ mb: 2, width: '98%', ml: {sm: 2, xs: 0} }} />
        <Box sx={{
          mb: 2,
          display: 'flex',
          flexWrap: 'nowrap', // Ensure the chips don't wrap to the next line
          ml: {sm: 4, xs: 0},
          gap: 1,
          overflowX: 'auto', // Allow horizontal scrolling
          scrollbarWidth: 'none', // For Firefox to hide the scrollbar
          '&::-webkit-scrollbar': { display: 'none' }, // For Chrome, Edge, and Safari
          [theme.breakpoints.down('sm')]: {
            overflowX: 'auto', // Enable scrolling on small screens
          },
        }}>
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
                whiteSpace: 'nowrap',
              }}
            />
          ))}
        </Box>
        {/* Displaying Experts inside the same card */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {experts.map((expert, index) => (
            <ExpertCard key={index} {...expert} />
          ))}
        </Box>
      </Card>
    </Box>
  );
};

export default AllExperts;
