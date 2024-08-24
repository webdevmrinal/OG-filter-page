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
} from "@mui/material";
import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const StyledCard = styled(Card)(({ theme }) => ({
  height: "350px", // Set a fixed height for all cards
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    transform: "translateY(-2px)",
  },
  borderRadius: "8px",
  overflow: "hidden",
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
  height: "200px", // Fixed height for the image
  width: "100%",
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

const BlogCard = ({ title, category, description, image, avatar, date }) => (
  <StyledCard>
    <StyledCardMedia image={image} title={title} />
    <StyledCardContent>
      <Box>
        <StyledTitle variant="subtitle1" fontWeight={'bold'}>
          {title}
        </StyledTitle>
      </Box>
      <Box>
              <Typography variant="body2" sx={{ maxHeight: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {description}
              </Typography>
            </Box>
      <Box sx={{ mt: 2 }}>
        <CategoryChip label={category} size="small" />
      </Box>
    </StyledCardContent>
  </StyledCard>
);

const Communities = ({ course }) => {
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const getSlidesToShow = () => {
    if (isLarge) return 4;
    if (isMedium) return 3;
    if (isSmall) return 1;
    return 4;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
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

  return (
    <Box sx={{ my: 6, overflow: "hidden", px: 2.5, boxShadow: "0 4px 6px rgba(0,0,0,0.2)",py: 2.5, borderRadius: 2 }}>
      {" "}
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2, px: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          px:0,
          
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom fontWeight={'bold'}>
          Popular OpenGrowth Communities
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary">
          Start your own community at OpenGrowth to unlock collaboration, learning, and growth.
          </Typography>
        </Box>
        <AllBlogsButton variant="contained">View All Blogs</AllBlogsButton>
      </Box>
    </Box>
      
      <SliderWrapper sx={{ position: "relative", px: 2 }}>
        {" "}
        {/* Use SliderWrapper and add horizontal padding */}
        <Slider ref={sliderRef} {...settings}>
          {course.map((blog, index) => (
            <Box
              key={index}
              sx={{
                transition:"0.3s",
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
    </Box>
  );
};

export default Communities;
