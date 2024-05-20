import React, { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Box, Typography, Grid, Container, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminProjectSettings = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project 1', description: 'Description for Project 1' },
    { id: 2, title: 'Project 2', description: 'Description for Project 2' }
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProject = { id: projects.length + 1, title, description };
    setProjects([...projects, newProject]);
    setTitle('');
    setDescription('');
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <Container maxWidth="md">
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
    </Container>
  );
};

export default AdminProjectSettings;
