import React, { useState, useEffect } from "react";
import { Typography, Box, Checkbox, FormControlLabel } from "@mui/material";

const platforms = [
  { name: "Leadership", imageLink: null },
  { name: "Product" },
  { name: "Marketing" },
  { name: "Strategy", imageLink: null },
];

const experts = [
  { name: "Demand Engagement", imageLink: null },
  { name: "Artificial Intelligence" },
  { name: "Human Resource" },
  { name: "Entrepreneurship", imageLink: null },
];

function Page2({ data, onDataChange, reset }) { // Accept the reset prop
  const [selectedCourses, setSelectedCourses] = useState(data.courses || []);
  const [selectedExperts, setSelectedExperts] = useState(data.experts || []);

  // Handler for selecting/deselecting a course by name
  const handleSelectCourse = (name) => {
    let newSelected;
    if (selectedCourses.includes(name)) {
      newSelected = selectedCourses.filter(course => course !== name);
    } else {
      newSelected = [...selectedCourses, name];
    }
    setSelectedCourses(newSelected);
    onDataChange({ courses: newSelected, experts: selectedExperts });
  };

  // Handler for selecting/deselecting an expert by name
  const handleSelectExpert = (name) => {
    let newSelected;
    if (selectedExperts.includes(name)) {
      newSelected = selectedExperts.filter(expert => expert !== name);
    } else {
      newSelected = [...selectedExperts, name];
    }
    setSelectedExperts(newSelected);
    onDataChange({ courses: selectedCourses, experts: newSelected });
  };

  // Reset selections when `reset` prop changes to true
  useEffect(() => {
    if (reset) {
      setSelectedCourses([]); // Reset courses
      setSelectedExperts([]); // Reset experts
      onDataChange({ courses: [], experts: [] }); // Notify parent of reset
    }
  }, [reset, onDataChange]);

  // Update selections when `data` prop changes
  useEffect(() => {
    setSelectedCourses(data.courses || []);
    setSelectedExperts(data.experts || []);
  }, [data]);

  return (
    <Box sx={{ pb: 6 }}>
      <Typography variant="h5" component="h1" sx={{ pt: 1.5, fontWeight: "bold", color: "#303030" }}>
        I'm interested in courses categories
      </Typography>
      <Typography variant="body2" sx={{ color: "#616161" }}>
        Do you already sell through a POS, marketplace, or ecommerce platform?
        We can help you import your store.
      </Typography>

      {/* Courses Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
          Courses
        </Typography>
        <Box
          component="ul"
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            overflowY: "auto",
            listStyle: "none",
            p: 0,
            mt: 3,
          }}
        >
          {platforms.map((platform) => (
            <Box
              component="li"
              key={platform.name} // Use name as key
              onClick={() => handleSelectCourse(platform.name)}
              sx={{
                border: '0.5px solid #e0e0e0',
                borderRadius: '0.375rem',
                p: 2,
                "&:hover": { bgcolor: "#f7f7f7" },
                bgcolor: selectedCourses.includes(platform.name) ? '#f7f7f7' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer', // Change cursor to pointer for better UX
              }}
            >
              <Checkbox
                checked={selectedCourses.includes(platform.name)}
                onChange={() => handleSelectCourse(platform.name)}
                sx={{ mr: 2 }}
              />
              <span>{platform.name}</span>
              {platform.imageLink && (
                <img
                  src={platform.imageLink}
                  alt={platform.name}
                  style={{ marginLeft: 'auto', height: '30px' }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Experts Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
          Experts
        </Typography>
        <Box
          component="ul"
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            overflowY: "auto",
            listStyle: "none",
            p: 0,
            mt: 3,
          }}
        >
          {experts.map((expert) => (
            <Box
              component="li"
              key={expert.name} // Use name as key
              onClick={() => handleSelectExpert(expert.name)}
              sx={{
                border: '0.5px solid #e0e0e0',
                borderRadius: '0.375rem',
                p: 2,
                "&:hover": { bgcolor: "#f7f7f7" },
                bgcolor: selectedExperts.includes(expert.name) ? '#f7f7f7' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer', // Change cursor to pointer for better UX
              }}
            >
              <Checkbox
                checked={selectedExperts.includes(expert.name)}
                onChange={() => handleSelectExpert(expert.name)}
                sx={{ mr: 2 }}
              />
              <span>{expert.name}</span>
              {expert.imageLink && (
                <img
                  src={expert.imageLink}
                  alt={expert.name}
                  style={{ marginLeft: 'auto', height: '30px' }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Page2;
