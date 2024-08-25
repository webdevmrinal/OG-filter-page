import React from "react";
import { Typography, Box } from "@mui/material";

const platforms = [
  {
    name: "Competitor Analysis",
    imageLink: null,
  },
  {
    name: "How to plan an MVP",
  },
  {
    name: "How to Pitch Your Startup",
  },
  {
    name: "Competitor Analysis",
    imageLink: null,
  },
];

const experts = [
  {
    name: "Aniisu K. Verghese",
    imageLink: null,
  },
  {
    name: "Dheeraj Prasad",
  },
  {
    name: "Tushar Kansal",
  },
  {
    name: "Vinod Harith",
    imageLink: null,
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

      <Box sx={{ position: "relative", mt: 4 }}>
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
                borderRadius: "0.375rem",
                "&:hover": { bgcolor: "#f7f7f7" },
              }}
            >
              <label
                className="w-full h-full block relative p-2"
                htmlFor={`course-${index}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }} // Added flex layout with gap
              >
                <input type="checkbox" id={`course-${index}`} name="course" />
                <span className="text-sm font-light">
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

      <Box sx={{ position: "relative", marginTop: 8 }}>
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
          {experts.map((expert, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                width: "100%",
                borderRadius: "0.375rem",
                "&:hover": { bgcolor: "#f7f7f7" },
              }}
            >
              <label
                className="w-full h-full block relative p-2"
                htmlFor={`exp-${index}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }} // Applied flex layout with gap
              >
                <input type="checkbox" id={`exp-${index}`} name="exp" />
                <span className="text-sm font-light">
                  {expert.name}
                </span>
                {expert.imageLink && (
                  <img
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    src={expert.imageLink}
                    alt={expert.name}
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
