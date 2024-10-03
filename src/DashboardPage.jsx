import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Avatar,
  Tabs,
  Tab,
  ButtonBase,
  useMediaQuery,
  useTheme,
  CardMedia,
  Grid,
  Skeleton, // Import Skeleton from MUI
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventNoteIcon from "@mui/icons-material/EventNote";
// import bannerImg2 from "./assets/file2.png"; // Unused import
import { FollowerCard } from "./Experts/Components/FollowerStyle";
import { MainCard, NameBox } from "./Experts/Components/ExpertStyle";
import { ExpertPopup } from "./ExpertPopup";
// import Header from "./Header";

const initialCategories = [
  "Expert",
  "Fractional",
  "Demand Engagement",
  "Artificial Intelligence",
  "Entrepreneur",
  "Human Resource",
  "Data Science",
  "Finance",
  "Leadership",
  "Marketing",
  "Seasoned Entrepreneur",
];

// Styled Components

const HeaderSection = styled(Box)(({ theme, isMobile }) => ({
  position: "relative",
  color: "white",
  padding: '12px 0px',
  borderRadius: '8px',
  marginBottom: theme.spacing(3),
  textAlign: "center",
  height: '180px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(https://academy.opengrowth.com/assets/images/web/banner3.png)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#3c4a7280",
    zIndex: 1,
  },
  "& h4": {
    fontSize: isMobile ? "1.5rem" : "2.125rem",
  },
  "& h5": {
    fontSize: isMobile ? "1.125rem" : "1.5rem",
  },
}));

const EngagementCard = styled(ButtonBase)(({ theme }) => ({
  width: "49%",
  backgroundColor: "#ffff",
  padding: theme.spacing(1.7),
  paddingTop: '8px',
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  boxShadow: "none",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-1px)",
    border: '1px solid #0000000b',
    color: 'black'
  },
  transition: "background-color 0.3s ease"
}));

const SidebarSection = styled(Box)(({ theme, isMobile, isTablet }) => ({
  width: isMobile || isTablet ? "100%" : "25%",
  marginLeft: isMobile ? 0 : theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  marginTop: '8px',
}));

const StyledAttendedItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  gap: theme.spacing(2),
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const appointments = [
  {
    id: 1,
    name: "Vanshika Yadav",
    description: "Consultation on marketing strategies.",
    startDate: "Thursday, August 08, 2024",
    startTime: "02:29 PM",
    endTime: "02:59 PM",
    status: "Accepted",
  },
  {
    id: 2,
    name: "John Doe",
    description: "Meeting regarding project kickoff.",
    startDate: "Friday, August 09, 2024",
    startTime: "10:00 AM",
    endTime: "10:30 AM",
    status: "Rejected",
  },
  {
    id: 3,
    name: "Jane Smith",
    description: "Discussion on new product launch.",
    startDate: "Monday, August 12, 2024",
    startTime: "01:00 PM",
    endTime: "01:45 PM",
    status: "Attended",
  },
  {
    id: 4,
    name: "Mike Johnson",
    description: "Quarterly financial review meeting.",
    startDate: "Wednesday, August 14, 2024",
    startTime: "03:00 PM",
    endTime: "03:30 PM",
    status: "Accepted",
  },
];

// Removed custom Shimmer components

const TimeButton = styled(Button)(({ theme }) => ({
  borderRadius: "1.2em",
  textTransform: "none",
  fontWeight: "normal",
  backgroundColor: "#f4f7f9",
  color: "#000000",
  width: "auto",
  whiteSpace: "nowrap",
}));

const CategoryButton = styled(Button)(({ theme, active }) => ({
  borderRadius: "1.5em",
  textTransform: "none",
  fontWeight: active ? "bold" : "normal",
  backgroundColor: active ? "#000000" : "#e0e0e0",
  color: active ? "white" : "#000000",
  boxShadow: active ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
  "&:hover": {
    backgroundColor: active ? "#333333" : "#d5d5d5",
  },
  width: "auto",
  whiteSpace: "nowrap",
}));

