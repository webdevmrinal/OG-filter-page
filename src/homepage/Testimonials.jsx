import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const testimonialsData = [
  {
    name: "Shradha Verma",
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Nancy Sharma",
    content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    name: "Anjali Singh",
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
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
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px', height: '100%' }}>
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
            {content}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  </Card>
);

const Testimonials = () => {
  return (
    <Card sx={{ p: 4, boxShadow: 6, borderRadius: '8px', mb: 2 }}>
      <Typography variant="h6" fontWeight={'bold'} sx={{ textAlign: 'center' }}>
        What our Clients Say
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
        Learn how startups use OpenGrowth as a perfect partner for their growth journey
      </Typography>
      <Grid container spacing={0.5} justifyContent="center" sx={{ p: 3, mt: 2 }}>
        {testimonialsData.map((testimonial, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
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
