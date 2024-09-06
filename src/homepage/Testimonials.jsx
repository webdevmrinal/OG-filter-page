import React from 'react';
import { Card, CardContent, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';

const testimonialsData = [
  {
    name: "Shradha Verma",
    content: "OpenGrowth hub has been a very useful tool for enhancing the overall team productivity and team management. It has helped us streamline a lot of things which is utmost important for a remote team like ours. It's easy, clear and time-saving.",
    image: "https://www.opengrowth.com/assets/public/opengrowth/images/testimonial/shradha-verma-testimonial.jpg"
  },
  {
    name: "Shellye",
    content: "I had the pleasure of working with the members of OpenGrowth's team as we built out Shellye.opengrowth.com and its been not only a pleasure but I have been really pleased with the work ethics and quality of the work that has been done. I look forward to continuing our working relationship.",
    image: "https://www.opengrowth.com/assets/public/opengrowth/images/testimonial/shellye-testimonial.png"
  },
  {
    name: "Anjali Singh",
    content: "Open Growth Hub has been a monumental help to organize tasks for the team members, collaborate. You can. easily track progress and assign projects. A true help that allowed us to take our business to the next level.",
    image: "https://www.opengrowth.com/assets/public/opengrowth/images/testimonial/negin.jpg"
  },
  {
    name: "Amit Kumar",
    content: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const TestimonialCard = ({ name, content, image }) => (
  <Card sx={{ maxWidth: 300, borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', overflow: 'hidden', height: 380 }}>
    <Grid container direction="column" sx={{ height: '100%' }}>
      <Grid item sx={{ height: '50%' }}>
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Grid>
      <Grid item sx={{ height: '50%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', px: '20px', pt: 0, pb: '0 !important', height: '100%' }}>
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical' }}>
            {content}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  </Card>
);

const Testimonials = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ p: isSmall ? 2 : 4, boxShadow: 6, borderRadius: '8px', mb: 2,  }}>
      <Typography variant="h6" fontWeight={'bold'} sx={{ textAlign: 'center', fontSize: isSmall ? '1.2rem' : '1.5rem' }}>
        What our Clients Say
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary" sx={{ mb: 2, textAlign: 'center', fontSize: isSmall ? '0.9rem' : '1.1rem' }}>
        Learn how startups use OpenGrowth as a perfect partner for their growth journey
      </Typography>
      <Grid container spacing={isSmall ? 1 : 0.5} justifyContent="center" sx={{ p: isSmall ? 1 : 3, mt: isSmall ? 1 : 2 }}>
        {testimonialsData.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ mb: isSmall ? 2 : 0, ml: isSmall ? 2.5 : 0 }}>
            <TestimonialCard
              name={testimonial.name}
              content={testimonial.content}
              image={testimonial.image}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default Testimonials;
