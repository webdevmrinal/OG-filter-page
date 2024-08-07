import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, Button, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import Header from './Header';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 445,
    height: 350,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: "0.3s",
    '&:hover': {
      transform: "translateY(-3px)",
      boxShadow: theme.shadows[6],
    },
}));

const HeadingBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  borderRadius: '5px',
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  marginLeft: '16px'
}));

const MyConnections = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

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
            end: 10,
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
            end: 10,
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

  if (loading) {
    return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  }

  const truncateText = (text, maxLength = 150) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 2, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
          <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
            My Connections
          </Typography>
        <Grid container spacing={2} justifyContent="center">
          {experts.map((expert, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <StyledCard>
                <Avatar src={`https://academy.opengrowth.com/assets/images/users/${expert.img}`} alt={expert.name} sx={{ width: 90, height: 90, margin: 'auto' }} />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {expert.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truncateText(expert.about)}
                  </Typography>
                  <Typography variant="body2">
                    Interactions: 9 {/* Assuming 'interactions' is part of your data */}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Know More
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default MyConnections;
