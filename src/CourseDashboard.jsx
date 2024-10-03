// Projects.jsx
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Chip,
  InputLabel,
  FormControl,
  Grid,
  useMediaQuery,
  useTheme,
  Skeleton, // Import Skeleton
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

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

const SmallCourseCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Changed to column for vertical layout
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  borderRadius: "8px",
  width: 220, // Adjusted for square shape
  height: 220, // Adjusted for square shape
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
}));

const SmallCourseMedia = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "70%", // Adjusted for 70% height of the card
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

const OverlayText = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start", // Align text to the start (left)
  justifyContent: "flex-start", // Align text to the top
  position: "absolute",
  top: 5, // Position at the top
  left: 4, // Position at the left
  marginRight: 70,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "#fff",
  padding: theme.spacing(1),
  textAlign: "left",
  fontSize: "0.85em",
  borderRadius: 4,
}));

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Course Completed",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: "#00FF00",
      backgroundColor: "#00FF00",
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 5,
      tension: 0.4,
    },
    {
      label: "Course Enrolled",
      data: [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      borderColor: "#FFD700",
      backgroundColor: "#FFD700",
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 7,
      borderWidth: 5,
      tension: 0.4,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 2.2,
      ticks: {
        stepSize: 0.7,
        callback: function (value) {
          if (value === 0) return "0.0";
          if (value === 0.7) return "0.7";
          if (value === 1.4) return "1.4";
          if (value === 2.1) return "2.1";
          return "";
        },
      },
      grid: {
        drawBorder: false,
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false, // Hide default legend
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      position: "nearest",
    },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: function (context) {
        return context.raw > 0 ? 7 : 0;
      },
    },
  },
};

const ProgressLabel = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: "0.9em",
}));

const SidebarSection = styled(Box)(({ theme }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return {
    width: isMobile ? "100%" : isTablet ? "100%" : "25%", // Adjust width for tablet
    marginLeft: isMobile ? 0 : isTablet ? 0 : theme.spacing(3),
    marginTop: isMobile ? theme.spacing(2) : "8px",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  };
});

const CourseImage = styled("div")(({ theme }) => ({
  width: "100%",
  height: 175,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  backgroundColor: "#e0e0e0",
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  bottom: 10,
  left: 10,
  backgroundColor: "#f9bb02",
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: "0.75rem", // Smaller font size
  padding: "4px 8px", // Smaller padding
  height: "auto", // Adjust height
}));

const courses = [
  {
    title: "Digital Marketing",
    category: "Marketing",
    date: "Aug 9, 2024 | 6:28 AM",
    description:
      "This course provides a comprehensive overview of the strategies and tactics used to effectively promote products or…",
    image: "https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg",
    avatar: [
      "https://randomuser.me/api/portraits/men/75.jpg",
      "https://randomuser.me/api/portraits/women/65.jpg",
    ],
    comments: 0,
    views: 5,
  },
  {
    title: "Prospective Fractional Experts Guide",
    category: "Leadership",
    date: "Jun 7, 2024 | 3:48 AM",
    description:
      "A short course on transitioning from a 9 to 5 job to a Fractional Executive, a cornerstone of the gig economy. Find out…",
    image: "https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg",
    avatar: ["https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg"],
    comments: 0,
    views: 70,
  },
  {
    title: "final testing course",
    category: "HR",
    date: "Apr 24, 2024 | 9:40 AM",
    description: "testing testing testing",
    image: "https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg",
    avatar: ["https://randomuser.me/api/portraits/women/66.jpg"],
    comments: 0,
    views: 48,
  },
  {
    title: "StartUp Fundamentals",
    category: "Leadership",
    date: "Apr 19, 2024 | 5:24 AM",
    description:
      "A step-by-step guide to incorporating your company, including why you need...",
    image: "https://academy.opengrowth.com/assets/images/courses/thumb__90082e05-8020-4bd8-8246-af0ef0853187.jpeg",
    avatar: ["https://randomuser.me/api/portraits/women/67.jpg"],
    comments: 0,
    views: 134,
  },
  {
    title: "Make You Pitch Investor Ready",
    category: "Leadership",
    date: "Apr 19, 2024 | 5:24 AM",
    description:
      "A step-by-step guide to incorporating your company, including why you need...",
    image: "https://academy.opengrowth.com/assets/images/courses/thumb_s2mypir.jpg",
    avatar: ["https://randomuser.me/api/portraits/women/67.jpg"],
    comments: 0,
    views: 134,
  },
  {
    title: "Business Modeling through Strategy and Analysis",
    category: "Product",
    date: "Apr 19, 2024 | 5:24 AM",
    description:
      "This course will give you a complete overview of developing and designing...",
    image: "https://academy.opengrowth.com/assets/images/courses/thumb_Strategy-and-Analysis.jpg",
    avatar: ["https://randomuser.me/api/portraits/women/67.jpg"],
    comments: 0,
    views: 134,
  },
  {
    title: "MVP Fundamentals",
    category: "Leadership",
    date: "Apr 19, 2024 | 5:24 AM",
    description:
      "A step-by-step guide to incorporating your company, including why you need...",
    image: "https://academy.opengrowth.com/assets/images/courses/thumb_10HowtomeasurePMF.jpg",
    avatar: ["https://randomuser.me/api/portraits/women/67.jpg"],
    comments: 0,
    views: 134,
  },
  {
    title: "HR for Remote Teams (HRD & HRM)",
    category: "HR",
    date: "Apr 19, 2024 | 5:24 AM",
    description:
      "A bulletproof Human Resource Development and Human Resource Management...",
    image: "https://academy.opengrowth.com/assets/images/courses/thumb_hrnew.jpg",
    avatar: ["https://randomuser.me/api/portraits/women/67.jpg"],
    comments: 0,
    views: 134,
  },
];

