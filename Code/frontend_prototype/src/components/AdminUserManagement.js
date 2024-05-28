import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [projectMap, setProjectMap] = useState({}); // 프로젝트 ID와 제목을 매핑하는 객체

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/projects');
      const data = await response.json();
      setProjects(data);

      // 프로젝트 ID와 제목을 매핑하는 객체 생성
      const projectMap = {};
      data.forEach(project => {
        projectMap[project.id] = project.title;
      });
      setProjectMap(projectMap);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const newUser = { 
      id: username, 
      password: password, 
      confirmPassword: password,
      role: role, 
      project: selectedProject 
    };
    try {
      const response = await fetch('http://localhost:8080/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      console.log(newUser);

      if (response.ok) {
        fetchUsers();
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setRole('');
        setSelectedProject('');
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleDeleteSelectedUsers = async () => {
    for (const id of selectedUsers) {
      try {
        const response = await fetch(`http://localhost:8080/users/delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        });
        if (!response.ok) {
          console.error(`Failed to delete user with id ${id}`);
        }
      } catch (error) {
        console.error(`Failed to delete user with id ${id}:`, error);
      }
    }
    fetchUsers();
    setSelectedUsers([]);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((user) => user !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Manage User Accounts
      </Typography>
      <form onSubmit={handleAddUser}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="PL">PL</MenuItem>
            <MenuItem value="dev">dev</MenuItem>
            <MenuItem value="tester">tester</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="projects">Projects</InputLabel>
          <Select
            id="projects"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            required
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.title}>
                {project.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </form>
      <Table sx={{ mt: 4 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>join-Project</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userName}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedUsers.includes(user.userName)}
                  onChange={() => handleCheckboxChange(user.userName)}
                />
              </TableCell>
              <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                {user.userName}
              </TableCell>
              <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                {user.userPW}
              </TableCell>
              <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>
                {user.userType}
              </TableCell>
              <TableCell>{projectMap[user.project_id]}</TableCell> {/* 프로젝트 제목 표시 */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="error"
          type="button"
          onClick={handleDeleteSelectedUsers}
        >
          Remove selected Accounts
        </Button>
      </Box>
    </Box>
  );
};

export default AdminUserManagement;
