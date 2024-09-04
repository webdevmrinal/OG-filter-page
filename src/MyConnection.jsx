import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button, CircularProgress, Box, Tab, Tabs, Divider, Rating } from '@mui/material';
import axios from 'axios';
import { styled, useTheme } from '@mui/system';
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  width: 445,
  height: 450,
  margin: theme.spacing(2),
  boxShadow: theme.shadows[3],
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  transition: "0.3s",
  '&:hover': {
    transform: "translateY(-3px)",
    boxShadow: theme.shadows[6],
    backgroundColor: '#0000000a',
  },
}));

const ExpertCard = styled(Card)(({ theme }) => ({
  width: '29em',
  height: '32em',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
  marginBottom: theme.spacing(4),
  '&:hover': {
    transform: "translateY(-3px)",
    boxShadow: theme.shadows[6],
    backgroundColor: '#0000000a',
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    height: '29em',
    marginLeft: '0px',
  },
  [theme.breakpoints.between('md')]: {
    width: 'auto',  // For tablets like iPads in portrait mode
    height: '27em',
    marginLeft: '15px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '18em',
    height: '22em',
  },
}));

const MyConnections = () => {
  const theme = useTheme();
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchExperts = useCallback(async (category = null) => {
    setLoading(true);
    try {
      let response;
      if (category) {
        response = await axios.post(
          "https://academy.opengrowth.com/api/search_mentor",
          {
            email: "akriti@opengrowth.com",
            start: 0,
            end: 12,
            key: `0_popular_tags_${category}`,
            search: category,
            search_with: "tags",
            action: "",
            token: "kKRyYp5DebEw0fP",
          }
        );
      } else {
        response = await axios.post(
          "https://academy.opengrowth.com/api/get_all_mentors",
          {
            id: "akriti@opengrowth.com",
            start: 0,
            end: 12,
            key: "0_all_mentors_0_to_10",
          }
        );
      }
      console.log('API Response:', response.data);
      setExperts(response.data);
    } catch (error) {
      console.error("Error fetching experts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  const truncateText = (text, maxLength = 100) => {
    return text?.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  }

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 4 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="My Connections" />
        </Tabs>
      </Box>
      <Grid container spacing={1} justifyContent="center">
        {experts.map((expert, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Link
              to={`/detail/${expert.profile_url}`}
              style={{ textDecoration: "none" }}
              state={{ expertEmail: expert.email }}
            >
              <ExpertCard>
                <CardMedia
                  component="img"
                  image={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
                  alt={expert.name}
                  sx={{ height: 330, width: '100%', objectFit: 'cover', [theme.breakpoints.down('sm')]: { height: '275px' } }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {expert.name}
                  </Typography>
                  <Divider sx={{ width: '92%', mb: 1, alignSelf: 'center' }} />
                  <Typography variant="body2" color="text.secondary">
                    {truncateText(expert.about, 100)}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      Interactions: 9
                    </Typography>
                    <Button color="primary">
                      Know More
                    </Button>
                  </Box>
                  <Box sx={{ mt: -1, display: 'flex', alignItems: 'center' }}>
                    <Rating name="read-only" value={3.5} readOnly />
                  </Box>
                </CardContent>
              </ExpertCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyConnections;
