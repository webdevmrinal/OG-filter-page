// SearchPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Skeleton,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'; // Corrected import
import SearchIcon from '@mui/icons-material/Search';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from 'react-router-dom';

// Sample courses data (ensure all necessary fields are present)
const courses = [
  {
    title: 'Digital Marketing',
    category: 'Marketing',
    date: 'Aug 9, 2024 | 6:28 AM',
    description:
      'This course provides a comprehensive overview of the strategies and tactics used to effectively promote products or…',
    image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg',
    avatar: [
      'https://randomuser.me/api/portraits/men/75.jpg',
      'https://randomuser.me/api/portraits/women/65.jpg',
    ],
    comments: 0,
    views: 5,
  },
  {
    title: 'Prospective Fractional Experts Guide',
    category: 'Leadership',
    date: 'Jun 7, 2024 | 3:48 AM',
    description:
      'A short course on transitioning from a 9 to 5 job to a Fractional Executive, a cornerstone of the gig economy. Find out…',
    image: 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg',
    avatar: ['https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'],
    comments: 0,
    views: 70,
  },
  {
    title: 'Final Testing Course',
    category: 'HR',
    date: 'Apr 24, 2024 | 9:40 AM',
    description: 'Testing testing testing',
    image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/66.jpg'],
    comments: 0,
    views: 48,
  },
  {
    title: 'StartUp Fundamentals',
    category: 'Leadership',
    date: 'Apr 19, 2024 | 5:24 AM',
    description:
      'A step-by-step guide to incorporating your company, including why you need...',
    image:
      'https://academy.opengrowth.com/assets/images/courses/thumb__90082e05-8020-4bd8-8246-af0ef0853187.jpeg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    comments: 0,
    views: 134,
  },
  {
    title: 'Make Your Pitch Investor Ready',
    category: 'Leadership',
    date: 'Apr 19, 2024 | 5:24 AM',
    description:
      'A step-by-step guide to incorporating your company, including why you need...',
    image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s2mypir.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    comments: 0,
    views: 134,
  },
  {
    title: 'Business Modeling through Strategy and Analysis',
    category: 'Product',
    date: 'Apr 19, 2024 | 5:24 AM',
    description:
      'This course will give you a complete overview of developing and designing...',
    image: 'https://academy.opengrowth.com/assets/images/courses/thumb_Strategy-and-Analysis.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    comments: 0,
    views: 134,
  },
  {
    title: 'MVP Fundamentals',
    category: 'Leadership',
    date: 'Apr 19, 2024 | 5:24 AM',
    description:
      'A step-by-step guide to incorporating your company, including why you need...',
    image: 'https://academy.opengrowth.com/assets/images/courses/thumb_10HowtomeasurePMF.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    comments: 0,
    views: 134,
  },
  {
    title: 'HR for Remote Teams (HRD & HRM)',
    category: 'HR',
    date: 'Apr 19, 2024 | 5:24 AM',
    description:
      'A bulletproof Human Resource Development and Human Resource Management...',
    image: 'https://academy.opengrowth.com/assets/images/courses/thumb_hrnew.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    comments: 0,
    views: 134,
  },
];

// Styled component for the course image
const CourseImage = styled('div')(({ theme }) => ({
  width: '100%',
  height: 175,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  backgroundColor: '#e0e0e0',
}));

// Styled component for the overlay text on the course image
const OverlayText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  color: '#fff',
  fontWeight: 'bold',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  marginRight: '5em',
}));

