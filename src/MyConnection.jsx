// MyConnection.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  Grid,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { ExpertCard } from "./ExpertCard";
import { styled } from "@mui/system";

// Shimmer Components (if not already defined elsewhere)
const ShimmerWrapper = styled("div")({
  overflow: "hidden",
  position: "relative",
  backgroundColor: "#f6f7f8",
  borderRadius: 8,
});

const ShimmerEffect = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  animation: "shimmer 1.5s infinite linear",
  background: `linear-gradient(to right, ${theme.palette.background.default} 0%, #e0e0e0 50%, ${theme.palette.background.default} 100%)`,
  backgroundSize: "200% 100%",
  "@keyframes shimmer": {
    "0%": {
      backgroundPosition: "-100% 0",
    },
    "100%": {
      backgroundPosition: "100% 0",
    },
  },
}));

const Shimmer = ({ width = "100%", height = 100, borderRadius = 8, sx = {} }) => (
  <ShimmerWrapper style={{ width, height, borderRadius }} sx={sx}>
    <ShimmerEffect />
  </ShimmerWrapper>
);

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
        My Network
      </Typography>
      <Divider sx={{ width: "98%", ml: 2 }} />
      
      <Grid
        container
        columnSpacing={2}
        rowSpacing={1}
        sx={{
          placeItems: "center",
          placeContent: "center",
          py: "1.5em",
          pl: { xs: 1, sm: 2 },
        }}
      >
        {loading && experts.length === 0
          ? // Initial Loading: Render multiple ExpertCards with loading=true
            Array.from(new Array(perPage)).map((_, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`skeleton-${index}`}
                sx={{ pl: "4px !important" }}
              >
                <ExpertCard loading={true} context="myConnection" />
              </Grid>
            ))
          : // Render actual ExpertCards
            experts.map((expert) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={expert.id}
                sx={{ pl: "4px !important" }}
              >
                <ExpertCard
                  expert={expert}
                  handleExpertClick={handleExpertClick}
                  context="myConnection"
                  loading={false}
                />
              </Grid>
            ))}
      </Grid>

      {loading && experts.length > 0 && (
        <Grid
          container
          columnSpacing={2}
          rowSpacing={1}
          sx={{
            placeItems: "center",
            placeContent: "center",
            py: "1.5em",
            pl: { xs: 1, sm: 2 },
          }}
        >
          {/* Loading More: Render shimmer ExpertCards */}
          {Array.from(new Array(perPage)).map((_, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`loadmore-skeleton-${index}`}
              sx={{ pl: "4px !important" }}
            >
              <ExpertCard loading={true} context="myConnection" />
            </Grid>
          ))}
        </Grid>
      )}

      {hasMore && !loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}

      {/* Optional: Render a Dialog if needed */}
      {selectedExpert && (
        <Dialog
          open={Boolean(selectedExpert)}
          onClose={() => setSelectedExpert(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {selectedExpert.name}
            <IconButton
              aria-label="close"
              onClick={() => setSelectedExpert(null)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                src={`https://academy.opengrowth.com/assets/images/users/${selectedExpert.img}`}
                alt={selectedExpert.name}
                sx={{ width: 90, height: 90, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">{selectedExpert.name}</Typography>
                <Typography variant="subtitle1" color="text.primary">
                  {selectedExpert.experience}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1">{selectedExpert.about}</Typography>
            {/* Add more details as needed */}
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

export default MyConnection;
