import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Link,
  Drawer,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ArrowDropDown,
  Menu as MenuIcon,
} from "@mui/icons-material";
import OGLogo from "./assets/OG-Logo.svg";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { title: "Hire", items: ["Find Talent", "Post a Job", "Hiring Solutions"] },
    { title: "Enable", items: ["Training Programs", "Certifications", "Resources"] },
    { title: "Grow", items: ["Business Solutions", "Marketing Services", "Consulting"] },
  ];

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
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Link
          href="#"
          flexGrow={0}
          py={1}
          sx={{
            display: { xs: "flex", md: "block" },
            justifyContent: { xs: "center" },
            alignItems: { xs: "center" },
            width: { xs: "100%", md: "fit-content" },
          }}
        >
          <img
            src={OGLogo}
            alt="OpenGrowth Logo"
            style={{ height: "3.5em" }}
            onClick={() => {
              navigate("/");
            }}
          />
        </Link>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {navItems.map((item, index) => (
            <NavMenuItem key={index} title={item.title} items={item.items} />
          ))}
          <Button
            sx={{
              marginRight: 3,
              fontWeight: "600",
              fontSize: "1em",
              textTransform: "capitalize",
              "&:hover": {
                background: "transparent",
                textDecoration: "underline",
              },
            }}
            color="inherit"
            TouchRippleProps={{ style: { color: "transparent" } }}
          >
            About Us
          </Button>
          <Button
            sx={{
              marginRight: 3,
              fontWeight: "600",
              fontSize: "1em",
              textTransform: "capitalize",
              "&:hover": {
                background: "transparent",
                textDecoration: "underline",
              },
            }}
            color="inherit"
            TouchRippleProps={{ style: { color: "transparent" } }}
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
        </Box>
      </Toolbar>

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
          <Box sx={{ padding: "2.5em 1em", display: "flex", flexDirection: "column", gap: "1.5em" }}>
            {navItems.map((item, index) => (
              <NavMenuItem key={index} title={item.title} items={item.items} />
            ))}
            <Button
              sx={{
                marginRight: 3,
                fontWeight: "600",
                fontSize: "1em",
                textTransform: "capitalize",
                "&:hover": {
                  background: "transparent",
                  textDecoration: "underline",
                },
              }}
              color="inherit"
              TouchRippleProps={{ style: { color: "transparent" } }}
            >
              About Us
            </Button>
            <Button
              sx={{
                marginRight: 3,
                fontWeight: "600",
                fontSize: "1em",
                textTransform: "capitalize",
                "&:hover": {
                  background: "transparent",
                  textDecoration: "underline",
                },
              }}
              color="inherit"
              TouchRippleProps={{ style: { color: "transparent" } }}
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
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;

const NavMenuItem = ({ title, items }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          "&:hover": { background: "transparent", textDecoration: "underline" },
        }}
        TouchRippleProps={{ style: { color: "transparent" } }}
      >
        {title}
      </Button>
      <Menu
        sx={{ borderRadius: "2em" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};