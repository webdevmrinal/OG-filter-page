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
  Tooltip,
  useMediaQuery,
  useTheme,
  Skeleton, // Import Skeleton
} from "@mui/material";
import axios from "axios";
// import Header from "./Header";
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
  backgroundColor: 'white',
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
}));

const ClickableBox = styled(Box)({
  cursor: "pointer",
});

const getSessionColor = (title) => {
  return '#fff';
};

const ProfileAvatar = styled(Avatar)({
  width: 210,
  height: 210,
  border: "4px solid white",
});

const GradientBox = styled(Box)({
  background: "linear-gradient(to bottom, #505f96, #25387c 70%, white 30%)", // Adjust gradient coverage and transition to white

  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  padding: "24px",
  borderRadius: "8px",
  border: '1px solid #d7d7d7',
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
      {value === index && <Box sx={{p: {xs: 1, sm : 3}}}>{children}</Box>}
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
  const [loading, setLoading] = useState(true); // Add loading state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
        setLoading(false); // Set loading to false after fetch
      }
    };

    if (expertEmail) {
      fetchProfileData();
    } else {
      setLoading(false); // If no email, stop loading
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
      {/* <Header /> */}
      <Box
        variant="outlined"
        sx={{
          // margin: 2,
          padding: 2,
          backgroundColor: "#fff",
          color: "Black",
          height: "auto",
          position: "relative",
          overflow: "visible",
          // boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ width: "100%", padding: "1px 1px 0px 4px" }}
        >
          Meeting Notes
        </Typography>
        <Divider sx={{ width: "100%", mb: 2 }} />
        <GradientBox position={"relative"} sx={{height: {xs: '200px', sm: '270px'}}}>
          <Box
            sx={{
              height: "calc(100% - 10px)",
              color: "white",
              translate: "0 -46%",
            }}
            display="flex"
            alignItems="center"
            position={"absolute"}
            bottom={"-45%"}
          >
            <Box sx={{ width: { xs: '15em', sm: 'auto' }, ml: {xs: '-20px', sm: 'inherit'}, padding: 2 }}>
              <Box display="flex" alignItems="flex-start">
                {/* Profile Section */}
                {loading ? (
                  <Box display={"flex"} flexDirection={"column"} sx={{width: {xs: '80px', sm: 'inherit'}, mt: {xs: '55px', sm: 'inherit'}}}>
                    <Skeleton variant="circular" width={80} height={80} />
                    <Box display={"flex"} sx={{ mt: 0.5, width: {xs: '10px', sm: 'inherit'}, flexDirection: {xs: 'column', sm: 'row'} }}>
                      <Skeleton variant="rectangular" width={60} height={20} />
                      <Skeleton variant="text" width={50} height={20} sx={{ ml: {xs: 0, sm: "1.5em"}, mt: {xs: 1, sm: 0 } }} />
                    </Box>
                  </Box>
                ) : (
                  <Box display={"flex"} flexDirection={"column"} sx={{width: {xs: '80px', sm: 'inherit'}, mt: {xs: '55px', sm: 'inherit'}}}>
                    <ProfileAvatar
                      src={`https://academy.opengrowth.com/assets/images/users/${profileData?.img}`}
                      alt={profileData?.name}
                      sx={{width: { xs: 80, sm: 200 }, height: { xs: 80, sm: 200 }}}
                    />
                    <Box display={"flex"} sx={{ mt: 0.5, width: {xs: '10px', sm: 'inherit'}, flexDirection: {xs: 'column', sm: 'row'} }}>
                      <Rating
                        value={5}
                        readOnly
                        size="small"
                        sx={{ mt: "0px", ml: {xs: 0, sm: "1.5em"}, mr: {xs: 2.5, sm: 'inherit'} }}
                      />
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ ml: 1, color: "black", fontSize: {xs: '0.7rem', sm: 'inherit'}, width: {xs: '4em', sm: 'inherit'} }}
                      >
                        5.0 (40)
                      </Typography>
                    </Box>
                  </Box>
                )}

                {/* Profile Details */}
                {loading ? (
                  <Box sx={{ ml: {xs: 2, sm: 3}, width: { xs: '200px', sm: "auto" }, mt: {xs: 5.5, sm: 0} }}>
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton variant="text" width="50%" height={20} />
                    <Skeleton variant="rectangular" width="80%" height={20} sx={{ mt: 2 }} />
                  </Box>
                ) : (
                  <Box sx={{ ml: {xs: 2, sm: 3}, width: { xs: '200px', sm: "auto" }, mt: {xs: 5.5, sm: 0} }}>
                    <Box display={"flex"} sx={{ gap: 1 }}>
                      <Typography variant="h6" sx={{fontSize: {xs: '1rem', sm: '1.4em'}}}>{profileData?.name}</Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{fontSize: {xs: '0.8rem', sm: '0.8em'}}}>
                      {profileData?.experience}
                    </Typography>
                    <Typography variant="subtitle2" sx={{fontSize: {xs: '0.7rem', sm: 'inherit'}}}>
                      {profileData?.industry},{" "}
                      <LocationOnOutlinedIcon
                        sx={{ width: "0.8em", height: "0.6em" }}
                      />
                      {profileData?.country}
                    </Typography>

                    {/* About section is hidden on small screens */}
                    <Box display={{ xs: "none", sm: "flex" }} gap={1} sx={{ mt: {xs: 2, sm: 1} }}>
                      <Typography variant="caption">
                        {truncateText(profileData?.about, 150)}
                        <Button color="primary" sx={{ px: 0, color: "white" }}>
                          Know More
                        </Button>
                      </Typography>
                    </Box>

                    <Chip
                      label="Connected: 5 Times"
                      sx={{ mt: {xs: '20px', sm: -0.5}, fontWeight: "bold", color: {xs: 'black', sm: 'white'} }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </GradientBox>
      </Box>
      <Card
        variant="outlined"
        sx={{ margin: '0.1em 1em 1em 1.1em', boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
      >
        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ ml: 2 }}>
          <Tab label="Notes" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="Details" id="tab-1" aria-controls="tabpanel-1" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          {loading ? (
            <Box>
              <Skeleton variant="text" width="40%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={118} sx={{ mb: 2 }} />
            </Box>
          ) : (
            <>
              <Typography variant="h6">
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
                    "&:hover": {
                      backgroundColor: "#0000000a",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1">
                      Topics discussed: Discuss project scope and timeline
                    </Typography>
                    <Box display={"flex"} sx={{ gap: 0.5 }}>
                      <CalendarTodayIcon sx={{ width: "0.5em", pb: 0.6, color: 'text.secondary' }} />
                      <Typography variant="subtitle2" component="h5" color={'text.secondary'}>
                        Thursday, Sept 9, 2024 | 9:00pm - 10:00pm
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 , color: 'text.secondary'}}>
                      {notes}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </>
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1} >
          {loading ? (
            <Box>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={200} />
            </Box>
          ) : (
            <>
              <Typography variant="h6" component="h2">
                Details:
              </Typography>
              <Divider sx={{ width: "100%", mb: 2, px: 1 }} />
              <Timeline>
                {connectionData.map((dateData, dateIndex) => (
                  <TimelineItem key={dateIndex}>
                    <TimelineOppositeContent
                      sx={{
                        flex: { xs: 0.2, sm: 0.1 }, // Adjust flex on small screens
                        display: { xs: 'none', sm: 'block' }  // Hide on extra small screens
                      }}
                    >
                      <ClickableBox
                        display="flex"
                        alignItems="center"
                        onClick={() => toggleDate(dateData.date)}
                        sx={{ pt: 0.8 }}
                      >
                        <EventIcon sx={{ color: "black", pb: 0.5, ml: 0.5 }} />
                        <Typography
                          variant="body2"
                          sx={{ color: "black", width: { xs: '5em', sm: '7em' } }} // Adjust width for smaller screens
                        >
                          {formatDate(dateData.date)}
                        </Typography>
                      </ClickableBox>
                    </TimelineOppositeContent>

                    <TimelineSeparator sx={{ pt: 0.5 }}>
                      <TimelineDot sx={{ bgcolor: "text.secondary" }} />
                      <TimelineConnector sx={{ bgcolor: "text.secondary" }} />
                    </TimelineSeparator>

                    <TimelineContent
                      sx={{
                        "&:hover": {
                          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                          transform: "translateY(-2px)",
                        },
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' }, // Stack items vertically on smaller screens
                        width: { xs: '100%', sm: 'auto' }  // Full width for small screens
                      }}
                    >
                      <ClickableBox
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => toggleDate(dateData.date)}
                        sx={{ p: 0 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} // Adjust font size for smaller screens
                        >
                          Connected for Entrepreneur Topic
                        </Typography>
                        <Tooltip title="Click to see full details" placement="top">
                          <IconButton
                            size="small"
                            sx={{
                              "&:hover": {
                                borderRadius: "50%",
                              },
                            }}
                          >
                            {expandedDates[dateData.date] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                      </ClickableBox>

                      <Collapse in={expandedDates[dateData.date]}>
                        <Box sx={{ ml: { xs: 1, sm: 2 }, mt: 1 }}>
                          {dateData.sessions.map((session, sessionIndex) => (
                            <SessionPaper
                              key={sessionIndex}
                              elevation={1}
                              sx={{
                                bgcolor: getSessionColor(session.title),
                                p: { xs: 1, sm: 2 } // Adjust padding for smaller screens
                              }}
                              onClick={() => toggleDate(dateData.date)}
                            >
                              <Box display="flex" alignItems="center">
                                <AccessTimeIcon
                                  sx={{
                                    mr: 1,
                                    fontSize: { xs: "small", sm: "default" },
                                    color: "#000",
                                  }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{ color: "#000" }}
                                >
                                  {session.time}
                                </Typography>
                              </Box>
                              <Box sx={{ ml: { xs: 1, sm: 3 } }}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, color: "#333" }}
                                >
                                  {session.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                >
                                  Duration: {session.duration} min | Connected: {session.connectionTime} min
                                </Typography>
                                <Box display="flex" alignItems="center" mt={1}>
                                  <DescriptionIcon
                                    sx={{
                                      mr: 1,
                                      fontSize: { xs: "small", sm: "default" },
                                      color: "#666",
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "#666", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
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
            </>
          )}
        </TabPanel>
      </Card>
    </>
  );
};

export default DetailView;
