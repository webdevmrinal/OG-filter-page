import React, { useState } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemIcon,Stack, Radio, Divider, Box, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, TextField, Button, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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
  const tasks = [
    {
      section: "Overdue",
      items: [
        { title: "Neon blocking Screens", description: "963: Web site design", date: "13 Feb" },
        { title: "Logo design", description: "253: NEW WAREHOUSE UPGRADE", date: "13 Feb" },
        { title: "Microsoft Edge Animation issue", description: "646: Workload Research", date: "27 Jan 2020 - 15 Feb 2020" },
      ],
    },
    {
      section: "Today",
      items: [
        { title: "Sticky sidebar for Task modal", description: "963: Web site design", date: "17 Feb" },
        { title: "Microsoft Edge Animation issue", description: "646: Workload Research", date: "17 Feb" },
        { title: "Layout", description: "321: Mobile app", date: "17 Feb" },
        { title: "Modal window Screens", description: "321: Mobile app", date: "17 Feb" },
        { title: "Logo design", description: "321: Mobile app", date: "17 Feb" },
      ],
    },
    {
      section: "Tomorrow",
      items: [
        { title: "Sticky sidebar for Task modal", description: "963: Web site design", date: "18 Feb" },
      ],
    },
  ];

  const discussions = [
    {
      topic: "New Feature Request",
      startedBy: "John Doe",
      comments: [
        { commenter: "Jane Smith", comment: "I think this feature would be great for our users." },
        { commenter: "Michael Johnson", comment: "We should also consider the impact on performance." },
      ],
    },
    {
      topic: "Design Update",
      startedBy: "Emily Davis",
      comments: [
        { commenter: "Robert Brown", comment: "The new design looks sleek!" },
      ],
    },
    {
      topic: "Marketing Strategy",
      startedBy: "Alice Johnson",
      comments: [
        { commenter: "Paul Richards", comment: "We should target the younger demographic." },
        { commenter: "Susan Lee", comment: "Agreed, social media campaigns would be effective." },
      ],
    },
    {
      topic: "Project Timeline",
      startedBy: "Mark Taylor",
      comments: [
        { commenter: "Sarah Connor", comment: "We need to revise the timeline to meet the deadlines." },
        { commenter: "James Bond", comment: "I suggest adding more resources to speed things up." },
      ],
    },
  ];

  const activities = [
    { date: "28 Oct 2023", events: [
      {
        time: "09:26",
        user: "Mike J.",
        action: "added 1 hour, 30 minutes to the",
        project: "Our Demo Project",
      },
      {
        time: "09:25",
        user: "Mike J.",
        action: "added 5 hours, 30 minutes to the",
        project: "Web Design testing support",
      },
      {
        time: "09:25",
        user: "Mike J.",
        action: "added 5 hours, 30 minutes to the",
        project: "Web Design testing support",
      },
      {
        time: "09:25",
        user: "Mike J.",
        action: "added 5 hours, 30 minutes to the",
        project: "Web Design testing support",
      },
    ]},
    { date: "29 Oct 2023", events: [
      {
        time: "09:24",
        user: "Mike J.",
        action: "added 7 hours, 30 minutes to the",
        project: "Our Demo Project",
      },
      {
        time: "06:08",
        user: "Mike J.",
        action: "created the subtask in Task:",
        project: "Stakeholder interview",
        subtask: "Test 1"
      },
    ]},
    { date: "30 Oct 2023", events: [
      {
        time: "06:08",
        user: "Mike J.",
        action: "created the Task:",
        project: "Stakeholder interview",
      },
      {
        time: "09:25",
        user: "Mike J.",
        action: "added 5 hours, 30 minutes to the",
        project: "Web Design testing support",
      },
      {
        time: "09:25",
        user: "Mike J.",
        action: "added 5 hours, 30 minutes to the",
        project: "Web Design testing support",
      },
    ]}
  ];

  const [tabIndex, setTabIndex] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState(dayjs());

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (index) => {
    if (newComment.trim() !== '') {
      discussions[index].comments.push({ commenter: "You", comment: newComment });
      setNewComment('');
    }
  };

  return (
    <Container sx={{ maxWidth: '1810px !important', px: 0, mx: 0 }}>
      <Typography variant="h5" sx={{ mt: 3 }}>
        My Work
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mt: 4, display: 'flex' }}>
        <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Tabs value={tabIndex} onChange={handleTabChange} sx={{ ml: 2 }}>
              <Tab label="Task" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Discussion" id="tab-1" aria-controls="tabpanel-1" />
              <Tab label="Activity" id="tab-2" aria-controls="tabpanel-2" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
              {tasks.map((section, index) => (
                <Accordion key={index} defaultExpanded sx={{ boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{
                      pt: 0,
                      "&:hover": {
                        backgroundColor: "#0000000a",
                      }
                    }}
                  >
                    <Typography variant="h6" ml={2} my={0}>
                      {section.section}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card sx={{ boxShadow: "none", p: 0, m: 0 }}>
                      <CardContent sx={{ p: 0, pb: '0px !important' }}>
                        <List>
                          {section.items.map((item, idx) => (
                            <ListItem key={idx} sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              "&:hover": {
                                backgroundColor: "#0000000a",
                                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                                transform: "translateY(-1px)",
                                borderRadius: 2,
                              },
                            }}>
                              <ListItemIcon>
                                <Radio edge="start" />
                              </ListItemIcon>
                              <Box sx={{
                                display: 'flex',
                                flexGrow: 1,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                                <Typography variant="subtitle1" sx={{ mr: 2 }}>
                                  {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1 }}>
                                  {item.description}
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                                  {item.date}
                                </Typography>
                              </Box>
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              {discussions.map((discussion, index) => (
                <Accordion key={index} defaultExpanded sx={{ boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`discussion-panel${index}-content`}
                    id={`discussion-panel${index}-header`}
                    sx={{
                      pt: 0,
                      "&:hover": {
                        backgroundColor: "#0000000a",
                      }
                    }}
                  >
                    <Typography variant="h6" ml={2} my={0}>
                      {discussion.topic}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card sx={{ boxShadow: "none", p: 0, mb: 2, mx: 2 }}>
                      <CardContent sx={{ p: 0, pb: '0px !important' }}>
                        <Typography variant="body1" sx={{ ml: 2, mb: 1 }}>
                          Started by: {discussion.startedBy}
                        </Typography>
                        <Divider sx={{ mb: 1, ml: 1, width: '98%' }} />
                        <List>
                          {discussion.comments.map((comment, idx) => (
                            <ListItem key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                            sx={{ mb: 0}}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleCommentSubmit(index)}
                            sx={{  display: 'block' }}
                          >
                            Submit
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 3 }}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={setStartDate}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={setEndDate}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  </LocalizationProvider>
  {activities.map((day, dayIndex) => (
    <Card key={dayIndex} sx={{ mb: 3, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
      <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
        {day.date}
      </Typography>
      <Divider sx={{ my: 1, width: '94%', ml: 5.5 }} />
      <Timeline sx={{ ml: -3 }}>  {/* More aggressive left margin adjustment */}
        {day.events.map((activity, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent sx={{ flex: 0.1, p: 2 }}>
              <Typography variant="body2" color="textSecondary">
                {activity.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator sx={{ pt: 1 }}>
              <TimelineDot sx={{backgroundColor:"#00000099"}} />
              {index < day.events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent display={'flex'} justifyContent={'space-between'} sx={{ml: 1,"&:hover": {
                  backgroundColor: "#0000000a",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  transform: "translateY(-1px)",
                  borderRadius: 2,
                }}}>
              <Box display="flex" alignItems="flex-start" sx={{
                gap: 1,
                px: 1,
                pb: 0,
                pt: 1.5,
                
              }}>
                <Avatar sx={{ width: 24, height: 24 }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {activity.user}
                </Typography>
                <Typography variant="body2">
                  {activity.action}
                </Typography>
                <Typography variant="body2" color="primary">
                  {activity.project}
                </Typography>
                {activity.subtask && (
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {activity.subtask}
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" sx={{ flexShrink: 0, color: 'black', pt: 1, mr: 2 }}>
                {activity.project}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Card>
  ))}
</TabPanel>


          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default TodoTask;
