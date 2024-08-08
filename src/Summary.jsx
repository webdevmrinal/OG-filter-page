import React, { useCallback, useEffect, useState} from "react";
import { Box, Typography, Button, Chip, Divider, Avatar } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

const Summary = ({ professorName, selectedTimes, duration, isGift, date, onCancel, onConfirm }) => {
    
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const expertEmail = location.state?.expertEmail;


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          "https://academy.opengrowth.com/api/get_user",
          {
            email: expertEmail,
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (expertEmail) {
      fetchProfileData();
    }
  }, [expertEmail]);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 2 }}>
      <Box
        sx={{
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{alignItems: 'center'}}>
          Confirm Your Request
        </Typography>
        <Divider sx={{ width: "92%", mb: 2, alignSelf: "center" }} />
        <Avatar
            src={`https://academy.opengrowth.com/assets/images/users/${profileData?.img}`}
            alt={profileData?.name}
            sx={{ width: 60, height: 60, mr: 2 }}
        />
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {professorName}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Dates/Times: 
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
