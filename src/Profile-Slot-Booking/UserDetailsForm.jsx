// UserDetailsForm.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';

const UserDetailsForm = ({ onFormSubmit, onGoBack }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromoCode = () => {
    console.log('Promo Code Applied:', promoCode);
  };

  const handleSubmit = () => {
    // Collect the user details and pass them back to the parent component
    const formData = {
      email,
      firstName,
      lastName,
      promoCode: showPromoCode ? promoCode : null,
    };
    onFormSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Almost There...
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please enter the information below
      </Typography>

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          {!showPromoCode ? (
            <Button variant="text" onClick={() => setShowPromoCode(true)} sx={{ mb: 2 }}>
              Apply Promo Code
            </Button>
          ) : (
            <TextField
              label="Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mb: 2, width: '41.8em' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handleApplyPromoCode} color="primary" size="small">
                      Apply
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Box>
        <Box>
          <Button variant="text" color="primary" onClick={onGoBack}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Confirm your slot
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserDetailsForm;
