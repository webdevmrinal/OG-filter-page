import React, { useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  Grid,
  Divider
} from "@mui/material";
import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';

const CourseImage = styled('div')(({ theme }) => ({
  width: '100%',
  height: 175,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  backgroundColor: '#e0e0e0',
}));

const OverlayText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  color: '#fff',
  fontWeight: 'bold',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  marginRight: '5em'
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: "20px",
  padding: "6px 16px",
  textTransform: "none",
  fontWeight: "bold",
  boxShadow:
    variant === "contained" ? "0px 2px 4px rgba(0, 0, 0, 0.1)" : "none",
  "&:hover": {
    boxShadow:
      variant === "contained" ? "0px 4px 8px rgba(0, 0, 0, 0.15)" : "none",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  position: "relative",
  height: "200px",
  width: "100%",
});

const TitleOverlay = styled(Typography)({
  position: "absolute",
  top: "0",
  left: "0",
  margin: "8px",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.6)", // Ensure contrast and readability
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "1rem",
  maxWidth: "90%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  zIndex: 2,
  opacity: 1,
  visibility: "visible",
});
const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "16px",
});

const StyledTitle = styled(Typography)({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const SliderWrapper = styled(Box)({
  "& .slick-list": {
    margin: "0 -8px",
  },
  "& .slick-slide": {
    padding: "16px 8px",
  },
});

const AuthorBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "8px",
});

const CategoryChip = styled(Chip)(({ theme, active }) => ({
  fontWeight: "normal",
  backgroundColor: "#e0e0e0",
  color: active ? "white" : "#000000",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
  whiteSpace: "nowrap",

  borderRadius: "1.5em",
  padding: "6px 16px",
  textTransform: "none",
  margin: "0 4px",
  cursor: 'pointer'
}));

const CourseChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  bottom: 10,
  left: 10,
  backgroundColor: '#f9bb02',
  color: theme.palette.common.white,
  fontWeight: 'bold',
  fontSize: '0.75rem', // Smaller font size
  padding: '4px 8px', // Smaller padding
  height: 'auto', // Adjust height
}));

const NavigationButton = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  padding: 0,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const AllBlogsButton = styled(StyledButton)({
  backgroundColor: "#25387c",
  color: "white",
  "&:hover": {
    backgroundColor: "#3A4A6A",
  },
});



const BlogCard = ({ title, category, description, image, avatar, date, comments, views }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card sx={{
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2, height: '21.5em', display: 'flex', flexDirection: 'column',
      '&:hover': {
        transform: "translateY(-3px)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        backgroundColor: '#0000000a',
      },
    }}>
      <CourseImage
        sx={{
          backgroundImage: `url(${image || 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'})`,
        }}
      >
        <OverlayText variant="subtitle2">{title}</OverlayText>
        <CourseChip label={category} size="small" />
      </CourseImage>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, mt: 2 }}>
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5 }} />
              {date}
            </Typography>
            <Typography variant="body2" sx={{ maxHeight: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {avatar.map((src, i) => (
              <Avatar key={i} src={src} sx={{ width: 35, height: 35, ml: i === 0 ? 0 : -1 }} />
            ))}
          </Box>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <CommentIcon sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{comments}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
            <VisibilityIcon sx={{ fontSize: 18, ml: 1, mr: 0.5 }} />
            <Typography variant="body2">{views}</Typography>
          </Box>

        </Box>
      </CardContent>
    </Card>
  </Grid>
);

const Courses = ({ course }) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const getSlidesToShow = () => {
    if (!isSmall) return 4; // Default for larger screens
    return 1; // Show one card at a time on small screens
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1, // Single card view for smaller screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handleViewAllCourses = () => {
    navigate("/all-courses", { state: { course } });
  };

  return (
    <Box sx={{ my: 6, overflow: "hidden", px: 2.5, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", py: 2.5, borderRadius: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2, px: 2 }}>
        <Box>
          <Typography variant="h5" gutterBottom fontWeight={"bold"} fontSize={'1.65rem'}>
          Upskill from courses handpicked by our experts
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Join the OpenGrowth Courses for experiential learning and growth
          </Typography>
        </Box>

        {/* Chips and "View All Courses" button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isSmall ? "center" : "space-between", // Adjust for small screens
            alignItems: isSmall ? "center" : "center",
            flexWrap: "wrap",
            gap: isSmall ? 1 : 0, // Add gap between elements on small screens
            mt: isSmall ? 2 : 0,
          }}
        >
          {/* Scrollable Chips */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              overflowX: "auto", // Enables horizontal scrolling
              scrollbarWidth: "none", // Hide scrollbar for Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Hide scrollbar for Chrome, Safari, etc.
              },
            }}
          >
            <Typography variant="h6">Courses</Typography>
            <CategoryChip label="Leadership" variant="contained" />
            <CategoryChip label="Product" variant="contained" />
            <CategoryChip label="Marketing" variant="contained" />
            <CategoryChip label="Strategy" variant="contained" />
          </Box>

          {/* "View All Courses" button for large screens */}
          {!isSmall && (
            <AllBlogsButton onClick={handleViewAllCourses}>
              View all courses
            </AllBlogsButton>
          )}
        </Box>
      </Box>

      <SliderWrapper sx={{ position: "relative", px: 2 }}>
        <Slider ref={sliderRef} {...settings}>
          {course.map((blog, index) => (
            <Box
              key={index}
              sx={{
                transition: "0.3s",
                "&:hover": { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" },
              }}
            >
              <BlogCard {...blog} />
            </Box>
          ))}
        </Slider>

        {course.length > getSlidesToShow() && (
          <>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            >
              <NavigationButton onClick={handlePrev}>
                <ArrowBackIosNewIcon />
              </NavigationButton>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            >
              <NavigationButton onClick={handleNext}>
                <ArrowForwardIosIcon />
              </NavigationButton>
            </Box>
          </>
        )}
      </SliderWrapper>

      {/* "View All Courses" button for small screens */}
      {isSmall && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <AllBlogsButton onClick={handleViewAllCourses}>
            View All Courses
          </AllBlogsButton>
        </Box>
      )}
    </Box>

  );
};

export default Courses;
