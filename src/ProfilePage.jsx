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
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import GetTime from "./GetTime";

const GradientBox = styled(Box)({
  background: "linear-gradient(to right, #5e6fa3, #4ea3a0)",
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
  justifyContent: "flex-end",
  borderBottom: "1px solid #e0e0e0",
});

const ProfilePage = () => {
  const { expertName } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const expertEmail = location.state?.expertEmail;
  const [showGetTime, setShowGetTime] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  console.log(expertEmail);

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
        console.log(response.data);
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  console.log("expert", profileData);
  if (!profileData) return;
  return (
    <Box>
      <Box
        bgcolor={"#fff"}
        borderRadius={3}
        overflow={"hidden"}
        border={"1px solid lightgray"}
      >
        <GradientBox position={"relative"}>
          <Box
            display="flex"
            alignItems="center"
            position={"absolute"}
            bottom={"-46%"}
            sx={{ translate: "0 -50%" }}
          >
            <ProfileAvatar
              src={`https://academy.opengrowth.com/assets/images/users/${profileData.img}`}
              alt={profileData.name}
            />
            <Box ml={2} mb={1}>
              <Typography variant="h5" fontWeight="bold" color="white">
                {profileData.name}
              </Typography>
              <Typography variant="subtitle1" color="white">
                {profileData.status}
              </Typography>
            </Box>
          </Box>
        </GradientBox>
        <TabsContainer>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="profile tabs"
          >
            <Tab label="Profile" />
            <Tab label="Course" />
          </Tabs>
        </TabsContainer>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 2 }}>
        <Button variant="contained" color="primary" sx={{ mr: 1 }}>
          Follow Me
        </Button>
        <Button variant="outlined" sx={{ mr: 1 }}>
          Send A Message
        </Button>
        <Button variant="outlined" onClick={() => setShowGetTime(true)}>
          Request Time
        </Button>
      </Box>
      {showGetTime && <GetTime setShowGetTime={setShowGetTime} />}
      <Box sx={{ display: "flex", gap: 3, my: 3 }}>
        <Paper sx={{ flex: 1, p: 2, borderRadius: 3, alignSelf: "flex-start" }}>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <List dense>
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
        {/* <Paper sx={{ flex: 2, p: 2, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            About me
          </Typography>
          <Typography
            variant="body1"
            fontSize={".95em"}
            sx={{ color: "text.secondary" }}
          >
            {profileData.about}
          </Typography>
        </Paper> */}
        <Paper
          elevation={1}
          sx={{
            height: "max-content",
            flex: 2,
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "transparent",
            border: "none",
            mx: 2,
          }}
        >
          {accordionData.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ whiteSpace: "pre-line" }}>
                  {item.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfilePage;
