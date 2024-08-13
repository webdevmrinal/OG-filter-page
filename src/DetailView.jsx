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
  Button,
  Rating,
  Chip,
  Collapse,
  IconButton,
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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const SessionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: "box-shadow 0.3s",
  cursor: "pointer",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

const ClickableBox = styled(Box)({
  cursor: "pointer",
});

const getSessionColor = (title) => {
  // const colors = {
  //   'Strategy': '#e6f3ff',
  //   'Planning': '#fff0e6',
  //   'Review': '#e6ffe6',
  //   'Workshop': '#f3e6ff',
  //   'Analysis': '#fffde6',
  //   'Meeting': '#ffe6f3',
  //   'Briefing': '#e6fff3',
  //   'Sync-up': '#fff6e6',
  //   'Update': '#e6f9ff',
  //   'Brainstorm': '#ffe6e6'
  // };

  // for (const [key, value] of Object.entries(colors)) {
  //   if (title.toLowerCase().includes(key.toLowerCase())) {
  //     return value;
  //   }
  // }

  return '#e6f3ff'; // default color
  // return '#f0f0f0'; // default color
};

const ProfileAvatar = styled(Avatar)({
  width: 225,
  height: 225,
  border: "4px solid white",
});

const GradientBox = styled(Box)({
  background: "linear-gradient(to right, #5e6fa3, #4ea3a0)",
  height: "370px",
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  padding: "24px",
  borderRadius: "12px",
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

  const [profileData, setProfileData] = useState(null);

  const connectionData = [
    {
      date: "2024-08-13",
      sessions: [
        {
          time: "09:00 AM",
          duration: 30,
          connectionTime: 20,
          title: "Morning Strategy Session",
          description:
            "A 30-minute session focused on planning the day's strategy with the expert, discussing the key tasks to prioritize.",
        },
        {
          time: "09:30 AM",
          duration: 15,
          connectionTime: 12,
          title: "Quick Catch-up",
          description:
            "A brief 15-minute check-in to review progress and address any immediate concerns or questions.",
        },
        {
          time: "10:00 AM",
          duration: 60,
          connectionTime: 55,
          title: "In-depth Analysis Session",
          description:
            "A detailed 60-minute session where the user and expert analyze complex issues and formulate solutions.",
        },
        {
          time: "11:15 AM",
          duration: 45,
          connectionTime: 40,
          title: "Mid-Morning Brainstorm",
          description:
            "A 45-minute brainstorming session to generate ideas for upcoming projects and tasks.",
        },
      ],
    },
    {
      date: "2024-08-14",
      sessions: [
        {
          time: "08:30 AM",
          duration: 30,
          connectionTime: 28,
          title: "Daily Briefing",
          description:
            "A 30-minute briefing to outline the day's agenda and key focus areas.",
        },
        {
          time: "09:15 AM",
          duration: 60,
          connectionTime: 50,
          title: "Project Review",
          description:
            "A comprehensive 60-minute session to review the progress of ongoing projects and make necessary adjustments.",
        },
        {
          time: "10:30 AM",
          duration: 15,
          connectionTime: 13,
          title: "Follow-up Call",
          description:
            "A 15-minute follow-up call to address any outstanding questions from the previous session.",
        },
        {
          time: "11:00 AM",
          duration: 30,
          connectionTime: 25,
          title: "Client Meeting",
          description:
            "A 30-minute meeting with a client to discuss project requirements and timelines.",
        },
        {
          time: "12:00 PM",
          duration: 45,
          connectionTime: 42,
          title: "Team Sync-up",
          description:
            "A 45-minute sync-up with the team to ensure alignment on current tasks and deadlines.",
        },
      ],
    },
    {
      date: "2024-08-15",
      sessions: [
        {
          time: "09:00 AM",
          duration: 60,
          connectionTime: 58,
          title: "Weekly Planning",
          description:
            "A 60-minute session dedicated to planning the week's activities and setting goals.",
        },
        {
          time: "10:15 AM",
          duration: 15,
          connectionTime: 10,
          title: "Quick Update",
          description:
            "A brief 15-minute update on the status of ongoing tasks and any immediate issues.",
        },
        {
          time: "11:00 AM",
          duration: 30,
          connectionTime: 25,
          title: "Client Feedback Review",
          description:
            "A 30-minute session to review feedback received from clients and plan the necessary actions.",
        },
        {
          time: "12:00 PM",
          duration: 45,
          connectionTime: 40,
          title: "Lunchtime Strategy",
          description:
            "A 45-minute session during lunch to discuss high-level strategy and long-term planning.",
        },
        {
          time: "01:30 PM",
          duration: 60,
          connectionTime: 55,
          title: "Afternoon Deep Dive",
          description:
            "A deep dive into complex issues during this 60-minute session to find effective solutions.",
        },
      ],
    },
    {
      date: "2024-08-16",
      sessions: [
        {
          time: "08:00 AM",
          duration: 15,
          connectionTime: 13,
          title: "Early Morning Check-in",
          description:
            "A short 15-minute check-in to set the tone for the day and ensure alignment on priorities.",
        },
        {
          time: "08:30 AM",
          duration: 45,
          connectionTime: 40,
          title: "Product Review",
          description:
            "A 45-minute session to review the latest product developments and plan next steps.",
        },
        {
          time: "09:30 AM",
          duration: 30,
          connectionTime: 28,
          title: "Client Presentation",
          description:
            "A 30-minute presentation to a client showcasing the latest project milestones.",
        },
        {
          time: "10:30 AM",
          duration: 60,
          connectionTime: 58,
          title: "Market Analysis",
          description:
            "A 60-minute session focused on analyzing market trends and identifying opportunities.",
        },
        {
          time: "12:00 PM",
          duration: 45,
          connectionTime: 42,
          title: "Lunch Meeting",
          description:
            "A 45-minute lunch meeting to discuss business strategy in a relaxed environment.",
        },
        {
          time: "01:30 PM",
          duration: 30,
          connectionTime: 25,
          title: "Team Debrief",
          description:
            "A 30-minute debriefing session to recap the day's activities and plan for tomorrow.",
        },
      ],
    },
    {
      date: "2024-08-17",
      sessions: [
        {
          time: "07:30 AM",
          duration: 30,
          connectionTime: 28,
          title: "Early Bird Strategy",
          description:
            "A 30-minute early morning session to outline the day's key tasks and objectives.",
        },
        {
          time: "08:30 AM",
          duration: 60,
          connectionTime: 55,
          title: "Comprehensive Planning",
          description:
            "A detailed 60-minute planning session to map out long-term strategies and initiatives.",
        },
        {
          time: "10:00 AM",
          duration: 45,
          connectionTime: 40,
          title: "Client Workshop",
          description:
            "A 45-minute workshop with a client to co-create solutions and gather insights.",
        },
        {
          time: "11:00 AM",
          duration: 15,
          connectionTime: 12,
          title: "Quick Recap",
          description:
            "A brief 15-minute session to recap the key takeaways from the client workshop.",
        },
        {
          time: "11:30 AM",
          duration: 60,
          connectionTime: 58,
          title: "Strategy Alignment",
          description:
            "A 60-minute session to ensure alignment on strategy across the team and stakeholders.",
        },
        {
          time: "01:00 PM",
          duration: 30,
          connectionTime: 25,
          title: "Afternoon Review",
          description:
            "A 30-minute review session to evaluate progress and adjust plans as needed.",
        },
        {
          time: "02:00 PM",
          duration: 45,
          connectionTime: 42,
          title: "Closing Session",
          description:
            "A 45-minute session to wrap up the day's activities and set the stage for the next steps.",
        },
      ],
    },
  ];

  const [expandedDates, setExpandedDates] = useState(() => {
    const initial = {};
    if (connectionData.length > 0) {
      initial[connectionData[0].date] = true;
    }
    return initial;
  });

  const toggleDate = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  // Static notes data
  const notes =
    "Here are all the detailed notes that were discussed during the session. These include key points, action items, and follow-up dates.";

  //   const [profileData, setProfileData] = useState(null);
  const profileData1 = {
    name: "John Doe",
    status: "Expert",
    img: "avatar.jpg",
    date: "2023-09-15",
    time: "9:00pm - 10:00pm",
    requirement: "Discuss project scope and timeline",
  };

  const location = useLocation();
  const expertEmail = location.state?.expertEmail;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "https://academy.opengrowth.com/api/get_user",
          {
            email: expertEmail,
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (expertEmail) {
      fetchProfileData();
    }
  }, [expertEmail]);
  console.log(profileData);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const truncateText = (text, maxLength = 100) => {
    return text?.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
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
            height: "29rem",
            position: "relative",
            overflow: "visible",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ width: "100%", padding: "1px 1px 0px 4px" }}
          >
            Event Details
          </Typography>
          <Divider sx={{ width: "100%", mb: 2 }} />
          <GradientBox position={"relative"}>
            <Box
              sx={{
                height: "calc(100% - 12px)",
                color: "white",
                translate: "0 -50%",
              }}
              display="flex"
              alignItems="center"
              position={"absolute"}
              bottom={"-47%"}
            >
              <Box sx={{ width: "82em", padding: 2 }}>
                <Box display="flex" alignItems="flex-start">
                  <Box display={"flex"} flexDirection={"column"}>
                    <ProfileAvatar
                      src={`https://academy.opengrowth.com/assets/images/users/${profileData?.img}`}
                      alt={profileData?.name}
                    />
                    <Box display={"flex"} sx={{ mt: 1 }}>
                      <Rating
                        value={5}
                        readOnly
                        size="small"
                        sx={{ mt: "0px", ml: "2.5em" }}
                      />
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ ml: 1, color: "black" }}
                      >
                        5.0 (40)
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ ml: 4, width: "65em" }}>
                    <Box display={"flex"} sx={{ gap: 1 }}>
                      <BadgeOutlinedIcon sx={{ height: "1.2em" }} />
                      <Typography variant="h5">{profileData?.name}</Typography>
                    </Box>
                    <Typography variant="subtitle1">
                      {profileData?.experience}
                    </Typography>
                    <Typography variant="body1">
                      {profileData?.industry},{" "}
                      <LocationOnOutlinedIcon
                        sx={{ width: "0.8em", height: "0.6em" }}
                      />
                      {profileData?.country}
                    </Typography>
                    <Box display={"flex"} gap={1} sx={{ mt: 2 }}>
                      <InfoIcon />
                      <Typography variant="body1">
                        {truncateText(profileData?.about, 400)}
                        <Button color="primary" sx={{ px: 0, color: "white" }}>
                          Know More
                        </Button>
                      </Typography>
                    </Box>
                    <Chip
                      label="Connected: 5 Times"
                      sx={{ mt: 1, fontWeight: "bold", color: "white" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </GradientBox>
        </Card>
        <Card
          variant="outlined"
          sx={{ margin: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
        >
          <Tabs value={tabIndex} onChange={handleTabChange} sx={{ ml: 2 }}>
            <Tab label="Notes" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Details" id="tab-1" aria-controls="tabpanel-1" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <Typography variant="h6" component="h2">
              Discussed Notes:
            </Typography>
            <Divider sx={{ width: "100%", mb: 2, alignSelf: "center" }} />
            {[...Array(5)].map((_, i) => (
              <Card
                key={i}
                elevation={3}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6">
                    Topics discussed: Discuss project scope and timeline
                  </Typography>
                  <Box display={"flex"} sx={{ gap: 0.5 }}>
                    <CalendarTodayIcon sx={{ width: "15px", pb: 1 }} />
                    <Typography variant="subtitle2" component="h5">
                      Thursday, Sept 9, 2024 / 9:00pm - 10:00pm
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {notes}
                  </Typography>
                </Box>
              </Card>
            ))}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Typography variant="h6" component="h2">
              Connection History:
            </Typography>
            <Timeline>
              {connectionData.map((dateData, dateIndex) => (
                <TimelineItem key={dateIndex}>
                  <TimelineOppositeContent sx={{ flex: 0.1 }}>
                    <ClickableBox
                      display="flex"
                      alignItems="center"
                      onClick={() => toggleDate(dateData.date)}
                    >
                      <EventIcon sx={{ mr: 1, color: "#3f51b5" }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "#3f51b5", fontWeight: "bold" }}
                      >
                        {formatDate(dateData.date)}
                      </Typography>
                    </ClickableBox>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: "#3f51b5" }} />
                    <TimelineConnector sx={{ bgcolor: "#3f51b5" }} />
                  </TimelineSeparator>
                  <TimelineContent>
                    <ClickableBox
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      onClick={() => toggleDate(dateData.date)}
                    >
                      <Typography variant="h6" sx={{ color: "#3f51b5" }}>
                        Sessions
                      </Typography>
                      <IconButton size="small">
                        {expandedDates[dateData.date] ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    </ClickableBox>
                    <Collapse in={expandedDates[dateData.date]}>
                      <Box sx={{ ml: 2, mt: 1 }}>
                        {dateData.sessions.map((session, sessionIndex) => (
                          <SessionPaper
                            key={sessionIndex}
                            elevation={1}
                            sx={{ bgcolor: getSessionColor(session.title) }}
                            onClick={() => toggleDate(dateData.date)}
                          >
                            <Box display="flex" alignItems="center">
                              <AccessTimeIcon
                                sx={{
                                  mr: 1,
                                  fontSize: "small",
                                  color: "#3f51b5",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: "#3f51b5", fontWeight: "bold" }}
                              >
                                {session.time}
                              </Typography>
                            </Box>
                            <Box sx={{ ml: 3 }}>
                              <Typography
                                variant="subtitle1"
                                sx={{ color: "#333" }}
                              >
                                {session.title}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Duration: {session.duration} min | Connected:{" "}
                                {session.connectionTime} min
                              </Typography>
                              <Box display="flex" alignItems="center" mt={1}>
                                <DescriptionIcon
                                  sx={{
                                    mr: 1,
                                    fontSize: "small",
                                    color: "#666",
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#666" }}
                                >
                                  {session.description}
                                </Typography>
                              </Box>
                            </Box>
                          </SessionPaper>
                        ))}
                      </Box>
                    </Collapse>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </TabPanel>
        </Card>
      </Paper>
    </>
  );
};

export default DetailView;
