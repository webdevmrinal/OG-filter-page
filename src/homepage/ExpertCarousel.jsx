import React, { useRef, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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

const OnDemandButton = styled(StyledButton)({
  color: "#2E3B55",
  borderColor: "#2E3B55",
  "&:hover": {
    borderColor: "#2E3B55",
    backgroundColor: "rgba(46, 59, 85, 0.04)",
  },
});

const FractionalHireButton = styled(StyledButton)({
  color: "#F0A500",
  borderColor: "#F0A500",
  "&:hover": {
    borderColor: "#F0A500",
    backgroundColor: "rgba(240, 165, 0, 0.04)",
  },
});

const JoinCommunityButton = styled(StyledButton)({
  backgroundColor: "#2E3B55",
  color: "white",
  "&:hover": {
    backgroundColor: "#3A4A6A",
  },
});

const CategoryButton = styled(Button)(({ theme ,active}) => ({
    fontWeight: active ? "bold" : "normal",
    backgroundColor: active ? "#000000" : "#e0e0e0",
    color: active ? "white" : "#000000",
    boxShadow: active ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
    "&:hover": {
      backgroundColor: active ? "#333333" : "#d5d5d5",
    },
    whiteSpace: "nowrap",

  borderRadius: "1.5em",
  padding: "6px 16px",
  textTransform: "none",
  margin: "0 4px",
  
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  padding: "6px 16px",
  textTransform: "none",
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));


const ExpertCard = ({ name, industry, img }) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const getCardHeight = () => {
    if (isLarge || isSmall) return "250px";
    if (isMedium) return "200px";
    return "250px";
  };

  return (
    <Card
      sx={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.3em",
        maxWidth: "100%",
        transition: "0.3s",
        position: "relative",
        margin: "0 10px",
        height: getCardHeight(),
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        "&:hover": {
          backgroundColor: "#0000000a",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="100%"
        image={`https://academy.opengrowth.com/assets/images/users/${img}`}
        alt={name}
        sx={{ objectFit: "cover" }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background
          borderRadius: "4px",
          padding: "4px 8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.875rem", // smaller text size
            fontWeight: 'bold',
            color: "white",
            textAlign: "left",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.75rem", // even smaller text size
            color: "white",
            textAlign: "left",
          }}
        >
          {industry}
        </Typography>
      </Box>
    </Card>
  );
};

const ExpertCarousel = ({ experts }) => {
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const categories = [
    "Personal Branding",
    "Entrepreneurship",
    "Marketing",
    "Mentorship",
    "Demand Generation",
    "Legal Solutions",
    "Fundraising",
    "Brand Development",
    "HR Strategy",
    "Business Consulting",
    "Talent Acquisition",
  ];

  const getSlidesToShow = () => {
    if (isLarge) return 6;
    if (isMedium) return 4;
    if (isSmall) return 2;
    return 6;
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
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 2,
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

  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category}`);
  };

  const handleViewAll = () => {
    console.log("View all experts clicked");
  };

  console.log(experts);
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2,px: 3 }}>
        <Box>
          <OnDemandButton variant="outlined" sx={{ mr: 1 }}>
            On Demand Experts
          </OnDemandButton>
          <FractionalHireButton variant="outlined">
            Fractional Hire
          </FractionalHireButton>
        </Box>
        <JoinCommunityButton variant="contained">
          Join Our Expert Community
        </JoinCommunityButton>
      </Box>

      <Box sx={{ position: "relative", padding: 2 }}>
        <Slider ref={sliderRef} {...settings}>
          {experts.map((expert, index) => (
            <ExpertCard key={index} {...expert} />
          ))}
        </Slider>
      </Box>
      <ExpertCarouselCategoryButtons
        categories={categories}
        onCategoryClick={handleCategoryClick}
        onViewAll={handleViewAll}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </Box>
  );
};

const ExpertCarouselCategoryButtons = ({
  categories,
  onCategoryClick,
  onViewAll,
  onPrev,
  onNext,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap:2, paddingLeft: '25px' }}>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              active={selectedCategory === category}
              variant="contained"
              size="small"
              sx={{ flexShrink: 0 }}
              onClick={() => handleCategoryClick(category)}
              endIcon={selectedCategory === category ? <CloseIcon /> : null}
            >
              {category}
            </CategoryButton>
          ))}
        <ViewAllButton onClick={onViewAll}>View All Experts</ViewAllButton>
      </Box>
      <Box sx={{ display: "flex", gap: 3, mx: 2 }}>
        <NavigationButton onClick={onPrev}>
          <NavigateBeforeIcon />
        </NavigationButton>
        <NavigationButton onClick={onNext}>
          <NavigateNextIcon />
        </NavigationButton>
      </Box>
    </Box>
  );
};

export default ExpertCarousel;
