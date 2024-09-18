import { Avatar, Box, Button, Chip, Dialog, DialogContent, DialogTitle, IconButton,Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export const ExpertPopup = ({ expert, onClose }) => {
    console.log(expert);
    
    if (!expert) return null;
  
    return (
      <Dialog open={!!expert} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Expert Details</Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              to={`/profile/${expert.profile_url}`}
              state={{ expertEmail: expert.email }}
              style={{ textDecoration: "none" }}
            >
              <Avatar
                src={`https://academy.opengrowth.com/assets/images/users/${expert.img}`}
                alt={expert.name}
                sx={{ width: 120, height: 120 }}
              />
            </Link>
            <Box>
              <Link
                to={`/profile/${expert.profile_url}`}
                state={{ expertEmail: expert.email }}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h5" gutterBottom>
                  {expert.name}
                </Typography>
              </Link>
              <Typography variant="subtitle1" color="text.secondary">
                {expert.industry}
              </Typography>
              <Chip label={expert.category} sx={{ mt: 1 }} />
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 3 }}>
            {expert.about}
          </Typography>
          <Link
            to={`/profile/${expert.profile_url}`}
            style={{ textDecoration: "none" }}
            state={{ expertEmail: expert.email }}
          >
            <Button variant="contained" color="primary" sx={{ mt: 3 }}>
              View Profile
            </Button>
          </Link>
        </DialogContent>
      </Dialog>
    );
  };