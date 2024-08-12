import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Tab,
  Tabs,
  Card,
  Avatar,
  Divider,
  Button,
  Rating,
  Chip
} from "@mui/material";
import axios from "axios";
import Header from "./Header";
import {useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CalendarToday from "@mui/icons-material/CalendarToday";
import InfoIcon from '@mui/icons-material/Info';

const ProfileAvatar = styled(Avatar)({
  width: 225,
  height: 225,
  border: "4px solid white",
});

const GradientBox = styled(Box)({
    background: "linear-gradient(to right, #5e6fa3, #4ea3a0)",
    height: "370px",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    padding: "24px",
    borderRadius: '12px'
  });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const LeftAlignedTimeline = styled(Timeline)({
  paddingLeft: 0,
  "&::before": {
    left: 0,
  },
});

const TimelineItemStyled = styled(TimelineItem)({
  "&::before": {
    display: "none",
  },
});

const DetailView = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  
  const [profileData, setProfileData] = useState(null);

  // Static notes data
  const notes =
    "Here are all the detailed notes that were discussed during the session. These include key points, action items, and follow-up dates.";

  //   const [profileData, setProfileData] = useState(null);
  const profileData1 = {
    name: "John Doe",
    status: "Expert",
    img: "avatar.jpg",
    date: "2023-09-15",
    time: "9:00pm - 10:00pm",
    requirement: "Discuss project scope and timeline",
  };

  const timelineItems = [
    { time: "Sept 9, 2024", message: "Connected call about project update" },
    { time: "Sept 9, 2024", message: "Discussed new project requirements" },
    { time: "Sept 9, 2024", message: "Reviewed budget allocation for Q4" },
    { time: "Sept 9, 2024", message: "Scheduled meeting with the client" },
    {
      time: "Sept 9, 2024",
      message: "Followed up on action items from last meeting",
    },
  ];

  const location = useLocation();
  const expertEmail = location.state?.expertEmail;

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
    console.log(profileData);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const truncateText = (text, maxLength = 100) => {
    return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <Header />
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
      <Card
  variant="outlined"
  sx={{
    margin: 2,
    padding: 2,
    backgroundColor: "#fff",
    color: "Black",
    height: "29rem",
    position: "relative",
    overflow: "visible",
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  }}
>
  <Typography variant="h6" sx={{ width: "100%", padding: '1px 1px 0px 4px' }}>
    Event Details
  </Typography>
  <Divider sx={{ width: "100%", mb: 2 }} />
  <GradientBox position={"relative"}>
  <Box sx={{ height: 'calc(100% - 12px)', color: 'white' ,translate: "0 -50%"}} display="flex"
            alignItems="center"
            position={"absolute"}
            bottom={"-47%"}
            >
    <Box sx={{ width: "82em", padding: 2 }}>
      <Box display="flex" alignItems="flex-start">
        <Box display={'flex'} flexDirection={"column"}>
        <ProfileAvatar
          src={`https://academy.opengrowth.com/assets/images/users/${profileData?.img}`}
          alt={profileData?.name}
        />
        <Box display={'flex'} sx={{mt: 1}}>
        <Rating value={5} readOnly size="small" sx={{ mt: '0px', ml: '2.5em' }} />
        <Typography variant="body2" component="span" sx={{ ml: 1, color: "black" }}>
            5.0 (40)
        </Typography>
        </Box>
        
        </Box>
        <Box sx={{ ml: 4 , width:'65em'}}>
          <Box display={'flex'} sx={{gap: 1}}>
          <BadgeOutlinedIcon sx={{height: '1.2em'}} />
          <Typography variant="h5">{profileData?.name}</Typography>
          </Box>
          <Typography variant="subtitle1">
            {profileData?.experience}
          </Typography>
          <Typography variant="body1">{profileData?.industry}, {profileData?.country}</Typography>
          <Box display={'flex'} gap={1}sx={{mt: 2}}>
          <InfoIcon />
          <Typography variant="body1" >
            {truncateText(profileData?.about, 400)}
            <Button color="primary" sx={{px: 0, color: 'white'}}>
              Know More
            </Button>
          </Typography> 
          </Box>
          <Chip label="Connected: 5 Times" sx={{ mt: 1, fontWeight: "bold", color:'white'}} />
      </Box>
      </Box>
    </Box>
   
  </Box>
  </GradientBox>
</Card>
        <Card variant="outlined" sx={{ margin: 2,boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <Tabs value={tabIndex} onChange={handleTabChange} sx={{ ml: 2 }}>
            <Tab label="Notes" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Details" id="tab-1" aria-controls="tabpanel-1" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
          <Typography variant="h6" component="h2">
            Discussed Notes:
          </Typography>
          <Divider sx={{ width: "100%", mb: 2, alignSelf: "center" }} />
        {[...Array(5)].map((_, i) => (

          <Card key={i} elevation={3} sx={{ mb: 2, borderRadius: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <Box sx={{ p: 2 }}>
              
              <Typography variant="h6" >
                Topics discussed: Discuss project scope and timeline
              </Typography>
              <Box display={'flex'} sx={{gap:0.5}}>
              <CalendarToday sx={{width: '15px', pb: 1}}/>
              <Typography variant="subtitle2" component="h5">
                
                Thursday, Sept 9, 2024 / 9:00pm - 10:00pm
              </Typography>
              </Box>
              <Typography variant="body1" sx={{ mt: 1}}>
                {notes}
              </Typography>
            </Box>
          </Card>
        ))}
      </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Typography variant="h6" component="h2">
              Additional Details:
            </Typography>
            <LeftAlignedTimeline>
              {timelineItems.map((item, index) => (
                <TimelineItemStyled key={index}>
                  <TimelineOppositeContent sx={{ flex: 0.05 }}>
                    <Typography variant="body2" sx={{width: '6em', py: "5px", px: 0}}>
                      {item.time}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index !== timelineItems.length - 1 && (
                      <TimelineConnector />
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "5px", px: 2 }}>
                    <Typography variant="body1">{item.message}</Typography>
                  </TimelineContent>
                </TimelineItemStyled>
              ))}
            </LeftAlignedTimeline>
          </TabPanel>
        </Card>
      </Paper>
     </>
  );
};

export default DetailView;
