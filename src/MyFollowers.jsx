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

const MyFollowers = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const followedProfiles =
      JSON.parse(localStorage.getItem("followedProfiles")) || [];
    setFollowers(followedProfiles);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        My Followers
      </Typography>
      <Divider sx={{ width: "100%", mb: 2, px: 1, ml: 0 }} />
      <Grid container spacing={2}>
        {followers.map((follower) => (
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
