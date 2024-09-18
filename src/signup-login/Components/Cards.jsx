import { styled } from '@mui/system';
import { Card, Paper } from '@mui/material';

export const FormCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '8px',
    boxShadow: '0px 3px 6px #00000029',
    border: '1px solid #ddd',
    maxWidth: '500px', // Suitable for forms
    margin: 'auto', // Center the card
}));

export const FormPaper = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    width: "100%",
    flexGrow: 1, // This will make Paper fill the container height
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
}));

