import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tabs,
  Card, CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  useMediaQuery,
  useTheme,
  Chip
} from "@mui/material";
import { styled } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import SendIcon from "@mui/icons-material/Send";
import WorkIcon from "@mui/icons-material/Work";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { keyframes } from '@mui/system';
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";
import SelectTime from "./SelectTime";

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const ShimmerBox = styled(Box)(({ theme }) => ({
  animation: `${shimmerAnimation} 2s infinite linear`,
  background: 'linear-gradient(to right, #eff1f3 8%, #e2e2e2 18%, #eff1f3 33%)',
  backgroundSize: '1000px 100%',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2)
}));

const ShimmerLine = styled(Box)({
  height: '20px',
  marginBottom: '8px',
  backgroundColor: '#f0f0f0'
});

const ProfileShimmer = () => (
  <ShimmerBox sx={{ width: 1, height: 200, mb: 2 }}>
    <ShimmerBox sx={{ width: 120, height: 120, borderRadius: '50%', margin: 2 }} />
    <ShimmerLine sx={{ width: '80%', height: 24 }} />
    <ShimmerLine sx={{ width: '60%', height: 16 }} />
  </ShimmerBox>
);

const GradientBox = styled(Box)({
  // background: "linear-gradient(to right, #5e6fa3, #4ea3a0)",
  background: "linear-gradient(to top, #505f96, #25387c)",
  height: "200px",
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  padding: "24px",
});

const ProfileAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  border: "4px solid white",
});

const TabsContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #e0e0e0",
});

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    justifyContent: "center", // Center the buttons on small screens
    gap: theme.spacing(0.5), // Reduce gap between buttons
    flexWrap: "wrap", // Wrap buttons if space is insufficient
  },
}));
const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5), // Reduce padding
    fontSize: "0.7rem", // Smaller font size for text in buttons
    minWidth: '64px', // Minimum width to ensure tap target size
  },
}));


const SkillsCard = ({ skills }) => {
  console.log(skills);
  
  const skillsArray = typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : [];
  console.log(skillsArray);
  

  return (
    <Card sx={{ mb: 3, boxShadow: "0 8px 16px rgba(0,0,0,0.2)", borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6">
          Skills
        </Typography>
        <Divider sx={{mb: 2}}/>
        <Grid container spacing={2}>
          {skillsArray.map((skill, index) => (
            <Grid item key={index}>
              <Chip 
                label={skill} 
                variant="outlined"  
                sx={{ }}
              />
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
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const expertEmail = location.state?.expertEmail;
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState('panel0');
  const [isFollowing, setIsFollowing] = useState(false); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
        setLoading(false);
      }
    };

    if (expertEmail) {
      fetchProfileData();
    }
  }, [expertEmail]);

  if (loading) {
    return <ProfileShimmer />;
  }

  if (!profileData) return null;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);  // Toggle follow status on click
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    console.log(event.target);
    
    setExpanded(isExpanded ? panel : false);
  };

  if (!profileData) return null;

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
    <Box sx={{width: { xs: '132vw', sm: 'inherit' }}}>
      <Box
        bgcolor={"#fff"}
        borderRadius={1.5}
        overflow={"hidden"}
       
      >
        <GradientBox position={"relative"}>
          <Box
            display="flex"
            alignItems="center"
            position={"absolute"}
            bottom={"-46%"}
            sx={{ translate: "0 -50%",  }}
          >
            <ProfileAvatar
              src={`https://academy.opengrowth.com/assets/images/users/${profileData.img}`}
              alt={profileData.name}
            />
            <Box ml={2} mb={1}>
            <Link to={`/profile/${profileData.profile_url}`} state={{ expertEmail: profileData.email }} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Typography variant="h5" fontWeight="bold" color="white">
      {profileData.name}
    </Typography>
  </Link>
              <Typography variant="h6" color="white">
                {profileData.experience}
              </Typography>
            </Box>
          </Box>
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
              variant="outlined"
              color="primary"
              onClick={handleFollowClick}
              sx={{ mr: 1 }}
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
              onClick={() => setExpanded('panel0')}
              sx={{ mr: 2 }}
            >
              Request a Time
            </StyledButton>
          </ButtonContainer>

        </TabsContainer>
      </Box>

      <Accordion expanded={expanded === 'panel0'} onChange={handleAccordionChange('panel0')} sx={{boxShadow: "0 1px 1px rgba(0,0,0,0.15)",}}>
        <AccordionDetails >
          <SelectTime
            setShowGetTime={setExpanded}
            professorName={profileData.name}
          />
        </AccordionDetails>
      </Accordion>
      <Box sx={{px: 4.2}}>
      <SkillsCard skills={profileData.interest} />
      </Box>
      <Grid container spacing={3} sx={{ my: 3, pl: 4, pr: 4 }}>
        {/* Left side - About section */}
        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper
            sx={{
              flex: 1,
              borderRadius: 2,
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              display: 'flex',
              flexDirection: 'column',
              height: '100%' // Ensure it takes full height
            }}
          >
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
          </Paper>
        </Grid>

        {/* Right side - Accordion section */}
        <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              overflow: "hidden",
              bgcolor: "transparent",
              border: "none",
              borderRadius: '8px',
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              display: 'flex',
              flexDirection: 'column',
              height: '100%' // Ensure it takes full height
            }}
          >
            {accordionData.map((item, index) => (
              <Accordion key={index} expanded={expanded === `panel${index + 1}`} onChange={handleAccordionChange(`panel${index + 1}`)} sx={{ boxShadow: 'none', flexGrow: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ minHeight: '26.3px' }}>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ whiteSpace: 'pre-line' }} color="text.secondary">
                    {item.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
</Grid>


    </Box>
  );
};

export default ProfilePage;
