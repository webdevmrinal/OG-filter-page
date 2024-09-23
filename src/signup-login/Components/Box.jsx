import { styled } from '@mui/system';
import { Box, Container } from '@mui/material';

export const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      height: "auto", // original desktop styles
      
    },
    
}));

export const SocialBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center", // Center the buttons
  alignItems: "center",
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(3),
  gap: theme.spacing(2),
  width: '100%',
  flexWrap: "wrap", // Allow buttons to wrap on smaller screens
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column", // Stack buttons vertically on small screens
    gap: theme.spacing(1),   // Reduce gap between buttons on small screens
  },
}));


export const StyledContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      height: "auto", // original desktop styles
      maxWidth: '100rem',
      margin: 'auto auto',
      padding: theme.spacing(2),
    },
  }));

  export const ButtonContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "8px",
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      paddingBottom: theme.spacing(3),
    },
  }));


  export const ContentBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      maxWidth: "200rem",
      height: "auto",
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.shadows[4],
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(3, 7, 0),
    },
  }));

