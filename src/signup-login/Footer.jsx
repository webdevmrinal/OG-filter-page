import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import OGLogo from "./assets/OG-Logo.svg";

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      items: ["About Us", "Contact Us", "Complaints & Queries"],
    },
    {
      title: "Products",
      items: ["Mentorship", "Startup Services", "OpenGrowth Hub"],
    },
    {
      title: "Resources",
      items: [
        "Help & Support",
        "Sitemap",
        "Terms & Conditions",
        "Privacy & Cookies Policy",
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#f8f9fa", py: 5, borderTop: "2px solid lightgray" }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={3}>
            <Box
              mb={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img
                src={OGLogo}
                alt="OpenGrowth Logo"
                style={{ height: "3.5em", marginRight: 8 }}
              />
            </Box>
          </Grid>
          {footerSections.map((section) => (
            <Grid item xs={12} sm={3} key={section.title}>
              <Typography
                variant="subtitle1"
                color="text.primary"
                fontWeight={"600"}
                sx={{ textTransform: "uppercase" }}
                gutterBottom
                textAlign={"center"}
              >
                {section.title}
              </Typography>
              {section.items.map((item) => (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={12}
                  key={item}
                  // sx={{ textTransform: "uppercase" }}
                  textAlign={"center"}
                >
                  <Link href="#" color="inherit" underline="hover">
                    {item}
                  </Link>
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 3, bgcolor: "text.primary" }} />
        <Box
          mt={5}
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          sx={{
            justifyContent: {
              xs: "center",
              md: "space-between",
            },
          }}
        >
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Typography variant="body2" color="text.secondary" mr={3}>
              India
            </Typography>
            {["Terms of Service", "Privacy Policy", "Sitemap"].map((item) => (
              <Typography
                variant="body2"
                color="text.secondary"
                key={item}
                mr={3}
              >
                <Link href="#" color="inherit" underline="hover">
                  {item}
                </Link>
              </Typography>
            ))}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map(
              (Icon, index) => (
                <IconButton
                  key={index}
                  aria-label={`social media ${index}`}
                  size="small"
                  sx={{
                    border: "2px solid",
                    borderColor: "text.primary",
                    borderRadius: "50%",
                    padding: "8px",
                    marginLeft: "8px",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <Icon fontSize="small" color="primary" />
                </IconButton>
              )
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
