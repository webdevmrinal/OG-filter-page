import React, { useState } from 'react';
import {
  Container, Typography, Paper, Box, Tabs, Tab, Divider, Card, IconButton, Button, Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { darken } from '@mui/system';
import { useNavigate } from 'react-router-dom';

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
  const [tabIndex, setTabIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpenProjectId, setMenuOpenProjectId] = useState(null);
  const navigate = useNavigate();

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

  return (
    <Container sx={{ maxWidth: '1810px !important', px: 0, mx: 0 }}>
      <Typography variant="h5" sx={{ mt: 3 }}>
        Projects
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Tabs value={tabIndex} onChange={handleTabChange} sx={{ ml: 2 }}>
              <Tab label="Active" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Completed" id="tab-1" aria-controls="tabpanel-1" />
              <Tab label="Templates" id="tab-2" aria-controls="tabpanel-2" />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
              {projects.some(project => project.favourite) && (
                <>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    FAVOURITES
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    {projects.filter(project => project.favourite).map((project, index) => (
                      <Card
                        key={project.id}
                        sx={{ width: 280, height: 280, display: 'flex', flexDirection: 'column', py: 2, pl: 2, position: 'relative' }}
                        onClick={handleCardClick}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="h6">{project.name}</Typography>
                          <Box>
                            <IconButton onClick={(e) => handleToggleFavourite(project.id, e)}>
                              <StarIcon sx={{ color: 'gold' }} />
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
                </>
              )}

              <Typography variant="h6" sx={{ mt: projects.some(project => project.favourite) ? 4 : 0, mb: 2 }}>
                OTHER
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {projects.filter(project => !project.favourite).map((project, index) => (
                  <Card
                    key={project.id}
                    sx={{ width: 280, height: 280, display: 'flex', flexDirection: 'column', py: 2, pl: 2, position: 'relative' }}
                    onClick={handleCardClick}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">{project.name}</Typography>
                      <Box>
                        <IconButton onClick={(e) => handleToggleFavourite(project.id, e)}>
                          <StarBorderIcon />
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
            </TabPanel>

            {/* Repeat TabPanel for Completed and Templates tabs as needed */}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Projects;
