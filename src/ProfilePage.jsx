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
import SendIcon from "@mui/icons-material/Send";
import WorkIcon from "@mui/icons-material/Work";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import SelectTime from "./SelectTime";

const GradientBox = styled(Box)({
  // background: "linear-gradient(to right, #5e6fa3, #4ea3a0)",
  background: "linear-gradient(to top, #89929bcc, #475a6dcc)",
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

const ButtonContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const ProfilePage = () => {
  const { expertName } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const expertEmail = location.state?.expertEmail;
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState(true);

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAccordionChange = () => {
    setExpanded(!expanded);
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
          ></Tabs>
          <ButtonContainer>
            <Button
              startIcon={<PersonAddIcon />}
              variant="outlined"
              color="primary"
              sx={{ mr: 1 }}
            >
              Follow
            </Button>
            <Button startIcon={<SendIcon />} variant="outlined" sx={{ mr: 1 }}>
              Message
            </Button>
            <Button
              startIcon={<EventNoteIcon />}
              variant="outlined"
              onClick={handleAccordionChange}
            >
              Request a Time
            </Button>
          </ButtonContainer>
        </TabsContainer>
      </Box>

      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionDetails>
          <SelectTime
            setShowGetTime={setExpanded}
            professorName={profileData.name}
          />
        </AccordionDetails>
      </Accordion>

      <Box sx={{ display: "flex", gap: 3, my: 3 }}>
        <Paper sx={{ flex: 1, borderRadius: 3, alignSelf: "flex-start" }}>
          <Typography px={3} pt={2} variant="h6" gutterBottom>
            About
          </Typography>
          <Divider />
          <List dense sx={{ padding: "0 .75em", my: 2 }}>
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
        <Paper
          elevation={0}
          sx={{
            height: "max-content",
            width: "max-content",
            flex: 2,
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
                <Typography
                  style={{ whiteSpace: "pre-line" }}
                  color={"text.secondary"}
                >
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
