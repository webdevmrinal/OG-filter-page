import React from "react";
import { Typography, Box } from "@mui/material";

const platforms = [
  {
    name: "Leadership",
    imageLink: null,
  },
  {
    name: "Product",
  },
  {
    name: "Marketing",
  },
  {
    name: "Strategy",
    imageLink: null,
  },
];

const experts = [
  {
    name: "Demand Engagement",
    imageLink: null,
  },
  {
    name: "Artificial Intelligence",
  },
  {
    name: "Human Resource",
  },
  {
    name: "Enterpreneurship",
    imageLink: null,
  },
];

function Page2() {
  return (
    <Box sx={{pb: 10}}>
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

      {/* Courses Section in a Box */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
          Courses
        </Typography>
        <Box
          component="ul"
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: "repeat(2, 1fr)",
            maxHeight: 224,
            overflowY: "auto",
            listStyle: "none",
            p: 0,
            mt: 3,
          }}
        >
          {platforms.map((platform, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                border: '0.5px solid #e0e0e0',
                borderRadius: '0.375rem',
                p: 2,
                "&:hover": { bgcolor: "#f7f7f7" },
              }}
            >
              <label
                htmlFor={`course-${index}`}
                sx={{ display: 'flex', alignItems: 'center', gap: '20px', p: 2, width: '100%' }}
              >
                <input type="checkbox" id={`course-${index}`} name="course" />
                <span>&nbsp;{platform.name}</span>
                {platform.imageLink && (
                  <img
                    src={platform.imageLink}
                    alt={platform.name}
                    style={{ position: 'absolute', right: 16, transform: 'translateY(-50%)', top: '50%' }}
                  />
                )}
              </label>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Experts Section in a Box */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
          Experts
        </Typography>
        <Box
          component="ul"
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: "repeat(2, 1fr)",
            maxHeight: 224,
            overflowY: "auto",
            listStyle: "none",
            p: 0,
            mt: 3,
          }}
        >
          {experts.map((expert, index) => (
            <Box
              component="li"
              key={index}
              sx={{
                border: '0.5px solid #e0e0e0',
                borderRadius: '0.375rem',
                p: 2,
                "&:hover": { bgcolor: "#f7f7f7" },
              }}
            >
              <label
                htmlFor={`exp-${index}`}
                sx={{ display: 'flex', alignItems: 'center', gap: '20px', p: 2, width: '100%' }}
              >
                <input type="checkbox" id={`exp-${index}`} name="exp" />
                <span>&nbsp;{expert.name}</span>
                {expert.imageLink && (
                  <img
                    src={expert.imageLink}
                    alt={expert.name}
                    style={{ position: 'absolute', right: 16, transform: 'translateY(-50%)', top: '50%' }}
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