const AttendedItem = ({ item }) => (
  <StyledAttendedItem>
    <AvatarWrapper>
      <Avatar
        src={`https://academy.opengrowth.com/assets/images/users/${item.mentee_img}`}
        sx={{ width: 90, height: 90, mr: 2 }}
      />
    </AvatarWrapper>
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {item.mentee_name}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "primary.main", fontWeight: "600" }}
      >
        {item.idea}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {item.date_title} | {item.time_title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Requirement: {item.query}
      </Typography>
    </Box>
  </StyledAttendedItem>
);

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [value, setValue] = useState(0);
  const [appointmentTab, setAppointmentTab] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // 600px - 1200px

  const fetchExperts = useCallback(async (category = null) => {
    setLoading(true);
    try {
      let response;
      if (category) {
        response = await axios.post(
          "https://academy.opengrowth.com/api/search_mentor",
          {
            email: "akriti@opengrowth.com",
            start: 0,
            end: 10,
            key: `0_popular_tags_${category}`,
            search: category,
            search_with: "tags",
            action: "",
            token: "kKRyYp5DebEw0fP",
          }
        );
      } else {
        response = await axios.post(
          "https://academy.opengrowth.com/api/get_all_mentors",
          {
            id: "akriti@opengrowth.com",
            start: 0,
            end: 10,
            key: "0_all_mentors_0_to_10",
          }
        );
      }
      console.log("API Response:", response.data);
      setExperts(response.data);
    } catch (error) {
      console.error("Error fetching experts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const truncateText = (text, maxLength = 60) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  useEffect(() => {
    if (selectedCategory) {
      const newCategories = [
        selectedCategory,
        ...categories.filter((category) => category !== selectedCategory),
      ];
      setCategories(newCategories);
    } else {
      setCategories(initialCategories);
    }
  }, [selectedCategory]);

  const handleAppointmentTabChange = (event, newValue) => {
    setAppointmentTab(newValue);
  };

  const appointmentCard = (appointment) => {
    let statusColor;
    switch (appointment.status) {
      case "Accepted":
        statusColor = "green";
        break;
      case "Rejected":
        statusColor = "red";
        break;
      case "Attended":
        statusColor = "blue";
        break;
      default:
        statusColor = "grey";
    }

    return (
      <FollowerCard
        key={appointment.id}
        sx={{
          height: 'auto',
          width: 'auto', // Fixed width for consistency
          flexShrink: 0,
          cursor: 'pointer',
          position: 'relative',
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
        onClick={() => navigateToAppointmentPage(appointment)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            navigateToAppointmentPage(appointment);
          }
        }}
      >
        <Avatar
          sx={{ bgcolor: "primary.main", width: 80, height: 80, zIndex: 1, mr: 2 }}
          src="https://academy.opengrowth.com/assets/images/users/user_523_professor_DheerajP.png"
        />

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ textAlign: "center" }}>
            {appointment.name}
          </Typography>

          <Typography
            variant={isMobile ? "subtitle2" : "subtitle1"}
            color="text.secondary"
            sx={{ textAlign: "center", fontWeight: 500, fontSize: { sm: '0.9rem', xs: '0.7rem' }, }}
          >
            {appointment.startDate}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 0.5, fontWeight: 500, fontSize: { sm: '0.8rem', xs: '0.65rem' }, }}
          >
            {appointment.startTime} - {appointment.endTime}
          </Typography>
          
        </Box>
      </FollowerCard>
    );
  };

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const navigateToExpertsPage = () => {
    navigate('/expertpage');
  };
  const navigateToAppointmentPage = () => {
    navigate('/appointmentpage');
  };

  return (
    <>
      {/* <Header /> */}
      <Box sx={{ backgroundColor: "#f4f6f6", minHeight: "100vh", p: 3 }}>
        {/* Tabs Section */}
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 1 }} animation="wave" />
        ) : (
          <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 1 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant={isTablet ? "scrollable" : "standard"}
              scrollButtons={isTablet ? "auto" : "off"}
              sx={{
                '& .MuiTab-root': {
                  fontSize: {
                    xs: '0.7rem',
                    sm: '0.875rem'
                  },
                  minWidth: isTablet ? '120px' : 'auto',
                }
              }}
            >
              <Tab label="Expert On Demand" />
              <Tab label="My Courses" />
              <Tab label="My Blogs" />
            </Tabs>
          </Box>
        )}

        {/* Header Section */}
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={180} animation="wave" />
        ) : (
          <HeaderSection isMobile={isMobile}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <Typography variant="h4" gutterBottom fontWeight="600">
                Welcome, OpenGrowth
              </Typography>
              <Typography variant="h5">
                Your expertise fuels our community. Let’s keep building success, together.
              </Typography>
            </Box>
          </HeaderSection>
        )}

        <Grid container spacing={isMobile || isTablet ? 2 : 3}>
          <Grid item xs={12} md={isTablet ? 12 : 8.7}>
            {/* Engagement Cards Section */}
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  mt: 3,
                  
                }}
              >
                <Skeleton variant="rectangular" width={isMobile || isTablet ? "100%" : "49%"} height={150} sx={{borderRadius: 1,}} animation="wave" />
                <Skeleton variant="rectangular" width={isMobile || isTablet ? "100%" : "49%"} height={150} sx={{ mt: isMobile || isTablet ? 2 : 0, borderRadius: 1, }} animation="wave" />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <EngagementCard
                  sx={{
                    background: `#ffff`,
                    color: 'black',
                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                    width: { xs: '100%', sm: '49%' },
                    textAlign: 'left',
                    pb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                      Recommended for you
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{ width: 60, height: 60, backgroundColor: '#f0f0f0' }}
                      >
                        <Box
                          component="img"
                          src="https://academy.opengrowth.com/assets/images/web/fragment.png"
                          alt="Fractional Engagements Icon"
                          sx={{ width: 60, height: 60, filter: 'brightness(0)' }}
                        />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">Fractional Engagements</Typography>
                        <Typography variant="subtitle1" fontSize='1.1em'>
                          Engage with experts for fractional consulting and advice.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </EngagementCard>

                <EngagementCard
                  sx={{
                    background: `#ffff`,
                    color: 'black',
                    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                    width: { xs: '100%', sm: '49%' },
                    top: { xs: '8px', sm: 'inherit' },
                    textAlign: 'left',
                  }}
                  onClick={navigateToExpertsPage}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                      Recommended for you
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{ width: 60, height: 60, backgroundColor: '#f0f0f0' }}
                      >
                        <Box
                          component="img"
                          src="https://academy.opengrowth.com/assets/images/web/engage.png"
                          alt="On Demand Engagement Icon"
                          sx={{ width: 60, height: 60, filter: 'brightness(0)' }}
                        />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">On Demand Engagement</Typography>
                        <Typography variant="subtitle1" fontSize='1.1em'>
                          Access on-demand expertise for immediate needs.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </EngagementCard>
              </Box>
            )}

            {/* Appointments Section */}
            {loading ? (
              <Box
                sx={{
                  pl: 3,
                  pr: 3,
                  pt: 1,
                  pb: 3,
                  width: isMobile || isTablet ? "100%" : "auto",
                  display: { sm: 'inherit' },
                  justifyContent: { xs: 'center', sm: 'inherit' },
                  height: "auto",
                  overflow: "auto",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                {/* Skeleton Placeholders for Appointments Section */}
                <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2,borderRadius: 1, }} animation="wave" />

                {/* Appointments List Placeholder */}
                <Box
                  sx={{
                    p: 1,
                    ml: { xs: '8px', sm: 0 },
                    width: '100%',
                    maxHeight: '300px',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                    borderRadius: 1,
                    '-ms-overflow-style': 'none',
                    scrollbarWidth: 'none',
                  }}
                >
                  {/* Using Flexbox for Horizontal Scroll */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      width: 'max-content',
                    }}
                  >
                    {Array.from({ length: 3 }, (_, index) => (
                      <Skeleton key={index} variant="rectangular" width={250} height={150} sx={{borderRadius: 1,}} animation="wave" />
                    ))}
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  pl: 3,
                  pr: 3,
                  pt: 1,
                  pb: 3,
                  width: { xs: '100%', sm: 'auto' },
                  display: { sm: 'inherit' },
                  justifyContent: { xs: 'center', sm: 'inherit' },
                  height: "auto",
                  overflow: "auto",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                {/* Tabs and View All Button */}
                <Box sx={{ marginBottom: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Tabs
                      value={appointmentTab}
                      onChange={handleAppointmentTabChange}
                      aria-label="appointment tabs"
                      variant={isTablet ? "scrollable" : "standard"}
                      scrollButtons={isTablet ? "auto" : "off"}
                      sx={{
                        '& .MuiTab-root': {
                          fontSize: {
                            xs: '0.7rem',
                            sm: '0.875rem',
                          },
                          minWidth: isTablet ? '120px' : 'auto',
                        }
                      }}
                    >
                      <Tab
                        iconPosition="start"
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventAvailableIcon sx={{ color: 'green' }} /> Upcoming Meetings
                          </Box>
                        }
                      />
                      <Tab
                        iconPosition="start"
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventBusyIcon sx={{ color: 'red' }} /> Rejected Meetings
                          </Box>
                        }
                      />
                      <Tab
                        iconPosition="start"
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventNoteIcon sx={{ color: 'blue' }} /> Attended Meetings
                          </Box>
                        }
                      />
                    </Tabs>
                    <Button onClick={navigateToAppointmentPage} sx={{ mr: 2, mb: 1 }}>View All</Button>
                  </Box>
                </Box>

                {/* Appointments List */}
                {appointmentTab === 0 && (
                  <Box
                    sx={{
                      p: 1,
                      ml: { xs: '8px', sm: 0 },
                      width: '100%',
                      maxHeight: '300px',
                      overflowX: 'auto',
                      whiteSpace: 'nowrap',
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                      '-ms-overflow-style': 'none',
                      scrollbarWidth: 'none',
                    }}
                  >
                    {/* Using Flexbox for Horizontal Scroll */}
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        width: 'max-content',
                      }}
                    >
                      {appointments.map((appointment) => (
                        <Box key={appointment.id}>
                          {appointmentCard(appointment)}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
                {/* You can add similar conditional rendering for other appointment tabs if needed */}
              </Box>
            )}

            {/* Experts You Can Connect Section */}
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  mt: 4,
                  pt: 3,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                }}
              >
                {/* Header Placeholder */}
                <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2, pl: 5, pr: 5 }} animation="wave" />

                <Divider sx={{ width: "96%", mb: 2 }} />

                {/* Experts Placeholders */}
                {Array.from({ length: 6 }, (_, index) => (
                  <Skeleton key={index} variant="rectangular" height={250} width="18em" sx={{ mb: 2 }} animation="wave" />
                ))}

                {/* Load More Button Placeholder */}
                <Skeleton variant="rectangular" width="200px" height={40} sx={{ mt: 2, mb: 2, alignSelf: "center" }} animation="wave" />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  mt: 4,
                  pt: 3,
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                }}
              >
                {/* Header */}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ pl: 5 }}
                  >
                    Experts you can connect
                  </Typography>
                  <Button onClick={navigateToExpertsPage} sx={{ mr: 5 }}>View All</Button>
                </Box>

                <Divider sx={{ width: "96%", mb: 2 }} />

                {/* Experts List */}
                {experts.slice(0, 6).map((expert, index) => (
                  <MainCard
                    key={index}
                    sx={{ height: 'auto', width: '18em', mb: 2 }}
                  >
                    <Box sx={{ width: "100%", position: "relative" }}>
                      <Link to={`/profile/${expert.profile_url}`} state={{ expertEmail: expert.email }} style={{ textDecoration: "none" }}>
                        <CardMedia
                          component="img"
                          image={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
                          alt={expert.name}
                          sx={{ width: "100%", height: 250, cursor: "pointer" }}
                        />
                      </Link>
                      <NameBox>
                        <Typography variant="subtitle1" align="center">
                          {expert.name}
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ fontSize: '0.75rem' }}>
                          {expert.industry}
                        </Typography>
                      </NameBox>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        p: 1,
                        boxSizing: "border-box",
                        height: "auto",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.8 }}
                      >
                        {truncateText(expert.about)}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => handleExpertClick(expert)}
                        sx={{ mt: 1 }}
                      >
                        Know More
                      </Button>
                    </Box>
                  </MainCard>
                ))}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={navigateToExpertsPage}
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                      px: 3,
                      py: 1,
                    }}
                  >
                    Load More
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>

          {/* Sidebar Section */}
          {loading ? (
            <SidebarSection isMobile={isMobile} isTablet={isTablet}>
              {/* Sidebar Header Placeholder */}
              <Skeleton variant="rectangular" width="100%" height={30} sx={{ mb: 2 , mt: 3, borderRadius: 1,}} animation="wave" />

              {/* Sidebar Experts Placeholders */}
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} variant="rectangular" height={150} sx={{ mb: 2,borderRadius: 1, }} animation="wave" />
              ))}

              {/* View All Button Placeholder */}
              <Skeleton variant="rectangular" width={100} height={30} />
            </SidebarSection>
          ) : (
            <SidebarSection isMobile={isMobile} isTablet={isTablet}>
              <Typography variant="h6">OpenGrowth Experts</Typography>
              <Divider sx={{ mb: 2 }} />
              {experts.slice(1, 7).map(
                (
                  expert,
                  index
                ) => (
                  <Card
                    key={index}
                    sx={{ mb: 2, boxShadow: "none", borderRadius: "12px" }}
                  >
                    <CardContent
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Avatar
                        src={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
                        alt={expert.name}
                        sx={{ width: 90, height: 90, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {expert.name}
                        </Typography>
                        <Typography variant="body2" >
                          {expert.industry}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.8 }}
                        >
                          {truncateText(expert.about)}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => handleExpertClick(expert)}
                          sx={{ mt: 1 }}
                        >
                          Know More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                )
              )}
              <Button
                onClick={navigateToExpertsPage}
                sx={{ alignSelf: "flex-end" }}
                size="small"
              >
                View All
              </Button>
            </SidebarSection>
          )}
        </Grid>

        {/* Expert Popup */}
        <ExpertPopup
          expert={selectedExpert}
          onClose={() => setSelectedExpert(null)}
        />
      </Box>
    </>
  );
};

export default DashboardPage;
