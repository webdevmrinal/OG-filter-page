import React, { useCallback, useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import { styled } from '@mui/system';
import Header from "../signup-login/Header";
import Footer from "../signup-login/Footer";

const ExpertCarousel = lazy(() => import("./ExpertCarousel"));
const TrendingBlogs = lazy(() => import("./TrendingBlogs"));
const Courses = lazy(() => import("./Courses"));
const Hub = lazy(() => import("./hub"));
const Testimonials = lazy(() => import("./Testimonials"));

const blogData = [
  {
    image: "https://picsum.photos/id/1/800/600",
    title: "The ultimate guide on business process optimization",
    author: "Surbhi Bapna",
    authorImage: "https://picsum.photos/id/1000/100/100",
    category: "Startup Basics",
  },
  {
    image: "https://picsum.photos/id/20/800/600",
    title: "Balancing commitment and flexibility with on-demand expertise",
    author: "OpenGrowth Content Team",
    authorImage: "https://picsum.photos/id/1001/100/100",
    category: "Industry Insights with Experts",
  },
  {
    image: "https://picsum.photos/id/48/800/600",
    title: "Optimize your remote workspace with essential tech tips",
    author: "OpenGrowth Content Team",
    authorImage: "https://picsum.photos/id/1002/100/100",
    category: "Remote Work",
  },
  {
    image: "https://picsum.photos/id/60/800/600",
    title: "Clear your IT backlog to boost business growth",
    author: "OpenGrowth Content Team",
    authorImage: "https://picsum.photos/id/1003/100/100",
    category: "Future Tech",
  },
  {
    image: "https://picsum.photos/id/180/800/600",
    title: "Leveraging AI for enhanced customer experience",
    author: "Tech Innovator",
    authorImage: "https://picsum.photos/id/1004/100/100",
    category: "Artificial Intelligence",
  },
  {
    image: "https://picsum.photos/id/239/800/600",
    title: "The rise of sustainable startups: A green revolution",
    author: "Eco Entrepreneur",
    authorImage: "https://picsum.photos/id/1005/100/100",
    category: "Sustainability",
  },
  {
    image: "https://picsum.photos/id/287/800/600",
    title: "Mastering the art of digital marketing for small businesses",
    author: "Marketing Guru",
    authorImage: "https://picsum.photos/id/1006/100/100",
    category: "Digital Marketing",
  },
  {
    image: "https://picsum.photos/id/366/800/600",
    title: "Blockchain technology: Revolutionizing supply chain management",
    author: "Blockchain Expert",
    authorImage: "https://picsum.photos/id/1007/100/100",
    category: "Blockchain",
  },
  {
    image: "https://picsum.photos/id/403/800/600",
    title: "The psychology of pricing: Strategies for startups",
    author: "Pricing Strategist",
    authorImage: "https://picsum.photos/id/1008/100/100",
    category: "Business Strategy",
  },
  {
    image: "https://picsum.photos/id/450/800/600",
    title: "Building a resilient team culture in the age of remote work",
    author: "HR Specialist",
    authorImage: "https://picsum.photos/id/1009/100/100",
    category: "Team Management",
  },
];

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

const communities = [
  {
      title: 'Startup Founders Club',
      category: 'Marketing',
      date: 'Aug 9, 2024 | 6:28 AM',
      description: 'Welcome to the Content Marketing Essentials Community! We are a vibrant space for marketers, content creators, and enthusiasts…',
      image: 'https://academy.opengrowth.com/assets/images/community/Startup.jpg',
      avatar: ['https://randomuser.me/api/portraits/men/75.jpg', 'https://randomuser.me/api/portraits/women/65.jpg'],
      comments: 0,
      views: 5,
  },
  {
      title: 'OpenGrowth',
      category: 'Leadership',
      date: 'Jun 7, 2024 | 3:48 AM',
      description: 'A short course on transitioning from a 9 to 5 job to a Fractional Executive, a cornerstone of the gig economy. Find out…',
      image: 'https://academy.opengrowth.com/assets/images/community/ban-min.jpg',
      avatar: ['https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'],
      comments: 0,
      views: 70,
  },
  {
      title: 'Mentorship Hub',
      category: 'HR',
      date: 'Apr 24, 2024 | 9:40 AM',
      description: 'testing testing testing',
      image: 'https://academy.opengrowth.com/assets/images/community/startup.jpeg',
      avatar: ['https://randomuser.me/api/portraits/women/66.jpg'],
      comments: 0,
      views: 48,
  },
  {
      title: 'Collab Connect',
      category: 'LeaderShip',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A step-by-step guide to incorporating your company, including why you need...',
      image: 'https://academy.opengrowth.com/assets/images/community/coll.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'StartUpSphere',
      category: 'LeaderShip',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A step-by-step guide to incorporating your company, including why you need...',
      image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s2mypir.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'Content Marketing Essentials',
      category: 'Product',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'This course will give you a complete overview of developing and designing...',
      image: 'https://academy.opengrowth.com/assets/images/community/en.jpg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
  {
      title: 'MVP Fundamentals',
      category: 'LeaderShip',
      date: 'Apr 19, 2024 | 5:24 AM',
      description: 'A step-by-step guide to incorporating your company, including why you need...',
      image: 'https://academy.opengrowth.com/assets/images/community/content.jpeg',
      avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
      comments: 0,
      views: 134,
  },
];


const BannerContainer = styled(Box)(({ theme, bgImage }) => ({
  position: 'relative',
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',  
  borderRadius: '4px',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  flexDirection: 'column',  // Default to column layout
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `linear-gradient(to right, #2979ff, #d500f9)`,
    zIndex: 1
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 2
  },
  [theme.breakpoints.up('md')]: { // Large screens
    height: '500px',
    flexDirection: 'row', // Side by side layout for large screens
  },
  [theme.breakpoints.down('sm')]: { // Small screens
    height: '300px', // Adjust height for small screens
    flexDirection: 'column', // Stack image and text in column
    backgroundPosition: 'center', // Ensure the image is centered
    backgroundSize: 'contain', // Contain image to avoid cut-off
  },
}));
const ContentBox = styled(Box)(({ theme }) => ({
  marginTop: '45px',
  marginLeft: '35px',
  position: 'relative',
  zIndex: 3,
  maxWidth: '520px',
  textAlign: 'left',
  padding: theme.spacing(3),
  color: 'white',
  [theme.breakpoints.down('sm')]: { // Smaller font on small screens
    fontSize: '0.8rem',
    padding: theme.spacing(2),
    marginLeft: '10px',
  }
}));

const BannerText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: { // Smaller font for the text on small screens
    fontSize: '1rem',
  },
}));

const BannerButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '50px',
  backgroundColor: '#f9bb02',
  color: 'black',
  fontWeight: 540,
  "&:hover": {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f9bb02',
  },
  [theme.breakpoints.down('sm')]: { // Adjust button size for small screens
    fontSize: '0.7rem',
    padding: '6px 12px',
  }
}));

const BannerCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    'https://www.opengrowth.com/assets/public/opengrowth/images/banner/banner-1-new.png',
    'https://www.opengrowth.com/assets/public/opengrowth/images/banner/banner-5.png',
    'https://www.opengrowth.com/assets/public/opengrowth/images/banner/04-new.jpg',
    'https://www.opengrowth.com/assets/public/opengrowth/images/banner/banner-6.png',
  ];

  return (
    <Slider {...settings} sx={{borderRadius: 6}}>
      {images.map((image, index) => (
        <BannerContainer key={index} bgImage={image}>
          <ContentBox>
            <BannerText variant="h4" fontWeight={'bold'}>Hire from us to accelerate your Growth Journey in the age of AI</BannerText>
            <BannerText variant="h5" mt={3}>Discover the benefits of hiring On-demand and Fractional Experts & Executives for your Startup</BannerText>
            <BannerButton variant="contained">Book A Consultation</BannerButton>
            <BannerText variant="subtitle2" mt={1.5}>Our Team Will Help Your startUp Grow</BannerText>
          </ContentBox>
        </BannerContainer>
      ))}
    </Slider>
  );
};

function Homepage() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExperts = useCallback(async (category = null) => {
    setLoading(true);
    try {
      let response;
      if (category) {
        response = await axios.post(
          "https://academy.opengrowth.com/api/search_mentor",
          {
            email: "akriti@opengrowth.com",
            start: 0,
            end: 16,
            key: `0_popular_tags_${category}`,
            search: category,
            search_with: "tags",
            action: "",
            token: "kKRyYp5DebEw0fP",
          }
        );
      } else {
        response = await axios.post(
          "https://academy.opengrowth.com/api/get_all_mentors",
          {
            id: "akriti@opengrowth.com",
            start: 0,
            end: 16,
            key: "0_all_mentors_0_to_10",
          }
        );
      }
      setExperts(response.data);
    } catch (error) {
      console.error("Error fetching experts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  return (
    <Box sx={{px: {xs: 1, sm: 1}}}>
      <Header />
      <BannerCarousel />
      {!loading && (
        <Suspense fallback={<CircularProgress />}>
          <ExpertCarousel experts={experts} />
          <TrendingBlogs blogs={blogData} />
          <Courses course={courses} />
          <Hub course={communities} />
          <Testimonials />
        </Suspense>
      )}
      <Footer />
    </Box>
  );
}

export default Homepage;
