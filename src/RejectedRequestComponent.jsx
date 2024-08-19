import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Link,
  Divider,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Drawer,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { styled } from "@mui/system";
import axios from "axios";

const RejectedItem = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "15px 16px",
  margin: "1em 0",
  borderRadius: "4px",
  transition: "all 0.3s ease",
  backgroundColor:"transparent",
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer",
  alignSelf: 'center',

  "&:hover": {
    transform: "scale(1.1)",
  },
}));

// const ReasonBox = styled(Box)(({ theme }) => ({
//   marginTop: "8px",
//   flexGrow: 0.45,
//   flexShrink: 0,
//   flexBasis: 0,
// }));

const TruncatedText = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(1),
  fontSize: "1em",
}));

const ViewMoreButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  textDecoration: "underline",
  padding: 0,
  minWidth: "auto",
  fontSize: "1em",
  verticalAlign: "baseline",
}));

const RejectedItemSkeleton = () => (
  <RejectedItem>
    <Skeleton
      variant="circular"
      width={56}
      height={56}
      sx={{ mr: 2 }}
      animation="wave"
    />
    <Box sx={{ flexGrow: 1 }}>
      <Skeleton variant="text" width="40%" animation="wave" />
      <Skeleton variant="text" width="60%" animation="wave" />
      <Skeleton variant="text" width="30%" animation="wave" />
      <Skeleton variant="text" width="50%" animation="wave" />
    </Box>
  </RejectedItem>
);

const rejectionReasons = [
  "Pending request rejected due to inactivity.",
  "After a thorough review of your pending request, it has been determined that due to an extended period of inactivity, we are unable to proceed with the current application. It is essential for requests to be actively managed and updated to ensure timely processing. Unfortunately, due to the lack of recent updates and engagement, your request has been rejected. We encourage you to submit a new request if you wish to pursue this matter further. Please ensure that future requests are actively monitored to avoid similar issues.",
  "This will be revisited in the next quarter.",
  "We appreciate your recent submission, but due to unforeseen scheduling conflicts and current workload, we are unable to address your request at this moment. To facilitate a more effective review and processing, we kindly ask you to reschedule and submit your request again next month. We aim to provide a thorough and attentive response, and rescheduling will allow us to allocate the necessary resources and time. Please refer to our rescheduling guidelines and select an appropriate time for the next submission.",
  "Request automatically declined after the deadline passed.",
  "Please reschedule. Let's try this again next month.",
  "Your current request has been acknowledged and is important to us. However, due to the ongoing priorities and allocations for the current quarter, we are unable to process it at this time. We will revisit and reassess your request during the next quarter's review cycle. Please note that the next quarter begins on [specific date], and we will be in touch with you once the review process begins. In the meantime, if there are any updates or changes to your request, feel free to inform us.",
  "Deferred to next year for further consideration.",
  "Request rejected. Please try again next week.",
  "Auto-rejected due to exceeded response time.",
  "We'll address this in the next fiscal year.",
  "Request declined. Please plan for a later date.",
];

const RejectedRequestComponent = () => {
  const [rejectedItems, setRejectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentReasons, setCurrentReasons] = useState([]);
  const [expandedReasons, setExpandedReasons] = useState({});

  const fetchRejectedRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://academy.opengrowth.com/api/get_user_specific_mentorship",
        {
          mentee_id: "1",
          start: start,
          end: 10,
          user: "mentor",
          mentorship_type: "rejected",
          m_id: "1",
          key: `1_upcoming_mentorship_${start}_to_10`,
        }
      );
      const itemsWithRandomReasons = response.data.map((item) => ({
        ...item,
        reasons: getRandomReasons(),
      }));
      setRejectedItems((prev) => [...prev, ...itemsWithRandomReasons]);
      setStart((prev) => prev + 10);
    } catch (error) {
      console.error("Error fetching rejected requests:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRejectedRequests();
  }, []);

  const getRandomReasons = () => {
    const count = Math.floor(Math.random() * 8) + 1;
    return rejectionReasons.slice(0, count);
  };

  const handleOpenDrawer = (reasons) => {
    setCurrentReasons(reasons);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const toggleReason = (index) => {
    setExpandedReasons((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid lightgray",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ px: 3, py: 1 }}>
          Rejected Requests
        </Typography>
        <Divider sx={{ width: "97%", alignSelf: "center", ml: '24px' }}/>
        <Box sx={{ px: 3, py: 1 }}>
          {rejectedItems.map((item, index) => (
            <RejectedItem key={item.meet_id}>
              <AvatarWrapper>
                <Avatar
                  src={`https://academy.opengrowth.com/assets/images/users/${item.mentee_img}`}
                  sx={{ width: 90, height: 90, mr: 2 }}
                />
              </AvatarWrapper>
              <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Box
                  sx={{ flexGrow: 0.6, flexShrink: 0.5, flexBasis: 0, pr: 5 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ }}
                  >
                    {item.mentee_name}
                  </Typography>
                  <Link
                    href={`/mentee-profile/${item.mentee_id}`}
                    underline="hover"
                    color="inherit"
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ }}
                    >
                      {item.idea}
                    </Typography>
                  </Link>
                  <Box display={'flex'} mt={0.5}>
                  <CalendarTodayIcon sx={{width: '0.5em', height: '0.7em', mr: 0.4, color: 'text.secondary'}}/>
                  <Typography variant="body2" color="text.secondary">
                    {item.date_title} | {item.time_title}
                  </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Requirement: {item.query}
                  </Typography>
                  
                </Box>
                <Box
                  flexGrow={"0.35"}
                  sx={{
                    width: 0,
                    paddingLeft: '20em',
                    justifyContent: "flex-end",
                    alignSelf: "center",
                  }}
                >
                  <Typography variant="body2" color="text.primary">
                    Reason:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    {truncateText(item.reasons[0], 100)}
                  </Typography>
                  <Button
                    
                    onClick={() => handleOpenDrawer(item.reasons)}
                    size="small"
                    sx={{ mb: 1, fontSize: ".75em", px: 0 }}
                  >
                    View More
                  </Button>
                </Box>
              </Box>
            </RejectedItem>
          ))}
        </Box>
        {loading ? (
          <Box sx={{ px: 3, py: 1 }}>
            <RejectedItemSkeleton />
            <RejectedItemSkeleton />
            <RejectedItemSkeleton />
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Button variant="outlined" onClick={fetchRejectedRequests}>
              Load More
            </Button>
          </Box>
        )}
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width :500, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Rejection Reasons
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Reasons</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentReasons.map((reason, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {reason.split(" ").length > 30 ? (
                        <>
                          <TruncatedText>
                            {expandedReasons[index]
                              ? reason
                              : truncateText(reason, 30)}
                          </TruncatedText>
                          <ViewMoreButton
                            onClick={() => toggleReason(index)}
                            color="primary"
                          >
                            {expandedReasons[index] ? "View less" : "View more"}
                          </ViewMoreButton>
                        </>
                      ) : (
                        reason
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Drawer>
    </Paper>
  );
};


export default RejectedRequestComponent;
