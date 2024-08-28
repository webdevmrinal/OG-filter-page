import React from "react";
import { Typography, Box, RadioGroup, FormControlLabel, Radio, Grid } from "@mui/material";

function Page1() {
  return (
    <Box sx={{pt: 2, pb: 35}}>
      <Typography variant="h5" component="h1" sx={{ pt: 1, fontWeight: 'bold', color: '#303030' }}>
        Let's get started. Which of these best describes you?
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', pt: 1.2 }}>
        We'll help you get set up based on your business needs.
      </Typography>
      <RadioGroup
        aria-labelledby="user-type-question"
        defaultValue=""
        name="user-type"
        row
      >
        <Grid container  sx={{ my: 2 ,justifyContent: 'space-between'}}>
          <Grid item xs={12} sm={5.9} sx={{border: '0.5px solid #e0e0e0',borderRadius: '0.375rem'}}>
            <FormControlLabel
              value="user"
              control={<Radio />}
              label="I'm a user"
              sx={{
                height: '4em',
                p: 3,
                ml: '0px',
                '&:hover': { bgcolor: '#f7f7f7' },
                width: '100%',
                borderRadius: '0.375rem'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5.9} sx={{border: '0.5px solid #e0e0e0',borderRadius: '0.375rem'}}>
            <FormControlLabel
              value="expert"
              control={<Radio />}
              label="I'm an expert"
              sx={{
                height: '4em',
                p: 3,
                ml: 0,
                '&:hover': { bgcolor: '#f7f7f7' },
                width: '100%',
                borderRadius: '0.375rem'
              }}
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </Box>
  );
}

export default Page1;
