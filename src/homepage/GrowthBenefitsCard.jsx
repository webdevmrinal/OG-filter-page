import React from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme, useMediaQuery } from '@mui/material';

// Updated BenefitCard for equal height
const BenefitCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
  height: '100%',
}));

const GrowthBenefitsCard = () => {
  const theme = useTheme();
  // Apply column layout for screens smaller than the 'md' breakpoint (tablets and phones)
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card
      sx={{
        mt: 5,
        p: 5,
        mb: 4,
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
        borderRadius: 2,
      }}
    >
      {/* Card Title */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom fontSize="1.65rem">
          Why growth experts and associates for your AI startup’s growth?
        </Typography>
      </Box>

      {/* Main Flex Container for Growth Experts and Growth Associates */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMediumScreen ? 'column' : 'row', // Column for tablets and phones
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        {/* Growth Experts Section */}
        <Box sx={{ flex: 1, mr: isMediumScreen ? 0 : 2, mb: isMediumScreen ? 2 : 0 }}>
          <Card
            sx={{
              borderRadius: 2,
              p: 3,
              height: '100%',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Growth experts
            </Typography>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              {/* Benefit Point 1 */}
              <Grid item xs={12} sm={6}>
                <BenefitCard>
                  <Typography variant="subtitle1" textAlign="center">
                    Bring a fresh perspective with expert-led growth, particularly <b>Growth Marketing</b>, which follows a process of using data gained through marketing campaigns and experimentation to drive growth.
                  </Typography>
                </BenefitCard>
              </Grid>
              {/* Benefit Point 2 */}
              <Grid item xs={12} sm={6}>
                <BenefitCard>
                  <Typography variant="subtitle1" textAlign="center">
                    Leverage <b>Growth Selling</b>, a top-down sales growth model that brings Purposeful Connections, Thought Leadership Conversations, Coaching, Growth Network of fractional Experts to identify opportunities and test the growth hypothesis that can scale.
                  </Typography>
                </BenefitCard>
              </Grid>
            </Grid>
          </Card>
        </Box>

        {/* Growth Associates Section */}
        <Box sx={{ flex: 1, ml: isMediumScreen ? 0 : 2 }}>
          <Card
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly transparent
              borderRadius: 2,
              p: 3,
              height: '100%',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Growth associates
            </Typography>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              {/* Benefit Point 1 */}
              <Grid item xs={12} sm={6}>
                <BenefitCard>
                  <Typography variant="subtitle1" textAlign="center">
                    A growth associate will help you find <b>qualified leads, perform market research,</b> and <b>expand your user base</b> with their <b>data-driven insights</b> and <b>targeted marketing</b>.
                  </Typography>
                </BenefitCard>
              </Grid>
              {/* Benefit Point 2 */}
              <Grid item xs={12} sm={6}>
                <BenefitCard>
                  <Typography variant="subtitle1" textAlign="center">
                    A Growth Associate seamlessly collaborates across marketing, product, and sales teams to implement targeted strategies that <b>expand your customer base</b> and <b>drive revenue</b>—all without the cost of a full-time hire.
                  </Typography>
                </BenefitCard>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </Card>
  );
};

export default GrowthBenefitsCard;
