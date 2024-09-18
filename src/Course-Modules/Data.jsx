

import { styled } from '@mui/system';
import { Card, Box, Typography, Chip, IconButton,Tabs, Tab, Divider } from '@mui/material';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const inClassActivities = [
    {
      id: 1,
      title: 'Activity 1',
      description: 'Create and deliver a presentation on the origin story of Artificial Intelligence...',
      status: 'Pending',
      grade: 0,
      fileSubmission: 'File not found.',
      type: 'In-Class Activity',
      header: 'In groups, create and deliver a presentation on the working principles and applications of Popular Search Algorithms, Fuzzy Logic and Natural Language Processing. ',
      image: 'https://academy.opengrowth.com/assets/images/assignment/images/1697171735454.png?1697171735454',  // Path to the image for Activity 1
      instructions: `
        Use what you have learned in the preceding units and conduct your own research on Neural Networks to write a 1000 word blog article entitled, “The rise of Neural Networks”. Your article should cover how neural networks evolved, types of neural networks, and applications of neural networks today. You may use graphics and visuals to enhance your article or support your views and arguments where appropriate.
      `,
      grading: [
        'Clear understanding of the origin of AI.',
        'Use of appropriate examples and visuals.',
        'Clear and concise presentation style.',
        'Effective communication with the audience.'
      ],
    },
    {
      id: 2,
      title: 'Activity 2',
      description: 'In groups, create and deliver a presentation on the working principles...',
      status: 'Pending',
      grade: 0,
      fileSubmission: 'File not found.',
      type: 'In-Class Activity',
      header: 'Write a blog article entitled, "The rise of Neural Networks". (1000 words)',
      image: 'https://academy.opengrowth.com/assets/images/assignment/images/1697172280675.png?1697172280675',  // Path to the image for Activity 2
      instructions: `
        In groups, create and deliver a presentation on the working principles and applications 
        of Popular Search Algorithms, Fuzzy Logic, and Natural Language Processing. 
        You may use graphics and visuals to support your presentation.
      `,
      grading: [
        'Clear understanding of working principles and applications of search algorithms.',
        'Effective use of group collaboration.',
        'Use of appropriate visuals to support arguments.',
        'Clear and engaging presentation style.'
      ],
    },
    {
      id: 3,
      title: 'Activity 3',
      description: 'In groups, create and deliver a presentation on the working principles...',
      status: 'Pending',
      grade: 4.8,
      fileSubmission: 'File not found.',
      type: 'In-Class Activity',
      header: 'Write a blog article entitled, "The rise of Neural Networks". (1000 words)',
      image: 'https://academy.opengrowth.com/assets/images/assignment/images/1697172280675.png?1697172280675',
      instructions: `
        In groups, create and deliver a presentation on the working principles and applications 
        of Popular Search Algorithms, Fuzzy Logic, and Natural Language Processing. 
        You may use graphics and visuals to support your presentation.
      `,
      scenario: `Your company, which is involved in taking on the legal implications of digital transformation and artificial intelligence, has asked you to try and increase the awareness amongst new hires of the kinds of issues arising in society as a result of artificial intelligence usage.  You decide to conduct a discussion on the subject and involve all the new joinees in order to facilitate an increase in awareness en masse. You ask the new joinees to form groups in order to encourage shared learning and foster collaboration. Each group is tasked with researching the subject matter and coming up with a set of relevant points to discuss with the larger group. You hope that this exercise will bring all the relevant points together for everyone involved to get acquainted with them.`,
      grading: [
        'Clear understanding of working principles and applications of search algorithms.',
        'Effective use of group collaboration.',
        'Use of appropriate visuals to support arguments.',
        'Clear and engaging presentation style.'
      ],
    },
  ];
  
  
  export const cumulativeActivities = [
    {
      id: 1,
      title: 'Cumulative Activity 1',
      description:
        'Submit a summary report on the applications of artificial intelligence...',
      status: 'Completed',
      grade: 8,
      fileSubmission: 'Submitted on time.',
      type: 'Cumulative Activity'
    },
    {
      id: 2,
      title: 'Cumulative Activity 2',
      description:
        'Work in teams to analyze the impact of machine learning algorithms...',
      status: 'Completed',
      grade: 7.5,
      fileSubmission: 'Submitted late.',
      type: 'Cumulative Activity'
    },
  ];
  
  export const quizzes = [
    { id: 1, title: 'Quiz 1',status: 'Completed', type: 'Quizzes', description:
        'Submit a summary report on the applications of artificial intelligence...', duration: '2 Minutes' },
    { id: 2, title: 'Quiz 2',status: 'Completed', type: 'Quizzes', description:
        'Submit a summary report on the applications of artificial intelligence...', duration: '2 Minutes'},
    { id: 3, title: 'Quiz 3',status: 'Completed', type: 'Quizzes', description:
        'Submit a summary report on the applications of artificial intelligence...', duration: '2 Minutes'},
    { id: 4, title: 'Quiz 4',status: 'Completed', type: 'Quizzes', description:
        'Submit a summary report on the applications of artificial intelligence...', duration: '2 Minutes'},
    { id: 5, title: 'Final Assessment',status: 'Completed', type: 'Quizzes',description:
        'Submit a summary report on the applications of artificial intelligence...',duration: '2 Minutes'},
  ];
  
  export const tabLabels = [
    { key: 'In-Class Activities', label: 'In-Class Activities' },
    { key: 'Cumulative Activities', label: 'Cumulative Activities' },
    { key: 'Quizzes', label: 'Quizzes' },
  ];

