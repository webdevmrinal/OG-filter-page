import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { useLocation } from 'react-router-dom';

const CourseImage = styled('div')(({ theme }) => ({
  width: '100%',
  height: 300,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  position: 'relative',
}));

const OverlayText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: 10,
  left: 20,
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  fontSize: '1.5rem',
}));

const CourseDescription = () => {
  const location = useLocation();
  const { title, imageUrl, description } = location.state;

  return (
    <Box sx={{ width: '100%', padding: 4 }}>
      <Card sx={{ width: '100%', boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2 ,}}>
        <Box sx={{ width: '100%', padding: 2,  }}>
          <CourseImage
            sx={{
              backgroundImage: `url(${imageUrl})`,
              marginBottom: '0px'
            }}
          >
            <OverlayText variant="h5">{title}</OverlayText>
          </CourseImage>
        </Box>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Course Description
            </Typography>
            <Button variant="outlined" color="secondary">
              Remove Enrollment
            </Button>
          </Box>
          <Typography variant="body1" color="textSecondary" paragraph>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseDescription;
