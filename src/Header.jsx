import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Badge, Avatar, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import MessageIcon from '@mui/icons-material/MessageOutlined';
import { styled } from '@mui/system';

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  marginLeft: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#ffffff' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="back">
          <ArrowBackIosNewIcon />
        </IconButton>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Experts..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} sx={{ '& .MuiBadge-badge': { backgroundColor: '#FFEB3B', color: 'black' } }}>
              <MessageIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={10} sx={{ '& .MuiBadge-badge': { backgroundColor: '#FFEB3B', color: 'black' } }}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar sx={{ width: 30, height: 30 }} src="path_to_your_image" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
