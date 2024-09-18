import { styled } from '@mui/system';
import { Button } from '@mui/material';

// Container Box for form layout
export const FormButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    fontSize: '1rem',
    color: "primary",
    width: "100%",
}));

export const SocialButtons = styled(Button)(({ theme }) => ({
    width: 'calc(33% - 10px)',
    height: '6.5vh',
    mx: 0.5,
    py: 0.75,
    px: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid lightgray",
    '&:hover': {
        border: "1px solid lightgray",
    },
}));

