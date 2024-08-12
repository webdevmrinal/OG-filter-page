import React from 'react';
import { Card, Box, Typography, Divider, Avatar } from '@mui/material';
import Header from './Header';

const TransactionHistory = () => {
  const transactions = [
    { date: "May 12", description: "Booked a session with Ajinkya Chikte", datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm", amount: "+$32", isPositive: true },
    { date: "May 8", description: "Booked a session with Ajinkya Chikte", datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm", amount: "+$436", isPositive: true },
    { date: "Apr 27", description: "Payment unsuccessful for the session of Vinay Kumar", datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm", amount: "-$345", isPositive: false },
    { date: "Apr 19", description: "Booked a session with Ajinkya Chikte", datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm", amount: "+$654", isPositive: true },
    { date: "Apr 12", description: "Payment unsuccessful for the session of Vinay Kumar", datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm", amount: "-$145", isPositive: false }
  ];

  return (
    <Box>
      <Header />
      <Box sx={{ backgroundColor: '#f4f4f4', minHeight: '100vh', padding: 2 }}>
        <Card sx={{
          padding: 2,
          backgroundColor: '#fff',
          marginBottom: 2,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h6" sx={{ width: "100%", padding: '1px 0px 0px 4px' }}>
            Your Spendings
          </Typography>
          <Divider sx={{ width: "100%", mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src="https://example.com/your-photo.jpg" sx={{ width: 120, height: 120, marginRight: 2 }} />
              <Box>
                <Typography variant="subtitle1">John Doe</Typography>
                <Typography variant="subtitle1">React Developer, India</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Spending:</Typography>
              <Typography variant="h6">$425,000</Typography>
            </Box>
          </Box>
        </Card>
        <Card variant="outlined" sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <Typography variant="h6" sx={{ width: "100%", padding: '1px 1px 0px 4px', mt: 2, ml: 2 }}>
            Transaction History
          </Typography>
          <Divider sx={{ width: "98%", mb: 2, px: 1, ml: 2 }} />
          {transactions.map((transaction, index) => (
            <Card key={index} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginY: 1,
              paddingLeft: 1,
              borderLeft: `10px solid ${transaction.isPositive ? 'green' : 'red'}`,
              mx: 3,
              mt: 3,
              borderRadius: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <Box sx={{ padding: 2, flex: 1 }}>
                <Typography variant="body1" color="text.secondary">{transaction.date}</Typography>
                {transaction.isPositive ? (
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'green' }}>
                    Payment Successful
                  </Typography>
                ) : (
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'red' }}>
                    Payment Declined
                  </Typography>
                )}
                <Typography variant="body1">{transaction.description}</Typography>
                <Typography variant="body2">{transaction.datetime}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: transaction.isPositive ? 'green' : 'red' }}>{transaction.amount}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Avatar src="https://example.com/avatar1.jpg" sx={{ width: 60, height: 60, zIndex: 2, ml: -1, mt: -1 }} />
                <Avatar src="https://example.com/avatar2.jpg" sx={{ width: 60, height: 60, zIndex: 1, ml: -2, mb: -1 }} />
              </Box>
            </Card>
          ))}
        </Card>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
