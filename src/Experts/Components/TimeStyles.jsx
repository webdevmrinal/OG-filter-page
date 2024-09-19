import { styled } from '@mui/system';
import { Box, Button, ToggleButton ,Paper} from '@mui/material';

export const ScrollableBox = styled(Box)({
    display: "flex",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
        display: "none",
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
});

export const DurationButton = styled(ToggleButton)(({ theme }) => ({
    border: `2px solid #e0e0e0`,
    color: theme.palette.primary.main,
    borderRadius: "4px",
    padding: theme.spacing(1, 2),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "&.Mui-selected": {
        backgroundColor: '#e2e2e2',
        color: theme.palette.common.black,
    },
}));

export const DateButton = styled(ToggleButton)(({ theme }) => ({
    border: `2px solid #e0e0e0`,
    borderRadius: "8px",
    height: "40px",
    width: "max-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
        width: "auto", // Adjust width for smaller screens
        padding: theme.spacing(0.5, 1), // Reduce padding on smaller screens
    },
}));

export const TimeButton = styled(ToggleButton)({
    border: `2px solid #505f96`,  // Consistent blue border for all
    color: "#505f96",  // Consistent blue text color for all
    borderRadius: "8px",
    height: "40px",
    width: "max-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export const StyledConfirmationBox = styled(Box)(({ theme }) => ({
    width: '100%', // Ensures the box takes the full width
    padding: theme.spacing(1),
    backgroundColor: "#6fbf73", // Green background
    color: 'white', // White text color for better contrast
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    borderRadius: '6px',
    boxShadow: theme.shadows[1],
}));

export const StyledSummaryBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    borderRadius: 6,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    border: `1px solid ${theme.palette.grey[300]}`,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
}));

export const ResponsiveButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
        padding: theme.spacing(1, 2),
    },
}));