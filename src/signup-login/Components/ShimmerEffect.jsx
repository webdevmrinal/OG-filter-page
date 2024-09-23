import { Box, Skeleton } from "@mui/material";
import { styled, keyframes } from "@mui/system";

export const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const ShimmerEffect = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  height: '100%',
  animation: `${shimmerAnimation} 1.6s infinite linear`,
  background: 'linear-gradient(to right, #e0e0e0 8%, #d0d0d0 18%, #e0e0e0 33%)', // Darker shades of grey
  backgroundSize: '1000px 100%',
  padding: '20px',
}));

export const ShimmerLine = styled('div')(({ theme, width, height }) => ({
  height: height || '20px',
  width: width || '100%',
  marginBottom: '10px',
  backgroundColor: '#d0d0d0', // Darker base color for the shimmer lines
  borderRadius: '4px',
}));

export const ShimmerBlock = styled('div')(({ theme, height }) => ({
  height: height || '200px',
  marginBottom: '20px',
  backgroundColor: '#d0d0d0', // Darker base color for larger blocks
  borderRadius: '10px',
}));

// Adding a circular shimmer for the avatar
export const ShimmerAvatar = styled('div')(({ theme, size }) => ({
  height: size || '100px',
  width: size || '100px',
  backgroundColor: '#d0d0d0', // Darker base color for avatar
  borderRadius: '50%',
  marginBottom: '20px',
}));

export const ShimmerButton = styled('div')(({ theme, width, height }) => ({
  height: height || '40px',
  width: width || '100%',
  marginBottom: '10px',
  backgroundColor: '#d0d0d0',
  borderRadius: '6px',
}));

export const ShimmerSlot = styled('div')(({ theme, width, height }) => ({
  height: height || '35px',
  width: width || '100%',
  marginBottom: '8px',
  backgroundColor: '#d0d0d0',
  borderRadius: '6px',
}));

export const ShimmerLoading = () => (
  <ShimmerEffect>
    {/* Simulate the profile header */}
    <ShimmerAvatar size="100px" />
    <ShimmerLine width="50%" height="20px" /> {/* Name */}
    <ShimmerLine width="30%" height="15px" /> {/* Title */}
    
    {/* Simulate buttons */}
    <ShimmerButton width="40%" height="40px" /> {/* Follow button */}
    <ShimmerButton width="40%" height="40px" /> {/* Message button */}
    <ShimmerButton width="40%" height="40px" /> {/* Request a time button */}
    
    {/* Simulate the video call request */}
    <ShimmerLine width="100%" height="40px" /> {/* Request header */}
    <ShimmerLine width="100%" height="15px" /> {/* Gift checkbox */}
    
    {/* Simulate slots */}
    <ShimmerSlot width="100%" height="35px" /> {/* First slot row */}
    <ShimmerSlot width="100%" height="35px" /> {/* Second slot row */}
    <ShimmerSlot width="100%" height="35px" /> {/* Third slot row */}
    
    <ShimmerLine width="100%" height="20px" /> {/* Show more slots */}
    
    {/* Simulate pricing section */}
    <ShimmerLine width="100%" height="25px" />
    
    {/* Simulate skills section */}
    <ShimmerLine width="50%" height="25px" /> {/* Skill 1 */}
    <ShimmerLine width="50%" height="25px" /> {/* Skill 2 */}
    
    {/* Simulate About section */}
    <ShimmerLine width="80%" height="20px" /> {/* About */}
    <ShimmerLine width="80%" height="20px" /> {/* Address */}
    <ShimmerLine width="80%" height="20px" /> {/* Education */}
  </ShimmerEffect>
);

export const ShimmerSlider = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%", // Adjust height based on your design requirements
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
        sx={{ borderRadius: "8px" }}
      />
    </Box>
  );
};

