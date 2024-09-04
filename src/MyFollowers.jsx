import React from 'react';
import { Card, CardContent, Avatar, Typography, Grid, Box, Divider, Link } from '@mui/material';

const followers = [
    { 
      id: 1, 
      name: 'Akriti Verma', 
      profession: 'Software Engineer', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_1_professor_Akriti.png',
      info: 'Specializes in full-stack development.', 
      link: '#',  
    },
    { 
      id: 2, 
      name: 'Alok Nigam', 
      profession: 'Graphic Designer', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_813_professor_AlokNigam.png',
      info: 'Expert in visual design and branding.', 
      link: '#',  
    },
    { 
      id: 3, 
      name: 'Alex Johnson', 
      profession: 'Marketing Specialist', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_597_professor_AnmolJamwal.png',
      info: 'Focused on digital marketing strategies.', 
      link: '#',  
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      profession: 'Data Scientist', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_968_professor_Brice.png',
      info: 'Loves working with data and machine learning.', 
      link: '#',  
    },
    { 
      id: 5, 
      name: 'Michael Brown', 
      profession: 'Project Manager', 
      avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
      info: 'Experienced in leading agile teams.', 
      link: '#',  
    },
    { 
      id: 6, 
      name: 'Sarah Wilson', 
      profession: 'UX Designer', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_523_professor_DheerajP.png',
      info: 'Passionate about user experience and design thinking.', 
      link: '#',  
    },
    { 
      id: 7, 
      name: 'David Lee', 
      profession: 'DevOps Engineer', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_597_professor_AnmolJamwal.png',
      info: 'Automation and cloud infrastructure expert.', 
      link: '#',  
    },
    { 
      id: 8, 
      name: 'Laura Martinez', 
      profession: 'Content Strategist', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_613_professor_mansizon.png',
      info: 'Crafts engaging content for digital platforms.', 
      link: '#',  
    },
    { 
      id: 9, 
      name: 'James Anderson', 
      profession: 'Cybersecurity Analyst', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_844_professor_Mili.png',
      info: 'Protects organizations from cyber threats.', 
      link: '#',  
    },
    { 
      id: 10, 
      name: 'Olivia Roberts', 
      profession: 'HR Manager', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_993_professor_Piyush.png',
      info: 'Ensures smooth and efficient HR operations.', 
      link: '#',  
    },
    { 
      id: 11, 
      name: 'Daniel Harris', 
      profession: 'Financial Analyst', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_695_professor_RachnaPrasad.png',
      info: 'Expert in financial modeling and analysis.', 
      link: '#',  
    },
    { 
      id: 12, 
      name: 'Sophia Lewis', 
      profession: 'Product Manager', 
      avatarUrl: 'https://academy.opengrowth.com/assets/images/users/user_599_professor_Sailesh_profile.png',
      info: 'Leads cross-functional teams to deliver products.', 
      link: '#',  
    },
    { 
      id: 13, 
      name: 'Chris Walker', 
      profession: 'Software Architect', 
      avatarUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
      info: 'Designs scalable and robust software systems.', 
      link: '#',  
    },
    { 
      id: 14, 
      name: 'Megan Clark', 
      profession: 'Legal Advisor', 
      avatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
      info: 'Provides legal counsel for businesses.', 
      link: '#',  
    },
    { 
      id: 15, 
      name: 'Robert White', 
      profession: 'Chief Technology Officer', 
      avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
      info: 'Oversees the technological direction of the company.', 
      link: '#',  
    },
  ];
  

const MyFollowers = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        My Followers
      </Typography>
      <Divider sx={{ width: "100%", mb: 2, px: 1, ml: 0 }} />
      <Grid container spacing={2}>
        {followers.map((follower) => (
          <Grid item xs={12} sm={6} md={4} key={follower.id} sx={{}}>
            <Card sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                p: 2, 
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                height: {xs: 'fit-content',sm:'19vh'},
                "&:hover": {
                  backgroundColor: "#0000000a",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Avatar src={follower.avatarUrl} alt={follower.name} sx={{ width: 90, height: 90, mr: 2, mt: 1 }} />
              <CardContent sx={{ p: 0 , }}>
                <Typography variant="subtitle1" >
                  {follower.name}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {follower.profession}
                </Typography>
                <Box sx={{}}>
                <Typography variant="body2" color="text.secondary" sx={{mt: 1, display: 'flex', flexDirection: 'column'}}>
                  {follower.info} <Link href={follower.link} variant="body2" sx={{ textDecoration: 'none'}}>
                    Know more
                  </Link>
                </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyFollowers;
