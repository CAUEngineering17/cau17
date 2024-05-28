import React, { useState, useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Typography, Grid, Container, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminProjectSettings = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProject = { title, description };
    try {
      const response = await fetch('http://localhost:8080/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      if (response.ok) {
        fetchProjects(); // Refresh the project list
        setTitle('');
        setDescription('');
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/projects/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',  // 본문 타입 JSON으로 설정
        },
        body: JSON.stringify({ project_id: id })  // JSON 본문 설정
      });
      if (response.ok) {
        fetchProjects(); // Refresh the project list
      } else {
        console.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Project Settings
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              id="project-title"
              name="project-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              id="project-description"
              name="project-description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Project
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Existing Projects
        </Typography>
        <Paper>
          <List>
            {projects.map((project) => (
              <ListItem key={project.id}>
                <ListItemText
                  primary={project.title}
                  secondary={project.description}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(project.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminProjectSettings;
