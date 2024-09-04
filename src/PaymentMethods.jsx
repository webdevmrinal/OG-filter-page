import React from "react";
import { Box, Card, Typography, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PayPalLogo from './assets/paypal.png';  // Replace with your actual path or URL
import VisaLogo from './assets/visa.png';      // Replace with your actual path or URL
import MasterCardLogo from './assets/mastercard.png';

const PaymentMethods = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ padding: 3, pt: 1 }}>
      <Typography variant="h6">Payment methods</Typography>
      <Typography variant="subtitle2" color="textSecondary" sx={{ marginTop: 1 }}>
        Easily manage your payment methods through our secure system.
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: isSmallScreen ? 'column' : 'row', // Stack cards on small screens
          gap: 2, 
          marginTop: 3 
        }}
      >
        <Card 
          sx={{ 
            flex: 1, 
            padding: 2, 
            borderRadius: "8px", 
            display: 'flex', 
            alignItems: 'center', 
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)", 
            height: '80px' 
          }}
        >
          <Box 
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: '50%', 
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={PayPalLogo} alt="PayPal Logo" style={{ width: 40 }} />
          </Box>
          <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>PayPal</Typography>
        </Card>

        <Card 
          sx={{ 
            flex: 1, 
            padding: 2, 
            borderRadius: "8px", 
            display: 'flex', 
            alignItems: 'center', 
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)", 
            height: '80px' 
          }}
        >
          <Box 
            sx={{ 
              backgroundColor: 'transparent',
              borderRadius: '50%', 
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={VisaLogo} alt="Visa Logo" style={{ width: 40 }} />
          </Box>
          <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>Visa</Typography>
        </Card>

        <Card 
          sx={{ 
            flex: 1, 
            padding: 2, 
            borderRadius: "8px", 
            display: 'flex', 
            alignItems: 'center', 
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)", 
            height: '80px' 
          }}
        >
          <Box 
            sx={{ 
              backgroundColor: 'white', 
              borderRadius: '50%', 
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={MasterCardLogo} alt="MasterCard Logo" style={{ width: 40 }} />
          </Box>
          <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>MasterCard</Typography>
        </Card>
      </Box>

      <Divider sx={{ marginY: 3 }} />

      <Button
        variant="text"
        sx={{ 
          marginTop: 2, 
          textTransform: "none", 
          color: "#3f51b5",
          alignSelf: isSmallScreen ? 'center' : 'flex-start'  // Center the button on small screens
        }}
        startIcon={<AddIcon />}
      >
        Add a payment method
      </Button>
    </Box>
  );
};

export default PaymentMethods;
