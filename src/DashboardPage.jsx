import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Chip,
  CardMedia,
  ButtonBase,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Link } from 'react-router-dom';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventNoteIcon from "@mui/icons-material/EventNote";
import bannerImg2 from "./assets/file2.png";
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

const HeaderSection = styled(Box)(({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    position: "relative", // To allow positioning of overlay
    color: "white",
    padding: '12px 0px',
    borderRadius: '8px',
    marginBottom: theme.spacing(3),
    textAlign: "center",
    height: '180px',  // Adjust the height to your preference
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(https://academy.opengrowth.com/assets/images/web/banner3.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden", // Ensure no overflow is visible
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#3c4a7280", // Semi-transparent white overlay to lighten the image
      zIndex: 1, // Ensure the overlay is below the content but above the background image
    },
    "& h4": {
      fontSize: isMobile ? "1.5rem" : "2.125rem", // Adjusted font size for h4
    },
    "& h5": {
      fontSize: isMobile ? "1.125rem" : "1.5rem", // Adjusted font size for h5
    },
  };
});


const EngagementCard = styled(ButtonBase)(({ theme }) => ({
    width: "49%",
    backgroundColor: "#ffff",
    padding: theme.spacing(1.7),
    paddingTop: '8px',
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-Start",
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

const SidebarSection = styled(Box)(({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return {
    width: isMobile ? "95%" : "25%", // Increase width for small screens
    marginLeft: isMobile ? 19 : theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    marginTop: '8px',
  };
});
const appointments = [
  {
    id: 1,
    name: "Vanshika Yadav",
    description: "test",
    startDate: "Thursday, August 08, 2024",
    startTime: "02:29 PM",
    endTime: "02:59 PM",
    status: "Accepted",
  },
];

const ShimmerWrapper = styled("div")({
  overflow: "hidden",
  position: "relative",
  backgroundColor: "#f6f7f8",
  borderRadius: 8,
});

const ShimmerEffect = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  animation: "shimmer 1.5s infinite linear",
  background: `linear-gradient(to right, ${theme.palette.background.default} 0%, #e0e0e0 50%, ${theme.palette.background.default} 100%)`,
  backgroundSize: "200% 100%",
  "@keyframes shimmer": {
    "0%": {
      backgroundPosition: "-100% 0",
    },
    "100%": {
      backgroundPosition: "100% 0",
    },
  },
}));

const Shimmer = ({ width = "100%", height = 100 }) => (
  <ShimmerWrapper style={{ width, height }}>
    <ShimmerEffect />
  </ShimmerWrapper>
);



const TimeButton = styled(Button)(({ theme }) => ({
  borderRadius: "1.2em",
  textTransform: "none",
  fontWeight: "normal",
  backgroundColor: "#f4f7f9",
  color: "#000000",
  //   boxShadow: active ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
  //   "&:hover": {
  //     backgroundColor: active ? "#333333" : "#d5d5d5",
  //   },
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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

  const truncateText = (text, maxLength = 70) => {
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
  useEffect(() => {
    const elements = document.querySelectorAll(".css-ehiffo");
    elements.forEach((el) => {
      el.style.width = "68vw";
      el.style.height = "53vh";
      el.style.borderRadius = "12px";
      el.style.boxShadow = "0 0 8px rgba(0,0,0,0.2)";
    });
  }, []);
  const appointmentCard = (appointment) => (
    <Card
      sx={{
        width: { xs: '100%', sm: 200 },
        padding: theme.spacing(1),
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: theme.shape.borderRadius,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative", // Establishing positioning context
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transform: "translateY(-1px)",
          backgroundColor: "#0000000a",
        },
      }}
    >
      <Box sx={{ position: "absolute", top: 10, right: 8, zIndex: 1 }}>
        <Chip
          label={appointment.status}
          sx={{
            color: 'white',
            backgroundColor: '#81c784',
            mb: 1,
            height: '20px',
            fontSize: '0.7rem',
            '& .MuiChip-icon': {
              color: "white",
              backgroundColor: '#81c784',
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
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 3 }}>
        <Avatar
          sx={{ bgcolor: "primary.main", width: 70, height: 70, zIndex: 1 }}
          src="https://academy.opengrowth.com/assets/images/users/user_523_professor_DheerajP.png"
        />
       
      </Box>
      
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        {appointment.name}
      </Typography>
      
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 0.5,fontWeight: 500,
          fontSize: '0.8rem', }}
      >
        {appointment.startDate}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 0.5,fontWeight: 500,
          fontSize: '0.8rem', }}
      >
        {appointment.startTime} - {appointment.endTime}
      </Typography>
    </Card>
  );
  

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      fetchExperts();
    } else {
      setSelectedCategory(category);
      fetchExperts(category);
    }
  };

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const elements = document.querySelectorAll(".css-ehiffo");
    elements.forEach((el) => {
      el.style.width = "67vw";
      el.style.height = "53vh";
      el.style.borderRadius = "12px";
      el.style.boxShadow = "0 0 8px rgba(0,0,0,0.2)";
    });
  }, []);
  const navigate  = useNavigate ();

