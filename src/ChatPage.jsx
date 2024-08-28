import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  TextField,
  Button,
  Paper
} from '@mui/material';

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
  const [selectedUser, setSelectedUser] = useState(users[2]); // Default selected user as object
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
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

  return (
    <Box sx={{ display: 'flex', height: '91vh' }}>
      <Box 
        sx={{
          width: '300px',
          borderRight: '1px solid #e0e0e0',
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
            maxHeight: 'calc(100vh - 150px)', // Adjust based on other components height
            overflowY: 'auto',
            '::-webkit-scrollbar': {
              width: '0px',
              background: 'transparent'
            }
          }}
        >
          {users.map((user) => (
            <ListItem button key={user.name} onClick={() => handleUserSelect(user)}>
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.role} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', my: 2, mr: 2,
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)" }}>
        <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2, height: '60px', width: '60px' }} src={selectedUser.avatar} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">{selectedUser.name}</Typography>
            <Typography variant="subtitle1">{selectedUser.role}</Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto', p: 2,overflowY: 'auto',
            '::-webkit-scrollbar': {
              width: '0px',
              background: 'transparent'
            } }}>
          {messages.filter(message => message.user === selectedUser.name).map((message, index) => (
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
                <Paper sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px',
                  backgroundColor: message.sender === 'mentor' ? '#bbdefb' : '#fff9c4', // Changed color to blue for sent messages
                  maxWidth: 'calc(100% - 80px)',
                  wordWrap: 'break-word'
                }}>
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
                {message.sender === 'mentor' && (
                  <Avatar sx={{ ml: 1 }} src={message.avatar} />
                )}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ borderTop: '1px solid #e0e0e0', p: 2, display: 'flex' }}>
          <TextField
            fullWidth
            placeholder="Send messages..."
            variant="outlined"
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" sx={{ height: '40px' }} onClick={handleSendMessage}>Send</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
