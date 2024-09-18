import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import OGLogo from "./assets/OG-Logo.svg";

// Define the drawer widths
const drawerWidth = 240;
const closedDrawerWidth = 64;

// Remove the unnecessary state "open" and manage only "drawerOpen"
const SidebarTopbarComponent = ({ drawerOpen, setDrawerOpen }) => {
  const [expertsMenuOpen, setExpertsMenuOpen] = useState(false);
  const [coursesMenuOpen, setCoursesMenuOpen] = useState(false);
  const navigate = useNavigate(); // For navigation

  // Toggle the drawer
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);  // Sync drawerOpen with parent
    if (drawerOpen) {
      setExpertsMenuOpen(false); // Close experts menu when collapsing sidebar
      setCoursesMenuOpen(false); // Close courses menu when collapsing sidebar
    }
  };

  const toggleExpertsMenu = () => {
    setExpertsMenuOpen(!expertsMenuOpen);
  };

  const toggleCoursesMenu = () => {
    setCoursesMenuOpen(!coursesMenuOpen);
  };

  const handleMenuItemClick = (route, isMenu, toggleMenu) => {
    if (isMenu) {
      if (!drawerOpen) {
        setDrawerOpen(true);
      }
      toggleMenu();
    }
    if (route) {
      navigate(route);
    }
  };

  const handleSubMenuItemClick = (route) => {
    navigate(route);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboardpage" },
    {
      text: "Experts on Demand",
      icon: <PersonIcon />,
      isMenu: true,
      subMenu: [
        { text: "Search Experts", route: "/expertpage" },
        { text: "My Followers", route: "/followers" },
        { text: "My Connections", route: "/connections" },
        { text: "My Projects", route: "/projects" },
      ],
    },
    {
      text: "Courses",
      icon: <SchoolIcon />,
      route: "/coursedashboard",
      isMenu: true,
      subMenu: [
        { text: "My Course", route: "/mycourse" },
        { text: "Search Course", route: "/searchcourse" },
      ],
    },
    { text: "Messages", icon: <MessageIcon />, route: "/messages" },
    { text: "Account Settings", icon: <SettingsIcon />, route: "/transaction" },
    { text: "Logout", icon: <ExitToAppIcon />, route: null },
  ];

  return (
    <Box sx={{ display: "flex", height: "60px" }}>
      {/* Topbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "black",
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Box
            component="div"
            sx={{
              paddingLeft: 0,
              flexGrow: 1,
              color: "#4a4a4a",
            }}
          >
            {/* Place the logo here */}
          </Box>
          <IconButton sx={{ color: "#0000008a" }}>
            <SearchIcon />
          </IconButton>
          <IconButton sx={{ color: "#0000008a" }}>
            <MessageIcon />
          </IconButton>
          <IconButton sx={{ color: "#0000008a" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            {/* User Avatar */}
            <img
              src="https://academy.opengrowth.com/assets/images/users/user_597_professor_AnmolJamwal.png"
              alt="User"
              style={{ width: 32, height: 32, borderRadius: "50%" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? drawerWidth : closedDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerOpen ? drawerWidth : closedDrawerWidth,
            transition: "width 0.3s ease", // Smooth transition for the drawer width
            position: "fixed", // Sidebar stays fixed on the left
            height: "100vh", // Full height sidebar
          },
        }}
      >
        <Toolbar
          sx={{
            position: "relative",
            height: "57px",
            borderBottom: "1px solid #dedede",
            overflow: "hidden",
            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.1)",
          }}
        >
          <Link to={"/dashboardpage"}>
            <Box
              component="img"
              src={OGLogo}
              alt="OpenGrowth-Logo"
              sx={{
                height: "65px",
                minWidth: "220px",
                position: "absolute",
                left: -2,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </Link>
        </Toolbar>
        <Box sx={{ overflow: "hidden" }}>
          <List>
            <ListItem
              button
              onClick={handleDrawerToggle}
              sx={{ justifyContent: drawerOpen ? "flex-end" : "center" }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </ListItemIcon>
            </ListItem>

            {/* Map menu items */}
            {menuItems.map((item) => (
              item.isMenu ? (
                <React.Fragment key={item.text}>
                  <ListItem
                    button
                    onClick={() => handleMenuItemClick(item.route, item.isMenu, item.text === "Experts on Demand" ? toggleExpertsMenu : toggleCoursesMenu)}
                    sx={{
                      px: 2.5,
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        my: 2,
                        minWidth: 0,
                        mr: drawerOpen ? 2 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        opacity: drawerOpen ? 1 : 0,
                        "& .MuiListItemText-primary": {
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                    {drawerOpen && (item.text === "Experts on Demand" ? (expertsMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />) : (coursesMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />))}
                  </ListItem>

                  {/* Submenu */}
                  {drawerOpen && (item.text === "Experts on Demand" ? expertsMenuOpen : coursesMenuOpen) && (
                    <Box sx={{ pl: 4 }}>
                      {item.subMenu.map((subItem) => (
                        <ListItem
                          button
                          key={subItem.text}
                          onClick={() => handleSubMenuItemClick(subItem.route)}
                          sx={{ py: 0.5, px: 2.5 }}
                        >
                          <ListItemText
                            primary={subItem.text}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontSize: "0.75rem",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </Box>
                  )}
                </React.Fragment>
              ) : (
                <Link
                  key={item.text}
                  to={item.route}
                  style={{ color: "initial", textDecoration: "none" }}
                >
                  <ListItem button>
                    <ListItemIcon
                      sx={{
                        my: 2,
                        minWidth: 0,
                        mr: drawerOpen ? 2 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        opacity: drawerOpen ? 1 : 0,
                      }}
                    />
                  </ListItem>
                </Link>
              )
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SidebarTopbarComponent;
