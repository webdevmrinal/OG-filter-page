import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Tab,
  Tabs,
  Card,
  Avatar,
  Divider,
} from "@mui/material";
import axios from "axios";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

const ProfileAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  border: "4px solid white",
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const LeftAlignedTimeline = styled(Timeline)({
  paddingLeft: 0,
  "&::before": {
    left: 0,
  },
});

const TimelineItemStyled = styled(TimelineItem)({
  "&::before": {
    display: "none",
  },
});

const DetailView = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  // Static notes data
  const notes =
    "Here are all the detailed notes that were discussed during the session. These include key points, action items, and follow-up dates.";

  //   const [profileData, setProfileData] = useState(null);
  const profileData = {
    name: "John Doe",
    status: "Expert",
    img: "avatar.jpg",
    date: "2023-09-15",
    time: "9:00pm - 10:00pm",
    requirement: "Discuss project scope and timeline",
  };

  const timelineItems = [
    { time: "09:00AM", message: "Connected call about project update" },
    { time: "09:30AM", message: "Discussed new project requirements" },
    { time: "10:30AM", message: "Reviewed budget allocation for Q4" },
    { time: "11:00AM", message: "Scheduled meeting with the client" },
    {
      time: "11:30AM",
      message: "Followed up on action items from last meeting",
    },
  ];

  const location = useLocation();
  const expertEmail = location.state?.expertEmail;

  //   useEffect(() => {
  //     const fetchProfileData = async () => {
  //       try {
  //         const response = await axios.post(
  //           "https://academy.opengrowth.com/api/get_user",
  //           {
  //             email: expertEmail,
  //           }
  //         );
  //         setProfileData(response.data);
  //       } catch (error) {
  //         console.error("Error fetching profile data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     if (expertEmail) {
  //       fetchProfileData();
  //     }
  //   }, [expertEmail]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Header />
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
        <Card
          variant="outlined"
          sx={{
            margin: 2,
            padding: 2,
            backgroundColor: "#fff",
            color: "Black",
            height: "17rem",
            position: "relative",
            overflow: "visible",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ width: "100%", mb: 1, pl: 5 }}
          >
            Event Details
          </Typography>
          <Divider sx={{ width: "100%", mb: 2, alignSelf: "center" }} />
          <Box
            display="flex"
            alignItems="center"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 24px)",
            }}
          >
            <ProfileAvatar
              src={`https://academy.opengrowth.com/assets/images/users/${profileData?.img}`}
              alt={profileData?.name}
            />
            <Box sx={{ ml: 2, mt: 2 }}>
              <Typography variant="h5">{profileData?.name}</Typography>
              <Typography variant="subtitle1">{profileData?.status}</Typography>
              <Typography variant="body1">Date: {profileData?.date}</Typography>
              <Typography variant="body1">Time: {profileData?.time}</Typography>
              <Typography variant="body1">
                Requirement: {profileData?.requirement}
              </Typography>
            </Box>
          </Box>
        </Card>

        <Card variant="outlined" sx={{ margin: 2 }}>
          <Tabs value={tabIndex} onChange={handleTabChange} sx={{ ml: 2 }}>
            <Tab label="Notes" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Details" id="tab-1" aria-controls="tabpanel-1" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Typography variant="h6" component="h2">
                Discussed Notes:
              </Typography>
              <Typography variant="h6" component="h4">
                Date/Time:
              </Typography>

              <Typography variant="body1" sx={{ mt: 2 }}>
                {notes}
              </Typography>
            </Paper>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
              Discussed Notes:
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {notes}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
              Discussed Notes:
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {notes}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
              Discussed Notes:
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {notes}
            </Typography>
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Typography variant="h6" component="h2">
              Additional Details:
            </Typography>
            <LeftAlignedTimeline>
              {timelineItems.map((item, index) => (
                <TimelineItemStyled key={index}>
                  <TimelineOppositeContent sx={{ flex: 0.05 }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.time}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index !== timelineItems.length - 1 && (
                      <TimelineConnector />
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px", px: 2 }}>
                    <Typography variant="body1">{item.message}</Typography>
                  </TimelineContent>
                </TimelineItemStyled>
              ))}
            </LeftAlignedTimeline>
          </TabPanel>
        </Card>
      </Paper>
    </>
  );
};

export default DetailView;
