import React, { useState, useRef } from 'react';
import { useLocation, Link } from "react-router-dom";
import { Box, Typography, TextField, Button, Chip, Grid, Card, CardContent, Avatar, Divider, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import coursebusiness from '../assets/coursemain.webp';

import Slider from "react-slick";
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import coursefeature from '../assets/coursefeature.jpg';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Header from '../signup-login/Header';
import Footer from '../signup-login/Footer';

const courses = [
  {
    title: 'Digital Marketing',
    category: 'Marketing',
    duration: '5 Weeks',
    description: 'This course provides a comprehensive overview of the strategies and tactics used to effectively promote products or…',
    imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg',
    avatar: ['https://randomuser.me/api/portraits/men/75.jpg', 'https://randomuser.me/api/portraits/women/65.jpg'],
    ratings: 5,
    reviews: 1,
    views: 2,
    comments: 5,

  },
  {
    title: 'Prospective Fractional Experts Guide',
    category: 'Leadership',
    duration: '5 Weeks',
    description: 'A short course on transitioning from a 9 to 5 job to a Fractional Executive, a cornerstone of the gig economy. Find out…',
    imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg',
    avatar: ['https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'],
    ratings: 5,
    reviews: 1,
    views: 2,
    comments: 5,
  },
  {
    title: 'Final testing course',
    category: 'HR',
    duration: '5 Weeks',
    description: 'testing testing testing',
    imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/66.jpg'],
    ratings: 5,
    reviews: 1,
    views: 2,
    comments: 5,
  },
  {
    title: 'StartUp Fundamentals',
    category: 'Leadership',
    duration: '5 Weeks',
    description: 'A step-by-step guide to incorporating your company, including why you need...',
    imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb__90082e05-8020-4bd8-8246-af0ef0853187.jpeg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    ratings: 5,
    reviews: 1,
    views: 2,
    comments: 5,
  },
  {
    title: 'Make You Pitch Investor Ready',
    category: 'Leadership',
    duration: '5 Weeks',
    description: 'A step-by-step guide to incorporating your company, including why you need...',
    imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_s2mypir.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    ratings: 5,
    reviews: 1,
    views: 2,
    comments: 5,
  },
  {
    title: 'Business Modeling through Strategy and Analysis',
    category: 'Product',
    duration: '5 Weeks',
    description: 'This course will give you a complete overview of developing and designing...',
    imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_Strategy-and-Analysis.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    ratings: 5,
    reviews: 1,
    views: 2,
    comments: 5,
  },
  {
    title: 'MVP Fundamentals',
    category: 'Leadership',
    duration: '5 Weeks',
    description: 'A step-by-step guide to incorporating your company, including why you need...',
    imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_10HowtomeasurePMF.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    ratings: 5,
    reviews: 1,
    views: 2,
    comments: 5,
  },
  {
    title: 'HR for Remote Teams (HRD & HRM)',
    category: 'HR',
    duration: '5 Weeks',
    description: 'A bulletproof Human Resource Development and Human Resource Management...',
    imageUrl: 'https://academy.opengrowth.com/assets/images/courses/thumb_hrnew.jpg',
    avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
    ratings: 5,
    reviews: 1,
    views: 2,
    comments: 5,
  },
];

const CourseChip = styled(Chip)(({ theme }) => ({
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
  fontSize: '0.75rem',
  padding: '4px 8px',
  height: 'auto',
}));
const EnrollButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#25387c',
  color: theme.palette.common.white,
  fontSize: '0.55rem',
  padding: '4px 8px',
  marginRight: '4px',
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

const WishlistButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f9bb02',
  color: theme.palette.common.white,
  fontSize: '0.55rem',
  padding: '4px 8px',
  "&:hover": {
    backgroundColor: theme.palette.warning.dark,
  },
}));

const NavigationButton = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  padding: 0,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.common.white,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

