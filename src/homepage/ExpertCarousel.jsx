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

// HowItWorksCard Component
const HowItWorksCard = ({ icon, title, description }) => (
  <Card
    sx={{
      width: 320, // set the width to create square cards
      height: 280, // set the height to create square cards
      textAlign: "center",
      m: 1, // add margin around each card
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
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
// HowItWorks Component
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
        // filter: "grayscale(100%)",  //remove these commenet for hover effect
        "&:hover": {
          //   filter: "grayscale(0%)",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
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
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "0px 4px 0px 0px",
          padding: "4px 8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.875rem",
            fontWeight: "bold",
            color: "white",
            textAlign: "left",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.75rem",
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
  const sliderRefFinancial = useRef(null);
  const sliderRefFashion = useRef(null);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

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
    navigate("/allExperts", { state: { experts } }); // Pass experts data as state
  };
  console.log(experts);
  

  return (
    <>
    <Box sx={{ mt: 5, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", py: 3, borderRadius: 2 }}>
      <Box sx={{ mb: 2, px: 3.6 }}>
        <Typography variant="h6" gutterBottom fontWeight={"bold"}>
          Leverage our Expert Community: Hire Seasoned Executives
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          We have the right fit of global experts to complement your current team and solve your specific problems.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, px: 3 }}>
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
        <Box>
          <Box display={"flex"}>
            <Typography variant="h6" fontWeight={"bold"} px={1.8} pb={0.5}>
              Top Experts
            </Typography>
            <Typography variant="subtitle1" color={"text.secondary"} mt={0.5}>
              Access to the best has never been easier
            </Typography>
          </Box>
          <Divider sx={{ mb: 2, width: "98%", ml: 1.5 }} />
        </Box>

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
      {/* financial expert section */}
      <Box sx={{ mt: 6, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", py: 3, borderRadius: 2,pt: '18px' }}>
      <Box >
        <Box display={"flex"}>
          <Typography variant="h6" fontWeight={"bold"} pl={4} pr={2} pb={0.5}>
            Financial Experts
          </Typography>
          <Typography variant="subtitle1" color={"text.secondary"} mt={0.5}>
            Connect with CEOs, executives, coaches, and more
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, width: "96%", ml: 3 }} />
      </Box>
      <Box sx={{ position: "relative", px: 2, pt: 1 }}>
        <Slider ref={sliderRefFinancial} {...settings}>
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

      {/* How it works section */}
     
      <HowItWorks />

      {/* Fashion Experts section */}
      <Box sx={{ mt: 6, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", py: 3, borderRadius: 2,pt: '18px' }}>
      <Box >
        <Box display={"flex"}>
          <Typography variant="h6" fontWeight={"bold"} pl={4} pr={2} pb={0.5}>
            Enterpreneurship
          </Typography>
          <Typography variant="subtitle1" color={"text.secondary"} mt={0.5}>
          Empower Your Entrepreneurial Journey
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, width: "96%", ml: 3 }} />
      </Box>
      <Box sx={{ position: "relative", px: 2, pt: 1 }}>
        <Slider ref={sliderRefFashion} {...settings}>
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

    <Box sx={{ mt: 6, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", py: 3, borderRadius: 2,pt: '18px' }}>
      <Box >
        <Box display={"flex"}>
          <Typography variant="h6" fontWeight={"bold"} pl={4} pr={2} pb={0.5}>
            Legal Solutions
          </Typography>
          <Typography variant="subtitle1" color={"text.secondary"} mt={0.5}>
          Gain Insight and Confidence with Expert Legal Advice
          </Typography>
        </Box>
        <Divider sx={{ mb: 2, width: "96%", ml: 3 }} />
      </Box>
      <Box sx={{ position: "relative", px: 2, pt: 1 }}>
        <Slider ref={sliderRefFashion} {...settings}>
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
    </>
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, paddingLeft: "25px" }}>
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
