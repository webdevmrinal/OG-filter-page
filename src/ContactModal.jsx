import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const ContactModal = ({ open, onClose, professorName }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Message {professorName}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Ask {professorName} a question or share your project details (requirements, timeline, budget, etc.)
        </Typography>

        {/* Message Input Field */}
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Type your message here..."
          sx={{
            mt: 3,
            '.MuiInputBase-root': {
              flexDirection: 'column-reverse',
              borderRadius: '4px',
            },
            '.MuiOutlinedInput-root': {
              borderColor: '#d1d1d1',
              '&.Mui-focused': {
                borderColor: '#d1d1d1',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column-reverse', // Reverse the order of the buttons
                  alignItems: 'flex-start',
                  gap: 1,
                  width: '100%',
                  mb: 2,
                }}
              >
                <Button 
                  variant="outlined" 
                  sx={{
                    textTransform: 'none',
                    borderRadius: 20,
                    padding: '8px 12px',
                    borderColor: '#e0e0e0',
                    color: '#333',
                    height: '5vh',
                    width: 'auto',  // Full width of the TextField
                    justifyContent: 'flex-start', // Left align the text
                    '&:hover': {
                      borderColor: '#d1d1d1',
                    },
                  }}
                >
                  👋 Hey {professorName}, can you help me with...
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{
                    textTransform: 'none',
                    borderRadius: 20,
                    padding: '8px 12px',
                    borderColor: '#e0e0e0',
                    color: '#333',
                    height: '5vh',
                    width: 'auto',  // Full width of the TextField
                    justifyContent: 'flex-start', // Left align the text
                    '&:hover': {
                      borderColor: '#d1d1d1',
                    },
                  }}
                >
                  Would it be possible to get a custom offer for...
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{
                    textTransform: 'none',
                    borderRadius: 20,
                    height: '5vh',
                    padding: '4px 8px',
                    borderColor: '#e0e0e0',
                    fontSize: '0.875em !important',
                    color: '#333',
                    width: 'auto',  // Full width of the TextField
                    justifyContent: 'flex-start', // Left align the text
                    '&:hover': {
                      borderColor: '#d1d1d1',
                    },
                  }}
                >
                  Do you think you can deliver an order by...
                </Button>
              </Box>
            ),
          }}
        />
      </DialogContent>
      
      {/* Actions (Emoji, Attachment on the left, Send and Cancel on the right) */}
      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button variant="contained" color="primary" endIcon={<SendIcon />}>
            Send Message
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ContactModal;
