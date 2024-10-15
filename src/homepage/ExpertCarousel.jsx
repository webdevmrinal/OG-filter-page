// ExpertCarousel.jsx
import React, { useRef, useState, useMemo } from "react";
import {
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Grid, // Import Grid for layout
} from "@mui/material";
import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ExpertCard from "../ExpertCard"; // Ensure the correct path
import { manualExperts } from "./ManualExperts"; // Ensure the correct path
import FractionalExpertsBenefitsCard from "./FractionalExpertsBenefitsCard"; // Ensure the correct path
import GrowthServiceCard from "./GrowthServiceCard"; // Ensure the correct path

// Styled Button Components
const StyledButton = styled(Button)(({ theme, active }) => ({
  borderRadius: "20px",
  padding: "6px 16px",
  textTransform: "none",
  fontWeight: "bold",
  border: active ? "none" : `2px solid ${theme.palette.primary.main}`,
  boxShadow:
    active && theme.palette.mode === "light"
      ? "0px 2px 4px rgba(0, 0, 0, 0.1)"
      : "none",
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  color: active
    ? theme.palette.common.white
    : theme.palette.primary.main,
  "&:hover": {
    boxShadow:
      active && theme.palette.mode === "light"
        ? "0px 4px 8px rgba(0, 0, 0, 0.15)"
        : "none",
    backgroundColor: active
      ? theme.palette.primary.dark
      : theme.palette.grey[200],
    border: `2px solid ${theme.palette.primary.main}`,
    color: active
      ? theme.palette.common.white
      : theme.palette.primary.main,
  },
}));

const JoinCommunityButton = styled(StyledButton)({
  backgroundColor: "#25387c",
  color: "white",
  "&:hover": {
    backgroundColor: "#3A4A6A",
  },
});

const SliderWrapper = styled(Box)({
  "& .slick-list": {
    margin: "0 -8px",
  },
  "& .slick-slide": {
    padding: "16px 8px",
  },
});

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

