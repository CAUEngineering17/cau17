import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import Login from './Login';

const Header = ({ isLoggedIn, isAdmin, onLogout, onLogin }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2196F3' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
          Ticket
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              <Button variant="contained" onClick={onLogout} sx={{ mb: 2 }}>
                Logout
              </Button>
              <Box sx={{ mt: 2 }}>
                {!isAdmin && (
                  <div>
                    <Link href="/view-issues" underline="none" color="inherit">
                      <Button variant="text" sx={{ color: 'white' }}>
                        View Issues
                      </Button>
                    </Link>
                    <Link href="/new-issue" underline="none" color="inherit">
                      <Button variant="text" sx={{ color: 'white' }}>
                        New Issue
                      </Button>
                    </Link>
                  </div>
                )}
                {isAdmin && (
                  <Link href="/admin" underline="none" color="inherit">
                    <Button variant="text" sx={{ color: 'white' }}>
                      Admin
                    </Button>
                  </Link>
                )}
              </Box>
            </>
          ) : (
            <Login onLogin={onLogin} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
