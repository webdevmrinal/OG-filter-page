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
} from "@mui/material";
import { styled } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

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

const ProfilePage = () => {
  const { expertName } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const expertEmail = location.state?.expertEmail;

  console.log(expertEmail);

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

  console.log("expert", profileData);
  if (!profileData) return;
  return (
    <Box>
      <GradientBox>
        <Box display="flex" alignItems="flex-end">
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 2 }}>
        <Button variant="contained" color="primary" sx={{ mr: 1 }}>
          Profile
        </Button>
        <Button variant="outlined">Course</Button>
      </Box>
      <Box sx={{ display: "flex", p: 3, gap: 3 }}>
        <Paper sx={{ flex: 1, p: 2 }}>
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
        <Paper sx={{ flex: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            About me
          </Typography>
          <Typography variant="body1">{profileData.about}</Typography>
        </Paper>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mr: 2 }}>
        <Button variant="contained" color="primary" sx={{ mr: 1 }}>
          Follow Me
        </Button>
        <Button variant="outlined">Send A Message</Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
