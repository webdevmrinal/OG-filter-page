// GrowthServiceCard.jsx
import React from "react";
import { Box, Typography, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import growthexpert from '../assets/growthexpert.png';  // Replace with your actual path or URL
import handshake from '../assets/handshake.png';  
 
// Styled Card Component
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  width: "100%",
  maxWidth: 400,
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  textAlign: "center",
  borderRadius: 8,
  backgroundColor: "#ffffff",
}));
 
const GrowthServiceCard = ({ context }) => { // Removed props as context is used instead
 
  // Determine heading and subheading based on context
  const heading = context === 'allExperts'
    ? "Tailored Expert Support to Drive Your AI Startup’s Growth"
    : "Get the expertise you need to scale your AI startup";
 
  const subheading = context === 'allExperts'
    ? "At OpenGrowth, our mission is to connect you with the world’s leading experts in Marketing, HR, Finance, Legal, and Branding—equipping your startup with the AI-driven insights needed to accelerate your growth journey."
    : "Connect with top growth experts and associates.";
 
  // Determine subtitles for the cards based on context
  const growthExpertSubtitle = context === 'allExperts'
    ? <>Hire a Growth Expert to help you scale your AI startup without full-time commitment.</>
    : <>Accelerate your AI startup with a dedicated <b>Growth Expert</b> who will craft and implement effective growth strategies without the burden of a full-time hire.</>;
 
  const growthAssociateSubtitle = context === 'allExperts'
    ? <>Hire a Growth Associate to help you with business development on a part-time basis.</>
    : <>For targeted business development support, hire a <b>Growth Associate</b> on a part-time basis to drive your startup’s growth while maintaining flexibility and efficiency.</>;
 
  return (
    <Box
      sx={{
        mt: 6,
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        py: 5,
        px: { xs: 2, sm: 6 },
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight="bold" fontSize={'1.65rem'} gutterBottom>
        {heading}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        {subheading}
      </Typography>
 
      {/* Benefits Section with Small Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens, horizontally on medium and larger screens
          gap: 5,
          justifyContent: "center",
        }}
      >
        {/* Growth Expert Card */}
        <Box
          sx={{
            p: 3,
            width: { xs: "100%", md: "30%" }, // 100% width on small screens, 30% on medium and larger screens
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <img
              src={growthexpert}
              alt="Growth Expert"
              style={{ width: 100, height: 100, filter: "brightness(1.3)" }}
            />
          </Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Hire a Growth expert
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {growthExpertSubtitle}
          </Typography>
        </Box>
 
        {/* Growth Associate Card */}
        <Box
          sx={{
            p: 3,
            width: { xs: "100%", md: "30%" }, // 100% width on small screens, 30% on medium and larger screens
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <img
              src={handshake}
              alt="Growth Associate"
              style={{ width: 100, height: 100 }}
            />
          </Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Hire a Growth associate
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {growthAssociateSubtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
 
export default GrowthServiceCard;
