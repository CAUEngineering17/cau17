import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box } from '@mui/material';
import Login from './Login';


const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2196F3' }}> {/* Set AppBar background color */}
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}> {/* Set title text color */}
          Ticket
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Login />
          <Box sx={{ mt: 2 }}>
            <Link href="/view-issues" underline="none" color="inherit">
              <Button variant="text" sx={{ color: 'white' }}> {/* Set button text color */}
                View Issues
              </Button>
            </Link>
            <Link href="/new-issue" underline="none" color="inherit">
              <Button variant="text" sx={{ color: 'white' }}>
                New Issue
              </Button>
            </Link>
            <Link href="/admin" underline="none" color="inherit">
              <Button variant="text" sx={{ color: 'white' }}>
                Admin
              </Button>
            </Link>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;