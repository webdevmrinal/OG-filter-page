import { styled } from '@mui/system';
import { Box, Button, Card } from '@mui/material';
export const FollowerCard = styled(Card)(({ theme, active }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    padding: '16px',
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    height: '100%',
    width: "100%",
    [theme.breakpoints.down('sm')]: {
        height: 'fit-content' // Wrap buttons if space is insufficient
      },
    "&:hover": {
        backgroundColor: "#0000000a",
        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        transform: "translateY(-2px)",
    },
}));
