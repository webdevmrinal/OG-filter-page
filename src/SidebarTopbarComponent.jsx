import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Box,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Book as BookIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import App from "./App";
import OGLogo from "./assets/OG-Logo.svg";
import { Link } from "react-router-dom";

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

const SidebarTopbarComponent = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Experts on Demand", icon: <PersonIcon /> },
    { text: "Courses", icon: <SchoolIcon/> },
    { text: "Messages", icon: <MessageIcon /> },
    { text: "Account Settings", icon: <SettingsIcon /> },
    { text: "Logout", icon: <ExitToAppIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", height:'60px' }}>
      <AppBar
        position="fixed"
        sx={{
          //   zIndex: (theme) => theme.zIndex.drawer + 1,
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
            {/* <img
              src={OGLogo}
              alt="OpenGrowth-Logo"
              style={{ height: "55px" }}
            /> */}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#4a4a4a" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Courses"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "#4a4a4a" }}
            />
          </Search>
          <IconButton sx={{ color: "#4a4a4a" }}>
            <MessageIcon />
          </IconButton>
          <IconButton sx={{ color: "#4a4a4a" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <img
              src="https://placehold.co/40x40"
              alt="User"
              style={{ width: 32, height: 32, borderRadius: "50%" }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : closedDrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : closedDrawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        <Toolbar
          sx={{
            position: "relative",
            height: "65px",
            borderBottom: "1px solid #dedede",
            overflow: "hidden",
            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.1)",
            
          }}
        >
          <Link to={"/"}>
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
              sx={{ justifyContent: open ? "flex-end" : "center" }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </ListItemIcon>
            </ListItem>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
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
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    minWidth: drawerWidth,
                    opacity: open ? 1 : 0,
                    // color: "primary",
                    "& .MuiListItemText-primary": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* <App /> */}
      </Box>
    </Box>
  );
};

export default SidebarTopbarComponent;
