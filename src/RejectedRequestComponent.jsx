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
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

const RejectedItem = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "15px 16px",
  margin: "1em 0",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  border: "1px solid #e0e0e0",
  backgroundColor: "white",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer",

  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const ReasonBox = styled(Box)(({ theme }) => ({
  marginTop: "8px",
  flexGrow: 0.4,
  flexShrink: 0,
  flexBasis: 0,
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

const RejectedRequestComponent = () => {
  const [rejectedItems, setRejectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);

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
      setRejectedItems((prev) => [...prev, ...response.data]);
      setStart((prev) => prev + 10);
    } catch (error) {
      console.error("Error fetching rejected requests:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRejectedRequests();
  }, []);

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
        <Typography variant="h6" sx={{ p: 3, fontWeight: "bold" }}>
          Rejected Request
        </Typography>
        <Divider />
        <Box sx={{ px: 3, py: 1 }}>
          {rejectedItems.map((item) => (
            <RejectedItem key={item.meet_id}>
              <AvatarWrapper>
                <Avatar
                  src={`https://academy.opengrowth.com/assets/images/users/${item.mentee_img}`}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
              </AvatarWrapper>
              <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Box
                  sx={{ flexGrow: 0.6, flexShrink: 0.5, flexBasis: 0, pr: 5 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#3f51b5" }}
                  >
                    {item.mentee_name}
                  </Typography>
                  <Link
                    href={`/mentee-profile/${item.mentee_id}`}
                    underline="hover"
                    color="inherit"
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      {item.idea}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    {item.date_title} | {item.time_title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Requirement: {item.query}
                  </Typography>
                </Box>
                <ReasonBox>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Reason"
                    value={item.reject_reason}
                    multiline
                    rows={2}
                    sx={{ mt: 1 }}
                  />
                </ReasonBox>
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
    </Paper>
  );
};

export default RejectedRequestComponent;
