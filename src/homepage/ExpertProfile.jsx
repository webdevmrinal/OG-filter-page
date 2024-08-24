import React, {useRef} from 'react';
import { Container, Grid, Paper, Typography, Button, Avatar, Card, CardContent, Box, Chip, Stack,useTheme,
    useMediaQuery, Divider } from '@mui/material';
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const course = [
    {
        title: 'Digital Marketing',
        category: 'Marketing',
        duration: '5 Weeks',
        description: 'This course provides a comprehensive overview of the strategies and tactics used to effectively promote products or…',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s7aib.jpg',
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
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg',
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
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s8iyta.jpg',
        avatar: ['https://randomuser.me/api/portraits/women/66.jpg'],
        ratings: 5,
        reviews: 1,
        views: 2,
        comments: 5,
    },
    {
        title: 'StartUp Fundamentals',
        category: 'LeaderShip',
        duration: '5 Weeks',
        description: 'A step-by-step guide to incorporating your company, including why you need...',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb__90082e05-8020-4bd8-8246-af0ef0853187.jpeg',
        avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
        ratings: 5,
        reviews: 1,
        views: 2,
        comments: 5,
    },
    {
        title: 'Make You Pitch Investor Ready',
        category: 'LeaderShip',
        duration: '5 Weeks',
        description: 'A step-by-step guide to incorporating your company, including why you need...',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_s2mypir.jpg',
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
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_Strategy-and-Analysis.jpg',
        avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
        ratings: 5,
        reviews: 1,
        views: 2,
        comments: 5,
    },
    {
        title: 'MVP Fundamentals',
        category: 'LeaderShip',
        duration: '5 Weeks',
        description: 'A step-by-step guide to incorporating your company, including why you need...',
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_10HowtomeasurePMF.jpg',
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
        image: 'https://academy.opengrowth.com/assets/images/courses/thumb_hrnew.jpg',
        avatar: ['https://randomuser.me/api/portraits/women/67.jpg'],
        ratings: 5,
        reviews: 1,
        views: 2,
        comments: 5,
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

const BlogCard = ({ title, category, description, image, avatar, date, comments, views }) => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)", borderRadius: 2, height: '21.5em', display: 'flex', flexDirection: 'column',
        '&:hover': {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          backgroundColor: '#0000000a',
        },
      }}>
        <CourseImage
          sx={{
            backgroundImage: `url(${image || 'https://academy.opengrowth.com/assets/images/courses/thumb_abc.jpeg'})`,
          }}
        >
          <OverlayText variant="subtitle2">{title}</OverlayText>
          <CourseChip label={category} size="small" />
        </CourseImage>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1, mt: 2 }}>
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5 }} />
                {date}
              </Typography>
              <Typography variant="body2" sx={{ maxHeight: '40px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {description}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {avatar.map((src, i) => (
                <Avatar key={i} src={src} sx={{ width: 35, height: 35, ml: i === 0 ? 0 : -1 }} />
              ))}
            </Box>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              <CommentIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">{comments}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', }}>
              <VisibilityIcon sx={{ fontSize: 18,ml: 1, mr: 0.5 }} />
              <Typography variant="body2">{views}</Typography>
            </Box>
           
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

const CustomPaper = styled(Paper)({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  background: `url('https://www.opengrowth.com/assets/public/opengrowth/images/banner/detail-banner.png') no-repeat center center`,
  backgroundSize: 'cover',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/path-to-your-curve.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundSize: 'cover',
  }
});

const CTAButton = styled(Button)(({ theme }) => ({
    justifyContent: 'center',
    width: '50%',  // Adjusted width
    marginTop: 24,
    borderRadius: '20px',
    alignSelf: 'center', 
    fontSize: '0.8rem'
  }));
  
  const ClipLabel = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0, // Adjust this value to move the clip up or down
    left: 0,
    background: '#f9bb02',
    color: 'black',
    fontSize: '0.9em',
    padding: '4px 8px',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
  }));

  

