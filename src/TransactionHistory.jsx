import React from "react";
import { Card, Box, Typography, Divider, Avatar, Chip } from "@mui/material";
// import Header from "./Header";
import { styled } from "@mui/system";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const GradientBox = styled(Box)({
  // background: "linear-gradient(to right, #5e6fa3, #4ea3a0)",
  background: "linear-gradient(to top, #505f96, #25387c)",
  height: "165px",
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  padding: "24px",
  borderRadius: "12px",
});

const TransactionHistory = () => {
  const transactions = [
    {
      date: "May 12",
      description: "Booked a session with Ajinkya Chikte",
      datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm",
      amount: "32",
      isPositive: true,
    },
    {
      date: "May 8",
      description: "Booked a session with Ajinkya Chikte",
      datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm",
      amount: "436",
      isPositive: true,
    },
    {
      date: "Apr 27",
      description: "Payment unsuccessful for the session of Vinay Kumar",
      datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm",
      amount: "345",
      isPositive: false,
    },
    {
      date: "Apr 19",
      description: "Booked a session with Ajinkya Chikte",
      datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm",
      amount: "654",
      isPositive: true,
    },
    {
      date: "Apr 12",
      description: "Payment unsuccessful for the session of Vinay Kumar",
      datetime: "Thursday, Sept 9, 2024/ 9:00pm - 10:00pm",
      amount: "145",
      isPositive: false,
    },
  ];

  return (
    // <Box>
    //   <Header />
      <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: 2 }}>
        <GradientBox sx={{ marginBottom: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Avatar
                src="https://example.com/your-photo.jpg"
                sx={{ width: 110, height: 110, marginRight: 2 }}
              />
              <Box sx={{ color: "white" }}>
                <Typography variant="h5">John Doe</Typography>
                <Typography variant="subtitle1">
                  React Developer,<LocationOnOutlinedIcon  sx={{ width: "0.8em", height: "0.6em" }}/>India
                </Typography>
              </Box>
            </Box>
            
          </Box>
        </GradientBox>
        <Card
          variant="outlined"
          sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)", marginTop: '2em' }}
        >
          <Box sx={{  color: "black" , ml: 2.5, display: 'flex', mt: 2, gap: 1.5}}>
              <Typography variant="h6" sx={{ }}>
                Total Spending:
              </Typography>
              <Typography variant="h6">$425,000</Typography>
            </Box>
          <Typography
            variant="h6"
            sx={{ width: "100%", padding: "1px 1px 0px 4px", mt: 2, ml: 2 }}
          >
            Transaction History
          </Typography>
          <Divider sx={{ width: "98%", mb: 2, px: 1, ml: 2 }} />
          {transactions.map((transaction, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginY: 1,
                paddingLeft: 1,
                borderLeft: `10px solid ${
                  transaction.isPositive ? "#a5d6a7" : "#ef9a9a"
                }`,
                mx: 3,
                mt: 3,
                borderRadius: 2,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "#0000000a",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 1, ml: 1.5, borderRadius: 2, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: '90px', height: '95px' }}>
                <Typography variant="caption" sx={{ alignSelf: "center", color: "text.secondary", mt: 1, ml: 0.5 }}>
                  Booked on
                </Typography>
                <CalendarTodayIcon sx={{ color: "text.secondary", width: '18px', mt: 1 }} />
                <Typography variant="body1" color= "text.secondary" fontWeight={'bold'} >
                  {transaction.date}
                </Typography>
              </Box>
              <Box sx={{ padding: 2, flex: 1, ml: 0.5 }}>
                
                <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap:0.3, 
                        paddingTop: '3px', }}>
                  <Chip
                    label={transaction.isPositive ? "Payment Successful" : "Payment Declined"}

                    icon={transaction.isPositive ? <CheckCircleOutlineIcon sx={{mb: 0.3}}/> : <ErrorOutlineIcon sx={{mb: 0}} />}
                    size="small"
                    sx={{
                      Color: 'white',
                      backgroundColor: transaction.isPositive ? '#81c784' : '#e57373',
                      mb: 1,
                      height: '20px',
                      fontSize: '0.7rem',
                      '& .MuiChip-icon': {
                        color: "white",
                        backgroundColor: transaction.isPositive ? '#81c784' : '#e57373',
                        fontSize: '16px',
                      },
                      '& .MuiChip-label': {
                        color: "white",
                        paddingLeft: '8px',
                        paddingRight: '8px',
                      },
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{ pl: 0.3, pb:1 ,lineHeight:0 , mt: 2}}
                >
                  {transaction.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <CalendarTodayIcon sx={{ width: '0.55em', pb: 0.4, mr: 0.6 }} />
                  <Typography variant="subtitle2" color={'text.secondary'}>
                    {transaction.datetime}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.2 }}>
                  <AttachMoneyIcon
                    sx={{
                      mr: 0, width: '0.8em', pb: 0.1
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ 
                    }}
                  >
                    {transaction.amount}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <Avatar
                  src="https://example.com/avatar1.jpg"
                  sx={{ width: 60, height: 60, zIndex: 2, ml: -1, mt: 0 }}
                />
                <Avatar
                  src="https://example.com/avatar2.jpg"
                  sx={{ width: 60, height: 60, zIndex: 1, ml: -2, mb: 0 }}
                />
              </Box>
            </Card>
          ))}
        </Card>
      </Box>
    // </Box>
  );
};

export default TransactionHistory;
