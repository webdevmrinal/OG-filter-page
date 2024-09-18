import { styled } from '@mui/system';
import { Box, Avatar} from '@mui/material';
  
export const AppointmentItem = styled(Box)(({ theme, isSelected }) => ({
    display: "flex",
    alignItems: "center",
    padding: "16px",
    margin: "8px 0 16px 0",
    borderRadius: "4px",
    transition: "all 0.3s ease",
    height: 'auto',
    backgroundColor: isSelected ? "#f5f5f5" : "transparent",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "#0000000a",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      transform: "translateY(-2px)",
    },
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
        height: 'auto',
        flexDirection: 'column',
        gap: '16px',
      },
  }));

  export const OgAvatar = styled(Avatar)(({theme}) => ({
    marginRight: '16px', 
    height: "90px" , 
    width: "90px",
    alignSelf: 'center' ,
    [theme.breakpoints.down('sm')]: {
        height: '60px',
        width: '60px',
      },
  }))

  export const AvatarWrapper = styled(Box)(({ theme }) => ({
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    alignSelf: 'center',
  
    "&:hover": {
      transform: "scale(1.1)",
    },
  }));