// Removed Custom Shimmer Components

// Function to render project cards or skeletons
const renderProjects = (filteredProjects, loading, theme) => {
  if (loading) {
    // Display Skeletons while loading
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {filteredProjects.map((_, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: "100%", sm: 400, md: 280 },
              height: 280,
              display: "flex",
              flexDirection: "column",
              p: 2,
              boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              position: "relative",
              borderRadius: 1, // Added borderRadius
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton variant="text" width="60%" height={30} aria-hidden="true" />
              <Box sx={{ display: "flex" }}>
                <Skeleton variant="circular" width={24} height={24} aria-hidden="true" />
                <Skeleton variant="circular" width={24} height={24} sx={{ ml: 1 }} aria-hidden="true" />
              </Box>
            </Box>
            <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} aria-hidden="true" />
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 1 }} aria-hidden="true" />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "auto",
                alignItems: "center",
              }}
            >
              <Skeleton variant="text" width="40%" height={20} aria-hidden="true" />
              <Skeleton variant="rectangular" width={80} height={24} aria-hidden="true" />
            </Box>
          </Card>
        ))}
      </Box>
    );
  }

  // Display actual project cards when not loading
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {filteredProjects.map((project) => (
        <Card
          key={project.id}
          sx={{
            width: { xs: "100%", sm: 400, md: 280 }, // Responsive widths
            height: 280,
            display: "flex",
            flexDirection: "column",
            py: 2,
            pl: 2,
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            position: "relative",
            borderRadius: 1, // Ensuring consistent borderRadius
            "&:hover": {
              backgroundColor: "#0000000a",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              transform: "translateY(-2px)",
            },
            cursor: "pointer",
          }}
          onClick={handleCardClick}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{project.name}</Typography>
            <Box>
              <IconButton onClick={(e) => handleToggleFavourite(project.id, e)}>
                {project.favourite ? <StarIcon sx={{ color: "gold" }} /> : <StarBorderIcon />}
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            For:{" "}
            <Typography component="span" variant="body2" color="primary">
              {project.company}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {project.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "auto",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Active: {project.active}
            </Typography>
            <Button
              variant="contained"
              onClick={(e) => handleMenuOpen(e, project.id)}
              sx={{
                height: 24,
                backgroundColor: statuses.find((status) => status.id === project.id)?.color || "#e0e0e0",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                borderRadius: "12px 0 0 12px", // Rounded left border
                fontSize: "10px",
                "&:hover": {
                  backgroundColor: darken(
                    statuses.find((status) => status.id === project.id)?.color || "#e0e0e0",
                    0.2
                  ), // Darkens the color by 20% on hover
                },
              }}
            >
              {statuses.find((status) => status.id === project.id)?.label || "+"}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={menuOpenProjectId === project.id}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={(e) =>
                  handleStatusChange("In Progress", "#aed581", project.id, e)
                }
                sx={{ fontSize: "10px" }}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ color: "#aed581", fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary="In Progress" sx={{ color: "#616161" }} />
              </MenuItem>
              <MenuItem
                onClick={(e) => handleStatusChange("New", "#fff176", project.id, e)}
                sx={{ fontSize: "10px" }}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ color: "#fff176", fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary="New" sx={{ color: "#616161" }} />
              </MenuItem>
              <MenuItem
                onClick={(e) =>
                  handleStatusChange("Cancelled", "#e57373", project.id, e)
                }
                sx={{ fontSize: "10px" }}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ color: "#e57373", fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary="Cancelled" sx={{ color: "#616161" }} />
              </MenuItem>
              <MenuItem
                onClick={(e) =>
                  handleStatusChange("Paused", "#7986cb", project.id, e)
                }
                sx={{ fontSize: "10px" }}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ color: "#7986cb", fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary="Paused" sx={{ color: "#616161" }} />
              </MenuItem>
            </Menu>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

// Function to render tabs or skeletons
const renderTabs = (loading, theme, tabIndex, handleTabChange) => {
  if (loading) {
    // Display Skeletons for tabs while loading
    return (
      <Box sx={{ display: "flex", gap: 2, ml: 2 }}>
        <Skeleton
          variant="rectangular"
          width={80}
          height={32}
          animation="wave"
          sx={{
            borderRadius: 1,
            backgroundColor: theme.palette.background.default,
          }}
          aria-hidden="true"
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={32}
          animation="wave"
          sx={{
            borderRadius: 1,
            backgroundColor: theme.palette.background.default,
          }}
          aria-hidden="true"
        />
        <Skeleton
          variant="rectangular"
          width={90}
          height={32}
          animation="wave"
          sx={{
            borderRadius: 1,
            backgroundColor: theme.palette.background.default,
          }}
          aria-hidden="true"
        />
      </Box>
    );
  }

  // Display actual Tabs when not loading
  return (
    <Tabs value={tabIndex} onChange={handleTabChange} sx={{ ml: 2 }}>
      <Tab
        label="Active"
        id="tab-0"
        aria-controls="tabpanel-0"
        sx={{ fontSize: { xs: "0.78rem", sm: "inherit" } }}
      />
      <Tab
        label="Completed"
        id="tab-1"
        aria-controls="tabpanel-1"
        sx={{ fontSize: { xs: "0.78rem", sm: "inherit" } }}
      />
      <Tab
        label="Templates"
        id="tab-2"
        aria-controls="tabpanel-2"
        sx={{ fontSize: { xs: "0.78rem", sm: "inherit" } }}
      />
    </Tabs>
  );
};

// Function to render headers or skeletons within TabPanels
const renderTabHeaders = (headerText, loading, theme) => {
  if (loading) {
    return (
      <Skeleton
        variant="text"
        width="30%"
        height={30}
        animation="wave"
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <Typography variant="h6" sx={{ mb: 2 }}>
      {headerText}
    </Typography>
  );
};

// Shimmer for the "Course Progress" section (Replaced with Skeleton)
const ProgressShimmer = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      bgcolor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      borderRadius: "8px",
      p: 1,
      mb: 2,
      mt: 2,
    }}
  >
    <Skeleton variant="circular" width={90} height={90} aria-hidden="true" />
    <Box sx={{ flexGrow: 1, ml: 2 }}>
      <Skeleton variant="text" width="50%" height={20} aria-hidden="true" />
      <Skeleton variant="text" width="30%" height={20} sx={{ mt: 1 }} aria-hidden="true" />
      <Skeleton variant="text" width="100%" height={10} sx={{ mt: 1 }} aria-hidden="true" />
    </Box>
  </Box>
);

// Shimmer for the "Explore other courses" section (Replaced with Skeleton)
const CourseCardShimmer = () => (
  <Grid item xs={12} sm={6} md={4}>
    <Card
      sx={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        borderRadius: 2,
        height: "21.5em",
        display: "flex",
        flexDirection: "column",
        width: "auto",
      }}
    >
      <Skeleton variant="rectangular" width="100%" height="175px" aria-hidden="true" />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Skeleton variant="text" width="60%" height={20} aria-hidden="true" />
          <Skeleton variant="text" width="40%" height={20} aria-hidden="true" />
          <Skeleton variant="text" width="80%" height={20} aria-hidden="true" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Skeleton variant="text" width={40} height={20} aria-hidden="true" />
          <Skeleton variant="text" width={40} height={20} aria-hidden="true" />
        </Box>
      </CardContent>
    </Card>
  </Grid>
);

const CourseDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const fetchExperts = useCallback(async (category = null) => {
    setLoading(true);
    try {
      let response;
      if (category) {
        response = await axios.post("https://academy.opengrowth.com/api/search_mentor", {
          email: "akriti@opengrowth.com",
          start: 0,
          end: 10,
          key: `0_popular_tags_${category}`,
          search: category,
          search_with: "tags",
          action: "",
          token: "kKRyYp5DebEw0fP",
        });
      } else {
        response = await axios.post("https://academy.opengrowth.com/api/get_all_mentors", {
          id: "akriti@opengrowth.com",
          start: 0,
          end: 10,
          key: "0_all_mentors_0_to_10",
        });
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

  useEffect(() => {
    const elements = document.querySelectorAll(".css-ehiffo");
    elements.forEach((el) => {
      el.style.width = "65vw";
      el.style.height = "53vh";
      el.style.borderRadius = "12px";
      el.style.boxShadow = "0 0 8px rgba(0,0,0,0.2)";
    });
  }, []);

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Array of projects (Assumed to be part of this component or imported)
  const [projects, setProjects] = useState([
    { id: 1, name: "Project 1", company: "Owner Company", description: "This is a demo Project", active: "Just now", favourite: false },
    { id: 2, name: "Project 2", company: "Another Company", description: "This is another demo project", active: "5 minutes ago", favourite: false },
    { id: 3, name: "Project 3", company: "Sample Company", description: "This is a sample project", active: "10 minutes ago", favourite: false },
  ]);

  // Array of status states corresponding to each project
  const [statuses, setStatuses] = useState([
    { id: 1, label: "+", color: "#e0e0e0" },
    { id: 2, label: "+", color: "#e0e0e0" },
    { id: 3, label: "+", color: "#e0e0e0" },
  ]);

  const handleMenuOpen = (event, projectId) => {
    event.stopPropagation(); // Prevent navigation on card click
    setAnchorEl(event.currentTarget);
    setMenuOpenProjectId(projectId); // Track which project’s menu is open
  };

  const handleMenuClose = (event) => {
    event.stopPropagation(); // Prevent navigation on card click
    setAnchorEl(null);
    setMenuOpenProjectId(null); // Close the menu for the project
  };

  const handleStatusChange = (label, color, projectId, event) => {
    event.stopPropagation(); // Prevent navigation on card click
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) =>
        status.id === projectId ? { ...status, label, color } : status
      )
    );
    handleMenuClose(event);
  };

  const handleToggleFavourite = (projectId, event) => {
    event.stopPropagation(); // Prevent navigation on card click
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, favourite: !project.favourite } : project
      )
    );
  };

  const handleCardClick = () => {
    navigate("/todo"); // Navigate to the TodoPage when a card is clicked
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : isTablet ? "column" : "row",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              width: isMobile ? "100%" : isTablet ? "100%" : "63vw",
              mb: isMobile ? 3 : 0,
            }}
          >
            {/* My Learning Curve */}
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height="43vh" aria-hidden="true" />
            ) : (
              <Box
                sx={{
                  pl: 2,
                  pr: 2,
                  pt: 1,
                  pb: 2,
                  width: "auto",
                  height: { sm: "43vh", xs: "25vh" },
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                  mb: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">My Learning Curve</Typography>
                <Divider sx={{ width: "98%", mb: 2 }} />
                <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
                  <Line data={data} options={options} />
                </Box>
              </Box>
            )}

            {/* Course Progress */}
            {loading ? (
              <>
                <ProgressShimmer />
                <ProgressShimmer />
                <ProgressShimmer />
              </>
            ) : (
              <Box
                sx={{
                  pl: 2,
                  pr: 2,
                  pt: 1,
                  pb: 2,
                  width: "auto",
                  height: "auto",
                  overflow: "auto",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                }}
              >
                <Typography variant="h6">Course Progress</Typography>
                <Divider sx={{ width: "100%", mb: 2 }} />
                <Grid container spacing={2} sx={{ overflow: "auto", p: 1 }}>
                  {[
                    {
                      link: "/course/seo-basics",
                      duration: "5 weeks",
                      imageUrl: "https://academy.opengrowth.com/assets/images/courses/thumb_s6seo.jpg",
                      title: "SEO Basics",
                      progress: 25,
                    },
                    {
                      link: "/course/ai-basic",
                      duration: "5 weeks",
                      imageUrl: "https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg",
                      title: "AI Basic",
                      progress: 42,
                    },
                    {
                      link: "/course/identifying-your-target-audience",
                      duration: "5 weeks",
                      imageUrl: "https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg",
                      title: "Identifying Your Target Audience",
                      progress: 70,
                    },
                  ].map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.title}>
                      <Link
                        to={`/course/${course.title}`}
                        style={{ textDecoration: "none" }}
                        state={{
                          title: course.title,
                          imageUrl: course.imageUrl,
                          description: course.description,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            bgcolor: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                            borderRadius: "8px",
                            p: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 90,
                              height: 90,
                              mr: 2,
                              backgroundImage: `url(${course.imageUrl})`,
                              backgroundSize: "cover",
                              borderRadius: "4px",
                            }}
                          ></Box>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                              {course.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {course.duration}
                            </Typography>
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <LinearProgress
                                variant="determinate"
                                value={course.progress}
                                sx={{
                                  width: "100%",
                                  height: 10,
                                  borderRadius: 1,
                                  mr: 1,
                                }}
                              />
                              <Typography variant="body2">{course.progress}%</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Explore Other Courses */}
            {loading ? (
              <Grid container spacing={3}>
                <CourseCardShimmer />
                <CourseCardShimmer />
                <CourseCardShimmer />
                <CourseCardShimmer />
                <CourseCardShimmer />
                <CourseCardShimmer />
              </Grid>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  mt: 4,
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                }}
              >
                <Box sx={{ padding: 2, width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Explore other courses</Typography>
                    <Button>View All</Button>
                  </Box>
                  <Divider sx={{ width: "100%", mb: 2, px: 1, ml: 0 }} />
                  <Grid container spacing={3} sx={{ width: "auto" }}>
                    {courses.slice(0, 6).map((course, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Link
                          to={`/course/${course.title}`}
                          style={{ textDecoration: "none" }}
                          state={{
                            title: course.title,
                            imageUrl: course.image,
                            description: course.description,
                          }}
                        >
                          <Card
                            sx={{
                              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                              borderRadius: 2,
                              height: "21.5em",
                              display: "flex",
                              flexDirection: "column",
                              width: "auto",
                              "&:hover": {
                                transform: "translateY(-3px)",
                                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                              },
                            }}
                          >
                            <CourseImage
                              sx={{
                                backgroundImage: `url(${course.image ||
                                  "https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg"
                                  })`,
                                width: "auto",
                              }}
                            >
                              <OverlayText variant="subtitle2">{course.title}</OverlayText>
                              <CategoryChip label={course.category} size="small" />
                            </CourseImage>
                            <CardContent
                              sx={{
                                flexGrow: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "flex-start",
                                  mb: 1,
                                  mt: 2,
                                }}
                              >
                                <Box>
                                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                    <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5 }} />
                                    {course.date}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      maxHeight: "40px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {course.description}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  {course.avatar.map((src, i) => (
                                    <Avatar
                                      key={i}
                                      src={src}
                                      sx={{
                                        width: 35,
                                        height: 35,
                                        ml: i === 0 ? 0 : -1,
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                              <Box>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <CommentIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                    <Typography variant="body2">{course.comments}</Typography>
                                  </Box>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <VisibilityIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                    <Typography variant="body2">{course.views}</Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            )}
          </Box>

          {/* Sidebar Section */}
          <SidebarSection>
            <Typography variant="h6">Handpicked Experts for you</Typography>
            <Divider sx={{ mb: 2 }} />
            {loading
              ? Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} variant="rectangular" width="100%" height={150} sx={{ borderRadius: 2 }} aria-hidden="true" />
              ))
              : experts.slice(0, 6).map((expert, index) => (
                <Card key={index} sx={{ mb: 2, boxShadow: "none", borderRadius: "12px" }}>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
                      alt={expert.name}
                      sx={{ width: 90, height: 90, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1">{expert.name}</Typography>
                      <Typography variant="body2">{expert.industry}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
                        {truncateText(expert.about)}
                      </Typography>
                      <Button size="small" onClick={() => handleExpertClick(expert)} sx={{ mt: 1 }}>
                        Know More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
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
            <Typography variant="subtitle1">{expert.industry}</Typography>
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

export default CourseDashboard;
