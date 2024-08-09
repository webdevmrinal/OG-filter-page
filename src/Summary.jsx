import React, { useCallback, useEffect, useState} from "react";
import { Box, Typography, Button, Chip, Divider, Avatar,ToggleButton } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

import { styled } from "@mui/system";

const StyledSummaryBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    border: `1px solid ${theme.palette.grey[300]}`
  }));

  const StyledToggleButton = styled(ToggleButton)(({ theme, available }) => ({
    border: `2px solid ${available ? "skyblue" : theme.palette.grey[300]}`,
    color: available ? "skyblue" : theme.palette.grey[400],
    opacity: available ? 1 : 0.5,
    pointerEvents: available ? "auto" : "none",
    borderRadius: theme.shape.borderRadius,
    height: "40px",
    width: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const SelectedDurationButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    textTransform: 'none',
  }));

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
    <StyledSummaryBox sx={{ }}>
      <Box
        
      >
        <Typography variant="h5" gutterBottom>
               Confirm Your Request
              </Typography>
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
            Date: 
          </Typography>
          {selectedTimes.map((timeSlot, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1 }}>
              <StyledToggleButton label={date} sx={{ 
                
              }} />
              <StyledToggleButton label={selectedTimes.join(", ")}sx={{ 
                
               }} />
            </Box>
          ))}
        </Box>
        
        <SelectedDurationButton disabled>
          {duration === "15" ? "Quick - 15 Min" :
           duration === "30" ? "Regular - 30 Min" :
           duration === "45" ? "Extra - 45 Min" :
           "All Access - 60 Min"}
        </SelectedDurationButton>

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
    </StyledSummaryBox>
  );
};

export default Summary;
