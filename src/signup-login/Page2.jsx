import React from "react";
import { Typography, Box, Grid } from "@mui/material";

const platforms = [
  {
    name: "No, I'm not using any platform",
    imageLink: null,
  },
  {
    name: "Square",
    imageLink:
      "https://shopify-assets.shopifycdn.com/shopifycloud/shopify/assets/signup_questions/icons/square-c3f5d2ed189e39db4c52a63b8394031fbf5aa3495225449ff76f9cdbc10039b8.svg",
  },
  {
    name: "Amazon",
    imageLink:
      "https://shopify-assets.shopifycdn.com/shopifycloud/shopify/assets/signup_questions/icons/amazon-6f5c72e2af68c01f1febdcb1ac71b71394e89a2fb00d2eb5fbb27fbdb48ea6fc.svg",
  },
  {
    name: "Etsy",
    imageLink:
      "https://shopify-assets.shopifycdn.com/shopifycloud/shopify/assets/signup_questions/icons/etsy-ab3317744e7d923a44bcbea8b1f3f6fd84a5b8aff1c18edab99c3d741b805b5d.svg",
  },
];

function Page2() {
  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        sx={{ pt: 1.5, fontWeight: "bold", color: "#303030" }}
      >
        I'm interested in courses categories
      </Typography>
      <Typography variant="body2" sx={{ color: "#616161" }}>
        Do you already sell through a POS, marketplace, or ecommerce platform?
        We can help you import your store.
      </Typography>

      <Box sx={{ position: "relative", mt: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
          Courses
        </Typography>
        <Box
          component="ul"
          sx={{
            width: "100%",
            pb: 4,
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(2, 1fr)",
            maxHeight: 224,
            overflowY: "auto",
            padding: 0,
            listStyle: "none",
          }}
        >
          {platforms.map((platform, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                width: "100%",
                border: "1px solid #e0e0e0",
                borderRadius: "0.375rem",
                "&:hover": { bgcolor: "#f7f7f7" },
              }}
            >
              <label
                className="w-full h-full block radio relative p-2"
                htmlFor={`course-${index}`}
              >
                <input type="radio" id={`course-${index}`} name="course" />
                <span className="text-sm font-light inline-block w-full h-full py-5">
                  {platform.name}
                </span>
                {platform.imageLink && (
                  <img
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src={platform.imageLink}
                    alt={platform.name}
                  />
                )}
              </label>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ position: "relative", mt: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
          Experts
        </Typography>
        <Box
          component="ul"
          sx={{
            width: "100%",
            pb: 4,
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(2, 1fr)",
            maxHeight: 224,
            overflowY: "auto",
            padding: 0,
            listStyle: "none",
          }}
        >
          {platforms.map((platform, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                width: "100%",
                border: "1px solid #e0e0e0",
                borderRadius: "0.375rem",
                "&:hover": { bgcolor: "#f7f7f7" },
              }}
            >
              <label
                className="w-full h-full block radio relative p-2"
                htmlFor={`exp-${index}`}
              >
                <input type="radio" id={`exp-${index}`} name="exp" />
                <span className="text-sm font-light inline-block w-full h-full py-5">
                  {platform.name}
                </span>
                {platform.imageLink && (
                  <img
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src={platform.imageLink}
                    alt={platform.name}
                  />
                )}
              </label>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Page2;
