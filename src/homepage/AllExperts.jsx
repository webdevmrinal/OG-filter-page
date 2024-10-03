import React, { useState} from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Avatar,
  CardMedia,
  Button,
  Chip,
  Divider,
  ListItem,
  ListItemText,
  List
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'; // Import useTheme hook
import { useLocation, useNavigate } from "react-router-dom";
import OrganizationIcon from '@mui/icons-material/AccountTree';
import WorkLearnIcon from '@mui/icons-material/School';
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Header from '../signup-login/Header';
import Footer from '../signup-login/Footer';
import { ExpertCard } from '../ExpertCard';
import { Groups, Handshake, TrendingUp } from '@mui/icons-material';

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
        height: { xs: 'auto', sm: 'auto' }, // Adjust height for small screens
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
          width: { xs: '100%', sm: '44%' }, // Full width for small screens
          textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens
          mr: { sm: 8.85 },
          mb: { xs: 2, sm: 0 }, // Add margin below text on small screens
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
        Stop the Guesswork—Scale Your AI Startup with Targeted Expertise
        </Typography>
        <Typography variant="h6" sx={{ mt: 3, mb: 3,  }}>
        Connect, network, and collaborate with the best growth experts and associates to scale your AI startup’s growth.
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
          Connect with a Growth Expert
        </Button>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', sm: '49%' }, // Full width for small screens
          mb: { xs: 2, sm: -5 }, // Add margin below image on small screens
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
        height: 'auto',
        textAlign: "center",
        m: 1,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
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

const GrowthBenefitsCard = () => (
    <Card
      sx={{
        mt: 5,
        p: 5,
        textAlign: 'left',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: 2,
        background: 'linear-gradient(to bottom, #2c489b, #2a468d)',
        color: '#ffffff',
      }}
    >
      <Box sx={{ textAlign: "center"}}>
    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
      Growth Experts and Associates bring the following benefits to drive your AI startup’s growth
    </Typography>
    </Box>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Growth Experts
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Box component="li" sx={{ listStyleType: 'disc', pl: 0 }}>
                <Typography variant="subtitle1" paragraph sx={{ display: 'inline', ml: 0 }}>
                  Bring a Fresh Perspective with Expert-led Growth, particularly <b>Growth Marketing</b>, which follows a process of using data gained through marketing campaigns and experimentation to drive growth.
                </Typography>
              </Box>
              <Box component="li" sx={{ listStyleType: 'disc', pl: 0 }}>
                <Typography variant="subtitle1" paragraph sx={{ display: 'inline', ml: 0 }}>
                  Leverage <b>Growth Selling</b>, a top-down sales growth model that brings Purposeful Connections, Thought Leadership Conversations, Coaching, Growth Network of fractional Experts to identify opportunities and test the growth hypothesis that can scale.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Growth Associates
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Box component="li" sx={{ listStyleType: 'disc', pl: 0 }}>
                <Typography variant="subtitle1" paragraph sx={{ display: 'inline', ml: 0 }}>
                  Drive <b>user acquisition, engagement, and scaling</b> of various aspects of the business at a fraction of the cost of a full-time executive by letting a Growth Associate focus on business development using data-driven experimentation and strategic marketing.
                </Typography>
              </Box>
              <Box component="li" sx={{ listStyleType: 'disc', pl: 0 }}>
                <Typography variant="subtitle1" paragraph sx={{ display: 'inline', ml: 0 }}>
                  Benefit from <b>seamless collaboration</b> made possible by a Growth Associate working closely with various departments such as marketing, product, and sales, implementing growth strategies aimed at <b>expanding your customer base and increasing revenue</b>.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>

);

const AllExperts = () => {
  const theme = useTheme(); // Get the theme using the useTheme hook
  const navigate = useNavigate();
  const location = useLocation();
  const { experts } = location.state || {};
  
  const [selectedExpert, setSelectedExpert] = useState(null);
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

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
  };

  return (
    <Box sx={{ p: 1, pt: 0 }}>
      <Header />
      <Banner />
      <MainCard sx={{ py: 4, mt: 5,  }}>
        <Typography variant="h5" gutterBottom fontWeight={'bold'} sx={{ textAlign: 'center', m: {xs: 2, sm: 0} }}>
        Tailored Expert Support to Drive Your AI Startup’s Growth
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, textAlign: 'center',m: {xs: 2, sm: 0} }}>
        At OpenGrowth, our mission is to connect you with the world’s leading experts in Marketing, HR, Finance, Legal, and Branding—equipping your startup with the AI-driven insights needed to accelerate your growth journey.
        </Typography>
        <Grid container spacing={2} justifyContent="space-evenly" >
          <Grid item xs={12} sm={10} md={5.5} sx={{margin: {xs: 2, sm: 0.5}}}>
            <CardFeature IconComponent={TrendingUp} title="Hire a Growth Expert" subtitle="Hire a Growth Expert to help you scale your AI startup without full-time commitment." />
          </Grid>
          <Grid item xs={12} sm={10} md={5.5}sx={{ paddingLeft: '0px !important', ml: {xs: 4, sm: 0}, mr: {xs: 2, sm: 0.5}, my: 0.5 }}>
            <CardFeature IconComponent={Handshake} title="Hire a Growth Associate" subtitle="Hire a Growth Associate to help you with business development on a part-time basis." />
          </Grid>
        </Grid>
      </MainCard>
      <HowItWorks />
      <GrowthBenefitsCard />

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
          ml: {sm: 3, xs: 0},
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
        <Grid
            container
            columnSpacing={2}
            rowSpacing={1}
            sx={{
              placeItems: "center",
              placeContent: "center",
              mx: "auto",
              py: "1.5em",
              px: "8px",
            }}
          >
          {experts?.map((expert, index) => (
            <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={expert.id}
            sx={{ px: "4px !important" }}
          >
            <ExpertCard expert={expert} handleExpertClick={handleExpertClick} context="allExperts"/>
            </Grid>
          ))}
        </Grid>
      </Card>
      <Footer />
    </Box>
  );
};

export default AllExperts;