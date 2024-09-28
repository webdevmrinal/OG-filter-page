import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  TextField,
  IconButton,
  Paper,
  useMediaQuery,
  useTheme,
  Skeleton // Import Skeleton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

const users = [
  { name: "Aqib Rafiq", role: "Mentor", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Dheeraj Prasad", role: "Mentor", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Gunjan Sinha", role: "Learner", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Isha Panwar", role: "Learner", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Krishna Kumar", role: "Mentor", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Fabio Nero", role: "Learner", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
  { name: "Rahul Kr", role: "Mentor", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Sanan", role: "Learner", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
  { name: "New User 1", role: "Learner", avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
  { name: "New User 2", role: "Mentor", avatar: "https://randomuser.me/api/portraits/men/8.jpg" },
  { name: "New User 3", role: "Learner", avatar: "https://randomuser.me/api/portraits/men/9.jpg" },
  { name: "New User 4", role: "Mentor", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
];

const initialMessages = [
  { text: "Hi, how can I help you today?", sender: "mentor", user: "Gunjan Sinha", avatar: "https://randomuser.me/api/portraits/men/3.jpg", timestamp: "2024-08-28 10:00 AM" },
  { text: "I'm having trouble understanding React hooks.", sender: "learner", user: "Gunjan Sinha", avatar: "https://randomuser.me/api/portraits/women/1.jpg", timestamp: "2024-08-28 10:05 AM" },
  { text: "Sure, I can explain them to you. Do you need a general overview or help with a specific issue?", sender: "mentor", user: "Gunjan Sinha", avatar: "https://randomuser.me/api/portraits/men/3.jpg", timestamp: "2024-08-28 10:10 AM" },
  { text: "I think I need a general overview first.", sender: "learner", user: "Gunjan Sinha", avatar: "https://randomuser.me/api/portraits/women/1.jpg", timestamp: "2024-08-28 10:15 AM" },
  { text: "Okay, let's start with the basics of useState and useEffect.", sender: "mentor", user: "Gunjan Sinha", avatar: "https://randomuser.me/api/portraits/men/3.jpg", timestamp: "2024-08-28 10:20 AM" }
];

const ChatPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedUser, setSelectedUser] = useState(null); // Start with no user selected
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showMessages, setShowMessages] = useState(!isMobile); // Show messages on desktop by default

  // Loading states
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    // Simulate loading users
    const userLoadTimeout = setTimeout(() => {
      setLoadingUsers(false);
    }, 300); // 1.5 seconds delay

    return () => clearTimeout(userLoadTimeout);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoadingMessages(true);
      // Simulate loading messages
      const messageLoadTimeout = setTimeout(() => {
        // Filter messages for the selected user
        const userMessages = initialMessages.filter(message => message.user === selectedUser.name);
        setMessages(userMessages);
        setLoadingMessages(false);
      }, 1000); // 1 second delay

      return () => clearTimeout(messageLoadTimeout);
    }
  }, [selectedUser]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowMessages(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const currentTimestamp = new Date().toLocaleString('en-US', { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true, 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric' 
      });

      const updatedMessages = [...messages, {
        text: newMessage,
        sender: 'mentor',
        user: selectedUser.name,
        avatar: selectedUser.avatar,
        timestamp: currentTimestamp
      }];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline in TextField
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '91vh' }}>
      {(!isMobile || !showMessages) && (
        <Box 
          sx={{
            width: isMobile ? '100%' : '300px',
            borderRight: isMobile ? 'none' : '1px solid #e0e0e0',
            overflow: 'hidden',
            m: 2,
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
          }}
        >
          <Typography variant="h6" sx={{ m: 2 }}>
            Engaged Members
          </Typography>
          <List 
            sx={{
              maxHeight: isMobile ? 'calc(100vh - 150px)' : 'calc(100vh - 150px)',
              overflowY: 'auto',
              '::-webkit-scrollbar': {
                width: '0px',
                background: 'transparent'
              }
            }}
          >
            {loadingUsers ? (
              // Display skeletons while loading users
              Array.from(new Array(6)).map((_, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Skeleton variant="circular">
                      <Avatar />
                    </Skeleton>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Skeleton width="80%" />}
                    secondary={<Skeleton width="40%" />}
                  />
                </ListItem>
              ))
            ) : (
              users.map((user) => (
                <ListItem button key={user.name} onClick={() => handleUserSelect(user)}>
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.role} />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      )}

      {(!isMobile || showMessages) && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', my: 2, mx: 2, boxShadow: "0 4px 6px rgba(0,0,0,0.2)" }}>
          <Box sx={{ 
            p: 2, 
            backgroundColor: '#f5f5f5', 
            borderBottom: '1px solid #e0e0e0', 
            display: 'flex', 
            alignItems: 'center' 
          }}>
            {isMobile && (
              <IconButton onClick={() => setShowMessages(false)} sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
            )}
            {selectedUser ? (
              <>
                <Avatar sx={{ mr: 2, height: '60px', width: '60px' }} src={selectedUser.avatar} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">{selectedUser.name}</Typography>
                  <Typography variant="subtitle1">{selectedUser.role}</Typography>
                </Box>
              </>
            ) : (
              // Display skeletons when no user is selected
              <>
                <Skeleton variant="circular" sx={{ mr: 2, height: '60px', width: '60px' }}>
                  <Avatar />
                </Skeleton>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Box>
              </>
            )}
          </Box>
          
          <Box 
            sx={{ 
              flex: 1, 
              overflowY: 'auto', 
              p: 2,
              backgroundColor: '#fafafa',
              '::-webkit-scrollbar': {
                width: '0px',
                background: 'transparent'
              }
            }}
          >
            {loadingMessages ? (
              // Display skeletons while loading messages
              Array.from(new Array(5)).map((_, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Skeleton variant="text" width="30%" />
                  <Skeleton variant="rectangular" height={60} />
                </Box>
              ))
            ) : (
              selectedUser && messages.map((message, index) => (
                <Box key={index}>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: message.sender === 'mentor' ? 'right' : 'left', mb: 1 }}>
                    {message.timestamp}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'mentor' ? 'flex-end' : 'flex-start',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    {message.sender === 'learner' && (
                      <Avatar sx={{ mr: 1 }} src={message.avatar} />
                    )}
                    <Paper 
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '10px',
                        backgroundColor: message.sender === 'mentor' ? '#eeeeee' : '#FFFDE7', // Lighter colors
                        maxWidth: 'calc(100% - 80px)',
                        wordWrap: 'break-word',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                    {message.sender === 'mentor' && (
                      <Avatar sx={{ ml: 1 }} src={message.avatar} />
                    )}
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {selectedUser && (
            <Box sx={{ borderTop: '1px solid #e0e0e0', p: 2, display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
              <TextField
                fullWidth
                placeholder="Send messages..."
                variant="outlined"
                size="small"
                multiline={false}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress} // Handle Enter key
                sx={{
                  mr: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                  backgroundColor: '#ffffff', // Optional: Set background to white
                  borderRadius: '8px', // Optional: Rounded corners
                }}
              />
              <IconButton 
                color="primary" 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                aria-label="send message"
              >
                <SendIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ChatPage;