// Styled component for the category chip on the course image
const CategoryChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  bottom: 10,
  left: 10,
  backgroundColor: '#f9bb02',
  color: theme.palette.common.white,
  fontWeight: 'bold',
  fontSize: '0.75rem',
  padding: '4px 8px',
  height: 'auto',
}));

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const theme = useTheme(); // Corrected theme import

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  // Define the number of skeleton chips to display
  const skeletonChipCount = 6;

  return (
    <Box sx={{ padding: 3 }}>
      {loading ? (
        <Skeleton
          variant="text"
          width="30%"
          height={30}
          sx={{ mb: 2 }}
          animation="wave"
          aria-hidden="true"
        />
      ) : (
        <Typography variant="h6" gutterBottom>
          Search Courses
        </Typography>
      )}
      <Divider sx={{ width: '100%', mb: 2, px: 1, ml: 0 }} />

      {/* Search Bar & Filters */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile
          mb: 4,
        }}
      >
        {/* Filter Chips */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            mb: { xs: 2, sm: 0 }, // Add margin for mobile
            justifyContent: { xs: 'center', sm: 'flex-start' }, // Center align on mobile
          }}
        >
          {loading ? (
            // Render Skeletons for chips
            Array.from(new Array(skeletonChipCount)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={180}
                height={32}
                sx={{ mr: 1, mb: 1, borderRadius: 16 }}
                animation="wave"
                aria-hidden="true"
              />
            ))
          ) : (
            // Render actual chips
            <>
              <Chip label="Recently Added Courses" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Published Today" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Published This Week" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Published This Month" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Popular Course" sx={{ mr: 1, mb: 1 }} />
              <Chip label="Most Commented" sx={{ mb: 1 }} />
            </>
          )}
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'flex-end' }, // Center align search on mobile
            flexDirection: { xs: 'column', sm: 'row' }, // Stack input and button on mobile
          }}
        >
          {loading ? (
            // Render Skeletons for search bar
            <>
              <Skeleton
                variant="rectangular"
                width={{ xs: '100%', sm: 200 }}
                height={30}
                sx={{
                  mr: { sm: 2 },
                  mb: { xs: 2, sm: 0 },
                  borderRadius: 4,
                }}
                animation="wave"
                aria-hidden="true"
              />
              <Skeleton
                variant="rectangular"
                width={{ xs: '100%', sm: 100 }}
                height={30}
                sx={{
                  borderRadius: 4,
                }}
                animation="wave"
                aria-hidden="true"
              />
            </>
          ) : (
            // Render actual search bar
            <>
              <TextField
                variant="outlined"
                placeholder="Tags"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  mr: { sm: 2 }, // Add margin-right for larger screens only
                  mb: { xs: 2, sm: 0 }, // Add margin-bottom for mobile
                  width: { xs: '100%', sm: '120%' }, // Full width on mobile
                  height: '30px',
                }}
                InputProps={{ sx: { height: '30px', borderRadius: 4 } }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                sx={{
                  height: '30px',
                  width: { xs: '100%', sm: '75%' }, // Full width button on mobile
                  borderRadius: 4,
                }}
              >
                Search
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Course Cards */}
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    borderRadius: 2,
                    height: '21.5em',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={175}
                    animation="wave"
                    sx={{ borderRadius: 2 }}
                    aria-hidden="true"
                  />
                  <CardContent>
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={24}
                      sx={{ mb: 1 }}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={20}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Skeleton
                      variant="text"
                      width="90%"
                      sx={{ mt: 1, mb: 2 }}
                      animation="wave"
                      aria-hidden="true"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton
                          variant="circular"
                          width={35}
                          height={35}
                          animation="wave"
                          sx={{ mr: 1 }}
                          aria-hidden="true"
                        />
                        <Skeleton
                          variant="circular"
                          width={35}
                          height={35}
                          animation="wave"
                          sx={{ mr: 1 }}
                          aria-hidden="true"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton
                          variant="text"
                          width={30}
                          animation="wave"
                          aria-hidden="true"
                        />
                        <Skeleton
                          variant="text"
                          width={30}
                          sx={{ ml: 2 }}
                          animation="wave"
                          aria-hidden="true"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Link
                  to={`/course/${encodeURIComponent(course.title.toLowerCase().replace(/\s+/g, '-'))}`}
                  style={{ textDecoration: 'none' }}
                  state={{
                    title: course.title,
                    imageUrl: course.image,
                    description: course.description,
                  }}
                >
                  <Card
                    sx={{
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      borderRadius: 2,
                      height: '21.5em',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        backgroundColor: '#0000000a',
                      },
                    }}
                  >
                    <CourseImage
                      sx={{
                        backgroundImage: `url(${course.image || 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'})`,
                      }}
                    >
                      <OverlayText variant="subtitle2">{course.title}</OverlayText>
                      <CategoryChip label={course.category} size="small" />
                    </CourseImage>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, mt: 2 }}>
                        <Box>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5 }} />
                            {course.date}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              maxHeight: '40px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {course.description}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {course.avatar.map((src, i) => (
                            <Avatar key={i} src={src} sx={{ width: 35, height: 35, ml: i === 0 ? 0 : -1 }} />
                          ))}
                        </Box>
                      </Box>
                      <Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CommentIcon sx={{ fontSize: 18, mr: 0.5 }} />
                            <Typography variant="body2">{course.comments}</Typography>
                            <VisibilityIcon sx={{ fontSize: 18, ml: 1, mr: 0.5 }} />
                            <Typography variant="body2">{course.views}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;