const SliderWrapper = styled(Box)({
  "& .slick-list": {
    margin: "0 -8px",
  },
  "& .slick-slide": {
    padding: "16px 8px",
  },
});
const BlogCard = ({ title, comments, views, imageUrl, avatar, duration, ratings, reviews, description }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Link to={`/course/${title}`} style={{ textDecoration: 'none', color: 'inherit' }}
      state={{
        title,
        imageUrl,
        description,
      }}>
      <Card sx={{
        display: 'flex',
        height: 150,  // Adjust height as needed
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        borderRadius: "12px",
        '&:hover': {
          boxShadow: "0px 8px 20px rgba(0,0,0,0.3)"
        }
      }}>
        <Box sx={{
          width: '35%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '12px 0 0 12px'
        }}>
          <img src={imageUrl} alt={title} style={{ height: '100%', width: 'auto', objectFit: 'cover' }} />
        </Box>
        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          padding: 1.8,
          pt: 0.5,
          backgroundColor: 'white'
        }}>
          <Typography variant="subtitle1" >{title}</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 0 }}>{duration}</Typography>
          <Typography variant="body2" color="textSecondary">{ratings} Ratings | {reviews} Reviews</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 1,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CommentIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">
                {comments}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center" }}
            >
              <VisibilityIcon
                sx={{ fontSize: 18, mr: 0.5 }}
              />
              <Typography variant="body2">
                {views}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Link>
  </Grid>
);

const Banner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        pl: { xs: '2rem', sm: '4rem' },
        height: { xs: 'auto', sm: 'auto' },
        borderRadius: 2,
      }}
    >
      <Box sx={{ width: { xs: '100%', sm: '60%' }, textAlign: 'left' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: { xs: '1.8rem', sm: '2.6rem' },
            mb: 2,
          }}
        >
          Access Expert-led <span style={{ color: '#f9bb02' }}>Online Courses</span> for Individuals and Businesses
        </Typography>
        <Typography variant="h6" sx={{ color: '#000', mb: 4 }}>
          Whether you're a business or an individual, our online courses are
          built to equip you with the skills needed to overcome challenges
          and succeed in any industry.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#25387c',
              '&:hover': { backgroundColor: '#1f2e68' },
              borderRadius: '50px',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              padding: '6px 16px',
            }}
          >
            For Business
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#f9bb02',
              '&:hover': { backgroundColor: '#d6a302' },
              borderRadius: '50px',
              color: 'black',
              fontSize: '0.875rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              padding: '6px 16px',
            }}
          >
            For Individuals
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: { xs: '100%', sm: '60%' }, height: { xs: '100%', sm: 'auto'}, textAlign: 'center', mt: { xs: 4, sm: 0 } }}>
        <img
          src={coursebusiness}
          alt="Banner Image"
          style={{ width: '100%', height: '100%', borderRadius: 4 }}
        />
      </Box>
    </Box>
  );
};

