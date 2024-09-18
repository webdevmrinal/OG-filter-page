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

export const ShimmerLoading = () => (
  <ShimmerEffect>
    {/* Simulate the avatar */}
    <ShimmerAvatar size="80px" /> 
    
    {/* Simulate text lines for profile information */}
    <ShimmerLine width="70%" height="20px" />
    <ShimmerLine width="50%" height="20px" />
    
    {/* Simulate the request section */}
    <ShimmerLine width="100%" height="40px" /> {/* Simulate larger content */}
    <ShimmerLine width="80%" height="20px" />
    
    {/* Simulate the skills section */}
    <ShimmerLine width="30%" height="20px" />
    <ShimmerLine width="30%" height="20px" />

    {/* Simulate the video call request slots */}
    <ShimmerLine width="100%" height="20px" />
    <ShimmerLine width="100%" height="20px" />
    <ShimmerLine width="100%" height="20px" />
  </ShimmerEffect>
);
