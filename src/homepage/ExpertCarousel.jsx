import React, { useRef, useState } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
} from "@mui/material";
import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { ExpertCard } from "../ExpertCard";

// Styled Button Components
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
  backgroundColor: "#25387c",
  color: "white",
  "&:hover": {
    backgroundColor: "#3A4A6A",
  },
});

const CategoryButton = styled(Button)(({ theme, active }) => ({
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

const ExpertCarousel = ({ experts }) => {
  const sliderRef = useRef(null);
  const sliderRefFinancial = useRef(null);
  const sliderRefFashion = useRef(null);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [selectedExpert, setSelectedExpert] = useState(null);

  const categories = [
    "Personal Branding",
    "Entrepreneurship",
    "Marketing",
    "Mentorship",
    "Demand Generation",
    "Legal Solutions",
    "Fundraising",
  ];

  const getSlidesToShow = () => {
    if (isLarge) return 6;
    if (isMedium) return 4;
    if (isSmall) return 1; // Show only one slide at a time on small screens
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

  const handleCategoryClick = (category) => {
    console.log(`Category clicked: ${category}`);
  };

  const handleViewAll = () => {
    navigate("/allExperts", { state: { experts } }); // Pass experts data as state
  };
  console.log(experts);

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
  };

  return (
    <>
      <Box sx={{ mt: 5, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", py: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 2, px: isSmall ? 1 : 3.6 }}>
          <Typography variant="h6" gutterBottom fontWeight={"bold"} textAlign={isSmall ? "center" : "left"}>
            Leverage our Expert Community: Hire Seasoned Executives
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" textAlign={isSmall ? "center" : "left"}>
            We have the right fit of global experts to complement your current team and solve your specific problems.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: isSmall ? "center" : "space-between",
            alignItems: "center",
            flexDirection: isSmall ? "column" : "row", // Stack buttons on small screens
            mb: 2,
            px: {xs: 0, sm: 3}
          }}
        >
          {/* Wrap the first two buttons together */}
          <Box sx={{ display: "flex", flexDirection: isSmall ? "row" : "row", gap: isSmall ? 1 : 2, }}>
            <OnDemandButton variant="outlined" sx={{ mr: isSmall ? 0 : 1 }}>
              On Demand Experts
            </OnDemandButton>

            <FractionalHireButton variant="outlined" sx={{ mt: isSmall ? 0 : 0 }}>
              Fractional Hire
            </FractionalHireButton>
          </Box>

          {/* Third button below the first two on small screens */}
          <JoinCommunityButton variant="contained" sx={{ mt: isSmall ? 2 : 0 }}>
            Join Our Expert Community
          </JoinCommunityButton>
        </Box>


        <Box sx={{ position: "relative", padding: isSmall ? 1 : 2 }}>
          <Box display={"flex"} flexDirection={isSmall ? "column" : "row"} alignItems={isSmall ? "center" : "flex-start"}>
            <Typography variant="h6" fontWeight={"bold"} px={isSmall ? 1 : 1.8} pb={0.5}>
              Top Experts
            </Typography>
            <Typography variant="subtitle1" color={"text.secondary"} mt={0.5} textAlign={isSmall ? "center" : "left"}>
              Access to the best has never been easier
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, width: "98%", ml: isSmall ? 0 : 1.5 }} />

          <Slider ref={sliderRef} {...settings}>
            {experts.map((expert, index) => (
              <ExpertCard expert={expert} handleExpertClick={handleExpertClick} context="carousel" />
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

      {/* financial expert section */}
      <Box sx={{ mt: 6, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", py: 3, borderRadius: 2, pt: "18px" }}>
        <Box>
        <Box display={"flex"} flexDirection={isSmall ? "column" : "row"} alignItems={isSmall ? "center" : "flex-start"}>
        <Typography variant="h6" fontWeight={"bold"} px={isSmall ? 1 : 1.8} pb={0.5}>
              Financial Experts
            </Typography>
            <Typography variant="subtitle1" color={"text.secondary"} mt={0.5} textAlign={isSmall ? "center" : "left"}>
              Connect with CEOs, executives, coaches, and more
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, width: "96%", ml: 3 }} />
        </Box>
        <Box sx={{ position: "relative", px: 2, pt: 1 }}>
          <Slider ref={sliderRefFinancial} {...settings}>
            {experts.map((expert, index) => (
              <ExpertCard expert={expert} handleExpertClick={handleExpertClick} context="carousel" />
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

      {/* How it works section */}
      <HowItWorks />

      {/* Fashion Experts section */}
      <Box sx={{ mt: 6, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", py: 3, borderRadius: 2, pt: "18px" }}>
        <Box>
        <Box display={"flex"} flexDirection={isSmall ? "column" : "row"} alignItems={isSmall ? "center" : "flex-start"}>
        <Typography variant="h6" fontWeight={"bold"} px={isSmall ? 1 : 1.8} pb={0.5}>
              Entrepreneurship
            </Typography>
            <Typography variant="subtitle1" color={"text.secondary"} mt={0.5} textAlign={isSmall ? "center" : "left"}>
              Empower Your Entrepreneurial Journey
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, width: "96%", ml: 3 }} />
        </Box>
        <Box sx={{ position: "relative", px: 2, pt: 1 }}>
          <Slider ref={sliderRefFashion} {...settings}>
            {experts.map((expert, index) => (
              <ExpertCard expert={expert} handleExpertClick={handleExpertClick} context="carousel" />
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
    </>
  );
};

const HowItWorksCard = ({ icon, title, description }) => (
  <Card
    sx={{
      width: 320,
      height: "auto",
      textAlign: "center",
      m: 1,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      p: 2,
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
      {icon}
    </Box>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Card>
);

const HowItWorks = () => (
  <Box sx={{ textAlign: "center", mt: 5 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
      How it works?
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
      <HowItWorksCard
        icon={<SearchIcon sx={{ fontSize: 50, color: "#25387c" }} />}
        title="Find an expert"
        description="Discover and choose from our list of the world's most in-demand experts."
      />
      <HowItWorksCard
        icon={<EventAvailableIcon sx={{ fontSize: 50, color: "#25387c" }} />}
        title="Book a video call"
        description="Select a time that works for both you and your expert's schedule."
      />
      <HowItWorksCard
        icon={<VideoCallIcon sx={{ fontSize: 50, color: "#25387c" }} />}
        title="Virtual consultation"
        description="Join the 1-on-1 video call, ask questions, and get expert advice."
      />
    </Box>
  </Box>
);

const ExpertCarouselCategoryButtons = ({
  categories,
  onCategoryClick,
  onViewAll,
  onPrev,
  onNext,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isSmall ? "center" : "space-between", // Center content on small screens
        alignItems: isSmall ? "flex-start" : "center", // Adjust alignment
        flexDirection: isSmall ? "column" : "row", // Stack on small screens
        mt: 2,
        mb: 2,
        px: {xs: 3, sm: 0},
        position: 'relative', // For scrollable content within the card
      }}
    >
      {/* Scrollable Chips Container */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: 2,
          ml: 2.5,
          maxWidth: isSmall ? '100%' : '70%', // Ensure max width on small screens
          overflowX: "auto", // Enable horizontal scrolling
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for WebKit browsers
          },
          // paddingLeft: "25px",
        }}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category}
            active={selectedCategory === category}
            variant="contained"
            size="small"
            sx={{ flexShrink: 0 }}
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </Box>

      {/* View All and Navigation Buttons */}
      {isSmall ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%", // Full width for small screens
            mt: 2,
            ml: 2 // Margin on top to separate from chips
          }}
        >
          <ViewAllButton onClick={onViewAll}>
            View All Experts
          </ViewAllButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 3, mx: 2,  }}>
          <ViewAllButton onClick={onViewAll} sx={{minWidth: '151px'}}>
            View All Experts
          </ViewAllButton>
          <NavigationButton onClick={onPrev}>
            <NavigateBeforeIcon />
          </NavigationButton>
          <NavigationButton onClick={onNext}>
            <NavigateNextIcon />
          </NavigationButton>
        </Box>
      )}
    </Box>
  );
};



export default ExpertCarousel;
