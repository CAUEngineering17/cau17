import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Container, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from './RichTextEditor';

const NewIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('major');
  const [projectId, setProjectId] = useState('');
  const [reporter, setReporter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProject = async () => {
      const username = localStorage.getItem('user');
      if (username) {
        setReporter(username);
        try {
          const usersResponse = await fetch('http://localhost:8080/users');
          const usersData = await usersResponse.json();
          const user = usersData.find(user => user.userName === username);
          if (user) {
            const userId = user.id;
            const userResponse = await fetch(`http://localhost:8080/users/${userId}`);
            const userData = await userResponse.json();
            //setProjectId(userData.project_id);
            setProjectId(1);
          } else {
            console.error('User not found');
          }
        } catch (error) {
          console.error('Failed to fetch user or project ID:', error);
        }
      }
    };
    fetchUserAndProject();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newIssue = {
      title,
      description,
      project_id: projectId,
      priority,
      reporter,
    };

    try {
      const response = await fetch('http://localhost:8080/issues/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIssue),
      });

      if (response.ok) {
        navigate('/view-issues');
      } else {
        console.error('Failed to create issue');
      }
    } catch (error) {
      console.error('Failed to create issue:', error);
    }
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
