import React, { useState, useEffect } from "react";
import {
  Card,
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/system";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BillingInformationForm from "./BillingInformationForm";
import AvailableBalances from "./AvailableBalances";
import PaymentMethods from "./PaymentMethods";
import {
  GradientBox,
  GradientContent,
  ProfileAvatar,
} from "./Experts/Components/ProfileStyles";

// Styled Components (Assuming these are defined in ProfileStyles)
const StyledTabs = styled(Tabs)({
  // Add any custom styles for Tabs here
});

const StyledTab = styled(Tab)({
  // Add any custom styles for Tab here
});

const TransactionHistory = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulating loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 1.5 seconds
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Profile Section */}
      <Box
        bgcolor={"#fff"}
        borderRadius={3}
        overflow={"hidden"}
        border={"1px solid lightgray"}
        sx={{ height: "100%" }}
      >
        <GradientBox
          sx={{
            marginBottom: 5,
            padding: { xs: "auto", sm: "24px" },
            height: {xs: "auto", sm: "130px"}
          }}
        >
          <GradientContent sx={{bottom: "-72%",}}>
            {loading ? (
              <Skeleton variant="circular" width={70} height={70} />
            ) : (
              <ProfileAvatar
                src="https://example.com/your-photo.jpg"
                alt="Profile"
                sx={{
                  marginRight: { xs: 1, sm: 2 },
                  mt: { xs: -1.5, sm: 1 },
                }}
              />
            )}
            <Box sx={{ color: "white", marginBottom: { xs: 0, sm: "inherit" } }}>
              {loading ? (
                <Skeleton variant="text" width={120} height={30} />
              ) : (
                <Typography variant="h5" fontWeight="bold" color="white">
                  John Doe
                </Typography>
              )}
              {loading ? (
                <Skeleton variant="text" width={80} height={25} />
              ) : (
                <Typography variant="h6" display="flex" alignItems="center">
                  React Developer,
                  <LocationOnOutlinedIcon
                    sx={{ width: "0.8em", height: "0.6em", ml: 0.5 }}
                  />
                  India
                </Typography>
              )}
            </Box>
          </GradientContent>
        </GradientBox>
      </Box>

      {/* Tabs Section */}
      <Card
        variant="outlined"
        sx={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          marginTop: "2em",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ padding: "0 16px" }}
        >
          <Tab label="Transactions History" />
          <Tab label="Billing Information" />
          <Tab label="Available Balances" />
          <Tab label="Payment Methods" />
        </Tabs>
        <Divider sx={{ width: "98%", mb: 2, mx: "auto" }} />

        {/* Transactions History Tab */}
        {selectedTab === 0 && (
          <Box>
            {transactions.map((transaction, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginY: 1,
                  borderLeft: `10px solid ${
                    transaction.isPositive ? "#a5d6a7" : "#ef9a9a"
                  }`,
                  mx: 3,
                  mt: 2,
                  borderRadius: 1,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#0000000a",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    transform: "translateY(-2px)",
                  },
                  p: { xs: 1, sm: 1 },
                }}
              >
                {loading ? (
                  // Skeletons for Loading State
                  <>
                    <Skeleton
                      variant="rectangular"
                      width={90}
                      height={95}
                      sx={{ mb: 1, ml: 1.5 }}
                    />
                    <Box
                      sx={{
                        padding: { xs: 0, sm: 2 },
                        flex: 1,
                        ml: 0.5,
                      }}
                    >
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="60%" sx={{ my: 1 }} />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Skeleton
                        variant="circular"
                        width={60}
                        height={60}
                        sx={{ ml: 1 }}
                      />
                      <Skeleton
                        variant="circular"
                        width={60}
                        height={60}
                        sx={{ ml: -1 }}
                      />
                    </Box>
                  </>
                ) : (
                  // Transaction Details
                  <>
                    {/* Date Box */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 1,
                        ml: 1.5,
                        borderRadius: 1,
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        width: "90px",
                        height: "95px",
                        mt: { xs: 1, sm: 0 },
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
                        sx={{
                          color: "text.secondary",
                          width: "18px",
                          mt: 1,
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        fontWeight={"bold"}
                      >
                        {transaction.date}
                      </Typography>
                    </Box>

                    {/* Details Box with Reordered Elements */}
                    <Box
                      sx={{
                        py: { xs: 0, sm: 0 },
                        px: { xs: 0, sm: 2},
                        flex: 1,
                        ml: 0.5,
                      }}
                    >
                      {/* 1. Title (Description) */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          pl: 0.3,
                          pb: 1,
                          lineHeight: { xs: 1.2, sm: 0 },
                          mt: 2,
                          fontSize: { xs: "13px", sm: "16px" },
                          width: { xs: "100%", sm: "auto" },
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {transaction.description}
                      </Typography>

                      {/* 2. Date and Time */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                        }}
                      >
                        <CalendarTodayIcon
                          sx={{
                            width: "0.55em",
                            pb: 0.4,
                            mr: 0.6,
                          }}
                        />
                        <Typography variant="subtitle2" color={"text.secondary"}>
                          {transaction.datetime}
                        </Typography>
                      </Box>

                      {/* 3. Price (Amount) */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 0.2,
                        }}
                      >
                        <AttachMoneyIcon
                          sx={{
                            mr: 0,
                            width: "0.6em",
                            pb: 0.1,
                          }}
                        />
                        <Typography variant="body2" color={'textSecondary'}>
                          {transaction.amount}
                        </Typography>
                      </Box>

                      {/* 4. Status Chip */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
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
                            color: "white",
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
                    </Box>

                    {/* Avatars Box */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mr: 2,
                      }}
                    >
                      <Avatar
                        src="https://example.com/avatar1.jpg"
                        alt="Avatar 1"
                        sx={{
                          width: { xs: 40, sm: 60 },
                          height: { xs: 40, sm: 60 },
                          zIndex: 2,
                          ml: { xs: 0, sm: -1 },
                        }}
                      />
                      <Avatar
                        src="https://example.com/avatar2.jpg"
                        alt="Avatar 2"
                        sx={{
                          width: { xs: 40, sm: 60 },
                          height: { xs: 40, sm: 60 },
                          zIndex: 1,
                          ml: { xs: -1, sm: -2 },
                        }}
                      />
                    </Box>
                  </>
                )}
              </Card>
            ))}
          </Box>
        )}

        {/* Billing Information Tab */}
        {selectedTab === 1 && <BillingInformationForm />}

        {/* Available Balances Tab */}
        {selectedTab === 2 && <AvailableBalances />}

        {/* Payment Methods Tab */}
        {selectedTab === 3 && <PaymentMethods />}
      </Card>
    </Box>
  );
};

export default TransactionHistory;
