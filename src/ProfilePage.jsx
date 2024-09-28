// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tabs,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import SendIcon from "@mui/icons-material/Send";
import WorkIcon from "@mui/icons-material/Work";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";
import SelectTime from "./SelectTime";
import {
  GradientBox,
  ButtonContainer,
  StyledButton,
  TabsContainer,
  ProfileAvatar,
  GradientContent,
  PaperContent,
} from "./Experts/Components/ProfileStyles";
import Header from "./signup-login/Header";
import { styled } from "@mui/system";

// Shimmer Components
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
  // Updated gradient to be darker
  background: `linear-gradient(to right, ${theme.palette.background.default} 0%, #bdbdbd 50%, ${theme.palette.background.default} 100%)`,
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

const Shimmer = ({ width = "100%", height = 100, borderRadius = 8, sx = {} }) => (
  <ShimmerWrapper style={{ width, height, borderRadius }} sx={sx}>
    <ShimmerEffect />
  </ShimmerWrapper>
);

// New Shimmer Overlay for GradientBox
const ShimmerOverlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: 8,
  overflow: "hidden",
  backgroundColor: "#f6f7f8",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  padding: "16px",
});

const SkillsCard = ({ skills, isLoading }) => {
  const skillsArray =
    typeof skills === "string"
      ? skills.split(",").map((skill) => skill.trim())
      : [];

  if (isLoading) {
    return (
      <Card
        sx={{ mb: 3, boxShadow: "0 8px 16px rgba(0,0,0,0.2)", borderRadius: 2 }}
      >
        <CardContent>
          <Shimmer width="30%" height={24} sx={{ mb: 2 }} />
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {Array.from(new Array(5)).map((_, index) => (
              <Grid item key={index}>
                <Shimmer width={60} height={32} borderRadius={16} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{ mb: 3, boxShadow: "0 8px 16px rgba(0,0,0,0.2)", borderRadius: 2 }}
    >
      <CardContent>
        <Typography variant="h6">Skills</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {skillsArray.map((skill, index) => (
            <Grid item key={index}>
              <Chip label={skill} variant="outlined" sx={{}} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const ProfilePage = () => {
  const { expertName } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const expertEmail = location.state?.expertEmail;
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState("panel0");
  const [isFollowing, setIsFollowing] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isOutsideLayout = location.pathname.startsWith("/expert-profile"); // Determine profile type

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "https://academy.opengrowth.com/api/get_user",
          {
            email: expertEmail,
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (expertEmail) {
      fetchProfileData();
    }
  }, [expertEmail]);

  // Check if the profile is already followed
  useEffect(() => {
    if (profileData) {
      const followedProfiles =
        JSON.parse(localStorage.getItem("followedProfiles")) || [];
      const isProfileFollowed = followedProfiles.some(
        (profile) => profile.email === profileData.email
      );
      setIsFollowing(isProfileFollowed);
    }
  }, [profileData]);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);

    let followedProfiles =
      JSON.parse(localStorage.getItem("followedProfiles")) || [];

    if (!isFollowing) {
      // Add the current profile to the list of followed profiles
      followedProfiles.push(profileData);
    } else {
      // Remove the current profile from the list
      followedProfiles = followedProfiles.filter(
        (profile) => profile.email !== profileData.email
      );
    }

    localStorage.setItem("followedProfiles", JSON.stringify(followedProfiles));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionData = [
    { title: "About me", content: profileData?.about },
    { title: "Address", content: `Country: ${profileData?.country}` },
    {
      title: "Education",
      content: `Degree: ${profileData?.edu}\nCollege: ${profileData?.other_college}`,
    },
    { title: "Area of Interest", content: profileData?.interest },
    { title: "Industry", content: profileData?.industry },
    { title: "Experience", content: profileData?.experience },
  ];

  return (
    <>
      {isOutsideLayout && <Header />}
      <Box sx={{ width: { xs: "100%", sm: "inherit" }, position: "relative" }}>
        <Box bgcolor={"#fff"} borderRadius={1.5} overflow={"hidden"}>
          <GradientBox position={"relative"}>
            {isLoading && (
              <ShimmerOverlay>
                {/* Shimmer for Avatar */}
                <Shimmer width={80} height={80} borderRadius="50%" />
                {/* Shimmer for Name and Experience */}
                <Box ml={2} mb={1} sx={{ width: "60%" }}>
                  <Shimmer width="40%" height={24} sx={{ mb: 1 }} />
                  <Shimmer width="30%" height={20} />
                </Box>
              </ShimmerOverlay>
            )}
            <GradientContent>
              {isLoading ? null : (
                <>
                  <ProfileAvatar
                    src={`https://academy.opengrowth.com/assets/images/users/${profileData.img}`}
                    alt={profileData.name}
                  />
                  <Box ml={2} mb={1}>
                    <Link
                      to={`/profile/${profileData.profile_url}`}
                      state={{ expertEmail: profileData.email }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography variant="h5" fontWeight="bold" color="white">
                        {profileData.name}
                      </Typography>
                    </Link>
                    <Typography variant="h6" color="white">
                      {profileData.experience}
                    </Typography>
                  </Box>
                </>
              )}
            </GradientContent>
          </GradientBox>
          <TabsContainer>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
            ></Tabs>
            <ButtonContainer>
              {/* Conditionally render Follow and Message buttons */}
              {!isOutsideLayout && (
                isLoading ? (
                  <Box display="flex" gap={1}>
                    <Shimmer width={120} height={36} borderRadius={18} />
                    <Shimmer width={120} height={36} borderRadius={18} />
                  </Box>
                ) : (
                  <>
                    <StyledButton
                      startIcon={<PersonAddIcon />}
                      variant={isFollowing ? "contained" : "outlined"}
                      color={isFollowing ? "success" : "primary"}
                      onClick={handleFollowClick}
                      sx={{
                        mr: 1,
                        ...(isFollowing && {
                          backgroundColor: theme.palette.success.light,
                          borderColor: theme.palette.success.light,
                          "&:hover": {
                            backgroundColor: theme.palette.success.main,
                          },
                        }),
                      }}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </StyledButton>
                    <StyledButton
                      startIcon={<SendIcon />}
                      variant="outlined"
                      sx={{ mr: 1 }}
                    >
                      Message
                    </StyledButton>
                  </>
                )
              )}
              {isLoading ? (
                <Shimmer width={160} height={36} borderRadius={18} />
              ) : (
                <StyledButton
                  startIcon={<EventNoteIcon />}
                  variant="outlined"
                  onClick={() => setExpanded("panel0")}
                  sx={{ mr: 2 }}
                >
                  Request a Time
                </StyledButton>
              )}
            </ButtonContainer>
          </TabsContainer>
        </Box>

        <Accordion
          expanded={expanded === "panel0"}
          onChange={handleAccordionChange("panel0")}
          sx={{ boxShadow: "0 1px 1px rgba(0,0,0,0)" }}
        >
          <AccordionDetails>
            {isLoading ? (
              <Box>
                <Shimmer width="100%" height={200} />
              </Box>
            ) : (
              <SelectTime
                setShowGetTime={setExpanded}
                professorName={profileData.name}
                profileType={isOutsideLayout ? "outer" : "inner"} // Pass profileType
                expertImage={profileData.img}
              />
            )}
          </AccordionDetails>
        </Accordion>
        <Box sx={{ px: 4.2 }}>
          <SkillsCard skills={profileData?.interest} isLoading={isLoading} />
        </Box>
        <Grid container spacing={3} sx={{ my: 3, pl: 4, pr: 4 }}>
          {/* Left side - About section */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <PaperContent>
              <Typography px={3} pt={0.5} variant="h6" gutterBottom>
                About
              </Typography>
              <Divider />
              <List dense sx={{ padding: "0 .75em", my: 2, flexGrow: 1 }}>
                {isLoading ? (
                  Array.from(new Array(6)).map((_, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Shimmer width={24} height={24} borderRadius={12} />
                      </ListItemIcon>
                      <ListItemText>
                        <Shimmer width="80%" height={20} />
                      </ListItemText>
                    </ListItem>
                  ))
                ) : (
                  <>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Lives in ${profileData.country}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Completed ${profileData.edu}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <BusinessIcon />
                      </ListItemIcon>
                      <ListItemText primary={profileData.other_college} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText primary={profileData.interest} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={profileData.industry} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Has ${profileData.experience} experience in ${profileData.industry}`}
                      />
                    </ListItem>
                  </>
                )}
              </List>
            </PaperContent>
          </Grid>

          {/* Right side - Accordion section */}
          <Grid
            item
            xs={12}
            sm={8}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <PaperContent
              elevation={0}
              sx={{
                overflow: "hidden",
                bgcolor: "transparent",
                border: "none",
              }}
            >
              {accordionData.map((item, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index + 1}`}
                  onChange={handleAccordionChange(`panel${index + 1}`)}
                  sx={{ boxShadow: "none", flexGrow: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {isLoading ? (
                      <Shimmer width="40%" height={20} />
                    ) : (
                      <Typography sx={{ minHeight: "26.3px" }}>
                        {item.title}
                      </Typography>
                    )}
                  </AccordionSummary>
                  <AccordionDetails>
                    {isLoading ? (
                      <Shimmer width="80%" height={16} />
                    ) : (
                      <Typography
                        sx={{ whiteSpace: "pre-line" }}
                        color="text.secondary"
                      >
                        {item.content}
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </PaperContent>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfilePage;
