// SidebarTopbarComponent.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Drawer,
  Menu,
  MenuItem,
  Avatar,
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

const OpenDrawer = styled("div")(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...theme.mixins.toolbar,
  backgroundColor: "#f8f9fa",
}));
const ClosedDrawer = styled("div")(({ theme }) => ({
  width: closedDrawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...theme.mixins.toolbar,
  backgroundColor: "#f8f9fa",
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SidebarTopbarComponent = ({ drawerOpen, setDrawerOpen }) => {
  const [expertsMenuOpen, setExpertsMenuOpen] = useState(false);
  const [coursesMenuOpen, setCoursesMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For the avatar menu
  const [user, setUser] = useState(null); // To store user data
  const navigate = useNavigate(); // For navigation

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser"); // Remove current user from localStorage
    handleAvatarMenuClose();
    navigate("/homepage");
  };

  // Toggle the drawer
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen); // Sync drawerOpen with parent
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
      isMenu: true,
      route: "/coursedashboard",
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#0000008a" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Courses"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "#0000008a" }}
            />
          </Search>
          <IconButton sx={{ color: "#0000008a" }}>
            <SearchIcon />
          </IconButton>
          <IconButton sx={{ color: "#0000008a" }}>
            <MessageIcon />
          </IconButton>
          <IconButton sx={{ color: "#0000008a" }}>
            <NotificationsIcon />
          </IconButton>
          {user ? (
            <IconButton onClick={handleAvatarClick}>
              <Avatar
                alt={user.firstName || user.name}
                src="https://academy.opengrowth.com/assets/images/users/user_597_professor_AnmolJamwal.png"
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              />
            </IconButton>
          ) : (
            <IconButton>
              <Avatar
                src="https://academy.opengrowth.com/assets/images/users/user_597_professor_AnmolJamwal.png"
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              />
            </IconButton>
          )}
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
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
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
            {menuItems.map((item) =>
              item.isMenu ? (
                <React.Fragment key={item.text}>
                  <ListItem
                    button
                    onClick={() =>
                      handleMenuItemClick(
                        item.route,
                        item.isMenu,
                        item.text === "Experts on Demand"
                          ? toggleExpertsMenu
                          : toggleCoursesMenu
                      )
                    }
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
                    {drawerOpen &&
                      (item.text === "Experts on Demand"
                        ? expertsMenuOpen
                          ? <ExpandLessIcon />
                          : <ExpandMoreIcon />
                        : coursesMenuOpen
                          ? <ExpandLessIcon />
                          : <ExpandMoreIcon />
                      )}
                  </ListItem>
                  {drawerOpen &&
                    (item.text === "Experts on Demand"
                      ? expertsMenuOpen
                      : coursesMenuOpen) && (
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
                  <ListItem
                    button
                    sx={{
                      display: "flex",
                      py: 0.5,
                      px: 2.5,
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
                        minWidth: drawerWidth,
                        opacity: drawerOpen ? 1 : 0,
                        "& .MuiListItemText-primary": {
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </ListItem>
                </Link>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAvatarMenuClose}
      >
        {user && [
          <MenuItem key="name">
            {`${user.firstName || user.name} ${user.lastName || ""}`}
          </MenuItem>,
          <MenuItem key="email">{user.email}</MenuItem>,
          <MenuItem
            key="transaction"
            onClick={() => {
              handleAvatarMenuClose();
              navigate("/transaction");
            }}
          >
            My Transaction
          </MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>
            Logout
          </MenuItem>,
        ]}
      </Menu>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* <App /> */}
      </Box>
    </Box>
  );
};

export default SidebarTopbarComponent;
