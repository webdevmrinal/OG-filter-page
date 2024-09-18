import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

const ShimmerSignup = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 1,
        py: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Shimmer for the image slider on the left */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: { xs: "none", md: "block" }, // Hide on xs, show on md and larger
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ borderRadius: "8px", mb: 2 , mt: 5}}
        />
      </Box>

      {/* Shimmer for the form on the right */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          p: { xs: 2, md: 5 },
        }}
      >
        <Skeleton variant="text" height={40} width="50%" animation="wave" />
        <Skeleton variant="text" height={30} width="30%" animation="wave" />
        
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={56} animation="wave" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={56} animation="wave" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={56} animation="wave" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={56} animation="wave" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={56} animation="wave" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={56} animation="wave" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={56} animation="wave" />
            </Grid>
          </Grid>
        </Box>

        {/* Button shimmer */}
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rectangular" height={56} width="100%" animation="wave" />
        </Box>
      </Box>
    </Box>
  );
};

export default ShimmerSignup;
