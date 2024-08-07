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
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import AppointmentsPage from "./Appointments";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Header from "./Header";

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
  backgroundColor: "#1e293b",
  color: "white",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  textAlign: "center",
}));

const EngagementCard = styled(Card)(({ theme }) => ({
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
}));

const SidebarSection = styled(Box)(({ theme }) => ({
  width: "25%",
  marginLeft: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
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

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [value, setValue] = useState(0);
  const [appointmentTab, setAppointmentTab] = useState(0);

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
      console.log('API Response:', response.data);
      setExperts(response.data);
    } catch (error) {
      console.error("Error fetching experts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const truncateText = (text, maxLength = 100) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
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

  const handleAppointmentTabChange = (event, newValue) => {
    setAppointmentTab(newValue);
  };
  useEffect(() => {
    const elements = document.querySelectorAll('.css-ehiffo');
    elements.forEach(el => {
      el.style.width = '69vw';
      el.style.height = '70vh';
    });
  }, []);

  return (
    <>
    <Header />
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Expert On Demand" />
          <Tab label="My Courses" />
          <Tab label="My Blogs" />
        </Tabs>
      </Box>
      <HeaderSection>
        <Typography variant="h4">Welcome, OpenGrowth</Typography>
        <Typography variant="subtitle1">
          Your expertise is the driving force on OpenGrowth - let's continue shaping success together
        </Typography>
      </HeaderSection>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1, width: "69vw" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <EngagementCard sx={{backgroundColor: "#b2e8a4"}}>
              <Typography variant="h6">Fractional Engagements</Typography>
              <Typography variant="body2" color="text.secondary">
                Engage with experts for fractional consulting and advice.
              </Typography>
            </EngagementCard>
            <EngagementCard sx={{backgroundColor: '#b2e8a4'}}>
              <Typography variant="h6">On Demand Engagement</Typography>
              <Typography variant="body2" color="text.secondary">
                Access on-demand expertise for immediate needs.
              </Typography>
            </EngagementCard>
          </Box>
          <Box >
            <Tabs value={appointmentTab} onChange={handleAppointmentTabChange} aria-label="appointment tabs">
                <Tab icon={<EventAvailableIcon />} label="Upcoming Meetings" />
                <Tab icon={<EventBusyIcon />} label="Rejected Meetings" />
                <Tab icon={<EventNoteIcon />} label="Attended Meetings" />
            </Tabs>
          </Box>
          <AppointmentsPage tab={appointmentTab} />
        </Box>
        <SidebarSection>
          <Typography variant="h6">OpenGrowth Experts</Typography>
          <Divider sx={{ mb: 2 }} />
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            experts.slice(0, 4).map((expert, index) => (  // Display only the first four experts
              <Card key={index} sx={{ mb: 2, boxShadow: "none" , borderRadius: "12px"}}>
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
                    alt={expert.name}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1">{expert.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {expert.industry}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
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
            ))
          )}
          <Button sx={{ alignSelf: "flex-end" }} size="small">
            View All
          </Button>
        </SidebarSection>
      </Box>
      <ExpertPopup expert={selectedExpert} onClose={() => setSelectedExpert(null)} />
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
