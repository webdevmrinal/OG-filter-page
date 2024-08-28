import React from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Tabs, Tab, useTheme, Card, CardContent
} from '@mui/material';

const features = [
  "User", "Space", "Direct Message", "Private Channel", "Channels",
  "Communicate", "Meeting", "Private Q & A", "Forum", "Work", "Huddle",
  "My Projects", "My Timesheet", "My Reports", "My Clients", "My Stacks", "My Task",
  "Weekly Huddle", "311 Planning", "Parking Lot", "Daily Huddle",
  "Team Book", "Mentorship", "CMS Pages", "Leadership", "Community", "External Community", "Academy"
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: ["10 User", "10 GB", "❌", "❌", "10 Public", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "Up to 5", "❌", "Up to 5", "❌", "❌"]
  },
  {
    name: "Pro",
    price: "₹5000",
    features: ["Up to 50", "25 GB", "✔️", "Unlimited", "Unlimited", "✔️", "✔️", "❌", "❌", "✔️", "✔️", "✔️", "✔️", "✔️", "❌", "❌", "✔️", "✔️", "✔️", "✔️", "✔️", "❌", "❌", "Unlimited", "❌", "Up to 5", "❌", "❌"]
  },
  {
    name: "Premium",
    price: "₹10999",
    features: ["100 User", "100 GB", "✔️", "Unlimited", "Unlimited", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "✔️", "Unlimited", "✔️", "Unlimited", "✔️", "✔️"]
  },
  {
    name: "Enterprise",
    price: "Contact Sales",
    features: Array(features.length).fill("✔️")
  }
];

const renderCheckMark = (feature) => {
  return feature === '✔️' ? <Typography style={{ color: '#4caf50' }}>✔</Typography> : feature;
};

const PricingPage = () => {
  const theme = useTheme();
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight={'bold'} align="center" >
          Plans & Pricing
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
        Scale your plan to suit your needs. Upgrade or downgrade anytime.
        </Typography>
        <Tabs centered value={0} aria-label="Plan type tabs">
          <Tab label="Monthly billing" />
          <Tab label="Annual billing" />
        </Tabs>
        <TableContainer component={Paper} sx={{ marginTop: 2, mx: 4, width: '89em' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '25em', border: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h6">
                    Plan & Monthly Price
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Additional taxes may apply depending on your country.
                  </Typography>
                </TableCell>
                {plans.map((plan, index) => (
                  <TableCell align="center" key={index} sx={{
                    background: theme.palette.grey[200],
                    padding: theme.spacing(2),
                    border: `1px solid ${theme.palette.divider}`
                  }}>
                    <Typography variant="h6" component="div">
                      {plan.name}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                      {plan.price}
                    </Typography>
                    {index !== plans.length - 1 && (
                      <Button variant="contained" sx={{ mt: 2 , borderRadius: '25px'}}>
                        Subscribe now
                      </Button>
                    )}
                    {index === plans.length - 1 && (
                      <Button variant="contained" sx={{ mt: 2 , borderRadius: '25px'}}>
                        Contact sales
                      </Button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map((feature, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ border: `1px solid ${theme.palette.divider}` }}>
                    {feature}
                  </TableCell>
                  {plans.map((plan, idx) => (
                    <TableCell align="center" key={idx} sx={{ border: `1px solid ${theme.palette.divider}` }}>
                      {renderCheckMark(plan.features[index])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PricingPage;
