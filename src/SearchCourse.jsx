import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Chip, Grid, Card, CardContent, Avatar, Divider } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const courses = [
    {
        title: 'Digital Marketing',
        category: 'Marketing',
        date: 'Aug 9, 2024 | 6:28 AM',
        description: 'This course provides a comprehensive overview of the strategies and tactics used to effectively promote products or…',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg',
        avatar: ['https://randomuser.me/api/portraits/men/75.jpg', 'https://randomuser.me/api/portraits/women/65.jpg'],
        comments: 0,
        views: 5,
    },
    {
        title: 'Prospective Fractional Experts Guide',
        category: 'Leadership',
        date: 'Jun 7, 2024 | 3:48 AM',
        description: 'A short course on transitioning from a 9 to 5 job to a Fractional Executive, a cornerstone of the gig economy. Find out…',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg',
        avatar: ['https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'],
        comments: 0,
        views: 70,
    },
    {
        title: 'final testing course',
        category: 'HR',
        date: 'Apr 24, 2024 | 9:40 AM',
        description: 'testing testing testing',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg',
        avatar: ['https://randomuser.me/api/portraits/women/66.jpg'],
        comments: 0,
        views: 48,
    },
    {
        title: 'StartUp Fundamentals',
        category: 'LeaderShip',
        date: 'Apr 19, 2024 | 5:24 AM',
        description: 'A step-by-step guide to incorporating your company, including why you need...',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb__90082e05-8020-4bd8-8246-af0ef0853187.jpeg',
        avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
        comments: 0,
        views: 134,
    },
    {
        title: 'Make You Pitch Investor Ready',
        category: 'LeaderShip',
        date: 'Apr 19, 2024 | 5:24 AM',
        description: 'A step-by-step guide to incorporating your company, including why you need...',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s2mypir.jpg',
        avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
        comments: 0,
        views: 134,
    },
    {
        title: 'Business Modeling through Strategy and Analysis',
        category: 'Product',
        date: 'Apr 19, 2024 | 5:24 AM',
        description: 'This course will give you a complete overview of developing and designing...',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_Strategy-and-Analysis.jpg',
        avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
        comments: 0,
        views: 134,
    },
    {
        title: 'MVP Fundamentals',
        category: 'LeaderShip',
        date: 'Apr 19, 2024 | 5:24 AM',
        description: 'A step-by-step guide to incorporating your company, including why you need...',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_10HowtomeasurePMF.jpg',
        avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
        comments: 0,
        views: 134,
    },
    {
        title: 'HR for Remote Teams (HRD & HRM)',
        category: 'HR',
        date: 'Apr 19, 2024 | 5:24 AM',
        description: 'A bulletproof Human Resource Development and Human Resource Management...',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_hrnew.jpg',
        avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
        comments: 0,
        views: 134,
    },
];

const CourseImage = styled('div')(({ theme }) => ({
    width: '100%',
    height: 175,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    backgroundColor: '#e0e0e0',
}));

const OverlayText = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    marginRight: '5em'
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#f9bb02',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '0.75rem', // Smaller font size
    padding: '4px 8px', // Smaller padding
    height: 'auto', // Adjust height
}));

const SearchPage = () => {
    const [search, setSearch] = useState('');

    return (
        <Box sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
        Search Courses
      </Typography>
      <Divider sx={{ width: "100%", mb: 2, px: 1, ml: 0 }} />
            {/* Search Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 3 }}>
                <TextField
                    variant="outlined"
                    placeholder="Tags"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ flex: 1, mr: 2, height: '45px' }} 
                    InputProps={{ sx: { height: '45px' } }} 
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<SearchIcon />} 
                    sx={{ height: '45px' }} 
                >
                    Search
                </Button>
            </Box>

            {/* Filter Chips */}
            <Box sx={{ mb: 4 }}>
                <Chip label="Recently added Courses" sx={{ mr: 1 }} />
                <Chip label="Published Today" sx={{ mr: 1 }} />
                <Chip label="Published this Week" sx={{ mr: 1 }} />
                <Chip label="Published this Month" sx={{ mr: 1 }} />
                <Chip label="Popular Course" sx={{ mr: 1 }} />
                <Chip label="Most Commented" />
            </Box>

            {/* Course Cards */}
            <Grid container spacing={3}>
                {courses.map((course, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2, height: '21.5em', display: 'flex', flexDirection: 'column',
                            '&:hover': {
                                transform: "translateY(-3px)",
                                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                                backgroundColor: '#0000000a',
                            },
                         }}>
                            <CourseImage
                                sx={{
                                    backgroundImage: `url(${course.image || 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'})`,
                                }}
                            >
                                <OverlayText variant="subtitle2">{course.title}</OverlayText>
                                <CategoryChip label={course.category} size="small" />
                            </CourseImage>
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent:'space-between' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, mt: 2 }}>
                                    <Box>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                            <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5 }} />
                                            {course.date}
                                        </Typography>
                                        <Typography variant="body2" sx={{ maxHeight: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <VisibilityIcon sx={{ fontSize: 18, mr: 0.5 }} />
                                            <Typography variant="body2">{course.views}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchPage;
