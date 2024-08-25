import React from "react";
import { Typography, Box, RadioGroup, FormControlLabel, Radio } from "@mui/material";

function Page1() {
  return (
    <Box sx={{}}>
      <Typography variant="h5" component="h1" sx={{ pt: 1.5, fontWeight: 'bold', color: '#303030' }}>
        Let's get started. Which of these best describes you?
      </Typography>
      <Typography variant="body2" sx={{ color: '#616161' }}>
        We'll help you get set up based on your business needs.
      </Typography>
      <Box
        component="ul"
        sx={{
          width: '100%',
          my: 2,
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
          padding: 0,
          listStyle: 'none',
        }}
      >
        <Box component="li" sx={{ width: '100%', borderRadius: '0.375rem', '&:hover': { bgcolor: '#f7f7f7' } }}>
          <label className="w-full h-full block radio" htmlFor="exp-1">
            <input type="radio" id="exp-1" name="exp"/>
            <span className="text-sm font-light inline-block w-full h-full py-5 " style={{marginLeft: '10px', marginBottom: '3px'}}>
              I'm a user
            </span>
          </label>
        </Box>
        <Box component="li" sx={{ width: '100%', borderRadius: '0.375rem', '&:hover': { bgcolor: '#f7f7f7' } }}>
          <label className="w-full h-full radio" htmlFor="exp-2">
            <input type="radio" id="exp-2" name="exp" />
            <span className="text-sm font-light inline-block w-full h-full py-5" style={{marginLeft: '10px', marginBottom: '3px'}}>
              I'm an expert
            </span>
          </label>
        </Box>
      </Box>
    </Box>
  );
}

export default Page1;