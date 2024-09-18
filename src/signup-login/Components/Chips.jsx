import { styled } from '@mui/system';
import { Card } from '@mui/material';

export const FormCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '8px',
    boxShadow: '0px 3px 6px #00000029',
    border: '1px solid #ddd',
    maxWidth: '500px', // Suitable for forms
    margin: 'auto', // Center the card
}));