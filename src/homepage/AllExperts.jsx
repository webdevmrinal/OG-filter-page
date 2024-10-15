// AllExperts.jsx

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  IconButton, // Import IconButton
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Header from '../signup-login/Header';
import Footer from '../signup-login/Footer';
import { ExpertCard } from '../ExpertCard';
import GrowthServiceCard from './GrowthServiceCard';
import SearchIcon from '@mui/icons-material/Search'; // Importing Search Icon
import ClearIcon from '@mui/icons-material/Clear'; // Import Clear Icon

// Import manual experts data
import { manualExperts } from './ManualExperts'; // Adjust the path as necessary
import GrowthBenefitsCard from './GrowthBenefitsCard';
// or, if using JSON:
// import manualExperts from '../data/manualexperts.json';

const MainCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  borderRadius: "8px",
  overflow: "hidden",
  margin: 'auto',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  width: '100%',
  "&:hover": {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
    backgroundColor: '#0000000a'
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const Banner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2c489b',
        color: '#fff',
        padding: { xs: '1rem', sm: '2rem 6.3rem 2.1rem 2rem' },
        height: { xs: 'auto', sm: 'auto' },
        borderRadius: 2,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column-reverse',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '44%' },
          textAlign: { xs: 'center', sm: 'left' },
          mr: { sm: 8.85 },
          mb: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2.6rem' } }}
        >
          Stop the guesswork—scale your AI startup with targeted expertise
        </Typography>
        <Typography
          variant="h6"
          sx={{ mt: 3, mb: 3 }}
        >
          Connect, network, and collaborate with the best growth experts and associates to scale your AI startup’s growth.
        </Typography>
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            backgroundColor: '#f9bb02',
            '&:hover': { backgroundColor: '#d6a302' },
            borderRadius: '50px',
            color: 'black',
            fontSize: { xs: '0.7em', sm: '0.9em' },
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          }}
        >
          Book a call with our team
        </Button>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', sm: '49%' },
          mb: { xs: 2, sm: -5 },
        }}
      >
        <img
          src="https://www.opengrowth.com/assets/public/opengrowth/images/banner/experts-banner.png"
          alt="Banner Image"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
};

const AllExperts = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Initialize experts with manual experts data
  const [experts, setExperts] = useState(manualExperts); // For JS import
  // If using JSON:
  // const [experts, setExperts] = useState(manualExperts);

  const [selectedExpert, setSelectedExpert] = useState(null);

  // Manage selected category state
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Manage search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Define chip labels with corresponding filter criteria
  const chipLabels = [
    { label: "All", filter: "All" },
    { label: "Growth experts", filter: "Growth" },
    { label: "AI experts", filter: "AI" },
    { label: "Fractional experts", filter: "Fractional" },
  ];

  // Handle expert click
  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
    // Optionally, navigate to expert's detail page
    // navigate(`/expert/${expert.id}`, { state: { expert } });
  };

  // Handle chip click
  const handleChipClick = (label) => {
    setSelectedCategory(label);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter experts based on selected category and search query
  const filteredExperts = useMemo(() => {
    let filtered = [];

    if (selectedCategory === "All") {
      filtered = experts;
    } else if (selectedCategory === "Growth experts") {
      filtered = experts.filter((expert) =>
        expert.industry.toLowerCase().includes("growth")
      );
    } else if (selectedCategory === "AI experts") {
      filtered = experts.filter((expert) =>
        expert.industry.toLowerCase().includes("ai")
      );
    } else if (selectedCategory === "Fractional experts") {
      filtered = experts.filter((expert) =>
        expert.category.toLowerCase().startsWith("fractional")
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((expert) =>
        expert.name.toLowerCase().includes(query) ||
        expert.about.toLowerCase().includes(query) ||
        expert.industry.toLowerCase().includes(query) ||
        expert.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [experts, selectedCategory, searchQuery]);

  return (
    <Box sx={{ p: 1, pt: 0 }}>
      <Header />
      <Banner />
      <Card
        sx={{
          mt: 4,
          mb: 4,
          p: 3,
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 1, ml: { sm: 2, xs: 0 }, textAlign: 'left', fontSize:"1.65rem" }}
        >
          All Experts
        </Typography>
        <Divider sx={{ mb: 2, width: '98%', ml: { sm: 2, xs: 0 } }} />

        {/* Chips and Search Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            mb: 2,
            px: { sm: 2, xs: 0 },
          }}
        >
          {/* Chips */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {chipLabels.map((chip, index) => (
              <Chip
                key={index}
                label={chip.label}
                variant={selectedCategory === chip.label ? "filled" : "contained"}
                color={selectedCategory === chip.label ? "primary" : "default"}
                onClick={() => handleChipClick(chip.label)}
                sx={{
                  height: '35px',
                  fontSize: '0.9rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>

          {/* Updated Search Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: { xs: 2, sm: 0 }, // Adds margin-top on small screens for spacing
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Find an expert in a specific domain"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                bgcolor: '#fff',
                borderRadius: '50px',
                width: { xs: '100%', sm: '400px' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  height: '2.1em', // Set the desired height here
                  padding: '0 14px', // Adjust padding to control the inner spacing
                },
                '& .MuiInputBase-input': {
                  padding: 0, // Remove default padding
                  height: '100%', // Ensure the input takes the full height
                  fontSize: '0.9rem', // Adjust font size as needed
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear search"
                        onClick={() => setSearchQuery('')}
                        edge="end"
                        size="small"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={() => { /* Optional: Add any additional search functionality here */ }}
              sx={{
                ml: 1, // Adds space between TextField and Button
                bgcolor: '#f9bb02',
                color: '#000',
                height: '2.4em',
                fontWeight: 'bold',
                borderRadius: '50px',
                '&:hover': { bgcolor: '#d6a302' },
                whiteSpace: 'nowrap', // Prevents text from wrapping
              }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {/* Displaying Experts inside the same card */}
        {filteredExperts.length > 0 ? (
          <Grid
            container
            columnSpacing={2}
            rowSpacing={1}
            sx={{
              placeItems: "center",
              placeContent: "center",
              mx: "auto",
              ml: -1,
              py: "1.5em",
              px: "8px",
            }}
          >
            {filteredExperts.map((expert, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={expert.id || index}
                sx={{ px: "4px !important" }}
              >
                <ExpertCard
                  expert={expert}
                  handleExpertClick={handleExpertClick}
                  context="allExperts"
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No experts found matching your criteria.
          </Typography>
        )}
      </Card>
      <GrowthServiceCard context={'allExperts'} />

      {/* Existing GrowthBenefitsCard */}
      <GrowthBenefitsCard />

      <Footer />
    </Box>
  );
};

export default AllExperts;