const navigateToAppointmentsPage = () => {
  navigate('/appointmentpage');
};
const navigateToExpertsPage = () => {
  navigate('/expertpage');
};

  return (
    <>
      {/* <Header /> */}
      <Box sx={{ backgroundColor: "#f4f6f6", minHeight: "100vh", p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              '& .MuiTab-root': { 
                fontSize: { 
                  xs: '0.7rem',
                  sm: '0.875rem'
                },
                width: {
                  xs: '11.5em',
                  sm: 'inherit'
                }
              }
            }}
          >
            <Tab label="Expert On Demand" />
            <Tab label="My Courses" />
            <Tab label="My Blogs" />
          </Tabs>
        </Box>
        <HeaderSection>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              zIndex: 2,  // Ensure content appears above any potential background overlays
            }}
          >
            <Typography variant="h4" gutterBottom fontWeight="600">
              Welcome, OpenGrowth
            </Typography>
            <Typography variant="h5">
              Your expertise is the driving force on OpenGrowth - let's
              continue shaping success together.
            </Typography>
          </Box>
        </HeaderSection>
        <Grid container spacing={isMobile ? 2 : 3}>
          <Grid item xs={12} md={8.7}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                flexDirection: { xs: 'column', sm: 'inherit' },
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
                        sx={{ width: 60, height: 60, filter: 'brightness(0)' }}  // Make the icon black
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
                        sx={{ width: 60, height: 60, filter: 'brightness(0)' }}  // Make the icon black
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


            <Box sx={{ marginBottom: 2,  }}>
              <Tabs
                value={appointmentTab}
                onChange={handleAppointmentTabChange}
                aria-label="appointment tabs"
                sx={{
                  '& .MuiTab-root': { 
                    fontSize: { 
                      xs: '0.7rem',
                      sm: '0.875rem'
                    },
                    width: {
                      xs: '11.5em',
                      sm: 'inherit'
                    }
                  }
                }}
              >
                <Tab
                  iconPosition="start"
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EventAvailableIcon sx={{ color: "green" }} /> Upcoming
                      Meetings
                    </Box>
                  }
                />
                <Tab
                  iconPosition="start"
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EventBusyIcon sx={{ color: "red" }} /> Rejected Meetings
                    </Box>
                  }
                />
                <Tab
                  iconPosition="start"
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EventNoteIcon sx={{ color: "blue" }} /> Attended Meetings
                    </Box>
                  }
                />
              </Tabs>
            </Box>
            <Box
              sx={{
                
                pl: 3,
                pr: 3,
                pt: 1,
                pb: 3,
                width: { xs: '100%', sm: '66vw' },
                display: {xs : 'grid', sm: 'inherit'},
                justifyContent: {xs: 'center', sm: 'inherit'},
                height: "auto",
                overflow: "auto",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <Box sx={{display: 'flex',
                justifyContent: 'space-between',
              alignItems: 'center'}}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ mb: 1, color: "#000" }}
              >
                Appointments
              </Typography>
              <Button onClick={navigateToAppointmentsPage} sx={{ }}>View All</Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {appointmentTab === 0 && (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    marginTop: 3,
                    ml: { xs: '8px', sm: 1 },
                    width: {xs :"190px", sm: '284px'},
                    "& .MuiGrid-item": {
                      padding: "0 !important",
                    },
                  }}
                >
                  {appointments.map((appointment) => (
                    <Box sx={{ display: "flex", gap: 4 , flexDirection: { xs: 'column', sm: 'row' }, 
                    width: { xs: '100%', sm: 'inherit' }, ml: { xs: '0px', sm: 'inherit' },}}>
                      <Grid
                        item
                        key={appointment.id}
                        sx={{
                          
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                          borderRadius: "8px",
                          border: "1px solid rgba(0,0,0,0.12)",
                          backgroundColor: "#fff",
                          maxWidth: "calc(100% - 0px)",
                        }}
                      >
                        {appointmentCard(appointment)}
                      </Grid>
                      <Grid
                        item
                        key={appointment.id}
                        sx={{
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                          borderRadius: "8px",
                          border: "1px solid rgba(0,0,0,0.12)",
                          backgroundColor: "#fff",
                          maxWidth: "calc(100% - 0px)",
                        }}
                      >
                        {appointmentCard(appointment)}
                      </Grid>
                    </Box>
                  ))}
                </Grid>
              )}
            </Box>

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

  {experts.slice(0, 6).map((expert, index) => (
    <Card
      key={index}
      sx={{
        width: 300,
        mb: 4,
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        "&:hover": {
          backgroundColor: "#0000000a",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
      }}
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
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            p: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50px",
          }}
        >
          <Typography variant="subtitle1" align="center">
            {expert.name}
          </Typography>
          <Typography variant="body2" align="center" sx={{ fontSize: '0.75rem' }}>
            {expert.industry}
          </Typography>
        </Box>
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
    </Card>
  ))}
</Box>

          </Grid>

          <SidebarSection>
            <Typography variant="h6">OpenGrowth Experts</Typography>
            <Divider sx={{ mb: 2 }} />
            {loading
              ? Array.from({ length: 4 }, (_, index) => (
                  <Shimmer key={index} height={150} />
                ))
              : experts.slice(0, 4).map(
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
            <Button sx={{ alignSelf: "flex-end" }} size="small">
              View All
            </Button>
          </SidebarSection>
        </Grid>
        <ExpertPopup
          expert={selectedExpert}
          onClose={() => setSelectedExpert(null)}
        />
      </Box>
    </>
  );
};

const ExpertPopup = ({ expert, onClose }) => {
  if (!expert) return null;

  return (
    <Dialog open={!!expert} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Expert Details</Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Avatar
            src={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
            alt={expert.name}
            sx={{ width: 120, height: 120 }}
          />
          <Box>
            <Typography variant="h5" gutterBottom>
              {expert.name}
            </Typography>
            <Typography variant="subtitle1">
              {expert.industry}
            </Typography>
            <Chip label={expert.category} sx={{ mt: 1 }} />
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mt: 3 }}>
          {expert.about}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          View Profile
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardPage;
