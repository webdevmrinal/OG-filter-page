// ExpertCard.jsx
import React from "react";
import { useTheme } from "@mui/system";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Chip,
  Skeleton,
} from "@mui/material";
import { MainCard, NameBox } from "./Experts/Components/ExpertStyle";
import { Link } from "react-router-dom";

export const ExpertCard = ({ expert, handleExpertClick, context, loading }) => {
  const theme = useTheme();

  // Guard for empty `expert` prop to prevent rendering empty components
  if (!expert && !loading) {
    return null; // Prevent rendering if `expert` is null and it's not in the loading state
  }

  // Loading Skeleton
  if (loading) {
    return (
      <MainCard
        sx={{
          height: context === "carousel" ? "20em" : "27em",
          bgcolor: "#f5f5f5",
        }}
      >
        <CardMedia
          component="div"
          sx={{
            height: context === "carousel" ? "100%" : "65%",
            position: "relative",
            backgroundColor: "#e0e0e0",
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{ bgcolor: "#e0e0e0" }}
            aria-hidden="true"
          />
        </CardMedia>
        {context !== "carousel" && (
          <CardContent sx={{ padding: '0px', mt: 1.5, ml: 1 }}>
            <Skeleton
              variant="text"
              height={30}
              width="60%"
              animation="wave"
              sx={{ bgcolor: "#e0e0e0" }}
              aria-hidden="true"
            />
            <Skeleton
              variant="text"
              height={20}
              width="40%"
              sx={{ mt: 0.5, bgcolor: "#e0e0e0" }}
              animation="wave"
              aria-hidden="true"
            />
            <Skeleton
              variant="text"
              height={20}
              width="80%"
              sx={{ mt: 1, bgcolor: "#e0e0e0" }}
              animation="wave"
              aria-hidden="true"
            />
            <Skeleton
              variant="rectangular"
              height={30}
              width="40%"
              sx={{ mt: 1, bgcolor: "#e0e0e0" }}
              animation="wave"
              aria-hidden="true"
            />
            <Skeleton
              variant="rectangular"
              height={20}
              width="30%"
              sx={{ mt: 1, bgcolor: "#e0e0e0" }}
              animation="wave"
              aria-hidden="true"
            />
          </CardContent>
        )}
      </MainCard>
    );
  }

  // Split and format categories and industry
  const categoriesWithIndustry = expert?.category
    ? expert.category.split(",").concat(expert.industry)
    : [expert.industry];
  const uniqueCategories = Array.from(
    new Set(categoriesWithIndustry?.map((cat) => cat.trim().toLowerCase()))
  ).map((cat) => cat.charAt(0).toUpperCase() + cat.slice(1));

  // Find industry and categories
  const industryChip = uniqueCategories.find(
    (cat) => cat.toLowerCase() === expert.industry.toLowerCase()
  );
  const categoryChips = uniqueCategories
    .filter((cat) => cat.toLowerCase() !== expert.industry.toLowerCase())
    .slice(0, 1); // Show only 1 category

  return (
    <MainCard
      sx={{
        height: context === "carousel" ? "20em" : "27em",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: context === "carousel" ? "100%" : "65%",
          position: "relative",
          backgroundImage: `url(https://academy.opengrowth.com/assets/images/users/${expert?.img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Link
          to={
            context === "myConnection"
              ? `/detail/${expert?.profile_url}`
              : context === "allExperts" || context === "carousel"
              ? `/expert-profile/${expert?.profile_url}`
              : `/profile/${expert?.profile_url}`
          }
          style={{ textDecoration: "none" }}
          state={{ expertEmail: expert?.email }}
        >
          {expert?.name && (
            <NameBox
              sx={
                context === "allExperts"
                  ? { position: "relative", top: "220px" }
                  : {}
              }
            >
              <Typography variant="subtitle1" align="center">
                {expert.name}
              </Typography>
              <Typography
                variant="body2"
                align="center"
                sx={{ fontSize: "0.75rem" }}
              >
                {expert.industry}
              </Typography>
            </NameBox>
          )}
        </Link>
      </CardMedia>

      {context !== "carousel" && expert && (
        <CardContent
          sx={{
            padding: "0px",
            mt: 2,
            ml: 1,
            height: { sm: "35%", xs: "auto" },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {expert?.about}
          </Typography>
          <Button
            size="small"
            sx={{ mb: 0.5, fontSize: ".75em", px: 0 }}
            onClick={() => handleExpertClick(expert)}
          >
            Know More
          </Button>
          {context === "allExperts" ? (
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 5 }}
                onClick={() => handleExpertClick(expert)}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "white" }}
                >
                  Request a Call
                </Typography>
              </Button>
            </Box>
          ) : context === "myConnection" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: "bold" }}
              >
                Interactions: 9
              </Typography>
              <Rating name="read-only" value={3.5} readOnly />
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {categoryChips.map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                ))}
                <Chip
                  label={industryChip}
                  variant="outlined"
                  color="secondary"
                  size="small"
                />
              </Box>
            </Box>
          )}
        </CardContent>
      )}
    </MainCard>
  );
};
