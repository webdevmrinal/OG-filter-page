import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Radio,
  Divider,
  Box,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Skeleton, // Import Skeleton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useMediaQuery, useTheme } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const TodoTask = () => {
  // Simulated data (tasks, discussions, activities)
  const tasks = [
    {
      section: 'Overdue',
      items: [
        { title: 'Neon blocking Screens', description: '963: Web site design', date: '13 Feb' },
        { title: 'Logo design', description: '253: NEW WAREHOUSE UPGRADE', date: '13 Feb' },
        { title: 'Microsoft Edge Animation issue', description: '646: Workload Research', date: '27 Jan 2020 - 15 Feb 2020' },
      ],
    },
    {
      section: 'Today',
      items: [
        { title: 'Sticky sidebar for Task modal', description: '963: Web site design', date: '17 Feb' },
        { title: 'Microsoft Edge Animation issue', description: '646: Workload Research', date: '17 Feb' },
        { title: 'Layout', description: '321: Mobile app', date: '17 Feb' },
        { title: 'Modal window Screens', description: '321: Mobile app', date: '17 Feb' },
        { title: 'Logo design', description: '321: Mobile app', date: '17 Feb' },
      ],
    },
    {
      section: 'Tomorrow',
      items: [{ title: 'Sticky sidebar for Task modal', description: '963: Web site design', date: '18 Feb' }],
    },
  ];

  const discussions = [
    {
      topic: 'New Feature Request',
      startedBy: 'John Doe',
      comments: [
        { commenter: 'Jane Smith', comment: 'I think this feature would be great for our users.' },
        { commenter: 'Michael Johnson', comment: 'We should also consider the impact on performance.' },
      ],
    },
    {
      topic: 'Design Update',
      startedBy: 'Emily Davis',
      comments: [{ commenter: 'Robert Brown', comment: 'The new design looks sleek!' }],
    },
    {
      topic: 'Marketing Strategy',
      startedBy: 'Alice Johnson',
      comments: [
        { commenter: 'Paul Richards', comment: 'We should target the younger demographic.' },
        { commenter: 'Susan Lee', comment: 'Agreed, social media campaigns would be effective.' },
      ],
    },
    {
      topic: 'Project Timeline',
      startedBy: 'Mark Taylor',
      comments: [
        { commenter: 'Sarah Connor', comment: 'We need to revise the timeline to meet the deadlines.' },
        { commenter: 'James Bond', comment: 'I suggest adding more resources to speed things up.' },
      ],
    },
  ];

  const activities = [
    {
      date: '28 Oct 2023',
      events: [
        {
          time: '09:26',
          user: 'Mike J.',
          action: 'added 1 hour, 30 minutes to the',
          project: 'Our Demo Project',
        },
        {
          time: '09:25',
          user: 'Mike J.',
          action: 'added 5 hours, 30 minutes to the',
          project: 'Web Design testing support',
        },
        {
          time: '09:25',
          user: 'Mike J.',
          action: 'added 5 hours, 30 minutes to the',
          project: 'Web Design testing support',
        },
        {
          time: '09:25',
          user: 'Mike J.',
          action: 'added 5 hours, 30 minutes to the',
          project: 'Web Design testing support',
        },
      ],
    },
    {
      date: '29 Oct 2023',
      events: [
        {
          time: '09:24',
          user: 'Mike J.',
          action: 'added 7 hours, 30 minutes to the',
          project: 'Our Demo Project',
        },
        {
          time: '06:08',
          user: 'Mike J.',
          action: 'created the subtask in Task:',
          project: 'Stakeholder interview',
          subtask: 'Test 1',
        },
      ],
    },
    {
      date: '30 Oct 2023',
      events: [
        {
          time: '06:08',
          user: 'Mike J.',
          action: 'created the Task:',
          project: 'Stakeholder interview',
        },
        {
          time: '09:25',
          user: 'Mike J.',
          action: 'added 5 hours, 30 minutes to the',
          project: 'Web Design testing support',
        },
        {
          time: '09:25',
          user: 'Mike J.',
          action: 'added 5 hours, 30 minutes to the',
          project: 'Web Design testing support',
        },
      ],
    },
  ];

  const [tabIndex, setTabIndex] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Adjust the breakpoint as needed

  // Loading state for shimmer effect
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null); // Ref to store timer ID

  // Simulate data fetching with a timeout
  useEffect(() => {
    // Simulate a 300ms loading time
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 300);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleTabChange = (event, newValue) => {
    // Set loading to true on tab change
    setLoading(true);

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer to turn off loading after 300ms
    timerRef.current = setTimeout(() => {
      setLoading(false);
    }, 300);

    // Update the tab index
    setTabIndex(newValue);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (index) => {
    if (newComment.trim() !== '') {
      // Create a new array to trigger re-render
      const updatedDiscussions = [...discussions];
      updatedDiscussions[index].comments.push({ commenter: 'You', comment: newComment });
      // Normally, you would set this to state, but since discussions is not a state variable,
      // you might want to refactor your code to manage discussions as state.
      // For demonstration, we'll proceed as is.
      setNewComment('');
    }
  };

  // Function to render Task Tab Content or Skeletons
  const renderTaskTab = () => {
    if (loading) {
      // Display Skeletons while loading
      return tasks.map((section, index) => (
        <Accordion key={index} defaultExpanded sx={{ boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              pt: 0,
              '&:hover': {
                backgroundColor: '#0000000a',
              },
            }}
          >
            <Skeleton variant="text" width="30%" height={24} />
          </AccordionSummary>
          <AccordionDetails>
            <Card sx={{ boxShadow: 'none', p: 0, m: 0 }}>
              <CardContent sx={{ p: 0, pb: '0px !important' }}>
                <List>
                  {section.items.map((item, idx) => (
                    <ListItem
                      key={idx}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '&:hover': {
                          backgroundColor: '#0000000a',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                          transform: 'translateY(-1px)',
                          borderRadius: 2,
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Skeleton variant="circular" width={24} height={24} />
                      </ListItemIcon>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: isSmallScreen ? 'column' : 'row',
                          alignItems: isSmallScreen ? 'flex-start' : 'center',
                          flexGrow: 1,
                        }}
                      >
                        <Skeleton variant="text" width={isSmallScreen ? '80%' : '40%'} height={20} />
                        <Skeleton
                          variant="text"
                          width={isSmallScreen ? '60%' : '30%'}
                          height={16}
                          sx={{ color: 'text.secondary', mt: isSmallScreen ? 1 : 0 }}
                        />
                      </Box>
                      <Skeleton variant="text" width={40} height={16} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      ));
    }

    // Display actual Task content when not loading
    return tasks.map((section, index) => (
      <Accordion key={index} defaultExpanded sx={{ boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
          sx={{
            pt: 0,
            '&:hover': {
              backgroundColor: '#0000000a',
            },
          }}
        >
          <Typography variant="h6" ml={2} my={0}>
            {section.section}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card sx={{ boxShadow: 'none', p: 0, m: 0 }}>
            <CardContent sx={{ p: 0, pb: '0px !important' }}>
              <List>
                {section.items.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      '&:hover': {
                        backgroundColor: '#0000000a',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        transform: 'translateY(-1px)',
                        borderRadius: 2,
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Radio edge="start" />
                    </ListItemIcon>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        flexGrow: 1,
                      }}
                    >
                      <Typography variant={{ xs: 'caption', sm: 'subtitle1' }} sx={{ mr: { sm: 2 } }}>
                        {item.title}
                      </Typography>
                      <Typography variant={{ xs: 'caption', sm: 'body2' }} sx={{ color: 'text.secondary' }}>
                        {item.description}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                      {item.date}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>
    ));
  };

  // Function to render Discussion Tab Content or Skeletons
  const renderDiscussionTab = () => {
    if (loading) {
      // Display Skeletons while loading
      return discussions.map((discussion, index) => (
        <Accordion key={index} defaultExpanded sx={{ boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`discussion-panel${index}-content`}
            id={`discussion-panel${index}-header`}
            sx={{
              pt: 0,
              '&:hover': {
                backgroundColor: '#0000000a',
              },
            }}
          >
            <Skeleton variant="text" width="40%" height={24} />
          </AccordionSummary>
          <AccordionDetails>
            <Card sx={{ boxShadow: 'none', p: 0, mb: 2, mx: 2 }}>
              <CardContent sx={{ p: 0, pb: '0px !important' }}>
                <Skeleton variant="text" width="60%" height={20} sx={{ ml: 2, mb: 1 }} />
                <Divider sx={{ mb: 1, ml: 1, width: '98%' }} />
                <List>
                  {discussion.comments.map((comment, idx) => (
                    <ListItem
                      key={idx}
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                      <Skeleton variant="text" width="30%" height={16} />
                      <Skeleton variant="text" width="80%" height={14} sx={{ color: 'text.secondary' }} />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 2, ml: 2, display: 'flex', gap: 2 }}>
                  <Skeleton variant="rectangular" width="80%" height={40} />
                  <Skeleton variant="rectangular" width={80} height={40} />
                </Box>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      ));
    }

    // Display actual Discussion content when not loading
    return discussions.map((discussion, index) => (
      <Accordion key={index} defaultExpanded sx={{ boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`discussion-panel${index}-content`}
          id={`discussion-panel${index}-header`}
          sx={{
            pt: 0,
            '&:hover': {
              backgroundColor: '#0000000a',
            },
          }}
        >
          <Typography variant="h6" ml={2} my={0}>
            {discussion.topic}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card sx={{ boxShadow: 'none', p: 0, mb: 2, mx: 2 }}>
            <CardContent sx={{ p: 0, pb: '0px !important' }}>
              <Typography variant="body1" sx={{ ml: 2, mb: 1 }}>
                Started by: {discussion.startedBy}
              </Typography>
              <Divider sx={{ mb: 1, ml: 1, width: '98%' }} />
              <List>
                {discussion.comments.map((comment, idx) => (
                  <ListItem
                    key={idx}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {comment.commenter}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {comment.comment}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, ml: 2, display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Add a comment"
                  value={newComment}
                  onChange={handleCommentChange}
                  sx={{ mb: 0 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCommentSubmit(index)}
                  sx={{ display: 'block', px: { xs: '6px', sm: 'inherit' } }}
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>
    ));
  };

  // Function to render Activity Tab Content or Skeletons
  const renderActivityTab = () => {
    if (loading) {
      // Display Skeletons while loading
      return activities.map((day, dayIndex) => (
        <Card
          key={dayIndex}
          sx={{
            mb: 3,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            ...(isSmallScreen && {
              width: '100%',
              maxWidth: 'none',
              mx: 'auto',
            }),
          }}
        >
          <Skeleton variant="text" width="40%" height={24} sx={{ mt: 2, mx: 'auto' }} />
          <Divider sx={{ my: 1, width: '94%', ml: 'auto', mr: 'auto' }} />
          <Timeline sx={{ ml: 0, width: '100%' }}>
            {day.events.map((activity, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent sx={{ flex: 0.1, p: 2 }}>
                  <Skeleton variant="text" width="50%" height={16} />
                </TimelineOppositeContent>
                <TimelineSeparator sx={{ pt: 1 }}>
                  <TimelineDot sx={{ backgroundColor: '#00000099' }}>
                    <Skeleton variant="circular" width={12} height={12} />
                  </TimelineDot>
                  {index < day.events.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent
                  display="flex"
                  justifyContent="space-between"
                  sx={{
                    ml: 1,
                    '&:hover': {
                      backgroundColor: '#0000000a',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      transform: 'translateY(-1px)',
                      borderRadius: 2,
                    },
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection={isSmallScreen ? 'column' : 'row'}
                    alignItems="flex-start"
                    sx={{
                      gap: 1,
                      px: 1,
                      pb: 0,
                      pt: 1.5,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width="20%" height={16} />
                    <Skeleton variant="text" width="30%" height={14} />
                    <Skeleton variant="text" width="25%" height={14} />
                    {activity.subtask && <Skeleton variant="text" width="15%" height={14} />}
                  </Box>
                  {!isSmallScreen && (
                    <Skeleton variant="text" width="30%" height={16} sx={{ flexShrink: 0, color: 'black', pt: 1, mr: 2 }} />
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Card>
      ));
    }

    // Display actual Activity content when not loading
    return activities.map((day, dayIndex) => (
      <Card
        key={dayIndex}
        sx={{
          mb: 3,
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          ...(isSmallScreen && {
            width: '100%',
            maxWidth: 'none',
            mx: 'auto',
          }),
        }}
      >
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          {day.date}
        </Typography>
        <Divider sx={{ my: 1, width: '94%', ml: 'auto', mr: 'auto' }} />
        <Timeline sx={{ ml: 0, width: '100%' }}>
          {day.events.map((activity, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent sx={{ flex: 0.1, p: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  {activity.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator sx={{ pt: 1 }}>
                <TimelineDot sx={{ backgroundColor: '#00000099' }} />
                {index < day.events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent
                display="flex"
                justifyContent="space-between"
                sx={{
                  ml: 1,
                  '&:hover': {
                    backgroundColor: '#0000000a',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    transform: 'translateY(-1px)',
                    borderRadius: 2,
                  },
                }}
              >
                <Box
                  display="flex"
                  flexDirection={isSmallScreen ? 'column' : 'row'}
                  alignItems="flex-start"
                  sx={{
                    gap: 1,
                    px: 1,
                    pb: 0,
                    pt: 1.5,
                    flexWrap: 'wrap',
                  }}
                >
                  <Avatar sx={{ width: 24, height: 24 }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {activity.user}
                  </Typography>
                  <Typography variant="body2">{activity.action}</Typography>
                  <Typography variant="body2" color="primary">
                    {activity.project}
                  </Typography>
                  {activity.subtask && (
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {activity.subtask}
                    </Typography>
                  )}
                </Box>
                {!isSmallScreen && (
                  <Typography variant="body2" sx={{ flexShrink: 0, color: 'black', pt: 1, mr: 2 }}>
                    {activity.project}
                  </Typography>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Card>
    ));
  };

  // Function to render TabPanel content based on current tab and loading state
  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return renderTaskTab();
      case 1:
        return renderDiscussionTab();
      case 2:
        return renderActivityTab();
      default:
        return null;
    }
  };

  return (
    <Container sx={{ maxWidth: '1810px !important', px: 0, mx: 0 }}>
      <Typography variant="h5" sx={{ mt: 3 }}>
        My Work
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mt: 4, display: 'flex' }}>
        <Paper elevation={3} sx={{ padding: { xs: 1.5, sm: 2 }, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              sx={{ ml: 2 }}
              variant="standard"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab
                label="Task"
                id="tab-0"
                aria-controls="tabpanel-0"
                sx={{ fontSize: { xs: '0.8rem', sm: 'inherit' } }}
              />
              <Tab
                label="Discussion"
                id="tab-1"
                aria-controls="tabpanel-1"
                sx={{ fontSize: { xs: '0.8rem', sm: 'inherit' } }}
              />
              <Tab
                label="Activity"
                id="tab-2"
                aria-controls="tabpanel-2"
                sx={{ fontSize: { xs: '0.8rem', sm: 'inherit' } }}
              />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
              {renderTabContent()}
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              {renderTabContent()}
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              {renderTabContent()}
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default TodoTask;
