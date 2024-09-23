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
import { ShimmerLoading } from "./signup-login/Components/ShimmerEffect";
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

const SkillsCard = ({ skills }) => {
  const skillsArray =
    typeof skills === "string"
      ? skills.split(",").map((skill) => skill.trim())
      : [];

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

  if (isLoading || !profileData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <ShimmerLoading />
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionData = [
    { title: "About me", content: profileData.about },
    { title: "Address", content: `Country: ${profileData.country}` },
    {
      title: "Education",
      content: `Degree: ${profileData.edu}\nCollege: ${profileData.other_college}`,
    },
    { title: "Area of Interest", content: profileData.interest },
    { title: "Industry", content: profileData.industry },
    { title: "Experience", content: profileData.experience },
  ];

  return (
    <>
      {isOutsideLayout && <Header />}
      <Box sx={{ width: { xs: "132vw", sm: "inherit" } }}>
        <Box bgcolor={"#fff"} borderRadius={1.5} overflow={"hidden"}>
          <GradientBox position={"relative"}>
            <GradientContent>
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
            </GradientContent>
          </GradientBox>
          <TabsContainer>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
            ></Tabs>
            <ButtonContainer>
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
              <StyledButton
                startIcon={<EventNoteIcon />}
                variant="outlined"
                onClick={() => setExpanded("panel0")}
                sx={{ mr: 2 }}
              >
                Request a Time
              </StyledButton>
            </ButtonContainer>
          </TabsContainer>
        </Box>

        <Accordion
          expanded={expanded === "panel0"}
          onChange={handleAccordionChange("panel0")}
          sx={{ boxShadow: "0 1px 1px rgba(0,0,0,0)" }}
        >
          <AccordionDetails>
            <SelectTime
              setShowGetTime={setExpanded}
              professorName={profileData.name}
              profileType={isOutsideLayout ? "outer" : "inner"} // Pass profileType
            />
          </AccordionDetails>
        </Accordion>
        <Box sx={{ px: 4.2 }}>
          <SkillsCard skills={profileData.interest} />
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
                    <Typography sx={{ minHeight: "26.3px" }}>
                      {item.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{ whiteSpace: "pre-line" }}
                      color="text.secondary"
                    >
                      {item.content}
                    </Typography>
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
