import React, { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Container, Grid, Box } from '@mui/material';
import RichTextEditor from './RichTextEditor';
//import './NewIssue.css';

const NewIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('Sample');
  const [priority, setPriority] = useState('major');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log({ title, description, priority });
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>새로운 이슈 작성하기</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="제목"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ mb: 6 }}>
              <RichTextEditor value={description} onChange={setDescription} sx={{ height: 200 }} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>projects</InputLabel>
              <Select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                label="projects"
              >
                <MenuItem value="Sample">Sample</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>우선 순위</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="우선 순위"
              >
                <MenuItem value="blocker">blocker</MenuItem>
                <MenuItem value="critical">critical</MenuItem>
                <MenuItem value="major">major</MenuItem>
                <MenuItem value="minor">minor</MenuItem>
                <MenuItem value="trivial">trivial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              이슈 만들기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NewIssue;
