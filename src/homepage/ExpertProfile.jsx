import React from 'react';
import { Container, Grid, Paper, Typography, Button, Avatar, Card, CardContent, Box, Chip, Stack } from '@mui/material';
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CustomPaper = styled(Paper)({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
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

const CTAButton = styled(Button)({
  width: '100%',
  marginBottom: 8,
});

const AboutCard = () => {
  return (
    <Card sx={{ my: 2, boxShadow: 3, padding: 2, maxWidth: 965 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          With over two decades of expertise in personal and employer branding and leadership communications, I can not only help you foster effective internal communications but also assist you and your startup in creating a compelling brand narrative that resonates with your audience worldwide. As an author, speaker, trainer, and blogger, I am passionate about engaging communicators, academia, and students worldwide. I launched India's first blog on internal communications (Intraspek) in 2006 to share my insights, tips, and practices with practitioners. My career commenced as a brand executive with Leo Burnett, Bangladesh, and Saatchi & Saatchi, India, where I creatively contributed to the growth of accounts such as Nestle, British American Tobacco, BPL, and Tata Tea. Subsequently, I specialized in employee communications, collaborating with organizations like Accenture, Fidelity Investments, Sapient, and Tesco. I was recognized by accolades such as the IABC APAC Communicator of the Year (2022) and the Public Relations Council of India's Hall of Fame winner (2015). Throughout my tenure, I've managed cross-functional and cross-cultural programs and teams. As a mentor for students and communication professionals, I've designed and delivered corporate communications courses at esteemed institutions such as the ISM University of Management Economics (Lithuania) and the Indian Institute of Management (India) as an adjunct faculty and guest lecturer.
        </Typography>
        <Card sx={{ mb: 2, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Things I can offer advice on:
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip label="Employer branding" variant="contained" />
            <Chip label="Employee communications" variant="contained" />
            <Chip label="Personal branding" variant="contained" />
            <Chip label="Leadership communications" variant="contained" />
          </Stack>
        </Card>
      </CardContent>
    </Card>
  );
};

const CTACard = ({ title, description, buttonText }) => (
  <Card sx={{ maxWidth: 400, my: 2 }}>
    <CardContent>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{title}</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>{description}</Typography>
      <CTAButton variant="contained" color="primary">{buttonText}</CTAButton>
    </CardContent>
  </Card>
);

const ExpertProfile = () => {
  return (
    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      <CustomPaper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={9}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Aniisu K. Verghese
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#1976d2' }}>Personal and Employer Branding Expert</Typography>
            <Typography color="textSecondary">
              25+ years of experience
              <Box component="span" sx={{ display: 'flex', alignItems: 'center',}}>
                <LocationOnIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                Sydney, New South Wales, Australia
              </Box>
            </Typography>
            <Typography sx={{ my: 2 }}>
              A Distinguished internal communications and change Leader, Author, Speaker, and LinkedIn Top Voice...
            </Typography>
            <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
              Leadership Communication
            </Button>
            <Button variant="contained" color="primary">
              Employee Engagement
            </Button>
            <Button variant="contained" color="primary" sx={{ marginLeft: 1 }}>
              Personal Branding
            </Button>
          </Grid>
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Avatar
              alt="Aniisu K. Verghese"
              src="https://www.opengrowth.com/assets/public/opengrowth/images/experts-image/experts/aniisu.png"
              sx={{ width: 190, height: 190, position: 'absolute', right: 50, top: 30 }}
            />
            <Button variant="contained" sx={{ position: 'absolute', right: 65, top: 225, backgroundColor: '#ffc107' }}>
              Request a call
            </Button>
          </Grid>
        </Grid>
      </CustomPaper>
      <Grid container justifyContent="space-between">
        <Grid item>
          <AboutCard />
        </Grid>
        <Grid item>
          <CTACard 
            title="Book a Video Call" 
            description="Book a 1:1 live video consultation and get personalized invite" 
            buttonText="Connect"
          />
          <CTACard 
            title="Fractional Hire" 
            description="Hire the expert at fractional cost on a for-hire, part-time basis as per your specific requirements." 
            buttonText="Contact Us"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpertProfile;
