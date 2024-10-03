// MyFollowers.jsx
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Grid,
  Box,
  Divider,
  Link as MuiLink,
  Skeleton, // Import Skeleton
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { FollowerCard } from "./Experts/Components/FollowerStyle";

const MyFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state (optional)

  useEffect(() => {
    // Simulate fetching followers from localStorage with a delay
    const fetchFollowers = () => {
      try {
        const followedProfiles =
          JSON.parse(localStorage.getItem("followedProfiles")) || [];
        setFollowers(followedProfiles);
      } catch (err) {
        setError("Failed to load followers. Please try again later.");
      } finally {
        setLoading(false); // Data loaded
      }
    };

    // Simulate a delay of 0.5 seconds
    const timer = setTimeout(fetchFollowers, 500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <>
          {/* Shimmer for Heading */}
          <Box sx={{ mb: 2 }}>
            <Skeleton
              variant="text"
              width="30%"
              height={30}
              aria-hidden="true"
            />
          </Box>

          {/* Shimmer for Divider */}
          <Box sx={{ width: "100%", height: 2, mb: 2 }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              aria-hidden="true"
            />
          </Box>

          {/* Shimmer Placeholders for Follower Cards */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {Array.from({ length: 6 }, (_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FollowerCard sx={{ borderRadius: 1 }}> {/* Added borderRadius */}
                  {/* Shimmer for Avatar and Text */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={90}
                      height={90}
                      aria-hidden="true"
                    />
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                      {/* Shimmer for Name */}
                      <Skeleton
                        variant="text"
                        width={120} // Changed from "60%" to 120px
                        height={20}
                        sx={{ mb: 1 }}
                        aria-hidden="true"
                      />
                      {/* Shimmer for Experience */}
                      <Skeleton
                        variant="text"
                        width={80} // Changed from "40%" to 80px
                        height={15}
                        aria-hidden="true"
                      />
                    </Box>
                  </Box>

                  {/* Shimmer for About Text */}
                  <Box>
                    <Skeleton
                      variant="text"
                      width="80%" // Can be kept as percentage or adjusted
                      height={15}
                      sx={{ mb: 1 }}
                      aria-hidden="true"
                    />
                    <Skeleton
                      variant="text"
                      width="70%" // Can be kept as percentage or adjusted
                      height={15}
                      aria-hidden="true"
                    />
                  </Box>

                  {/* Shimmer for "Know more" link */}
                  <Box>
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={15}
                      aria-hidden="true"
                    />
                  </Box>
                </FollowerCard>
              </Grid>
            ))}
          </Grid>
        </>
      ) : error ? (
        // Optional: Display error message if data fetching fails
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : followers.length === 0 ? (
        // Optional: Display message if no followers are found
        <Typography variant="body1">You have no followers yet.</Typography>
      ) : (
        <>
          {/* Heading */}
          <Typography variant="h6" gutterBottom>
            My Followers
          </Typography>

          {/* Divider */}
          <Divider sx={{ width: "100%", mb: 2, px: 1, ml: 0 }} />

          {/* Follower Cards */}
          <Grid container spacing={2}>
            {followers.map((follower) => (
              <Grid item xs={12} sm={6} md={4} key={follower.email}>
                <FollowerCard sx={{ borderRadius: 1 }}> {/* Added borderRadius */}
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
        </>
      )}
    </Box>
  );
};

export default MyFollowers;
