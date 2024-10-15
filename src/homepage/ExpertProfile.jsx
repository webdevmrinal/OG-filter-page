// src/components/ExpertProfile.jsx

import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  Avatar,
  Box,
  Chip,
  useMediaQuery,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Rating from '@mui/material/Rating'; // Import Rating Component

// Import manualExperts data
import { manualExperts } from './ManualExperts';
import Header from '../signup-login/Header';
import Footer from '../signup-login/Footer';

// Styled Components

const CustomPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  background: `url('https://www.opengrowth.com/assets/public/opengrowth/images/banner/detail-banner.png') no-repeat center center`,
  backgroundSize: 'cover',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderTopRightRadius: 220,
  borderBottomRightRadius: 220,
  color: '#fff',
  minHeight: 'auto', // Adjust as needed
  width: '80%',
  boxShadow: 'none',
}));

const HeaderText = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  paddingRight: theme.spacing(4),
}));

const CTACard = ({ description, buttonText, label, rating }) => (
  <Box
    sx={{
      position: 'relative',
      maxWidth: 354,
      my: 4,
      mx: 4,
      padding: 2,
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#f9bb02',
        color: 'black',
        padding: '4px 8px',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      }}
    >
      {label}
    </Box>

    <Typography variant="subtitle1" sx={{ mt: rating !== undefined ? 6 : 6 }}>
      {description}
    </Typography>
    
    {/* Conditionally render the rating */}
    {rating !== undefined && (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>

        <Rating value={rating} readOnly precision={0.5} />
      </Box>
    )}
    <Button variant="contained" color="primary" sx={{ mt: 2, borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}>
      {buttonText}
    </Button>
  </Box>
);

// Updated OffersSection Component to Render as List
const OffersSection = ({ offers }) => (
  <Box
    sx={{
      padding: 2,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
      mt: 4,
    }}
  >
    <Typography variant="h5" fontSize={'1.6rem'} fontWeight={'bold'} gutterBottom>
      Things I Can Offer Advice On
    </Typography>
    {offers && offers.length > 0 ? (
      <List dense sx={{ padding: 0 }}>
        {offers.map((offer, index) => (
          <ListItem key={index} alignItems="flex-start" sx={{ paddingY: 0.5 }}>
            <ListItemText
              primary={
                <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.2 }}>
                  {offer}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography variant="body1" color="textSecondary">
        No offerings available at the moment.
      </Typography>
    )}
  </Box>
);

// Updated AboutSection Component to Handle Arrays with Reduced Gaps
const AboutSection = ({ about }) => (
  <Box
    sx={{
      padding: 2,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
      mt: 2,
    }}
  >
    <Typography variant="h5" fontSize={'1.6rem'} fontWeight={'bold'} gutterBottom>
      About Me
    </Typography>
    {Array.isArray(about) ? (
      <List dense sx={{ padding: 0 }}>
        {about.map((point, index) => (
          <ListItem key={index} alignItems="flex-start" sx={{ paddingY: 0.5 }}>
            <ListItemText
              primary={
                <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.5 }}>
                  {point}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography variant="body1" color={'textSecondary'}>
        {about}
      </Typography>
    )}
  </Box>
);

// Main ExpertProfile Component

const ExpertProfile = () => {
  const { profile_url } = useParams(); // Extract profile_url from route
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  // Find the expert based on profile_url
  const expert = useMemo(() => {
    return manualExperts.find((exp) => exp.profile_url === profile_url);
  }, [profile_url]);

  if (!expert) {
    return (
      <Container maxWidth="xl" sx={{ marginTop: 4 }}>
        <Typography variant="h4" color="text.secondary" align="center">
          Expert not found.
        </Typography>
      </Container>
    );
  }

  // Helper function to determine image URL
  const getImageUrl = (img) => {
    // Check if img is an absolute URL
    if (/^https?:\/\//i.test(img)) {
      return img;
    } else {
      // Assume it's a relative path; prepend the assets path
      return `${process.env.PUBLIC_URL}/assets/experts/${img}`;
    }
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 1 }, overflowX: 'hidden' }}>
      <Header />
      <Container maxWidth="xl" sx={{ marginTop: 2, marginBottom: 4 }}>
        {/* Expert Header with Overlapping Avatar */}
        <Box sx={{ position: 'relative', marginBottom: isLarge ? 6 : 4 }}>
          <CustomPaper elevation={3}>
            <Grid container alignItems="center">
              {/* Textual Information */}
              <Grid item xs={12} lg={8}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
                    {expert.industry}
                  </Typography>
                <HeaderText sx={{ mt: { xs: 6, lg: 0 } }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {expert.name}
                  </Typography>
                  <Typography variant="h6">{expert.category}</Typography>
                  
                  {/* Years of Experience */}
                  {expert?.yoe && (
                    <Typography
                      color="inherit"
                      variant="subtitle1"
                      sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                    >
                      {expert.yoe}
                    </Typography>
                  )}

                  {/* Location with Conditional Rendering */}
                  {expert?.location && (
                    <Typography
                      color="inherit"
                      variant="subtitle1"
                      sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
                    >
                      <LocationOnIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                      {expert.location}
                    </Typography>
                  )}

                  <Typography sx={{ my: 2 }}>
                    {expert.about.substring(0, 300)}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {expert.skills?.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        sx={{
                          marginRight: 1,
                          marginBottom: 1,
                          color: '#004aad',
                          backgroundColor: '#fff',
                        }}
                      />
                    ))}
                  </Box>
                  {/* Removed the Request a Call button from here */}
                </HeaderText>
              </Grid>
            </Grid>
          </CustomPaper>

          {/* Avatar Section */}
          <Box
            sx={{
              position: 'absolute',
              top: isLarge ? 5 : -60, // Adjust vertical position based on screen size
              left: '85%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column', // To stack avatar and button vertically
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Avatar
              alt={expert.name}
              src={getImageUrl(expert.img)}
              sx={{
                width: isLarge ? 320 : 120,
                height: isLarge ? 320 : 120,
                border: '20px solid #fff',
                borderRadius: '50%',
                boxShadow: 'none',
              }}
            />
            {/* Added the Request a Call button below the avatar */}
            <Button
              variant="contained"
              fontWeight={'700'}
              sx={{ borderRadius: '20px', mt: 1, backgroundColor: '#f9bb02', color: 'black', textTransform: 'none' }}
            >
              Request a Call
            </Button>
          </Box>
        </Box>

        {/* About and Contact Sections */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <AboutSection about={expert.long_about || "No information available."} />
            {/* Updated OffersSection Below AboutSection */}
            <OffersSection offers={expert.offers} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CTACard
              label="Book a video call"
              description="Book a 1:1 live video consultation and get personalized invite"
              buttonText="Check Availability"
              rating={expert.rating} // Add the rating prop here
            />
            <CTACard
              label="Fractional hire"
              description="Hire the expert at fractional cost on a for-hire, part-time basis as per your specific requirements."
              buttonText="Contact Us"
              // No rating prop here
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ExpertProfile;
