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
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Link } from "react-router-dom";

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
      shadowColor: "rgba(0, 0, 0, 0.3)",
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 4,
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
      shadowColor: "rgba(0, 0, 0, 0.3)",
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 4,
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
  // fontWeight: 'bold',
}));

const SidebarSection = styled(Box)(({ theme }) => ({
  width: "25%",
  marginLeft: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const courses = [
  {
    title: "Digital Marketing",
    category: "Marketing",
    date: "Aug 9, 2024 | 6:28 AM",
    description:
      "This course provides a comprehensive overview of the strategies and tactics used to effectively promote products or…",
    image:
      "https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg",
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
    image:
      "https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg",
    avatar: [
      "https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg",
    ],
    comments: 0,
    views: 70,
  },
  {
    title: "final testing course",
    category: "HR",
    date: "Apr 24, 2024 | 9:40 AM",
    description: "testing testing testing",
    image:
      "https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg",
    avatar: ["https://randomuser.me/api/portraits/women/66.jpg"],
    comments: 0,
    views: 48,
  },
  {
    title: "StartUp Fundamentals",
    category: "LeaderShip",
    date: "Apr 19, 2024 | 5:24 AM",
    description:
      "A step-by-step guide to incorporating your company, including why you need...",
    image:
      "https://academy.opengrowth.com/assets/images/courses/thumb__90082e05-8020-4bd8-8246-af0ef0853187.jpeg",
    avatar: ["https://randomuser.me/api/portraits/women/67.jpg"],
    comments: 0,
    views: 134,
  },
  {
    title: "Make You Pitch Investor Ready",
    category: "LeaderShip",
    date: "Apr 19, 2024 | 5:24 AM",
    description:
      "A step-by-step guide to incorporating your company, including why you need...",
    image:
      "https://academy.opengrowth.com/assets/images/courses/thumb_s2mypir.jpg",
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
    image:
      "https://academy.opengrowth.com/assets/images/courses/thumb_Strategy-and-Analysis.jpg",
    avatar: ["https://randomuser.me/api/portraits/women/67.jpg"],
    comments: 0,
    views: 134,
  },
  {
    title: "MVP Fundamentals",
    category: "LeaderShip",
    date: "Apr 19, 2024 | 5:24 AM",
    description:
      "A step-by-step guide to incorporating your company, including why you need...",
    image:
      "https://academy.opengrowth.com/assets/images/courses/thumb_10HowtomeasurePMF.jpg",
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
    image:
      "https://academy.opengrowth.com/assets/images/courses/thumb_hrnew.jpg",
    avatar: ["https://randomuser.me/api/portraits/women/67.jpg"],
    comments: 0,
    views: 134,
  },
];
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

  useEffect(() => {
    const elements = document.querySelectorAll(".css-ehiffo");
    elements.forEach((el) => {
      el.style.width = "65vw";
      el.style.height = "53vh";
      el.style.borderRadius = "12px";
      el.style.boxShadow = "0 0 8px rgba(0,0,0,0.2)";
    });
  }, []);

  return (
    <>
      {/* <Header /> */}
      <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1, width: "63vw" }}>
            <Box
              sx={{
                pl: 4,
                pr: 4,
                pt: 1,
                pb: 2,
                width: "67vw",
                height: "43vh",
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
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", py: 2 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#00FF00",
                        mr: 1,
                      }}
                    />
                    <Typography variant="caption">Course Completed</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#FFD700",
                        mr: 1,
                      }}
                    />
                    <Typography variant="caption">Course Enrolled</Typography>
                  </Box>
                </Box>
                <Line
                  data={data}
                  options={options}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                pl: 4,
                pr: 4,
                pt: 1,
                pb: 0,
                width: "67vw",
                height: "43vh",
                overflow: "auto",
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              }}
            >
              <Typography variant="h6">Course Progress</Typography>
              <Divider sx={{ width: "98%", mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item sx={{ width: "15em" }}>
                  <Link
                    to="/course/seo-basics"
                    style={{ textDecoration: "none" }}
                    state={{
                      title: "SEO Basics",
                      imageUrl:
                        "https://academy.opengrowth.com/assets/images/courses/thumb_s6seo.jpg",
                      description:
                        "A step-by-step guide to developing a Search Engine Optimization strategy for your business to increase your online presence and attract traffic to your website by using keywords intelligently, leveraging paid and organic searches, and making your website mobile-friendly.",
                    }}
                  >
                    <SmallCourseCard>
                      <SmallCourseMedia
                        sx={{
                          backgroundImage:
                            "url(https://academy.opengrowth.com/assets/images/courses/thumb_s6seo.jpg)",
                          mt: 0,
                          ml: 0,
                          height: 220,
                          width: 265,
                        }}
                      />
                      <CardContent
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          px: 1,
                          py: 0.5,
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={25}
                          sx={{ width: "85%", height: 10, borderRadius: 1 }}
                        />
                        <ProgressLabel>{25}%</ProgressLabel>
                      </CardContent>
                      <OverlayText>SEO Basics</OverlayText>
                    </SmallCourseCard>
                  </Link>
                </Grid>

                <Grid item sx={{ width: "15em" }}>
                  <Link
                    to="/course/ai-basic"
                    style={{ textDecoration: "none" }}
                    state={{
                      title: "AI Basic",
                      imageUrl:
                        "https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg",
                      description:
                        "A step-by-step guide to incorporating your company, including why you need to incorporate your company, the documentation needed and do's and don'ts. Learn about different types of organizations and how they operate, including taxation and legal aspects.",
                    }}
                  >
                    <SmallCourseCard>
                      <SmallCourseMedia
                        sx={{
                          backgroundImage:
                            "url(https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg)",
                          mt: 0,
                          ml: 0,
                          height: 220,
                          width: 265,
                        }}
                      />
                      <CardContent
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          px: 1,
                          py: 0.5,
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={42}
                          sx={{ width: "85%", height: 10, borderRadius: 1 }}
                        />
                        <ProgressLabel>{42}%</ProgressLabel>
                      </CardContent>
                      <OverlayText>AI Basic</OverlayText>
                    </SmallCourseCard>
                  </Link>
                </Grid>

                <Grid item sx={{ width: "15em" }}>
                  <Link
                    to="/course/identifying-your-target-audience"
                    style={{ textDecoration: "none" }}
                    state={{
                      title: "Identifying Your Target Audience",
                      imageUrl:
                        "https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg",
                      description:
                        "This course covers the basics of business analytics, including data analysis techniques, predictive modeling, and data-driven decision making. Perfect for those looking to enhance their analytical skills.",
                    }}
                  >
                    <SmallCourseCard>
                      <SmallCourseMedia
                        sx={{
                          backgroundImage:
                            "url(https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg)",
                          mt: 0,
                          ml: 0,
                          height: 220,
                          width: 265,
                        }}
                      />
                      <CardContent
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          px: 1,
                          py: 0.5,
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={70}
                          sx={{ width: "85%", height: 10, borderRadius: 1 }}
                        />
                        <ProgressLabel>{70}%</ProgressLabel>
                      </CardContent>
                      <OverlayText>
                        Identifying Your Target Audience
                      </OverlayText>
                    </SmallCourseCard>
                  </Link>
                </Grid>
              </Grid>
            </Box>

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
              <Box sx={{ padding: 3 }}>
                <Typography variant="h6">Explore other courses</Typography>
                <Divider sx={{ width: "100%", mb: 2, px: 1, ml: 0 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <FormControl
                    variant="outlined"
                    sx={{ m: 1, minWidth: "17em" }}
                  >
                    <InputLabel>Skill</InputLabel>
                    <Select
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      label="Skill"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="coding">Coding</MenuItem>
                      <MenuItem value="design">Design</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    sx={{ m: 1, minWidth: "17em" }}
                  >
                    <InputLabel>Level</InputLabel>
                    <Select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      label="Level"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="beginner">Beginner</MenuItem>
                      <MenuItem value="intermediate">Intermediate</MenuItem>
                      <MenuItem value="advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    sx={{ m: 1, minWidth: "17em" }}
                  >
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="business">Business</MenuItem>
                      <MenuItem value="technology">Technology</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" sx={{ m: 1 }}>
                    Search
                  </Button>
                </Box>
                {/* Course Cards */}
                <Grid container spacing={3}>
                  {courses.map((course, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Link to={`/course/${course.title}`} style={{ textDecoration: 'none' }} 
                      state={{
                        title: course.title,
                        imageUrl:
                          course.image,
                        description: course.description,
                      }}>
                      <Card
                        sx={{
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          borderRadius: 2,
                          height: "21.5em",
                          display: "flex",
                          flexDirection: "column",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                            backgroundColor: "#0000000a",
                          },
                        }}
                      >
                        <CourseImage
                          sx={{
                            backgroundImage: `url(${
                              course.image ||
                              "https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg"
                            })`,
                          }}
                        >
                          <OverlayText variant="subtitle2">
                            {course.title}
                          </OverlayText>
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
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ mb: 1 }}
                              >
                                <CalendarTodayIcon
                                  sx={{ fontSize: 14, mr: 0.5 }}
                                />
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
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <CommentIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                <Typography variant="body2">
                                  {course.comments}
                                </Typography>
                              </Box>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <VisibilityIcon
                                  sx={{ fontSize: 18, mr: 0.5 }}
                                />
                                <Typography variant="body2">
                                  {course.views}
                                </Typography>
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
          </Box>

          <SidebarSection>
            <Typography variant="h6">Handpicked Experts for you</Typography>
            <Divider sx={{ mb: 2 }} />
            {loading
              ? Array.from({ length: 4 }, (_, index) => (
                  <Shimmer key={index} height={150} />
                ))
              : experts.slice(0, 4).map((expert, index) => (
                  <Card
                    key={index}
                    sx={{ mb: 2, boxShadow: "none", borderRadius: "12px" }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
                        alt={expert.name}
                        sx={{ width: 90, height: 90, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {expert.name}
                        </Typography>
                        <Typography variant="body2">
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
                ))}
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
