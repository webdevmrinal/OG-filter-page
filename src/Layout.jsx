import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarTopbarComponent from "./SidebarTopbarComponent.jsx";
import { Box } from "@mui/material";

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Sidebar Component */}
      <SidebarTopbarComponent
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          transition: "margin-left 0.3s ease", // Smooth transition for the margin change
          marginLeft: drawerOpen ? "240px" : "64px", // Adjust margin to push content based on sidebar state
          
          width: `calc(100% - ${drawerOpen ? "240px" : "64px"})`, // Adjust width of content area
          overflowX: "hidden", // Prevent horizontal overflow
          position: "relative", // Ensure it's within normal document flow
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
