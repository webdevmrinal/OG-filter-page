import { styled } from '@mui/system';
import { TextField } from '@mui/material';

export const FormTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        borderRadius: '4px', // Sets the border radius
        fontSize: '0.875rem', // Adjust font size accordingly
    },
    [theme.breakpoints.down('sm')]: {
        '& .MuiInputBase-root': {
            fontSize: '0.8rem', // Slightly smaller font size for mobile
        },
        '& .MuiInputLabel-root': {
            fontSize: '0.875rem',
        },
    },
}));