const AboutCard = () => {
  return (
    <Card sx={{ mb: 2, boxShadow: 3, padding: 2, maxWidth: 1010 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          With over two decades of expertise in personal and employer branding and leadership communications, I can not only help you foster effective internal communications but also assist you and your startup in creating a compelling brand narrative that resonates with your audience worldwide. As an author, speaker, trainer, and blogger, I am passionate about engaging communicators, academia, and students worldwide. I launched India's first blog on internal communications (Intraspek) in 2006 to share my insights, tips, and practices with practitioners. My career commenced as a brand executive with Leo Burnett, Bangladesh, and Saatchi & Saatchi, India, where I creatively contributed to the growth of accounts such as Nestle, British American Tobacco, BPL, and Tata Tea. Subsequently, I specialized in employee communications, collaborating with organizations like Accenture, Fidelity Investments, Sapient, and Tesco. I was recognized by accolades such as the IABC APAC Communicator of the Year (2022) and the Public Relations Council of India's Hall of Fame winner (2015). Throughout my tenure, I've managed cross-functional and cross-cultural programs and teams. As a mentor for students and communication professionals, I've designed and delivered corporate communications courses at esteemed institutions such as the ISM University of Management Economics (Lithuania) and the Indian Institute of Management (India) as an adjunct faculty and guest lecturer.
        </Typography>
          <Typography variant="h6" gutterBottom>
            Things I can offer advice on:
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip label="Employer branding" variant="contained" />
            <Chip label="Employee communications" variant="contained" />
            <Chip label="Personal branding" variant="contained" />
            <Chip label="Leadership communications" variant="contained" />
          </Stack>
      </CardContent>
    </Card>
  );
};

const CTACard = ({ title, description, buttonText, label }) => (
    <Card sx={{ position: 'relative', maxWidth: 354, my: 2 }}>
      <ClipLabel>{label}</ClipLabel>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ mt: 4}}>{description}</Typography>
        <CTAButton variant="contained" color="primary">{buttonText}</CTAButton>
      </CardContent>
    </Card>
  );
  
  const SliderWrapper = styled(Box)({
    "& .slick-list": {
      margin: "0 -8px",
    },
    "& .slick-slide": {
      padding: "16px 8px",
    },
  });

const ExpertProfile = () => {
  const sliderRef = useRef(null);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const getSlidesToShow = () => {
    if (isLarge) return 4;
    if (isMedium) return 3;
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
  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      <CustomPaper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={9}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
              Aniisu K. Verghese
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff' }}>Personal and Employer Branding Expert</Typography>
            <Typography color="#fff" variant="subtitle1">
              25+ years of experience
              <Box component="span" sx={{ display: 'flex', alignItems: 'center',color: '#fff'}} variant="body2">
                <LocationOnIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                Sydney, New South Wales, Australia
              </Box>
            </Typography>
            <Typography sx={{ my: 2, color: '#fff' }}>
              A Distinguished internal communications and change Leader, Author, Speaker, and LinkedIn Top Voice...
            </Typography>
            <Button variant="contained"  sx={{ marginRight: 1,color: '#fff',borderRadius: '50px' }}>
              Leadership Communication
            </Button>
            <Button variant="contained" sx={{color: '#fff',borderRadius: '50px' }}>
              Employee Engagement
            </Button>
            <Button variant="contained" color="primary" sx={{ marginLeft: 1, borderRadius: '50px' }}>
              Personal Branding
            </Button>
          </Grid>
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Avatar
              alt="Aniisu K. Verghese"
              src="https://www.opengrowth.com/assets/public/opengrowth/images/experts-image/experts/aniisu.png"
              sx={{ width: 180, height: 180, position: 'absolute', right: 50, top: 30 }}
            />
            <Button variant="contained" sx={{ position: 'absolute', right: 60, top: 225, backgroundColor: '#f9bb02', 
                color: 'black', borderRadius: '50px' }}>
              Request a call
            </Button>
          </Grid>
        </Grid>
      </CustomPaper>
      <Grid container justifyContent="space-between">
        <Grid item>
          <AboutCard />
        </Grid>
        <Grid item >
        <Stack spacing={4}>
          <CTACard 
            label="Book a Video Call" 
            description="Book a 1:1 live video consultation and get personalized invite" 
            buttonText="Check Availiblity"
          />
          <CTACard 
            label="Fractional Hire" 
            description="Hire the expert at fractional cost on a for-hire, part-time basis as per your specific requirements." 
            buttonText="Contact Us"
          />
          </Stack>
        </Grid>
      </Grid>
      <Card sx={{ my: 4, p: 3, boxShadow: "0 4px 6px rgba(0,0,0,0.2)", borderRadius: "12px" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#000', ml: 2 }}>
            Recommended Courses
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 4, pl: 2 }}>
      <Avatar
        alt="Aniisu K. Verghese"
        src="https://www.opengrowth.com/assets/public/opengrowth/images/experts-image/experts/aniisu.png"
        sx={{ width: 90, height: 90, mr: 2 }}
      />
      <Box>
        <Typography variant="h6" sx={{  }}>
          Aniisu K. Verghese
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" mt={0.5}>
          Personal and Employer Branding Expert
        </Typography>
      </Box>
    </Box>
      <SliderWrapper sx={{ position: "relative", px: 2 }}>
        {" "}
        {/* Use SliderWrapper and add horizontal padding */}
        <Slider ref={sliderRef} {...settings}>
          {course.map((blog, index) => (
            <Box
              key={index}
              sx={{
                transition:"0.3s",
                "&:hover": { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" },
              }}
            >
              <BlogCard {...blog} />
            </Box>
          ))}
        </Slider>
        {course.length > getSlidesToShow() && (
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
      </Card>
    </Container>
  );
};

export default ExpertProfile;
