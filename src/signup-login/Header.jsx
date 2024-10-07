// Header.jsx
import React, { useState } from "react";
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
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowDropDown, Menu as MenuIcon } from "@mui/icons-material";
import OGLogo from "./assets/OG-Logo.svg";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Define nav items for different pages
  const navItemsDefault = [
    { title: "Hire", items: ["Find Talent", "Post a Job", "Hiring Solutions"] },
    { title: "Enable", items: ["Training Programs", "Certifications", "Resources"] },
    { title: "Grow", items: ["Business Solutions", "Marketing Services", "Consulting"] },
  ];

  const navItemsModified = [
    { title: "Experts" },
    { title: "Resources", items: ["Courses", "Blogs"] },
  ];

  // Determine which nav items to use based on the current path
  const isHomePageOrExpertOrCourse = ["/homepage", "/allExperts", "/all-courses"].includes(location.pathname);
  const navItems = isHomePageOrExpertOrCourse ? navItemsModified : navItemsDefault;

  const toggleDrawer = (open) => (event) => {
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
          gap: "1em",
          bgcolor: "white",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <MuiLink
          component="button"
          onClick={() => navigate("/homepage")}
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src={OGLogo}
            alt="OpenGrowth Logo"
            style={{ height: "3.5em" }}
          />
        </MuiLink>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {navItems.map((item, index) =>
            item.items ? (
              <NavMenuItem key={index} title={item.title} items={item.items} />
            ) : (
              <Button
                key={index}
                color="primary"
                onClick={() => {
                  if (item.title === "Experts") {
                    navigate("/allExperts");
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
            onClick={() => navigate("/about-us")}
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
            onClick={() => navigate("/contact")}
          >
            Contact
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "2em" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2, borderRadius: "2em" }}
            onClick={() => navigate("/get-started")}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              padding: "2.5em 1em",
              display: "flex",
              flexDirection: "column",
              gap: "1.5em",
            }}
          >
            {navItems.map((item, index) =>
              item.items ? (
                <NavMenuItem key={index} title={item.title} items={item.items} isMobile />
              ) : (
                <Button
                  key={index}
                  color="primary"
                  onClick={() => {
                    if (item.title === "Experts") {
                      navigate("/allExperts");
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
                padding: "10px 15px",
                borderRadius: "40px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "40px",
                },
              }}
              color="inherit"
              onClick={() => navigate("/about-us")}
            >
              About Us
            </Button>
            <Button
              sx={{
                marginRight: 3,
                fontWeight: "600",
                fontSize: "1em",
                textTransform: "capitalize",
                padding: "10px 15px",
                borderRadius: "40px",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "40px",
                },
              }}
              color="inherit"
              onClick={() => navigate("/contact")}
            >
              Contact
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "2em" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "2em" }}
              onClick={() => navigate("/get-started")}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;

const NavMenuItem = ({ title, items, isMobile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (!isMobile) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="primary"
        onClick={(event) => {
          if (isMobile) {
            // Handle navigation for mobile drawer
            handleMenuItemClick(title, navigate);
          } else {
            handleClick(event);
          }
        }}
        endIcon={!isMobile && <ArrowDropDown />}
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
      {!isMobile && (
        <Menu
          sx={{ borderRadius: "2em" }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {items.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleClose();
                handleMenuItemClick(item, navigate);
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

const handleMenuItemClick = (item, navigate) => {
  switch (item) {
    case "Experts":
      navigate("/allExperts");
      break;
    case "Courses":
      navigate("/all-courses");
      break;
    case "Blogs":
      navigate("/blogs");
      break;
    case "Find Talent":
      navigate("/find-talent");
      break;
    case "Post a Job":
      navigate("/post-job");
      break;
    case "Hiring Solutions":
      navigate("/hiring-solutions");
      break;
    case "Training Programs":
      navigate("/training-programs");
      break;
    case "Certifications":
      navigate("/certifications");
      break;
    case "Resources":
      navigate("/resources");
      break;
    case "Business Solutions":
      navigate("/business-solutions");
      break;
    case "Marketing Services":
      navigate("/marketing-services");
      break;
    case "Consulting":
      navigate("/consulting");
      break;
    default:
      break;
  }
};
