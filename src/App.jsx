import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Avatar,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

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

const ScrollableBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  overflowX: "auto",
  padding: theme.spacing(1, 0),
  "&::-webkit-scrollbar": {
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
}));

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedExpert, setSelectedExpert] = useState(null);

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

  // const handleCategoryClick = async (category) => {
  //   if (selectedCategory === category) {
  //     setSelectedCategory(null);
  //     // setExperts([]);
  //   } else {
  //     setSelectedCategory(category);
  //     // setLoading(true);
  //     try {
  //       const response = await axios.post(
  //         "https://academy.opengrowth.com/api/search_mentor",
  //         {
  //           email: "akriti@opengrowth.com",
  //           start: 0,
  //           end: 10,
  //           key: `0_popular_tags_${category}`,
  //           search: category,
  //           search_with: "tags",
  //           action: "",
  //           token: "kKRyYp5DebEw0fP",
  //         }
  //       );
  //       setExperts(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching experts:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      fetchExperts();
    } else {
      setSelectedCategory(category);
      fetchExperts(category);
    }
  };

  const handleExpertClick = (expert) => {
    setSelectedExpert(expert);
  };

  return (
    <Card
      sx={{
        bgcolor: "white",
        borderRadius: "10px",
        boxShadow: 1,
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ p: 2 }}>
        Experts
      </Typography>
      <Divider />
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="div" fontWeight="semibold" fontSize={17}>
          Choose a category:
        </Typography>
        <ScrollableBox>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              color="primary"
              size="small"
              sx={{ flexShrink: 0 }}
              onClick={() => handleCategoryClick(category)}
              endIcon={selectedCategory === category ? <CloseIcon /> : null}
            >
              {category}
            </Button>
          ))}
        </ScrollableBox>
      </Box>
      <Divider />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={5}
          sx={{
            placeItems: "center",
            placeContent: "enter",
            mx: "auto",
            py: "1.5em",
          }}
        >
          {experts.map((expert, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={expert.id}>
              <ExpertCard
                expert={expert}
                onKnowMore={() => handleExpertClick(expert)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <ExpertPopup
        expert={selectedExpert}
        onClose={() => setSelectedExpert(null)}
      />
    </Card>
  );
}

const ExpertCard = ({ expert, onKnowMore }) => {
  console.log(expert);
  return (
    <Card
      sx={{
        width: "20em",
        height: "35em",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: ".8em",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: "60%",
          position: "relative",
          backgroundImage: `url(https://academy.opengrowth.com/assets/images/users/${expert.img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            {expert.slot} slots available
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {expert.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {expert.industry}
          </Typography>
        </Box>
      </CardMedia>
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {expert.about}
        </Typography>
        <Button
          size="small"
          sx={{ mb: 1, fontSize: ".75em", px: 0 }}
          onClick={onKnowMore}
        >
          Know More
        </Button>
        <Box>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={expert.category}
              variant="outlined"
              color="primary"
              size="small"
            />
            <Chip
              label={expert.industry}
              variant="outlined"
              color="secondary"
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const ExpertPopup = ({ expert, onClose }) => {
  if (!expert) return null;

  return (
    <Dialog open={!!expert} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Expert Details</Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Avatar
            src={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
            alt={expert.name}
            sx={{ width: 120, height: 120 }}
          />
          <Box>
            <Typography variant="h5" gutterBottom>
              {expert.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {expert.industry}
            </Typography>
            <Chip label={expert.category} sx={{ mt: 1 }} />
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mt: 3 }}>
          {expert.about}
        </Typography>
        <Link
          to={`/profile/${expert.profile_url}`}
          style={{ textDecoration: "none" }}
          state={{ expertEmail: expert.email }}
        >
          <Button variant="contained" color="primary" sx={{ mt: 3 }}>
            View Profile
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default App;
