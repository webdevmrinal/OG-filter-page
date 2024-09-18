import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const SliderStyles = styled(Box)(({ theme }) => ({
    width: "100%", // Full width on all devices
    height: "30vh", // Default height for mobile devices
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.up("sm")]: {
        height: "110vh", // Increased height for devices above the sm breakpoint
    },
}));