const CourseFeatures = () => {
  const features = [
    {
      title: 'Social and Collaborative Learning',
      description:
        'Social and collaborative learning experiences crafted to ensure retention and absorption of concepts and the ability to apply them for life.',
    },
    {
      title: 'Immersive Live Activities',
      description:
        'Group and individual activities that involve you, ensuring a sound grasp of the subject matter being covered.',
    },
    {
      title: 'Instructional Benefits',
      description:
        'High standards of instructional design guaranteed to impart knowledge seamlessly and motivate you.',
    },
    {
      title: 'Blog-like Lecture Notes',
      description:
        'Churn through the course material with considerable ease as our lecture notes emulate blogs, with infographics and videos to enhance your learning experience.',
    },
  ];

  return (
    <Box
      sx={{
        p: 4,
        mb: 4,
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        
      }}
    >
      <Grid container spacing={4}>
        {/* Left Side: Heading and Image */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#000', mb: 2 }}>
              Course Features
            </Typography>
            <Typography variant="h6" sx={{ color: '#000', mb: 4 }}>
              Learn from industry experts, engage in hands-on projects, and enjoy a learning journey that's as flexible as it is impactful.
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src={coursefeature}
              alt="Student learning"
              style={{ maxWidth: '100%', borderRadius: '12px' }}
            />
          </Box>
        </Grid>

        {/* Right Side: Feature Cards */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {features.map((feature, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    px: 2,
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#f9bb02',
                        color: '#fff',
                        borderRadius: 1,
                        display: 'inline-block',
                        px: 1,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: '#555' }}>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const AllCourses = () => {
  const sliderRef = useRef(null);
  const [search, setSearch] = useState('');
  const location = useLocation();

  const theme = useTheme();
  const { course } = location.state || {};
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };
  const getSlidesToShow = () => {
    if (isLarge) return 3;
    if (isMedium) return 2;
    if (isSmall) return 1;
    return 4;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: 1, pt: 0 }}>
      <Header />
      <Banner />
      <CourseFeatures />
      {/* <Card sx={{ mt: 4, p: { sm: 3, xs: 1 }, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", borderRadius: "12px" }}>
        <Typography variant="h5" fontWeight={'bold'} ml={2} gutterBottom>
          Featured Courses
        </Typography>
        <SliderWrapper sx={{ position: "relative", px: 2 }}>
          {" "}
          <Slider ref={sliderRef} {...settings}>
            {courses.map((blog, index) => (
              <Box
                key={index}
                sx={{
                  transition: "0.3s",
                  "&:hover": { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" },
                }}
              >
                <BlogCard {...blog} />
              </Box>
            ))}
          </Slider>
          {courses.length > getSlidesToShow() && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  transform: "translateY(-50%)",
                  zIndex: 1,

                }}
              >
                <NavigationButton onClick={handlePrev}>
                  <ArrowBackIosNewIcon />
                </NavigationButton>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  transform: "translateY(-50%)",
                  zIndex: 1,

                }}
              >
                <NavigationButton onClick={handleNext}>
                  <ArrowForwardIosIcon />
                </NavigationButton>
              </Box>
            </>
          )}
        </SliderWrapper>
      </Card> */}
      <Card sx={{ my: 4, p: 3, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", borderRadius: "12px" }}>
        <Typography variant="h5" fontWeight={'bold'} gutterBottom>
          All Courses
        </Typography>
        {/* Search Bar */}
        {/* Filter Chips */}
        <Box sx={{
          mb: 4,
          display: 'flex',
          flexWrap: 'nowrap', // Ensure chips stay in a single line
          overflowX: 'auto', // Allow horizontal scrolling
          gap: 1,
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome, Safari, and Edge
        }}>
          <Chip label="Leadership" sx={{ mr: 1 }} />
          <Chip label="Product" sx={{ mr: 1 }} />
          <Chip label="Marketing" sx={{ mr: 1 }} />
          <Chip label="Strategy" sx={{ mr: 1 }} />
          <Chip label="Popular Course" sx={{ mr: 1 }} />
          <Chip label="View All Course" />
        </Box>

        {/* Course Cards */}
        <Grid container spacing={3}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Link to={`/course/${course.title}`} style={{ textDecoration: 'none', color: 'inherit' }}
                state={{
                  title: course.title,
                  imageUrl: course.imageUrl,
                  description: course.description
                }}>
                <Card sx={{
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2, height: '21em', display: 'flex', flexDirection: 'column',
                  '&:hover': {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    backgroundColor: '#0000000a',
                  },
                }}>
                  <CourseImage
                    sx={{
                      backgroundImage: `url(${course.imageUrl || 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'})`,
                    }}
                  >
                    <OverlayText variant="subtitle2">{course.title}</OverlayText>
                    <CategoryChip label={course.category} size="small" />
                  </CourseImage>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, mt: 2 }}>
                      <Box>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                          <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5 }} />
                          {course.duration}
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <CommentIcon sx={{ fontSize: 18, mr: 0.5 }} />
                          <Typography variant="body2">
                            {course.comments}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <VisibilityIcon
                            sx={{ fontSize: 18, mr: 0.5 }}
                          />
                          <Typography variant="body2">
                            {course.views}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Card>
      <Footer />
    </Box>
  );
};

export default AllCourses;
