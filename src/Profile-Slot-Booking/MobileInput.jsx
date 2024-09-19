// MobileNumberInput.jsx
import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
} from '@mui/material';
import PhoneIphoneOutlined from '@mui/icons-material/PhoneIphoneOutlined';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

const MobileNumberInput = ({ onFormSubmit, onGoBack }) => {
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const loadCountries = () => {
      const countryList = getCountries().map((code) => ({
        code,
        name: code,
        dialCode: `+${getCountryCallingCode(code)}`,
      }));
      setCountries(countryList);
      if (!countryCode && countryList.length > 0) {
        setCountryCode(countryList[0].dialCode);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const handleConfirm = () => {
    // You can add validation here
    onFormSubmit({ mobileNumber: `${countryCode}${mobileNumber}` });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create an account, or log in
      </Typography>
      <Typography variant="body1" gutterBottom>
        Start by entering your mobile number. We'll send you a 4-digit code to verify:
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <TextField
          select
          label="Country Code"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          sx={{ width: '200px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIphoneOutlined />
              </InputAdornment>
            ),
          }}
        >
          {countries.map((option) => (
            <MenuItem key={option.code} value={option.dialCode}>
              {option.code} ({option.dialCode})
            </MenuItem>
          ))}
        </TextField>
        <TextField
          inputRef={inputRef}
          fullWidth
          variant="outlined"
          label="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="234 567 8900"
        />
      </Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body1" fontWeight={'bold'} gutterBottom>
            Why a mobile number?
          </Typography>
          <Typography variant="body1" gutterBottom>
            It's less complicated than remembering an email and password, and to verify that
            you're a real person.
          </Typography>
        </Box>
        <Box>
          <Button variant="text" color="primary" onClick={onGoBack}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm Number
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MobileNumberInput;
