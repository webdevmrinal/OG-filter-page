import React, { useRef } from "react";
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

const CategoryButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  padding: "6px 16px",
  textTransform: "none",
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  margin: "0 4px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
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
        maxWidth: "100%",
        transition: "0.3s",
        // filter: "grayscale(100%)",  //remove these commenet for hover effect
        // "&:hover": {
        //   filter: "grayscale(0%)",
        // },
        position: "relative",
        margin: "0 10px",
        height: getCardHeight(),
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
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 2,
          opacity: 0,
          transition: "opacity 0.3s", //remove these comment for hover effect
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "white", textAlign: "left" }}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "white", textAlign: "left" }}>
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap:2 }}>
        {categories.map((category, index) => (
          <CategoryButton key={index} onClick={() => onCategoryClick(category)}>
            {category}
          </CategoryButton>
        ))}
        <ViewAllButton onClick={onViewAll}>View All Experts</ViewAllButton>
      </Box>
      <Box sx={{display:"flex", gap:3, mx:2}}>
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
