import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarTopbarComponent from "./SidebarTopbarComponent.jsx";
import { Box } from "@mui/material";

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Box>
      <SidebarTopbarComponent
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      {console.log(drawerOpen)}
      <Box
        component="main"
        sx={{
          marginLeft: drawerOpen ? "240px" : "64px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
