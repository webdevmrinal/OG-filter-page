import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  Avatar,
  
  Chip,
  Stack,
  ButtonBase,
  Grid,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import HomeIcon from '@mui/icons-material/Home';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";


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
  padding: '12px 0px 12px 0px',
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
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-1px)",
    border: '1px solid #0000000b',
    color: 'black'
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

const CourseIntroduction = () => {
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

  const truncateText = (text, maxLength = 80) => {
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
      el.style.width = "69vw";
      el.style.height = "53vh";
      el.style.borderRadius = "12px";
      el.style.boxShadow = "0 0 8px rgba(0,0,0,0.2)";
    });
  }, []);
  const appointmentCard = (appointment) => (
    <Card
      sx={{
        width: 250,
        boxShadow: "none",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        position: "relative", // Establishing positioning context
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
        <EventAvailableIcon />
      </Avatar>
      <Box sx={{ position: "absolute", top: 10, right: 8, zIndex: 1 }}>
      <Chip
    label={appointment.status}
    sx={{
      Color: 'white',
      backgroundColor:'#81c784',
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
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        {appointment.name}
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        {appointment.description}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <TimeButton
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 1 }}
        >
          {appointment.startDate}
        </TimeButton>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <TimeButton
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 0.5 }}
        >
          {appointment.startTime} - {appointment.endTime}
        </TimeButton>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}></Box>
      <Button sx={{ mt: 2 }}>View Now</Button>
    </Card>
  );

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
        
        <HeaderSection>
        <Box
      sx={{
        background: '#fff',
        color: '#000',
        borderRadius: 2,
        py: 2,
        px: 4,
        position: "relative",
        overflow: "visible",
        display: "flex",
        alignItems: "flex-start",  // Changed to start the alignment at the top
        justifyContent: "space-between",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" sx={{ textAlign: 'left' }}>
          AI Basics
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
          Course Introduction
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textAlign: 'left', mt: 1 }}>
          <HomeIcon sx={{ fontSize: '1.15rem', verticalAlign: 'middle', mb: '3px' }} />
          AI Basics / What is AI? / Course introduction
        </Typography>
      </Box>
      <Button variant="contained" sx={{
        position: "absolute",
        right: 15,
        top: 15, 
        backgroundColor: "#25387c",
        color: "#fff",
        '&:hover': {
          backgroundColor: "#1565c0",
        },
      }}>
        Take Assignment
      </Button>
    </Box>
        </HeaderSection>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1, width: "69vw" }}>
          <Box
      sx={{
        pl: 4,
        pr: 4,
        pt: 1,
        pb: 0,
        width: "69vw",
        height: "auto",
        overflow: "auto",
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        Course Introduction
      </Typography>
      <Typography variant="subtitle2">
        Welcome to the fascinating world of "AI Basics" – an immersive journey into the foundations of Artificial Intelligence. In an era where technology is evolving at an unprecedented pace, understanding the essentials of AI has become not just advantageous but essential. This course is designed to demystify the realm of Artificial Intelligence, providing you with a comprehensive introduction to the principles, applications, and impact of this transformative technology. Whether you're a curious enthusiast, a professional seeking to broaden your skill set, or someone simply intrigued by the potential of AI, this course will lay the groundwork for your exploration into the captivating field of Artificial Intelligence. Join us as we embark on a learning adventure that unlocks the mysteries behind AI and unveils the possibilities it holds for the future.
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        What is AI?
      </Typography>
      <Typography variant="subtitle2">
        Artificial Intelligence, commonly known as AI, is a revolutionary field of study that aims to create intelligent agents capable of mimicking human-like cognitive functions. At its core, AI encompasses a broad spectrum of techniques and technologies designed to enable machines to perceive, learn, reason, and make decisions autonomously. Understanding the essence of AI lays the groundwork for harnessing its potential in various domains.
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        Applications of AI
      </Typography>
      <Typography variant="subtitle2">
        The applications of AI are both diverse and impactful, permeating virtually every facet of our daily lives. From intelligent virtual assistants and recommendation systems to advanced robotics and autonomous vehicles, AI has evolved into a driving force behind technological innovation. Throughout this course, we will explore how AI is reshaping industries such as healthcare, finance, and manufacturing, providing you with a profound appreciation for its transformative capabilities.
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        Ethics in AI
      </Typography>
      <Typography variant="subtitle2" mb={3}>
      As AI continues to advance, ethical considerations become increasingly critical. Delving into the ethical dimensions of AI is paramount for anyone seeking to navigate this rapidly evolving landscape responsibly. We will address questions surrounding data privacy, algorithmic bias, and the societal implications of AI technologies. By examining real-world case studies, we aim to foster a thoughtful understanding of the ethical challenges and opportunities inherent in the development and deployment of AI systems.
      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1,}}>
      Join us on this enlightening journey through the fundamentals of AI, where you'll not only grasp the core concepts but also gain a holistic perspective on the applications and ethical considerations that define the future of artificial intelligence. Let's delve into the transformative realm of AI together!
      </Typography>
        
      </Typography>
    </Box>
          </Box>

          <SidebarSection>
          <Box sx={{ maxWidth: 350, }}>
          <Card sx={{ mb: 2, p: 2 ,boxShadow: "0 4px 6px rgba(0,0,0,0.2)",borderRadius: 2}}>
      <Typography variant="subtitle1" sx={{ mb: 0, fontStyle: 'italic' }}>
        Reading Time : 1 min (390 words)
      </Typography>
      <Divider />
      <Chip
        label="Currently viewing 1 out of 9 Units"
        sx={{ mt: 0.5, mb: 1, fontSize: '0.875rem', pl:'10px', pr:'10px', borderRadius: 2 }}
        
      />
    </Card>

    <Card sx={{ mb: 2, p: 2 ,boxShadow: "0 4px 6px rgba(0,0,0,0.2)", borderRadius: 2}}>
      {/* Section for "What is AI?" */}
      <Typography variant="caption" gutterBottom>
        What is AI?
      </Typography>
      <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ mb: 2 ,mt: 2}}>
        <Button variant="outlined" startIcon={<NavigateBeforeIcon />}>
          Previous
        </Button>
        <Button variant="outlined" endIcon={<NavigateNextIcon />}>
          Next
        </Button>
      </Stack>

      {/* Section for "Course introduction" */}
      <Typography variant="h6">
        Course introduction
      </Typography>
      <Divider sx={{  }} />
      <Button variant="contained" sx={{ width: '100%', mt: 0.7, mb: 2 }}>
        Overview
      </Button>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Button variant="outlined" startIcon={<NavigateBeforeIcon />}>
          Previous
        </Button>
        <Button variant="outlined" endIcon={<NavigateNextIcon />}>
          Next
        </Button>
      </Stack>
    </Card>
    </Box>
          </SidebarSection>
        </Box>
        
      </Box>
    </>
  );
};

export default CourseIntroduction;
