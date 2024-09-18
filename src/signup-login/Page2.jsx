import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

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

function Page2({ data, onDataChange }) { // Accept data and onDataChange props
  const [selectedCourses, setSelectedCourses] = useState(data.courses || []);  // Load from props or default to empty array
  const [selectedExperts, setSelectedExperts] = useState(data.experts || []);  // Load from props or default to empty array

  const handleSelectCourse = (index) => {
    const newSelected = [...selectedCourses];
    const position = newSelected.indexOf(index);
    if (position >= 0) {
      newSelected.splice(position, 1); // Remove if already selected
    } else {
      newSelected.push(index); // Add to selected list if not already
    }
    setSelectedCourses(newSelected);
    onDataChange({ courses: newSelected, experts: selectedExperts });  // Update the parent with both selected courses and experts
  };

  const handleSelectExpert = (index) => {
    const newSelected = [...selectedExperts];
    const position = newSelected.indexOf(index);
    if (position >= 0) {
      newSelected.splice(position, 1); // Remove if already selected
    } else {
      newSelected.push(index); // Add to selected list if not already
    }
    setSelectedExperts(newSelected);
    onDataChange({ courses: selectedCourses, experts: newSelected });  // Update the parent with both selected courses and experts
  };

  useEffect(() => {
    setSelectedCourses(data.courses || []); // Sync state with parent data
    setSelectedExperts(data.experts || []); // Sync state with parent data
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
          {platforms.map((platform, index) => (
            <Box
              component="li"
              key={index}
              onClick={() => handleSelectCourse(index)}
              sx={{
                border: '0.5px solid #e0e0e0',
                borderRadius: '0.375rem',
                p: 2,
                "&:hover": { bgcolor: "#f7f7f7" },
                bgcolor: selectedCourses.includes(index) ? '#f7f7f7' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                checked={selectedCourses.includes(index)}
                onChange={() => {}}
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
          {experts.map((expert, index) => (
            <Box
              component="li"
              key={index}
              onClick={() => handleSelectExpert(index)}
              sx={{
                border: '0.5px solid #e0e0e0',
                borderRadius: '0.375rem',
                p: 2,
                "&:hover": { bgcolor: "#f7f7f7" },
                bgcolor: selectedExperts.includes(index) ? '#f7f7f7' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                type="checkbox"
                checked={selectedExperts.includes(index)}
                onChange={() => {}}
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
