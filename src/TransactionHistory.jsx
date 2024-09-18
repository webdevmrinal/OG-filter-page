import React, { useState } from "react";
import { Card, Box, Typography, Divider, Avatar, Chip, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/system";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BillingInformationForm from "./BillingInformationForm";
import AvailableBalances from "./AvailableBalances";
import PaymentMethods from "./PaymentMethods";
import { GradientBox, GradientContent, ProfileAvatar } from "./Experts/Components/ProfileStyles";

// const GradientBox = styled(Box)({
//   background: "linear-gradient(to top, #505f96, #25387c)",
//   height: "165px",
//   position: "relative",
//   display: "flex",
//   alignItems: "flex-end",
//   padding: "24px",
// });

const TransactionHistory = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: 2 }}>
      <Box
        bgcolor={"#fff"}
        borderRadius={3}
        overflow={"hidden"}
        border={"1px solid lightgray"}
        sx={{ height: "100%" }}
      >
        <GradientBox sx={{ marginBottom: 5, padding: {xs: "auto" , sm: "24px"} , height: '165px'}}>
            <GradientContent >
              <ProfileAvatar
                src="https://example.com/your-photo.jpg"
                sx={{
                  marginRight: {xs: 1, sm: 2},
                  mt: -1.5,
                }}
              />
              <Box sx={{ color: "white" , marginBottom: {xs: 3.9, sm: 'inherit'}}}>
                <Typography variant="h5" fontWeight="bold" color="white">John Doe</Typography>
                <Typography variant="h6">
                  React Developer,
                  <LocationOnOutlinedIcon
                    sx={{ width: "0.8em", height: "0.6em" }}
                  />
                  India
                </Typography>
              </Box>
            </GradientContent>
        </GradientBox>
      </Box>
      <Card
        variant="outlined"
        sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)", marginTop: "2em" }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"  // Scroll buttons enabled on both sides
          allowScrollButtonsMobile  // Allow scroll buttons on mobile as well
          sx={{ padding: "0 16px" }}
        >
          <Tab label="Transactions History" />
          <Tab label="Billing Information" />
          <Tab label="Availlable Balances" />
          <Tab label="Payment Methods" />
        </Tabs>
        <Divider sx={{ width: "98%", mb: 2, mx: "auto" }} />

        {selectedTab === 0 && (
          transactions.map((transaction, index) => (
            <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },  // Stack elements vertically on small screens
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
              p: { xs: 1, sm: 2 } // Smaller padding on xs screens
            }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 1,
                  ml: 1.5,
                  borderRadius: 2,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  width: "90px",
                  height: "95px",
                  mt: { xs: 1, sm: 0 }
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    alignSelf: "center",
                    color: "text.secondary",
                    mt: 1,
                    ml: 0.5,
                    
                  }}
                >
                  Booked on
                </Typography>
                <CalendarTodayIcon
                  sx={{ color: "text.secondary", width: "18px", mt: 1 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight={"bold"}
                >
                  {transaction.date}
                </Typography>
              </Box>
              <Box sx={{ padding: {xs: 0, sm: 2}, flex: 1, ml: 0.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    gap: 0.3,
                    paddingTop: "3px",
                  }}
                >
                  <Chip
                    label={
                      transaction.isPositive
                        ? "Payment Successful"
                        : "Payment Declined"
                    }
                    icon={
                      transaction.isPositive ? (
                        <CheckCircleOutlineIcon sx={{ mb: 0.3 }} />
                      ) : (
                        <ErrorOutlineIcon sx={{ mb: 0 }} />
                      )
                    }
                    size="small"
                    sx={{
                      Color: "white",
                      backgroundColor: transaction.isPositive
                        ? "#81c784"
                        : "#e57373",
                      mb: 1,
                      height: "20px",
                      fontSize: "0.7rem",
                      "& .MuiChip-icon": {
                        color: "white",
                        backgroundColor: transaction.isPositive
                          ? "#81c784"
                          : "#e57373",
                        fontSize: "16px",
                      },
                      "& .MuiChip-label": {
                        color: "white",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                      },
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  />
                </Box>
                
                <Typography
                  variant="subtitle1"
                  sx={{ pl: 0.3, pb: 1, lineHeight: {xs: 1.2, sm: 0}, mt: 2, fontSize: { xs: "13px", sm: "16px" },
                  width: { xs: "100%", sm: "auto" },  // Full width on small screens
                  whiteSpace: "normal",  // Allow text to wrap normally
                  wordWrap: "break-word",  // Ensure long words break when necessary
                  overflowWrap: "anywhere",  }}
                >
                  {transaction.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <CalendarTodayIcon
                    sx={{ width: "0.55em", pb: 0.4, mr: 0.6 }}
                  />
                  <Typography variant="subtitle2" color={"text.secondary"}>
                    {transaction.datetime}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.2 }}>
                  <AttachMoneyIcon sx={{ mr: 0, width: "0.8em", pb: 0.1 }} />
                  <Typography variant="h6">{transaction.amount}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 2,
                  mt: { xs: 1, sm: 0 },
                  mb: { xs: 1, sm: 0 } // Adjust margin-top for xs screens
                }}
              >
                <Avatar
                  src="https://example.com/avatar1.jpg"
                  sx={{
                    width: { xs: 40, sm: 60 }, // Smaller avatars on xs screens
                    height: { xs: 40, sm: 60 },
                    zIndex: 2,
                    ml: { xs: 0, sm: -1 } // Adjust margin-left for small screens
                  }}
                />
                <Avatar
                  src="https://example.com/avatar2.jpg"
                  sx={{
                    width: { xs: 40, sm: 60 },
                    height: { xs: 40, sm: 60 },
                    zIndex: 1,
                    ml: { xs: -1, sm: -2 } // Adjust margin-left for small screens
                  }}
                />
              </Box>
            </Card>
          ))
        )}

        {selectedTab === 1 && (
          <BillingInformationForm />  // Call the form component
        )}

        {selectedTab === 2 && (
          <AvailableBalances /> // Call the Available Balances component
        )}
        
        {selectedTab === 3 && (
          <PaymentMethods /> // Call the Payment Methods component
        )}

      </Card>
    </Box>
  );
};

export default TransactionHistory;