const ExpertCarousel = ({ experts }) => {
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Manage selected category state
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Define categories including the new ones
  const categories = ["All", "Growth experts", "AI experts", "Fractional experts"];

  // Combine backend and manual experts
  // Only combine if category is not "All"
  const combinedExperts =
    selectedCategory !== "All" ? [...experts, ...manualExperts] : manualExperts;

  // Enhanced filtering logic based on industry
  const filteredExperts = useMemo(() => {
    let expertsToFilter = [];

    if (selectedCategory === "All") {
      // Use only manualExperts for "All" in carousel
      expertsToFilter = manualExperts;
    } else if (selectedCategory === "Fractional experts") {
      // Filter experts where industry includes specific fractional designations
      expertsToFilter = combinedExperts.filter((expert) =>
        /^fractional\s(Chro|Cmo|Cxo|Sales expert|CFO|CTO|CHRO|CXO)$/i.test(
          expert.industry
        )
      );
    } else if (selectedCategory === "AI experts") {
      // Filter experts with industry "AI expert"
      expertsToFilter = combinedExperts.filter(
        (expert) => expert.industry.toLowerCase() === "ai expert"
      );
    } else if (selectedCategory === "Growth experts") {
      // Filter experts with industry "Growth expert"
      expertsToFilter = combinedExperts.filter(
        (expert) => expert.industry.toLowerCase() === "growth expert"
      );
    }

    // Assign roles based on industry
    const expertsWithRoles = expertsToFilter.map((expert) => {
      let role = "";

      if (expert.industry.toLowerCase() === "ai expert") {
        role = "AI Expert";
      } else if (expert.industry.toLowerCase() === "growth expert") {
        role = "Growth Expert";
      } else if (
        /^fractional\s(Chro|Cmo|Cxo|Sales expert|CFO|CTO|CHRO|CXO)$/i.test(
          expert.industry
        )
      ) {
        role = expert.industry; // Use the specific designation
      }

      return { ...expert, role };
    });

    return expertsWithRoles;
  }, [selectedCategory, combinedExperts]);

  // Determine slidesToShow based on screen size
  const slidesToShow = useMemo(() => {
    if (isLarge) return 6;
    if (isMedium) return 4;
    if (isSmall) return 1;
    return 6;
  }, [isLarge, isMedium, isSmall]);

  // Determine if carousel should be infinite
  const isInfinite = filteredExperts.length > slidesToShow;

  // Pad the filteredExperts with nulls to always have slidesToShow items
  const displayedExperts = useMemo(() => {
    const paddingCount = slidesToShow - filteredExperts.length;
    if (paddingCount > 0) {
      return [...filteredExperts, ...Array(paddingCount).fill(null)];
    }
    return filteredExperts;
  }, [filteredExperts, slidesToShow]);

  // Define slider settings after filteredExperts is defined
  const settings = {
    dots: false,
    infinite: isInfinite,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: Math.min(4, slidesToShow),
          slidesToScroll: 1,
          infinite: filteredExperts.length > 4,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: filteredExperts.length > 1,
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
    setSelectedCategory(category);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // Reset slider to first slide
    }
  };

  const handleViewAll = () => {
    navigate("/allExperts", { state: { experts: manualExperts } });
    setSelectedCategory("All"); // Reset category when viewing all
  };

  const handleExpertClick = (expert) => {
    // Navigate to the expert's profile
    navigate(`/expert-profile/${expert.profile_url}`, { state: { expertEmail: expert.email } }); // Updated Navigation Path
  };

  return (
    <>
      {/* Top Experts Section */}
      <Box
        sx={{
          mt: 5,
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          py: 3,
          borderRadius: 2,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ mb: 2, px: isSmall ? 1 : 3.6 }}>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight={"bold"}
            fontSize="1.65rem"
            textAlign={isSmall ? "center" : "left"}
          >
            Hire seasoned growth experts without the full-time commitment
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            textAlign={isSmall ? "center" : "left"}
          >
            Connect with the best growth experts, growth associates, and AI
            technologies experts to grow and scale your startups at a fraction
            of the cost.
          </Typography>
        </Box>

        {/* Upper Buttons Acting as Category Filters with Scrollbar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmall ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isSmall ? "flex-start" : "center",
            mb: 2,
            gap: 3,
            px: { xs: 0, sm: 3 },
          }}
        >
          {/* Scrollable Category Buttons */}
          <Box
            sx={{
              display: "flex",
              flexWrap: isSmall ? "wrap" : "nowrap",
              flexDirection: "row",
              gap: isSmall ? 1 : 2,
              overflowX: isSmall ? "visible" : "auto",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
              pb: { xs: 2, sm: 0 },
              px: {xs: 2, sm: 0}, // Optional: Padding to prevent content from being hidden behind scrollbar
              width: isSmall ? "100%" : "auto", // Ensure full width on mobile
            }}
          >
            {/* **Updated Category Buttons Layout Using Grid on Mobile** */}
            {isSmall ? (
              <Grid container spacing={1} sx={{ width: "100%" }}>
                {categories.map((category) => (
                  <Grid item xs={6} key={category}>
                    <StyledButton
                      variant="outlined"
                      active={selectedCategory === category}
                      onClick={() => handleCategoryClick(category)}
                      fullWidth
                    >
                      {category}
                    </StyledButton>
                  </Grid>
                ))}
              </Grid>
            ) : (
              categories.map((category) => (
                <Box
                  key={category}
                  sx={{
                    flex: "0 0 auto",
                  }}
                >
                  <StyledButton
                    variant="outlined"
                    active={selectedCategory === category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </StyledButton>
                </Box>
              ))
            )}
          </Box>

          {/* **Action Buttons for Non-Small Screens (Remains Above Slider)** */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Connect with our team Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                padding: "6px 16px",
                fontSize: "0.875rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={() => navigate("/connect-with-team")}
            >
              Connect with our team
            </Button>

            {/* View All Experts Button */}
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                padding: "6px 16px",
                fontSize: "0.875rem",
                fontWeight: "bold",
                textTransform: "none",
                borderColor: theme.palette.primary.main,
                color: "white",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark, // Optional: Add hover effect
                  borderColor: theme.palette.primary.dark,
                },
              }}
              onClick={handleViewAll}
            >
              View all experts
            </Button>
          </Box>
        </Box>

        {/* Top Experts Slider */}
        <SliderWrapper sx={{ position: "relative", px: 2 }}>
          <Slider ref={sliderRef} {...settings}>
            {displayedExperts.length > 0 ? (
              displayedExperts.map((expert, index) =>
                expert ? (
                  <ExpertCard
                    key={expert.profile_url}
                    expert={expert}
                    handleExpertClick={handleExpertClick}
                    context="carousel"
                    role={expert.role} // Pass the assigned role
                    loading={false}
                  />
                ) : (
                  // Render an empty Box for padding
                  <Box
                    key={`empty-${index}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                )
              )
            ) : (
              <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No experts found in this category.
                </Typography>
              </Box>
            )}
          </Slider>
          {filteredExperts.length > slidesToShow && (
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

        {/* **Action Buttons for Small Screens (Moved Below Slider)** */}
        {isSmall && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: 2,
              px: 2,
            }}
          >
            {/* Connect with our team Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                padding: "6px 16px",
                fontSize: "0.875rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={() => navigate("/connect-with-team")}
            >
              Connect with our team
            </Button>

            {/* View All Experts Button */}
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                padding: "6px 16px",
                fontSize: "0.875rem",
                fontWeight: "bold",
                textTransform: "none",
                borderColor: theme.palette.primary.main,
                color: "white",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark, // Optional: Add hover effect
                  borderColor: theme.palette.primary.dark,
                },
              }}
              onClick={handleViewAll}
            >
              View all experts
            </Button>
          </Box>
        )}
      </Box>

      {/* Growth Expert/Associates Card */}
      <GrowthServiceCard context={"carousel"} />

      {/* Fractional Experts Benefits Card */}
      <FractionalExpertsBenefitsCard />
    </>
  );
};

export default ExpertCarousel;
