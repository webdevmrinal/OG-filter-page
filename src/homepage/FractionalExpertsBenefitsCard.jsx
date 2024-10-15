// FractionalExpertsBenefitsCard.jsx
import React from 'react';
import { Box, Typography, Card, Grid, Button } from '@mui/material'; // Imported Button
import { styled } from '@mui/material/styles';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import GradingIcon from '@mui/icons-material/Grading';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';

// Styled component for individual benefit cards
const BenefitCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', // Align content from the top
  textAlign: 'left',
  paddingTop: theme.spacing(4), // Ensure equal top padding
  paddingBottom: theme.spacing(4), // Ensure equal bottom padding
  "&:hover": {
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    backgroundColor: '#f0f0f0',
    transform: 'translateY(-4px)',
  },
}));

const FractionalExpertsBenefitsCard = () => {
  // Updated benefits array with corresponding icons
  const benefits = [
    {
      title: "Expertise without full-time commitment",
      subtitle: "Gain access to specialized knowledge and leadership without the need for a full-time hire, allowing you to stay agile as your business grows.",
      icon: ReduceCapacityIcon, // Icon component
    },
    {
      title: "Cost-effective",
      subtitle: "Hiring fractional experts comes at a fraction of the cost of full-time executives, helping you manage expenses while still benefiting from top-tier talent.",
      icon: RequestQuoteIcon,
    },
    {
      title: "Strategic impact",
      subtitle: "Fractional experts bring years of experience and can quickly integrate into your team, making an immediate impact on strategy, operations, and growth.",
      icon: GradingIcon,
    },
    {
      title: "Flexibility to scale",
      subtitle: "As your business evolves, fractional experts offer the flexibility to adjust their involvement, providing support only when you need it most.",
      icon: Diversity3OutlinedIcon,
    },
  ];

  return (
    <Card
      sx={{
        mt: 5,
        mb: 4,
        py: 5,
        px: 2,
        textAlign: 'left',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: 2,
      }}
    >
      <Box sx={{ px: 1 }}>
        {/* Updated Heading Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap', // Ensures responsiveness on smaller screens
          }}
        >
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            fontSize={'1.65rem'} 
            gutterBottom 
            sx={{ textAlign: 'left', flex: '1 1 auto' }}
          >
            Benefits of hiring fractional experts
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 'bold',
              mt: { xs: 2, sm: 0 }, // Adds margin-top on extra-small screens
            }}
            onClick={() => {
              // Handle button click, e.g., navigate to a form or expert signup page
              console.log('Become an expert button clicked');
            }}
          >
            Do you want to become an expert?
          </Button>
        </Box>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon; // Get the icon component
            return (
              <Grid
                item
                xs={12} // Full width on extra small screens
                sm={6}  // Half width on small screens
                md={3}  // One-fourth width on medium and up
                key={index}
              >
                <BenefitCard>
                  {/* Icon Section */}
                  <Box sx={{ display: 'flex', justifyContent: 'left', mb: 2 }}>
                    <IconComponent 
                      fontSize="large"
                      sx={{height: 60, width: 60, color: 'textSecondary'}}
                    />
                  </Box>
                  {/* Heading Section */}
                  <Typography 
                    variant="h6" 
                    fontWeight={'bold'} 
                    gutterBottom 
                  >
                    {benefit.title}
                  </Typography>
                  {/* Description Section */}
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                  >
                    {benefit.subtitle}
                  </Typography>
                </BenefitCard>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Card>
  );
};

export default FractionalExpertsBenefitsCard;
