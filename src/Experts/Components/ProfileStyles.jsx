import { styled } from '@mui/system';
import { Box, Button, Avatar ,Paper} from '@mui/material';

export const GradientBox = styled(Box)({
    // background: "linear-gradient(to right, #5e6fa3, #4ea3a0)",
    background: "linear-gradient(to top, #505f96, #25387c)",
    height: "200px",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    padding: "24px",
  });
export const GradientContent = styled(Box)({
    display:"flex",
    alignItems:"center",
    position:"absolute",
    bottom: "-46%",
    translate: "0 -50%",  
  });

  export const ProfileAvatar = styled(Avatar)({
    width: 120,
    height: 120,
    border: "4px solid white",
  });
  
  export const PaperContent = styled(Paper)({
    flex: 1,
    borderRadius: 2,
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    display: 'flex',
    flexDirection: 'column',
    height: '100%' // Ensure it takes full height
  });
  
  export const TabsContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e0e0e0",
  });
  
  export const ButtonContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      justifyContent: "center", // Center the buttons on small screens
      gap: theme.spacing(0.5), // Reduce gap between buttons
      flexWrap: "wrap", // Wrap buttons if space is insufficient
    },
  }));
  export const StyledButton = styled(Button)(({ theme }) => ({
    border: '2px solid rgba(37, 56, 124, 0.5)',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.5), // Reduce padding
      fontSize: "0.7rem", // Smaller font size for text in buttons
      minWidth: '64px', // Minimum width to ensure tap target size
    },
  }));