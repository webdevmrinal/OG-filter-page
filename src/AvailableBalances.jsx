import React from "react";
import { Box, Card, Typography, Button, useMediaQuery, useTheme } from "@mui/material";

const AvailableBalances = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ padding: 3, pt: 1 }}>
      <Typography variant="h6">Available balances</Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row", // Stack cards on small screens
          gap: 2,
          marginTop: 2,
        }}
      >
        <Card
          sx={{
            flex: 1,
            padding: 2,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Your Available Balance
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            Balance from Canceled Orders
          </Typography>
          <Typography variant="h4" sx={{ marginTop: 1 }}>
            ₹0.00
          </Typography>
        </Card>

        <Card
          sx={{
            flex: 1,
            padding: 2,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
          Your Available Credits
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            Use your credits to save more!
          </Typography>
          <Typography variant="h4" sx={{ marginTop: 1 }}>
            ₹0.00
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            Use for purchases.
          </Typography>
        </Card>

        <Card
          sx={{
            flex: 1,
            padding: 2,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
          Earn Rewards!
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            Refer friends and enjoy benefits together!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            fullWidth={isSmallScreen} // Make button full width on small screens
          >
            Earn Opengrowth Credits
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default AvailableBalances;
