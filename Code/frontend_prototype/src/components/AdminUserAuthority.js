import React, { useState } from 'react';
import {
  Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper
} from '@mui/material';

const AdminUserManagement = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description for Project 1' },
    { id: 2, title: 'Project 2', description: 'Description for Project 2' }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', permissions: [1] },
    { id: 2, name: 'User 2', permissions: [2] },
    { id: 3, name: 'User 3', permissions: [] }
  ]);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handleAddPermission = (event) => {
    event.preventDefault();
    if (selectedUser && selectedProject) {
      setUsers(users.map(user => 
        user.id === parseInt(selectedUser) ? { ...user, permissions: [...user.permissions, parseInt(selectedProject)] } : user
      ));
    }
  };

  const handleTogglePermission = (userId, projectId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const permissions = user.permissions.includes(projectId)
          ? user.permissions.filter(id => id !== projectId)
          : [...user.permissions, projectId];
        return { ...user, permissions };
      }
      return user;
    }));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        User Project Permissions
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          User Permissions
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                {projects.map((project) => (
                  <TableCell key={project.id}>{project.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  {projects.map((project) => (
                    <TableCell key={project.id}>
                      <Checkbox
                        checked={user.permissions.includes(project.id)}
                        onChange={() => handleTogglePermission(user.id, project.id)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminUserManagement;
