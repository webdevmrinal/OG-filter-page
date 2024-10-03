// Projects.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  Divider,
  Card,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Skeleton, // Import Skeleton
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { darken } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Import useTheme

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Projects = () => {
  const theme = useTheme(); // Access the theme
  const [tabIndex, setTabIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpenProjectId, setMenuOpenProjectId] = useState(null);
  const navigate = useNavigate();

  // Loading state for shimmer effect
  const [loading, setLoading] = useState(true);

  // Simulate data fetching with a timeout
  useEffect(() => {
    // Simulate a 300ms loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Array of projects
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1', company: 'Owner Company', description: 'This is a demo Project', active: 'Just now', favourite: false },
    { id: 2, name: 'Project 2', company: 'Another Company', description: 'This is another demo project', active: '5 minutes ago', favourite: false },
    { id: 3, name: 'Project 3', company: 'Sample Company', description: 'This is a sample project', active: '10 minutes ago', favourite: false },
  ]);

  // Array of status states corresponding to each project
  const [statuses, setStatuses] = useState([
    { id: 1, label: '+', color: '#e0e0e0' },
    { id: 2, label: '+', color: '#e0e0e0' },
    { id: 3, label: '+', color: '#e0e0e0' },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleMenuOpen = (event, projectId) => {
    event.stopPropagation(); // Prevent navigation on card click
    setAnchorEl(event.currentTarget);
    setMenuOpenProjectId(projectId); // Track which project’s menu is open
  };

  const handleMenuClose = (event) => {
    event.stopPropagation(); // Prevent navigation on card click
    setAnchorEl(null);
    setMenuOpenProjectId(null); // Close the menu for the project
  };

  const handleStatusChange = (label, color, projectId, event) => {
    event.stopPropagation(); // Prevent navigation on card click
    setStatuses(prevStatuses =>
      prevStatuses.map(status =>
        status.id === projectId ? { ...status, label, color } : status
      )
    );
    handleMenuClose(event);
  };

  const handleToggleFavourite = (projectId, event) => {
    event.stopPropagation(); // Prevent navigation on card click
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? { ...project, favourite: !project.favourite } : project
      )
    );
  };

  const handleCardClick = () => {
    navigate('/todo'); // Navigate to the TodoPage when a card is clicked
  };

  // Function to render project cards or skeletons
  const renderProjects = (filteredProjects) => {
    if (loading) {
      // Display skeletons while loading
      return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
          {filteredProjects.map((_, index) => (
            <Card
              key={index}
              sx={{
                width: { xs: '100%', sm: 400, md: 280 },
                height: 280,
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                position: 'relative',
                borderRadius: 1, // Added borderRadius
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="text" width="60%" height={30} aria-hidden="true" />
                <Box sx={{ display: 'flex' }}>
                  <Skeleton variant="circular" width={24} height={24} aria-hidden="true" />
                  <Skeleton variant="circular" width={24} height={24} sx={{ ml: 1 }} aria-hidden="true" />
                </Box>
              </Box>
              <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} aria-hidden="true" />
              <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 1 }} aria-hidden="true" />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', alignItems: 'center' }}>
                <Skeleton variant="text" width="40%" height={20} aria-hidden="true" />
                <Skeleton variant="rectangular" width={80} height={24} aria-hidden="true" />
              </Box>
            </Card>
          ))}
        </Box>
      );
    }

    // Display actual project cards when not loading
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            sx={{ 
              width: { xs: '100%', sm: 400, md: 280 }, // Responsive widths
              height: 280, 
              display: 'flex', 
              flexDirection: 'column', 
              py: 2, 
              pl: 2, 
              boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              position: 'relative',
              borderRadius: 1, // Ensuring consistent borderRadius
              "&:hover": {
                backgroundColor: "#0000000a",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                transform: "translateY(-2px)",
                borderRadius: 2,
              },
              cursor: 'pointer',
            }}
            onClick={handleCardClick}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">{project.name}</Typography>
              <Box>
                <IconButton onClick={(e) => handleToggleFavourite(project.id, e)}>
                  {project.favourite ? <StarIcon sx={{ color: 'gold' }} /> : <StarBorderIcon />}
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              For: <Typography component="span" variant="body2" color="primary">{project.company}</Typography>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {project.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">Active: {project.active}</Typography>
              <Button
                variant="contained"
                onClick={(e) => handleMenuOpen(e, project.id)}
                sx={{
                  height: 24,
                  backgroundColor: statuses.find(status => status.id === project.id).color,
                  color: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 2,
                  borderRadius: '12px 0 0 12px', // Rounded left border
                  fontSize: '10px',
                  '&:hover': {
                    backgroundColor: darken(statuses.find(status => status.id === project.id).color, 0.2), // Darkens the color by 20% on hover
                  },
                }}
              >
                {statuses.find(status => status.id === project.id).label}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={menuOpenProjectId === project.id}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={(e) => handleStatusChange('In Progress', '#aed581', project.id, e)} sx={{ fontSize: '10px' }}>
                  <ListItemIcon>
                    <FiberManualRecordIcon sx={{ color: '#aed581', fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary="In Progress" sx={{ color: '#616161' }} />
                </MenuItem>
                <MenuItem onClick={(e) => handleStatusChange('New', '#fff176', project.id, e)} sx={{ fontSize: '10px' }}>
                  <ListItemIcon>
                    <FiberManualRecordIcon sx={{ color: '#fff176', fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary="New" sx={{ color: '#616161' }} />
                </MenuItem>
                <MenuItem onClick={(e) => handleStatusChange('Cancelled', '#e57373', project.id, e)} sx={{ fontSize: '10px' }}>
                  <ListItemIcon>
                    <FiberManualRecordIcon sx={{ color: '#e57373', fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary="Cancelled" sx={{ color: '#616161' }} />
                </MenuItem>
                <MenuItem onClick={(e) => handleStatusChange('Paused', '#7986cb', project.id, e)} sx={{ fontSize: '10px' }}>
                  <ListItemIcon>
                    <FiberManualRecordIcon sx={{ color: '#7986cb', fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary="Paused" sx={{ color: '#616161' }} />
                </MenuItem>
              </Menu>
            </Box>
          </Card>
        ))}
      </Box>
    )
    };

    // Function to render tabs or skeletons
    const renderTabs = () => {
      if (loading) {
        // Display skeletons for tabs while loading
        return (
          <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
            <Skeleton
              variant="rectangular"
              width={80}
              height={32}
              animation="wave"
              sx={{
                borderRadius: 1,
                backgroundColor: theme.palette.background.default,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={100}
              height={32}
              animation="wave"
              sx={{
                borderRadius: 1,
                backgroundColor: theme.palette.background.default,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={90}
              height={32}
              animation="wave"
              sx={{
                borderRadius: 1,
                backgroundColor: theme.palette.background.default,
              }}
            />
          </Box>
        );
      }

      // Display actual Tabs when not loading
      return (
        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ ml: 2 }}>
          <Tab label="My Projects" id="tab-0" aria-controls="tabpanel-0" sx={{ fontSize: { xs: '0.78rem', sm: 'inherit' } }} />
          <Tab label="Completed" id="tab-1" aria-controls="tabpanel-1" sx={{ fontSize: { xs: '0.78rem', sm: 'inherit' } }} />
          <Tab label="On-Going" id="tab-2" aria-controls="tabpanel-2" sx={{ fontSize: { xs: '0.78rem', sm: 'inherit' } }} />
        </Tabs>
      );
    };

    // Function to render headers or skeletons within TabPanels
    const renderTabHeaders = (headerText) => {
      if (loading) {
        return (
          <Skeleton
            variant="text"
            width="30%"
            height={30}
            animation="wave"
            sx={{
              backgroundColor: theme.palette.background.default,
            }}
            aria-hidden="true"
          />
        );
      }

      return (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {headerText}
        </Typography>
      );
    };

    return (
      <Container sx={{ maxWidth: '1810px !important', px: 0, mx: 0 }}>
        {!loading && (
          <Typography variant="h5" sx={{ mt: 3 }}>
            Projects
          </Typography>
        )}
        {loading && (
          <Skeleton
            variant="text"
            width="20%"
            height={40}
            animation="wave"
            sx={{
              mt: 1,
              ml: 0,
              backgroundColor: theme.palette.background.default,
            }}
            aria-hidden="true"
          />
        )}
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper elevation={3} sx={{ padding: { xs: 3, sm: 2 }, width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Render Tabs or Skeletons */}
              {renderTabs()}

              {/* Active Tab Panel */}
              <TabPanel value={tabIndex} index={0}>
                {loading ? (
                  // Skeletons for headers and project cards
                  <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {/* FAVOURITES Header Skeleton */}
                      <Skeleton
                        variant="text"
                        width="30%"
                        height={30}
                        animation="wave"
                        sx={{
                          backgroundColor: theme.palette.background.default,
                        }}
                        aria-hidden="true"
                      />
                      <Divider />
                      {renderProjects(projects.filter(project => project.favourite))}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                      {/* OTHER Header Skeleton */}
                      <Skeleton
                        variant="text"
                        width="30%"
                        height={30}
                        animation="wave"
                        sx={{
                          backgroundColor: theme.palette.background.default,
                        }}
                        aria-hidden="true"
                      />
                      <Divider />
                      {renderProjects(projects.filter(project => !project.favourite))}
                    </Box>
                  </>
                ) : (
                  // Actual content when not loading
                  <>
                    {projects.some(project => project.favourite) && (
                      <>
                        {renderTabHeaders("FAVOURITES")}
                        <Divider sx={{ mb: 2 }} />
                        {renderProjects(projects.filter(project => project.favourite))}
                      </>
                    )}

                    <Box sx={{ mt: projects.some(project => project.favourite) ? 4 : 0 }}>
                      {renderTabHeaders("OTHER")}
                      <Divider sx={{ mb: 2 }} />
                      {renderProjects(projects.filter(project => !project.favourite))}
                    </Box>
                  </>
                )}
              </TabPanel>

              {/* Completed Tab Panel */}
              <TabPanel value={tabIndex} index={1}>
                {loading ? (
                  // Skeletons for headers and project cards
                  <>
                    {/* Completed Header Skeleton */}
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={30}
                      animation="wave"
                      sx={{
                        mb: 2,
                        backgroundColor: theme.palette.background.default,
                      }}
                      aria-hidden="true"
                    />
                    <Divider />
                    {renderProjects(projects)} {/* Assuming Completed projects are similar */}
                  </>
                ) : (
                  // Actual content when not loading
                  <Typography variant="body1">Completed Projects will be displayed here.</Typography>
                )}
              </TabPanel>

              {/* Templates Tab Panel */}
              <TabPanel value={tabIndex} index={2}>
                {loading ? (
                  // Skeletons for headers and project cards
                  <>
                    {/* Templates Header Skeleton */}
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={30}
                      animation="wave"
                      sx={{
                        mb: 2,
                        backgroundColor: theme.palette.background.default,
                      }}
                      aria-hidden="true"
                    />
                    <Divider />
                    {renderProjects(projects)} {/* Assuming Templates projects are similar */}
                  </>
                ) : (
                  // Actual content when not loading
                  <Typography variant="body1">Templates will be displayed here.</Typography>
                )}
              </TabPanel>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  };

  export default Projects;
