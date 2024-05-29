import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const AdminSidebar = () => {
  return (
    <Box
      sx={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '16px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Admin Panel
      </Typography>
      <List>
        <ListItem button component={Link} to="/admin/settings">
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/admin/users">
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/admin/statistic">
          <ListItemText primary="statistic" />
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminSidebar;
