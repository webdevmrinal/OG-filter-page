import React, {useState} from 'react';
import { Box, Typography, Button, Card, CardContent, Avatar, Grid, Tabs, Tab, Divider, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
  } from "@mui/lab";

const CourseImage = styled('div')(({ theme }) => ({
  width: '100%',
  height: 300,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  position: 'relative',
}));

const OverlayText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: 10,
  left: 20,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  fontSize: '1.5rem',
}));

const InstructorAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6), // Reduced size for smaller cards
  height: theme.spacing(6),
  margin: '0 auto',
}));

const InstructorName = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontWeight: 500,
  fontSize: '0.8rem', // Slightly smaller font size for smaller cards
}));

const InstructorStatus = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.7rem', // Smaller font size for smaller cards
}));

const InstructorCard = styled(Card)(({ theme }) => ({
  width: '120px', // Smaller width for each instructor card
  padding: theme.spacing(1),
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
}));

const CourseDescription = () => {
  const location = useLocation();
  const { title, imageUrl, description } = location.state;
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  
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

  return (
    <Box sx={{ width: '100%', padding: 4 }}>
      <Card sx={{ width: '100%', boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2, marginBottom: 4 }}>
        <Box sx={{ width: '100%', padding: 2, marginBottom: 0 }}>
          <CourseImage
            sx={{
              backgroundImage: `url(${imageUrl})`,
            }}
          >
            <OverlayText variant="h5">{title}</OverlayText>
          </CourseImage>
        </Box>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Course Description
            </Typography>
            <Button variant="outlined" color="primary" sx={{ mb: 1.5 }}>
              Remove Enrollment
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Divider sx={{ flexGrow: 1, mr: 2, width: '100%' }} />
          </Box>

          <Typography variant="body1" color="textSecondary" paragraph>
            {description}
          </Typography>
        </CardContent>
      </Card>

      {/* Instructors Section */}
      <Card sx={{ width: '100%', boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2, mt: 3.3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Instructors
          </Typography>
          <Divider sx={{ width: "100%", mb: 2, px: 1 }} />
          <Grid container spacing={0}> {/* Removed spacing */}
            {[
              { name: 'John Doe', status: 'Marketing Expert', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
              { name: 'Jane Smith', status: 'SEO Specialist', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
              { name: 'Priya Nath', status: 'Content Strategist', image: 'https://randomuser.me/api/portraits/women/45.jpg' },
            ].map((instructor, index) => (
              <Grid item xs={1.3} key={index}>
                <InstructorCard sx={{boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2}}>
                  <InstructorAvatar src={instructor.image} />
                  <InstructorName >{instructor.name}</InstructorName>
                  <InstructorStatus >{instructor.status}</InstructorStatus>
                </InstructorCard>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card
          variant="outlined"
          sx={{ mt: 3,boxShadow: "0 4px 12px rgba(0,0,0,0.2)",borderRadius: 2 }}
        >
          <Tabs value={tabIndex} onChange={handleTabChange} sx={{ ml: 2 }}>
            <Tab label="Description" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Key Highlights" id="tab-1" aria-controls="tabpanel-1" />
            <Tab label="Syllabus" id="tab-2" aria-controls="tabpanel-2" />
            <Tab label="Instructors" id="tab-3" aria-controls="tabpanel-3" />
            <Tab label="Advantages" id="tab-4" aria-controls="tabpanel-4" />
            <Tab label="About University" id="tab-5" aria-controls="tabpanel-5" />
            <Tab label="Review" id="tab-6" aria-controls="tabpanel-6" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            
              <Card
                key={0}
                elevation={3}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  "&:hover": {
                  backgroundColor: "#0000000a",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                  },
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1">
                    Programme Overview
                  </Typography>
                  <Box display={"flex"} sx={{ gap: 0.5 }}>
                    
                    <Typography variant="body2" color={'text.secondary'} mt={1.3}>
                    Understand why you need a winning SEO strategy to attract your target audience to your website, increase awareness and traffic, and how you can use your newfound knowledge of keywords and search types to increase your online visibility.
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 , color: 'text.secondary'}}>
                    {/* {notes} */}
                  </Typography>
                </Box>
              </Card>
              <Card
                key={1}
                elevation={3}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  "&:hover": {
                  backgroundColor: "#0000000a",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                  },
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1">
                    SEO Basics
                  </Typography>
                  <Box display={"flex"} sx={{ gap: 0.5 }}>
                    
                    <Typography variant="body2" color={'text.secondary'} mt={1.3}>
                    A step-by-step guide to developing a Search Engine Optimization strategy for your business to increase your online presence and attract traffic to your website by using keywords intelligently, leveraging paid and organic searches, and making your website mobile-friendly.
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 , color: 'text.secondary'}}>
                    {/* {notes} */}
                  </Typography>
                </Box>
              </Card>
              <Card
                key={2}
                elevation={3}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  "&:hover": {
                  backgroundColor: "#0000000a",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                  },
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1">
                    Skills You Will Gain
                  </Typography>
                  <Box display={"flex"} sx={{ flexWrap: 'wrap', gap: 1, mt: 1.3 }}>
                    {['Digital solutions', 'Finance', 'Marketing', 'Technology', 'Entrepreneurship', 'Innovation'].map((skill, index) => (
                      <Chip key={index} label={skill} variant="outlined" sx={{backgroundColor: '#f3f3f3', border: 'none'}} />
                    ))}
                  </Box>
                </Box>
              </Card>
            
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card
                  elevation={3}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#0000000a",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1">
                      Blog like lecture notes
                    </Typography>
                    <Box display={"flex"} sx={{ gap: 0.5 }}>
                      <Typography variant="body2" color={'text.secondary'} mt={1.3}>
                      Churn through the course material with considerable ease as our lecture notes emulate blogs, with infographics and videos to enhance your learning experience.
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  elevation={3}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#0000000a",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1">
                    Instructional benefits
                    </Typography>
                    <Box display={"flex"} sx={{ gap: 0.5 }}>
                      <Typography variant="body2" color={'text.secondary'} mt={1.3}>
                      High standards of instructional design guaranteed to impart knowledge seamlessly and motivate you.
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  elevation={3}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#0000000a",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1">
                    Immersive live activities
                    </Typography>
                    <Box display={"flex"} sx={{ gap: 0.5 }}>
                      <Typography variant="body2" color={'text.secondary'} mt={1.3}>
                      Group and individual activities that involve you, ensuring a sound grasp of the subject matter being covered.
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  elevation={3}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#0000000a",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1">
                    Social and collaborative learning
                    </Typography>
                    <Box display={"flex"} sx={{ gap: 0.5 }}>
                      <Typography variant="body2" color={'text.secondary'} mt={1.3}>
                      Social and collaborative learning experiences crafted to ensure retention and absorption of concepts and the ability to apply them for life.
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Card>
    </Box>
  );
};

export default CourseDescription;
