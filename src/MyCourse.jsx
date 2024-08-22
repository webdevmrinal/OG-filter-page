import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Chip, Divider, CircularProgress, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';


const SmallCourseCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column', // Changed to column for vertical layout
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    borderRadius: '8px',
    width: 220, // Adjusted for square shape
    height: 220, // Adjusted for square shape
    position: 'relative',
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: "#0000000a",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      transform: "translateY(-2px)",
    },
}));

const SmallCourseMedia = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '70%', // Adjusted for 70% height of the card
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
}));

const OverlayText = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Align text to the start (left)
    justifyContent: 'flex-start', // Align text to the top
    position: 'absolute',
    top: 5,  // Position at the top
    left: 4, // Position at the left
    marginRight: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: theme.spacing(1),
    textAlign: 'left',
    fontSize: '0.85em',
    borderRadius: 4,
}));

const LargeCourseCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: '8px',
  minHeight: 200,
  maxWidth: '100%',
  marginRight: '20px',
  cursor: 'pointer',
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
}));

const LargeCourseMedia = styled(Box)(({ theme }) => ({
  width: 250,
  height: 160,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
}));

const TagChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
const ProgressLabel = styled(Typography)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    fontSize: '0.9em'
    // fontWeight: 'bold',
}));

const MyCourse = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Course Progress Section */}
      <Box sx={{ mb: 4, pl: 3, pt: 2, pb: 0,boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2,backgroundColor: "#ffff"  }}>
        <Typography variant="h6">
          Course Progress
        </Typography>
        <Divider sx={{ width: "98%", mb: 2 }} />
        <Grid container spacing={2} >
          <Grid item sx={{width: '15.5em'}}>
            <Link
              to="/course/seo-basics"
              style={{ textDecoration: 'none' }}
              state={{
                title: 'SEO Basics',
                imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_s6seo.jpg',
                description: 'A step-by-step guide to developing a Search Engine Optimization strategy for your business to increase your online presence and attract traffic to your website by using keywords intelligently, leveraging paid and organic searches, and making your website mobile-friendly.'
              }}
            >
              <SmallCourseCard>
                <SmallCourseMedia
                  sx={{
                    backgroundImage: 'url(https://academy.opengrowth.com/assets/images/courses/thumb_s6seo.jpg)',
                    mt: 0, ml: 0, height: 220, width: 265
                  }}
                />
                <CardContent sx={{ width: '100%', display: 'flex', alignItems: 'center', px: 1, py: 0.5 }}>
                    <LinearProgress variant="determinate" value={25} sx={{ width: '85%', height: 10, borderRadius: 1 }} />
                    <ProgressLabel>{25}%</ProgressLabel>
                  </CardContent>
                <OverlayText>
                  SEO Basics
                </OverlayText>
              </SmallCourseCard>
            </Link>
          </Grid>

          <Grid item sx={{width: '15.5em'}}>
            <Link
              to="/course/ai-basic"
              style={{ textDecoration: 'none' }}
              state={{
                title: 'AI Basic',
                imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg',
                description: 'A step-by-step guide to incorporating your company, including why you need to incorporate your company, the documentation needed and do\'s and don\'ts. Learn about different types of organizations and how they operate, including taxation and legal aspects.'
              }}
            >
              <SmallCourseCard>
                <SmallCourseMedia
                  sx={{
                    backgroundImage: 'url(https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg)',
                    mt: 0, ml: 0, height: 220, width: 265
                  }}
                />
                <CardContent sx={{ width: '100%', display: 'flex', alignItems: 'center', px: 1, py: 0.5, }}>
                    <LinearProgress variant="determinate" value={42} sx={{ width: '85%', height: 10, borderRadius: 1 }} />
                    <ProgressLabel>{42}%</ProgressLabel>
                  </CardContent>
                <OverlayText>
                  AI Basic
                </OverlayText>
              </SmallCourseCard>
            </Link>
          </Grid>

          <Grid item sx={{width: '15.5em'}}>
            <Link
              to="/course/identifying-your-target-audience"
              style={{ textDecoration: 'none' }}
              state={{
                title: 'Identifying Your Target Audience',
                imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg',
                description: 'This course covers the basics of business analytics, including data analysis techniques, predictive modeling, and data-driven decision making. Perfect for those looking to enhance their analytical skills.'
              }}
            >
              <SmallCourseCard>
                <SmallCourseMedia
                  sx={{
                    backgroundImage: 'url(https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg)',
                    mt: 0, ml: 0, height: 220, width: 265
                  }}
                />
                <CardContent sx={{ width: '100%', display: 'flex', alignItems: 'center', px: 1, py: 0.5 }}>
                    <LinearProgress variant="determinate" value={70} sx={{ width: '85%', height: 10, borderRadius: 1 }} />
                    <ProgressLabel>{70}%</ProgressLabel>
                  </CardContent>
                <OverlayText>
                  Identifying Your Target Audience
                </OverlayText>
              </SmallCourseCard>
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* My Enrolled Courses Section */}
      <Box sx={{ pl: 3, pt: 2, pb: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2 ,backgroundColor: "#fff"}}>
        <Typography variant="h6">
          My Enrolled Courses
        </Typography>
        <Divider sx={{ width: "98%", mb: 2 }} />

        {/* First Enrolled Course */}
        <Link
          to="/course/seo-basics"
          style={{ textDecoration: 'none' }}
          state={{
            title: 'SEO Basics',
            imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_s6seo.jpg',
            description: 'A step-by-step guide to developing a Search Engine Optimization strategy for your business to increase your online presence and attract traffic to your website by using keywords intelligently, leveraging paid and organic searches, and making your website mobile-friendly.'
          }}
        >
          <LargeCourseCard>
            <LargeCourseMedia
              sx={{
                backgroundImage: 'url(https://academy.opengrowth.com/assets/images/courses/thumb_s6seo.jpg)',
                mt: 3, ml: 2, height: 150, width: 180
              }}
            />
            <CardContent sx={{ flexGrow: 1, width: '25em' }}>
              <Typography variant="h6">SEO Basics</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                A step-by-step guide to developing a Search Engine Optimization strategy for your business to increase your online presence and attract traffic to your website by using keywords intelligently, leveraging paid and organic searches, and making your website mobile-friendly.
              </Typography>
              <Grid container sx={{ mt: 2 }}>
                <TagChip label="Finance" />
                <TagChip label="Marketing" />
                <TagChip label="Technology" />
                <TagChip label="Entrepreneurship" />
                <TagChip label="Innovation" />
              </Grid>
            </CardContent>
          </LargeCourseCard>
        </Link>

        {/* Second Enrolled Course */}
        <Link
          to="/course/ai-basic"
          style={{ textDecoration: 'none' }}
          state={{
            title: 'AI Basic',
            imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg',
            description: 'A step-by-step guide to incorporating your company, including why you need to incorporate your company, the documentation needed and do\'s and don\'ts. Learn about different types of organizations and how they operate, including taxation and legal aspects.'
          }}
        >
          <LargeCourseCard>
            <LargeCourseMedia
              sx={{
                backgroundImage: 'url(https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg)',
                mt: 3, ml: 2, height: 150, width: 180
              }}
            />
            <CardContent sx={{ flexGrow: 1, width: '25em' }}>
              <Typography variant="h6">AI Basic</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                A step-by-step guide to incorporating your company, including why you need to incorporate your company, the documentation needed and do's and don'ts. Learn about different types of organizations and how they operate, including taxation and legal aspects.
              </Typography>
              <Grid container sx={{ mt: 2 }}>
                <TagChip label="Marketing" />
                <TagChip label="Business" />
                <TagChip label="Technology" />
              </Grid>
            </CardContent>
          </LargeCourseCard>
        </Link>

        {/* Third Enrolled Course */}
        <Link
          to="/course/identifying-your-target-audience"
          style={{ textDecoration: 'none' }}
          state={{
            title: 'Identifying Your Target Audience',
            imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg',
            description: 'This course covers the basics of business analytics, including data analysis techniques, predictive modeling, and data-driven decision making. Perfect for those looking to enhance their analytical skills.'
          }}
        >
          <LargeCourseCard>
            <LargeCourseMedia
              sx={{
                backgroundImage: 'url(https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg)',
                mt: 3, ml: 2, height: 150, width: 180
              }}
            />
            <CardContent sx={{ flexGrow: 1, width: '25em' }}>
              <Typography variant="h6">Identifying Your Target Audience</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                This course covers the basics of business analytics, including data analysis techniques, predictive modeling, and data-driven decision making. Perfect for those looking to enhance their analytical skills.
              </Typography>
              <Grid container sx={{ mt: 2 }}>
                <TagChip label="Analytics" />
                <TagChip label="Data Science" />
                <TagChip label="Business" />
              </Grid>
            </CardContent>
          </LargeCourseCard>
        </Link>
      </Box>

      {/* Footer Text */}
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
        You have seen it all
      </Typography>
    </Box>
  );
};

export default MyCourse;
