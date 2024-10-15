// Header.jsx
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Link as MuiLink,
  Drawer,
  Menu,
  MenuItem,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowDropDown,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import OGLogo from "./assets/OG-Logo.svg";
import { manualExperts } from "../homepage/ManualExperts";

// Function to handle navigation based on menu item clicked
const handleMenuItemClick = (item, navigate, closeDrawer = () => {}) => {
  switch (item.toLowerCase()) { // Normalize case
    case "experts":
      navigate("/allExperts", { state: { experts: manualExperts } });
      break;
    case "courses":
      navigate("/all-courses");
      break;
    case "login":
      navigate("/login");
      break;
    case "signup":
      navigate("/get-started");
      break;
    case "consulting":
      navigate("/consulting");
      break;
    default:
      console.warn(`Unhandled navigation item: ${item}`);
      break;
  }
  closeDrawer(); // Close drawer after navigation
};

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [navItems, setNavItems] = useState([]);

  const navItemsModified = [
    { title: "Experts" },
    { title: "Resources", items: ["Courses", "Blogs"] },
  ];

  useEffect(() => {
    // Normalize the pathname: remove base path if any, remove trailing slashes
    const basePath = ""; // Replace with your base path if applicable, e.g., "/app"
    let normalizedPath = location.pathname
      .replace(basePath, "")
      .replace(/\/+$/, "");

    // If the path is empty, it means it's the base route "/"
    if (normalizedPath === "") {
      normalizedPath = "/";
    }

    normalizedPath = normalizedPath.toLowerCase();

    setNavItems(navItemsModified);
  }, [location.pathname]);

  const toggleDrawer = (open) => (event) => {
    // Only allow toggle if the event is not from a keypress or mouse click
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          minHeight: "80px !important",
          position: "relative", // Needed for absolute positioning of logo
        }}
      >
        {/* Mobile and Tablet Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo - Centered on Mobile and Tablet, Left-aligned on Desktop */}
        <MuiLink
          component="button"
          onClick={() => navigate("/homepage")}
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
            position: { xs: "absolute", sm: "absolute", md: "static" },
            left: { xs: "50%", sm: "50%", md: "auto" },
            transform: {
              xs: "translateX(-50%)",
              sm: "translateX(-50%)",
              md: "none",
            },
          }}
        >
          <img src={OGLogo} alt="OpenGrowth Logo" style={{ height: "3.5em" }} />
        </MuiLink>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {navItems.map((item, index) =>
            item.items ? (
              <NavMenuItem
                key={index}
                title={item.title}
                items={item.items}
              />
            ) : (
              <Button
                key={index}
                color="primary"
                onClick={() => {
                  if (item.title === "Experts") {
                    handleMenuItemClick(item.title, navigate);
                  }
                }}
                sx={{
                  marginRight: 3,
                  fontWeight: "600",
                  fontSize: "1em",
                  textTransform: "capitalize",
                  padding: "8px 15px",
                  borderRadius: "40px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: "40px",
                  },
                }}
              >
                {item.title}
              </Button>
            )
          )}
          <Button
            sx={{
              marginRight: 3,
              fontWeight: "600",
              fontSize: "1em",
              textTransform: "capitalize",
              padding: "8px 15px",
              borderRadius: "40px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderRadius: "40px",
              },
            }}
            color="inherit"
            onClick={() => handleMenuItemClick("About Us", navigate)}
          >
            About Us
          </Button>
          <Button
            sx={{
              marginRight: 3,
              fontWeight: "600",
              fontSize: "1em",
              textTransform: "capitalize",
              padding: "8px 15px",
              borderRadius: "40px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderRadius: "40px",
              },
            }}
            color="inherit"
            onClick={() => handleMenuItemClick("Contact", navigate)}
          >
            Contact
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "2em", textTransform: "none" }}
            onClick={() => handleMenuItemClick("login", navigate)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2, borderRadius: "2em", textTransform: "none" }}
            onClick={() => handleMenuItemClick("signup", navigate)}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>

      {/* Mobile and Tablet Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          // Removed onClick and onKeyDown handlers from the parent Box
        >
          <Box
            sx={{
              padding: "2.5em 1em",
              display: "flex",
              flexDirection: "column",
              gap: "1.5em",
            }}
          >
            <List>
              {navItems.map((item, index) =>
                item.items ? (
                  <MobileNavMenuItem
                    key={index}
                    title={item.title}
                    items={item.items}
                    navigate={navigate}
                    closeDrawer={() => setDrawerOpen(false)}
                  />
                ) : (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (item.title === "Experts") {
                          handleMenuItemClick(
                            item.title,
                            navigate,
                            () => setDrawerOpen(false)
                          );
                        }
                      }}
                      sx={{
                        borderRadius: "40px",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleMenuItemClick("About Us", navigate, () => setDrawerOpen(false))}
                  sx={{
                    borderRadius: "40px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <ListItemText primary="About Us" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleMenuItemClick("Contact", navigate, () => setDrawerOpen(false))}
                  sx={{
                    borderRadius: "40px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <ListItemText primary="Contact" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleMenuItemClick("Login", navigate, () => setDrawerOpen(false))}
                  sx={{
                    borderRadius: "2em",
                    backgroundColor: "primary.main",
                    color: "white",
                    margin: "8px 0",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleMenuItemClick("Sign Up", navigate, () => setDrawerOpen(false))}
                  sx={{
                    borderRadius: "2em",
                    backgroundColor: "primary.main",
                    color: "white",
                    margin: "8px 0",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  <ListItemText primary="Sign Up" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;

// NavMenuItem Component for Desktop
const NavMenuItem = ({ title, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine if the current menu is "Resources" to adjust width
  const isResourcesMenu = title.toLowerCase() === "resources";

  return (
    <>
      <Button
        color="primary"
        onClick={handleClick}
        endIcon={<ArrowDropDown />}
        sx={{
          marginRight: 3,
          fontWeight: "600",
          fontSize: "1em",
          textTransform: "capitalize",
          padding: "8px 15px",
          borderRadius: "40px",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: "40px",
          },
        }}
      >
        {title}
      </Button>
      <Menu
        sx={{
          borderRadius: "2em",
          width: isResourcesMenu ? "180px" : "auto", // Set width for the "Resources" menu
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              width: isResourcesMenu ? "250px" : "auto", // Increase the width of the items for "Resources"
            }}
            onClick={() => {
              handleClose();
              handleMenuItemClick(item, navigate);
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// MobileNavMenuItem Component for Mobile Drawer
const MobileNavMenuItem = ({ title, items, navigate, closeDrawer }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = (event) => {
    event.stopPropagation(); // Prevent the drawer from closing
    setOpen(!open);
  };

  const handleSubItemClick = (subItem) => {
    handleMenuItemClick(subItem, navigate, closeDrawer);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleToggle} sx={{ borderRadius: "40px" }}>
          <ListItemText primary={title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((subItem, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{ pl: 4, borderRadius: "40px" }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the drawer from closing
                  handleSubItemClick(subItem);
                }}
              >
                <ListItemText primary={subItem} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};
