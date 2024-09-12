import React from 'react';
import { Box } from '@mui/material';
import { tabLabels } from './Data';

// Import styled components
import { StyledTabs, StyledTab, StyledDivider } from './Data';

export default function TabNavigation({ activeTab, setActiveTab }) {
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <StyledTabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {tabLabels.map((tab) => (
          <StyledTab key={tab.key} label={tab.label} value={tab.key} />
        ))}
      </StyledTabs>
      <StyledDivider />
    </Box>
  );
}
