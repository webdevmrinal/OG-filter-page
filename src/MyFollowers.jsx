// MyFollowers.jsx
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Grid,
  Box,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { FollowerCard } from "./Experts/Components/FollowerStyle";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

// Shimmer Components
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

const Shimmer = ({ width = "100%", height = 100 }) => (
  <ShimmerWrapper style={{ width, height }}>
    <ShimmerEffect />
  </ShimmerWrapper>
);

const MyFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading delay (e.g., fetching data)
    const fetchFollowers = () => {
      const followedProfiles =
        JSON.parse(localStorage.getItem("followedProfiles")) || [];
      setFollowers(followedProfiles);
      setLoading(false); // Data loaded
    };

    // Simulate a delay of 1.5 seconds
    const timer = setTimeout(fetchFollowers, 500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        My Followers
      </Typography>
      <Divider sx={{ width: "100%", mb: 2, px: 1, ml: 0 }} />
      <Grid container spacing={2}>
        {loading
          ? // Render shimmer placeholders while loading
            Array.from({ length: 6 }, (_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FollowerCard>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Shimmer width={90} height={90} />
                    <Box sx={{ flexGrow: 1, ml: 2 }}>
                      <Shimmer width="60%" height={20} />
                      <Box sx={{ mt: 1 }}>
                        <Shimmer width="40%" height={15} />
                        <Shimmer width="80%" height={15} sx={{ mt: 0.5 }} />
                      </Box>
                      <Shimmer width="30%" height={15} sx={{ mt: 1 }} />
                      <Shimmer width="50%" height={15} sx={{ mt: 0.5 }} />
                      <Shimmer width="40%" height={15} sx={{ mt: 1 }} />
                    </Box>
                  </Box>
                </FollowerCard>
              </Grid>
            ))
          : // Render actual follower cards when data is loaded
            followers.map((follower) => (
              <Grid item xs={12} sm={6} md={4} key={follower.email}>
                <FollowerCard>
                  <Avatar
                    src={`https://academy.opengrowth.com/assets/images/users/${follower.img}`}
                    alt={follower.name}
                    sx={{ width: 90, height: 90, mr: 2, mt: 1 }}
                  />
                  <Box sx={{ p: 0 }}>
                    <Typography variant="h6">{follower.name}</Typography>
                    <Typography variant="subtitle1" color="text.primary">
                      {follower.experience}
                    </Typography>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {follower.about}
                      </Typography>
                      <MuiLink
                        component={Link}
                        to={`/profile/${follower.profile_url}`}
                        state={{ expertEmail: follower.email }}
                        variant="body2"
                        sx={{ textDecoration: "none", ml: 0 }}
                      >
                        Know more
                      </MuiLink>
                    </Box>
                  </Box>
                </FollowerCard>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default MyFollowers;
