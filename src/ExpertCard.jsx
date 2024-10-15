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
import { MainCard, NameBox } from "./Experts/Components/ExpertStyle"; // Ensure the correct path
import { Link } from "react-router-dom";

export const ExpertCard = ({ expert, handleExpertClick, context, loading, role }) => {
  const theme = useTheme();
  console.log(expert);

  // Helper function to check if a URL is absolute
  const isAbsoluteURL = (url) => /^https?:\/\//i.test(url);

  // Guard for empty `expert` prop to prevent rendering empty components
  if (!expert && !loading) {
    return null;
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

  // Determine the correct image URL
  const imageUrl = isAbsoluteURL(expert.img)
    ? expert.img
    : `https://academy.opengrowth.com/assets/images/users/${expert.img}`;

  return (
    <MainCard
      sx={{
        height: context === "carousel" ? "20em" : "27em",
        margin: context === "carousel" ? 0 : '0px 6px 12px 6px',
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: context === "carousel" ? "100%" : "65%",
          position: "relative",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Link
           to={
            context === "expertPage"
              ? `/profile/${expert?.profile_url}`
              : context === "myConnection"
              ? `/detail/${expert?.profile_url}`
              : `/expert-profile/${expert?.profile_url}`
          } // Updated Link Path
          style={{ textDecoration: "none" }}
          state={{ expertEmail: expert?.email }}
        >
          {expert?.name && (
            <NameBox
              sx={
                context === "allExperts"
                  ? { position: "relative", top: { sm: "220px", xs: "232px" }, py: 2, height: '50px' }
                  : context === "carousel"
                  ? { position: "relative", top: "250px", pb: 0.5 }
                  : {}
              }
            >
              <Typography variant="subtitle1" align="center">
                {expert.name}
              </Typography>
              {/* Display category instead of industry */}
              <Typography
                variant="body2"
                align="center"
                sx={{ fontSize: "0.75rem" }}
              >
                {expert.category}
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
                  sx={{ color: "white", textTransform: 'none' }}
                >
                  Book a discovery call
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
            <Box sx={{ mt: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {/* If role is provided, display it as a Chip; else, display categories and industry */}
                {role ? (
                  <Chip
                    label={role}
                    variant="outlined"
                    color={
                      role === "AI Expert"
                        ? "primary"
                        : role === "Growth Expert"
                        ? "success"
                        : "secondary"
                    }
                    size="small"
                  />
                ) : (
                  <>
                    {expert.category &&
                      expert.category.split(",").map((cat, index) => (
                        <Chip
                          key={index}
                          label={cat.trim()}
                          variant="outlined"
                          color="primary"
                          size="small"
                        />
                      ))}
                    {expert.industry && (
                      <Chip
                        label={expert.industry}
                        variant="outlined"
                        color="secondary"
                        size="small"
                      />
                    )}
                  </>
                )}
              </Box>
            </Box>
          )}
        </CardContent>
      )}
    </MainCard>
  );
};

export default ExpertCard;
