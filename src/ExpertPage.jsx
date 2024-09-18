import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CircularProgress,
  Grid,
  
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { ScrollableBox, CategoryButton} from "./Experts/Components/ExpertStyle";
import { ExpertPopup } from "./ExpertPopup";
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

function ExpertPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const perPage = 8;

  const fetchExperts = async (category = null, pageIndex = 0, reset = false) => {
    setLoading(true);
    const startIndex = pageIndex * perPage;
    const endIndex = startIndex + perPage;
    try {
      let response;
      if (category) {
        response = await axios.post("https://academy.opengrowth.com/api/search_mentor", {
          email: "akriti@opengrowth.com",
          start: startIndex,
          end: endIndex,
          key: `0_popular_tags_${category}`,
          search: category,
          search_with: "tags",
          action: "",
          token: "kKRyYp5DebEw0fP",
        });
      } else {
        response = await axios.post("https://academy.opengrowth.com/api/get_all_mentors", {
          id: "akriti@opengrowth.com",
          start: startIndex,
          end: endIndex,
          key: `0_all_mentors_${startIndex}_to_${endIndex}`,
        });
      }
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
    fetchExperts(selectedCategory, page, reset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, page]);

  useEffect(() => {
    if (selectedCategory) {
      const newCategories = [
        selectedCategory,
        ...categories.filter((category) => category !== selectedCategory),
      ];
      setCategories(newCategories);
    } else {
      setCategories(initialCategories);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setPage(0);
  };

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
        Experts
      </Typography>
      <Divider sx={{ width: "98%", ml: 2 }} />
      <Box sx={{ px: 2, py: 1, overflow: "hidden", pl: 2 }}>
        <Typography variant="div" fontWeight="semibold" fontSize={17} sx={{ pl: 0.5 }}>
          Choose a category:
        </Typography>
        <ScrollableBox>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              active={selectedCategory === category}
              variant="contained"
              size="small"
              sx={{ flexShrink: 0 }}
              onClick={() => handleCategoryClick(category)}
              endIcon={selectedCategory === category ? <CloseIcon /> : null}
            >
              {category}
            </CategoryButton>
          ))}
        </ScrollableBox>
      </Box>
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
            {experts.map((expert) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={expert.id}
                sx={{ px: "4px !important" }}
              >
                <ExpertCard expert={expert} handleExpertClick={handleExpertClick} context="expertPage" />
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
      <ExpertPopup expert={selectedExpert} onClose={() => setSelectedExpert(null)} />
    </Card>
  );
}

export default ExpertPage;
