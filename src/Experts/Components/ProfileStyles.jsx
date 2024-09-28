// Experts/Components/ProfileStyles.jsx
import { styled } from '@mui/system';
import { Box, Button, Avatar, Paper } from '@mui/material';

export const GradientBox = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to top, #505f96, #25387c)",
  height: "200px",
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  padding: "24px",
  [theme.breakpoints.down('sm')]: {
    padding: "16px", // Reduce padding on mobile
    flexDirection: "column", // Stack contents vertically
    alignItems: "center", // Center items on mobile
  },
}));

export const GradientContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  bottom: "-46%",
  transform: "translate(0, -50%)",
  [theme.breakpoints.down('sm')]: {
    position: "relative", // Change positioning for mobile
    bottom: "0",
    transform: "none",
    flexDirection: "column", // Stack avatar and text vertically
    alignItems: "center", // Center items on mobile
    width: "100%", // Ensure full width on mobile
    padding: theme.spacing(2, 0), // Add vertical padding
  },
}));

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: "4px solid white",
  [theme.breakpoints.down('sm')]: {
    width: 100, // Reduce avatar size on mobile
    height: 100,
  },
}));

export const PaperContent = styled(Paper)(({ theme }) => ({
  flex: 1,
  borderRadius: 2,
  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // Ensure it takes full height
}));

export const TabsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #e0e0e0",
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    justifyContent: "flex-start", // Center the buttons on small screens
    gap: theme.spacing(0.2), // Reduce gap between buttons
    flexWrap: "wrap", // Wrap buttons if space is insufficient
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  border: '2px solid rgba(37, 56, 124, 0.5)',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5), // Reduce padding
    fontSize: "0.6rem", // Smaller font size for text in buttons
    minWidth: '64px', // Minimum width to ensure tap target size
  },
}));

const ShimmerWrapper = styled("div")({
  overflow: "hidden",
  position: "relative",
  backgroundColor: "#f6f7f8",
  borderRadius: 8,
});

const ShimmerEffect = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  animation: "shimmer 1.5s infinite linear",
  background: `linear-gradient(to right, ${theme.palette.background.default} 0%, #e0e0e0 50%, ${theme.palette.background.default} 100%)`,
  backgroundSize: "200% 100%",
  "@keyframes shimmer": {
    "0%": {
      backgroundPosition: "-200% 0",
    },
    "100%": {
      backgroundPosition: "200% 0",
    },
  },
}));

export const Shimmer = ({ width = "100%", height = 100, borderRadius = 8, sx = {} }) => (
  <ShimmerWrapper style={{ width, height, borderRadius }} sx={sx}>
    <ShimmerEffect />
  </ShimmerWrapper>
);
