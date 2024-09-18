import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  Chip,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { ExpertCard } from "./ExpertCard";

const initialCategories = [
  "Expert",
  "Fractional",
  "Demand Engagement",
  "Artificial Intelligence",
  "Entrepreneur",
  "Human Resource",
  "Data Science",
  "Finance",
  "Leadership",
  "Marketing",
  "Seasoned Entrepreneur",
];

function MyConnection() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const perPage = 8;

  const fetchExperts = async (pageIndex = 0, reset = false) => {
    setLoading(true);
    const startIndex = pageIndex * perPage;
    const endIndex = startIndex + perPage;
    try {
      const response = await axios.post(
        "https://academy.opengrowth.com/api/get_all_mentors",
        {
          id: "akriti@opengrowth.com",
          start: startIndex,
          end: endIndex,
          key: `0_all_mentors_${startIndex}_to_${endIndex}`,
        }
      );
      const newExperts = response.data;
      if (reset) {
        setExperts(newExperts);
        setHasMore(true);
      } else {
        setExperts((prevExperts) => [...prevExperts, ...newExperts]);
      }
      if (newExperts.length < perPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching experts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const reset = page === 0;
    fetchExperts(page, reset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Card
      sx={{
        bgcolor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "auto",
        position: "relative",
        p: 1,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ px: 2, pt: 1 }}>
        My Connection
      </Typography>
      <Divider sx={{ width: "98%", ml: 2 }} />
      {loading && experts.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid
            container
            columnSpacing={2}
            rowSpacing={1}
            sx={{
              placeItems: "center",
              placeContent: "center",
              mx: "auto",
              py: "1.5em",
              px: "8px",
            }}
          >
            {experts.map((expert, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={expert.id}
                sx={{ px: "4px !important" }}
              >
                <ExpertCard expert={expert} handleExpertClick={handleExpertClick} context="myConnection" />
              </Grid>
            ))}
          </Grid>
          {loading && experts.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {hasMore && !loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Button variant="contained" onClick={handleLoadMore}>
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
      
    </Card>
  );
}


export default MyConnection;
