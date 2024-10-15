import { styled } from '@mui/system';
import { Box, Button, Card } from '@mui/material';
export const CategoryButton = styled(Button)(({ theme, active }) => ({
  borderRadius: "1.5em",
  textTransform: "none",
  fontWeight: active ? "bold" : "normal",
  backgroundColor: active ? "#000000" : "#e0e0e0",
  color: active ? "white" : "#000000",
  boxShadow: active ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
  "&:hover": {
    backgroundColor: active ? "#333333" : "#d5d5d5",
  },
  width: "auto",
  whiteSpace: "nowrap",
}));
export const MainCard = styled(Card)(({ theme }) => ({
  width: "auto",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  borderRadius: "6px",
  margin: '0px 6px 12px 6px',
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    transform: "translateY(-1px)",
    backgroundColor: '#0000000a',
  },
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    minHeight: '250px', // Set a minimum height that fits your design needs
  },  
  [theme.breakpoints.down('xs')]: {
    width: 'auto',
    height: '22em',
  },
}));

export const ScrollableBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  overflowX: "auto",
  padding: theme.spacing(1, 0),
  height: "3.5em",
  overflowY: "hidden",
  "&::-webkit-scrollbar": {
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
}));
export const NameBox = styled(Box)(({ theme, active }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  p: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "72px",
}));