// Styled Card Component
export const StyledCard = styled(Card)(({ theme, isMobile }) => ({
  display: "flex",
  padding: "15px 16px",
  margin: "1em 0",
  borderRadius: "4px",
  transition: "all 0.3s ease",
  backgroundColor:"transparent",
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: "#0000000a",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    transform: "translateY(-2px)",
  },
}));

// Styled Icon Container
export const StyledIconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f1f3f4',
  width: 'auto',
  height: 'auto',
  borderRadius: '8px',
  padding: '16px',
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
  },
}));

// Styled Typography for Title
export const StyledTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}));

// Styled FileSubmission Text
export const StyledFileSubmission = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}));

// Styled Badge (Chip)
export const StyledChip = styled(Chip)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875em',
  },
}));

// Styled Chevron Icon Button
export const StyledChevronButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}));

// Styled Main Card Component
export const StyledMainCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(1.5),
    borderRadius: '8px',
    boxShadow: '0px 3px 6px #00000029',
    border: '1px solid #ddd',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  }));

// Styled Tabs Component (updated)
export const StyledTabs = styled(Tabs)(({ theme }) => ({
    padding: '0 8px',
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.primary.main,  // underline color
      height: '2px',  // thinner underline
    },
    '& .MuiTab-root': {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      textTransform: 'uppercase',  // Uppercase text for tabs
      minHeight: '48px',
      padding: '10px 12px',  // Horizontal padding
      fontWeight: '500 !important',  // Regular font weight (not bold)
      fontSize: '0.875rem',
      color: '#5f6368',
      '&:hover': {
        color: '#202124',
        opacity: 1,
      },
      '&.Mui-selected': {
        color: '#25387c',  // Selected tab color
        fontWeight: 'normal',  // Keep the font weight normal for the selected tab
      },
    },
    '& .MuiTabs-scrollButtons': {
      color: theme.palette.primary.main,
    },
  }));
  
  // Styled Tab Component (to ensure uniformity)
  export const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'uppercase',  // Make text uppercase
    minHeight: '48px',
    padding: '6px 8px',
    fontWeight: 'normal',  // Regular font weight (non-bold)
    fontSize: '14px',
    color: '#5f6368',
    '&:hover': {
      color: '#202124',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: theme.palette.primary.main,  // Primary color for the selected tab
      fontWeight: 'normal',  // No bold for the selected tab
    },
  }));
  
  // Styled Divider Component (Optional)
  export const StyledDivider = styled(Divider)(({ theme }) => ({
    width: '98%',
    marginBottom: theme.spacing(2),
    marginX: 'auto',
  }));

  export const StyledBackButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: '#f9bb021f',
    color: '#f9bb02',
    borderRadius: '50%',
    width: 56,
    height: 56,
  }));

  
