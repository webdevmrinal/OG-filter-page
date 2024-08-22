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

const StyledCard = styled(Card)(({ theme }) => ({
  height: "400px", // Set a fixed height for all cards
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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

const CategoryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: "bold",
  borderRadius: "4px",
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
  backgroundColor: "#2E3B55",
  color: "white",
  "&:hover": {
    backgroundColor: "#3A4A6A",
  },
});

const BlogCard = ({ image, title, author, authorImage, category }) => (
  <StyledCard>
    <StyledCardMedia image={image} title={title} />
    <StyledCardContent>
      <Box>
        <StyledTitle gutterBottom variant="h6" component="h2">
          {title}
        </StyledTitle>
        <AuthorBox>
          <Avatar
            src={authorImage}
            alt={author}
            sx={{ width: 32, height: 32, marginRight: 1 }}
          />
          <Typography variant="body2" color="text.secondary" noWrap>
            {author}
          </Typography>
        </AuthorBox>
      </Box>
      <Box sx={{ mt: 2 }}>
        <CategoryChip label={category} size="small" />
      </Box>
    </StyledCardContent>
  </StyledCard>
);

const TrendingBlogs = ({ blogs }) => {
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

  console.log(blogs);
  return (
    <Box sx={{ my: 6, overflow: "hidden" }}>
      {" "}
      {/* Add overflow: 'hidden' here */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          px: 2, // Add horizontal padding
        }}
      >
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Trending blogs by our experts
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Read blogs recommended by OpenGrowth Expert Community
          </Typography>
        </Box>
        <AllBlogsButton variant="contained">View All Blogs</AllBlogsButton>
      </Box>
      <SliderWrapper sx={{ position: "relative", px: 2 }}>
        {" "}
        {/* Use SliderWrapper and add horizontal padding */}
        <Slider ref={sliderRef} {...settings}>
          {blogs.map((blog, index) => (
            <Box key={index}>
              <BlogCard {...blog} />
            </Box>
          ))}
        </Slider>
        {blogs.length > getSlidesToShow() && (
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

export default TrendingBlogs;
