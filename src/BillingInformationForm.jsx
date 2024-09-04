import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
} from "@mui/material";

const BillingInformationForm = () => {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [gstRegistered, setGstRegistered] = useState("");

  return (
    <Box sx={{ padding: 3, pt: 1, }}>
      <Typography variant="h6">Billing Information</Typography>
      <Box component="form" sx={{ mt: 1}}>
        <TextField
          label="Full name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Company name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label="Country"
          >
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="Australia">Australia</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="State/Union territory (mandatory)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Postal code"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">
            Are you registered for India GST? (mandatory)
          </FormLabel>
          <RadioGroup
            aria-label="gst-registered"
            value={gstRegistered}
            onChange={(e) => setGstRegistered(e.target.value)}
            row
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2">Invoices</Typography>
          <Typography variant="body2" color="textSecondary">
            You will find your invoices under the{" "}
            <a href="./transaction">Transaction history</a> tab.
          </Typography>
          <FormControlLabel
            control={<Checkbox />}
            label="I want to get invoices via email as well."
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BillingInformationForm;
