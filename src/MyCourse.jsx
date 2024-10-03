// MyCourse.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';

// Styled Components
const SmallCourseCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  borderRadius: '8px',
  width: 220,
  height: 220,
  position: 'relative',
  cursor: 'pointer',
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
}));

const LargeCourseCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: '8px',
  minHeight: 200,
  maxWidth: '100%',
  marginRight: '20px',
  cursor: 'pointer',
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const LargeCourseMedia = styled(Box)(({ theme }) => ({
  width: 250,
  height: 160,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  '@media (max-width: 600px)': {
    width: '100%',
    height: 200,
    marginBottom: theme.spacing(2),
  },
}));

const TagChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

// Sample Courses Data
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
  // ... (Other courses)
];

// MyCourse Component
const MyCourse = () => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme(); // Access the theme palette
  const navigate = useNavigate(); // To handle navigation on card click

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  // Function to truncate text
  const truncateText = (text, maxLength = 80) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  // Handle Card Click (Example)
  const handleCardClick = () => {
    navigate("/todo"); // Navigate to the TodoPage when a card is clicked
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Course Progress Section */}
      <Box
        sx={{
          pl: 2,
          pr: 2,
          pt: 1,
          pb: 2,
          mb: 3,
          width: "auto",
          height: "auto",
          overflow: "auto",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        }}
      >
        {loading ? (
          <Skeleton
            variant="text"
            width="30%"
            height={30}
            sx={{ mb: 2 }}
            animation="wave"
            aria-hidden="true"
          />
        ) : (
          <Typography variant="h6">Course Progress</Typography>
        )}
        <Divider sx={{ width: "100%", mb: 2 }} />
        <Grid container spacing={2} sx={{ overflow: "auto", p: 1 }}>
          {loading ? (
            Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                  <Skeleton
                    variant="rectangular"
                    width={90}
                    height={90}
                    sx={{ mr: 2 }}
                    animation="wave"
                    aria-hidden="true"
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={24}
                      sx={{ mb: 1 }}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={20}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={10}
                      sx={{ mt: 1 }}
                      animation="wave"
                      aria-hidden="true"
                    />
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            [
              {
                link: "/course/seo-basics",
                duration: "5 weeks",
                imageUrl:
                  "https://academy.opengrowth.com/assets/images/courses/thumb_s6seo.jpg",
                title: "SEO Basics",
                progress: 25,
              },
              {
                link: "/course/ai-basic",
                duration: "5 weeks",
                imageUrl:
                  "https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg",
                title: "AI Basic",
                progress: 42,
              },
              {
                link: "/course/identifying-your-target-audience",
                duration: "5 weeks",
                imageUrl:
                  "https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg",
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
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.primary" }}
                      >
                        {course.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ color: "text.secondary" }}
                      >
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
                        <Typography variant="body2">
                          {course.progress}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* My Enrolled Courses Section */}
      <Box
        sx={{
          pl: 3,
          pt: 2,
          pb: 0,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        {loading ? (
          <Skeleton
            variant="text"
            width="40%"
            height={30}
            sx={{ mb: 2 }}
            animation="wave"
            aria-hidden="true"
          />
        ) : (
          <Typography variant="h6">My Enrolled Courses</Typography>
        )}
        <Divider sx={{ width: "98%", mb: 2 }} />
        <Grid container spacing={2}>
          {loading ? (
            Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} key={index}>
                <LargeCourseCard>
                  <Skeleton
                    variant="rectangular"
                    width={250}
                    height={160}
                    sx={{ mt: 3, ml: 2 }}
                    animation="wave"
                    aria-hidden="true"
                  />
                  <CardContent sx={{ flexGrow: 1, width: "25em" }}>
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={24}
                      sx={{ mb: 1 }}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={20}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Grid container sx={{ mt: 2 }}>
                      <Skeleton
                        variant="rectangular"
                        width={80}
                        height={24}
                        sx={{ mr: 1 }}
                        animation="wave"
                        aria-hidden="true"
                      />
                      <Skeleton
                        variant="rectangular"
                        width={80}
                        height={24}
                        sx={{ mr: 1 }}
                        animation="wave"
                        aria-hidden="true"
                      />
                    </Grid>
                  </CardContent>
                </LargeCourseCard>
              </Grid>
            ))
          ) : (
            [
              {
                link: `/course/seo-basic`,
                title: "SEO Basics",
                imageUrl:
                  "https://academy.opengrowth.com/assets/images/courses/thumb_s6seo.jpg",
                description:
                  "A step-by-step guide to developing a Search Engine Optimization strategy for your business to increase your online presence and attract traffic to your website by using keywords intelligently, leveraging paid and organic searches, and making your website mobile-friendly.",
                tags: [
                  "Finance",
                  "Marketing",
                  "Technology",
                  "Entrepreneurship",
                  "Innovation",
                ],
              },
              {
                link: "/course/ai-basic",
                title: "AI Basic",
                imageUrl:
                  "https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg",
                description:
                  "A step-by-step guide to incorporating your company, including why you need to incorporate your company, the documentation needed and do's and don'ts. Learn about different types of organizations and how they operate, including taxation and legal aspects.",
                tags: ["Marketing", "Business", "Technology"],
              },
              {
                link: "/course/identifying-your-target-audience",
                title: "Identifying Your Target Audience",
                imageUrl:
                  "https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg",
                description:
                  "This course covers the basics of business analytics, including data analysis techniques, predictive modeling, and data-driven decision making. Perfect for those looking to enhance their analytical skills.",
                tags: ["Analytics", "Data Science", "Business"],
              },
            ].map((course) => (
              <Grid item xs={12} key={course.title}>
                <Link
                  to={`/course/${course.title}`}
                  style={{ textDecoration: "none" }}
                  state={{
                    title: course.title,
                    imageUrl: course.imageUrl,
                    description: course.description,
                  }}
                >
                  <LargeCourseCard onClick={handleCardClick}>
                    <LargeCourseMedia
                      sx={{
                        backgroundImage: `url(${course.imageUrl})`,
                        mt: 3,
                        ml: 2,
                        height: 150,
                        width: 180,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, width: "25em" }}>
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                      >
                        {course.description}
                      </Typography>
                      <Grid container sx={{ mt: 2 }}>
                        {course.tags.map((tag) => (
                          <TagChip label={tag} key={tag} />
                        ))}
                      </Grid>
                    </CardContent>
                  </LargeCourseCard>
                </Link>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Footer Text */}
      {!loading && (
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 4 }}
        >
          You have seen it all
        </Typography>
      )}
    </Box>
  );
};

export default MyCourse;
