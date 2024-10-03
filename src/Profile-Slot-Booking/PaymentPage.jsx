// PaymentComponent.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Tooltip,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const PaymentComponent = ({ onPaymentSuccess, onGoBack }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayNow = () => {
    // Here you would handle the payment process
    // For now, we'll assume payment is successful
    onPaymentSuccess();
  };

  const handlePayLater = () => {
    // Handle "Pay Later" functionality if needed
    onPaymentSuccess();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Payment Details
      </Typography>
      <Typography variant="body1" gutterBottom>
      Enter your card details to complete the payment
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreditCardIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            sx={{ flexGrow: 1 }}
            variant="outlined"
            label="Expiry Date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip
            title="Last three digits on back of your card"
            placement="top"
            arrow
          >
            <TextField
              sx={{ flexGrow: 1 }}
              variant="outlined"
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="text" color="primary" onClick={onGoBack}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={handlePayNow}>
            Pay Now
          </Button>
          <Button variant="contained" color="primary" onClick={handlePayLater}>
            Pay Later
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PaymentComponent;
