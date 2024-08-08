import React, { useCallback, useEffect, useState} from "react";
import { Box, Typography, Button, Chip, Divider, Avatar } from "@mui/material";

const Summary = ({ professorName, selectedTimes, duration, isGift, date, onCancel, onConfirm }) => {
    
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);

    const fetchExperts = useCallback(async (category = null) => {
        setLoading(true);
        try {
          let response;
          if (category) {
            response = await axios.post(
              "https://academy.opengrowth.com/api/search_mentor",
              {
                email: "akriti@opengrowth.com",
                start: 0,
                end: 10,
                key: `0_popular_tags_${category}`,
                search: category,
                search_with: "tags",
                action: "",
                token: "kKRyYp5DebEw0fP",
              }
            );
          } else {
            response = await axios.post(
              "https://academy.opengrowth.com/api/get_all_mentors",
              {
                id: "akriti@opengrowth.com",
                start: 0,
                end: 10,
                key: "0_all_mentors_0_to_10",
              }
            );
          }
          console.log("API Response:", response.data);
          setExperts(response.data);
        } catch (error) {
          console.error("Error fetching experts:", error);
        } finally {
          setLoading(false);
        }
      }, []);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 2 }}>
      <Box
        sx={{
          maxWidth: '600px',
          width: '100%',
          bgcolor: 'background.paper',
          p: 3,
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{alignItems: 'center'}}>
          Confirm Your Request
        </Typography>
        <Divider sx={{ width: "92%", mb: 2, alignSelf: "center" }} />
        <Avatar
                        src={`https://academy.opengrowth.com/assets/images/users/${experts.img}`}
                        alt={experts.name}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {professorName}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Dates and Times:
          </Typography>
          {selectedTimes.map((timeSlot, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1 }}>
              <Chip label={date} color="primary" sx={{ fontWeight: 'bold' }} />
              <Chip label={selectedTimes.join(", ")} color="secondary" sx={{ fontWeight: 'bold' }} />
            </Box>
          ))}
        </Box>
        
        <Typography variant="subtitle1" gutterBottom sx={{}}>
          Call Duration: {duration} minutes
        </Typography>

        {isGift && (
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'green' }}>
            This is a gift.
          </Typography>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Summary;
