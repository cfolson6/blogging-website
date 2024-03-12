import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BlogPost from './components/BlogPost';
import LoginModal from './components/LoginModal';
import PostField from './components/PostField';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e24470',
    },
    secondary: {
      main: '#ff8b54',
    },
    background: {
      paper: '#070714',
      default: '#070714',
    },
  },
});

function App(props) {
  // stuff for the drawer appbar
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  // end stuff for drawer appbar
  
  const [blogPostData, setBlogPostData] = useState([]);
  const [accessToken, setAccessToken] = React.useState(null);
  const [refreshToken, setRefreshToken] = React.useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/blogpost/')
    .then(response => {
      console.log('Blogpost data: ', response.data);

      setBlogPostData(response.data);
    })
    .catch(error => {
      console.log('This is the error: ', error);
    });
  }, []);

  const getUserName = data => {
    if (null === data.user) {
      return '[USER DELETED]';
    } else {
      return '@' + data.user.username;
    }
  }

  const displayBlogPosts = () => {
    let posts = [];
    
    for (let i = 0; i < blogPostData.length; i++) {
      posts[blogPostData.length -1 -i] = <BlogPost 
        title={blogPostData[i].title} text={blogPostData[i].text} username={getUserName(blogPostData[i])} 
      />;
    }

    return posts;
  }

  const [postFieldOpen, setPostFieldOpen] = useState(false);

  // returns new post button or post field, or nothing if the user isn't logged in
  const buttonOrPostField = () => {
    if (null === accessToken) return null;
    
    if (!postFieldOpen) {
      return (
        <Button onClick={() => setPostFieldOpen(true)}>
          New Blogpost
        </Button>
      );
    } else {
      return <PostField accessToken={accessToken} setPostFieldOpen={setPostFieldOpen} setBlogPostData={setBlogPostData} />;
    }
  }

  const [usernameComponent, setUsernameComponent] = useState(
    <LoginModal setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} />
  );

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.get('http://localhost:8000/user/get-by-token/', { headers });
        const returnedUsername = response.data.username;
        setUsernameComponent(<Button color="inherit">{returnedUsername}</Button>);
      } catch (error) {
        console.error('Error fetching username:', error);
        setUsernameComponent(<LoginModal setAccessToken={setAccessToken} setRefreshToken={setRefreshToken} />);
      }
    };

    if (accessToken && refreshToken) {
      fetchUsername();
    }
  }, [accessToken, refreshToken]); // Trigger the effect when accessToken or refreshToken changes
  
  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              W
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
            {usernameComponent}
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Container maxWidth="sm">
          <Toolbar />
          <Stack spacing={2} marginTop={2} marginBottom={2}>
            {buttonOrPostField()}
            {displayBlogPosts()}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
