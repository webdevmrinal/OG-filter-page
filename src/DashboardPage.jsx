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
    useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import AppointmentsPage from "./Appointments";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventNoteIcon from "@mui/icons-material/EventNote";
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


const HeaderSection = styled(Box)(({ theme }) => ({
  //   backgroundColor: "#1e293b",
  color: "white",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  textAlign: "center",
}));

const EngagementCard = styled(ButtonBase)(({ theme }) => ({
    width: "48%",
    backgroundColor: "#fdf3e7",
    padding: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    boxShadow: "none",
    borderRadius: "12px",
    '&:hover': {
        backgroundColor: "#f3e5ab",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        transform: "translateY(-2px)",
        border: "2px solid rgba(37, 56, 124, 0.5)",
    },
    transition: "background-color 0.3s ease"
}));

const SidebarSection = styled(Box)(({ theme }) => ({
  width: "25%",
  marginLeft: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
const appointments = [
    {
        id: 1,
        name: 'Vanshika Yadav',
        description: 'test',
        startDate: 'Thursday, August 08, 2024',
        startTime: '02:29 PM',
        endTime: '02:59 PM',
        status: 'Accepted'
    }
];

const ShimmerWrapper = styled('div')({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f6f7f8',
    borderRadius: 8,
  });
  
  const ShimmerEffect = styled('div')(({ theme }) => ({
    width: '100%',
    height: '100%',
    animation: 'shimmer 1.5s infinite linear',
    background: `linear-gradient(to right, ${theme.palette.background.default} 0%, #e0e0e0 50%, ${theme.palette.background.default} 100%)`,
    backgroundSize: '200% 100%',
    "@keyframes shimmer": {
      '0%': {
        backgroundPosition: '-100% 0',
      },
      '100%': {
        backgroundPosition: '100% 0',
      },
    }
  }));
  
  const Shimmer = ({ width = '100%', height = 100 }) => (
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
                sx={{ width: 56, height: 56, mr: 2 }}
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

  const truncateText = (text, maxLength = 100) => {
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
        const elements = document.querySelectorAll('.css-ehiffo');
        elements.forEach(el => {
            el.style.width = '69vw';
            el.style.height = '53vh';
            el.style.borderRadius = '12px';
            el.style.boxShadow = '0 0 8px rgba(0,0,0,0.2)';
        });
    }, []);
    const appointmentCard = (appointment) => (
        <Card sx={{
                width: 250,
                boxShadow: 'none',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                position: 'relative', // Establishing positioning context
                '&:hover': {
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    transform: "translateY(-1px)",
                }
        }}>
            <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                <EventAvailableIcon />
            </Avatar>
            <Box sx={{ position: 'absolute', top: 10, right: 8, zIndex: 1 }}>
            <Typography variant="subtitle2" sx={{ color: 'green', fontWeight: 'bold', mb: 1 }}>
                {appointment.status}
            </Typography>
            </Box>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                {appointment.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {appointment.description}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <TimeButton variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                {appointment.startDate}
            </TimeButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <TimeButton variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 0.5 }}>
                {appointment.startTime} - {appointment.endTime}
            </TimeButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}></Box>
            <Button sx={{ mt: 2 }}>
                View Now
            </Button>
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
      el.style.width = "69vw";
      el.style.height = "53vh";
      el.style.borderRadius = "12px";
      el.style.boxShadow = "0 0 8px rgba(0,0,0,0.2)";
    });
  }, []);

  return (
    <>
      {/* <Header /> */}
      <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Expert On Demand" />
            <Tab label="My Courses" />
            <Tab label="My Blogs" />
          </Tabs>
        </Box>
        <HeaderSection>
          <Box
            sx={{
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              background: `#28419d`,
              color: theme.palette.common.white,
              borderRadius: theme.shape.borderRadius,
              py: 6,
              px: 4,
              position: "relative",
              overflow: "visible",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Ensures the image is on the right side
              "&:before": {
                content: '""',
                position: "absolute",
                top: -60,
                left: -400,
                width: "50%",
                height: "50%",
                borderRadius: "100%",
                background: "#ff98cf",
                opacity: 0.5,
                filter: "blur(65px)",
                mixBlendMode: "screen",
                animation: "wiggleTop 5s infinite ease-in-out",
              },
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -80,
                right: -400,
                width: "50%",
                height: "50%",
                background: "#0cfae6",
                filter: "blur(75px)",
                borderRadius: "50%",
                mixBlendMode: "screen",
                animation: "wiggleBottom 5s infinite ease-in-out",
              },
              "@keyframes wiggleTop": {
                "0%, 100%": {
                  top: -10,
                },
                "50%": {
                  top: -70,
                },
              },
              "@keyframes wiggleBottom": {
                "0%, 100%": {
                  bottom: -30,
                },
                "50%": {
                  bottom: -80,
                },
              },
            }}
          >
            <Box>
              <Typography variant="h4" gutterBottom fontWeight={"600"}>
                Welcome, OpenGrowth
              </Typography>
              <Typography variant="body1">
                Your expertise is the driving force on OpenGrowth - let's continue
                shaping success together.
              </Typography>
            </Box>
            <img
              src="https://media.istockphoto.com/id/1206796363/photo/ai-machine-learning-hands-of-robot-and-human-touching-on-big-data-network-connection.jpg?s=2048x2048&w=is&k=20&c=NMisrXtMr49zx-Oix-7aCbd9LyoSRqaS-fjGo9qzGLk="
              alt="Free Unsplash Image"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: theme.shape.borderRadius,
                marginLeft: theme.spacing(4),
                mixBlendMode: 'screen',  // Blends the image with the background
                opacity: 0.7,            // Adjust the opacity for better blending
              }}
            />
          </Box>


        </HeaderSection>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1, width: "69vw" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <EngagementCard sx={{ backgroundColor: "#b2e8a4" }}>
                <Typography variant="h6">Fractional Engagements</Typography>
                <Typography variant="body2" color="text.secondary">
                  Engage with experts for fractional consulting and advice.
                </Typography>
              </EngagementCard>
              <EngagementCard sx={{ backgroundColor: "#b2e8a4" }}>
                <Typography variant="h6">On Demand Engagement</Typography>
                <Typography variant="body2" color="text.secondary">
                  Access on-demand expertise for immediate needs.
                </Typography>
              </EngagementCard>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                            <Tabs value={appointmentTab} onChange={handleAppointmentTabChange} aria-label="appointment tabs">
                                <Tab
                                    iconPosition="start"
                                    label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><EventAvailableIcon sx={{ color: 'green' }} /> Upcoming Meetings</Box>}
                                />
                                <Tab
                                    iconPosition="start"
                                    label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><EventBusyIcon sx={{ color: 'red' }} /> Rejected Meetings</Box>}
                                />
                                <Tab
                                    iconPosition="start"
                                    label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><EventNoteIcon sx={{ color: 'blue' }} /> Attended Meetings</Box>}
                                />
                            </Tabs>
                        </Box>
                        <Box sx={{
                            pl: 4, pr: 4, pt: 1, pb: 0, width: '69vw', height: '54vh', overflow: 'auto',
                            backgroundColor: '#fff'
                        }}>
                            <Typography variant="h6" gutterBottom sx={{ mb: 1, color: '#000' }}>
                                Appointments
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            {appointmentTab === 0 && (
                                <Grid container spacing={2} sx={{
                                    marginTop: 2, marginLeft: 1, width: '284px',
                                    '& .MuiGrid-item': {
                                        padding: '0 !important'
                                    }

                                }} >
                                    {appointments.map((appointment) => (
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Grid item key={appointment.id} sx={{
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.12)',
                                                backgroundColor: '#fff',
                                                maxWidth: 'calc(100% - 25px)',
                                            }}>
                                                {appointmentCard(appointment)}
                                            </Grid>
                                            <Grid item key={appointment.id} sx={{
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(0,0,0,0.12)',
                                                backgroundColor: '#fff',
                                                maxWidth: 'calc(100% - 25px)',
                                            }}>
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
                mt: 2,
                pt: 3,
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 0 8px rgba(0,0,0,0.2)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ width: "100%", mb: 2, pl: 5 }}
              >
                Experts you can connect
              </Typography>
              <Divider sx={{ width: "92%", mb: 2, alignSelf: "center" }} />
              {experts.slice(0, 6).map((expert, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 300,
                    mb: 2,
                    boxShadow: "none",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
                    alt={expert.name}
                    sx={{ width: "100%", height: 250, position: "relative" }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      p: 1,
                      border: "1px solid #ccc",
                      boxSizing: "border-box",
                      height: '22vh'
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: "left", width: "100%" }}
                    >
                      {expert.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {expert.industry}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
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
                  {/* </CardContent> */}
                </Card>
              ))}
            </Box>
          </Box>

          <SidebarSection>
            <Typography variant="h6">OpenGrowth Experts</Typography>
            <Divider sx={{ mb: 2 }} />
            {loading ? (
    Array.from({ length: 4 }, (_, index) => (
      <Shimmer key={index} height={150} /> // You can customize the height as needed
    ))
  ) : (
              experts.slice(0, 4).map(
                (
                  expert,
                  index // Display only the first four experts
                ) => (
                  <Card
                    key={index}
                    sx={{ mb: 2, boxShadow: "none", borderRadius: "12px" }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
                        alt={expert.name}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {expert.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {expert.industry}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
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
              )
            )}
            <Button sx={{ alignSelf: "flex-end" }} size="small">
              View All
            </Button>
          </SidebarSection>
        </Box>
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
            <Typography variant="subtitle1" color="text.secondary">
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
