import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      const username = localStorage.getItem('user');
      if (username) {
        try {
          const usersResponse = await fetch('http://localhost:8080/users');
          const usersData = await usersResponse.json();
          const user = usersData.find(user => user.userName === username);
          if (user) {
            const userId = user.id;
            const userResponse = await fetch(`http://localhost:8080/users/${userId}`);
            const userData = await userResponse.json();

            console.log(userData)

            const projectId = userData.project_id;
            const issuesResponse = await fetch(`http://localhost:8080/project/${projectId}/issues`);
            const issuesData = await issuesResponse.json();
            setIssues(issuesData);
          } else {
            console.error('User not found');
          }
        } catch (error) {
          console.error('Failed to fetch issues:', error);
        }
      }
    };

    fetchIssues();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/view-issues/${id}`);
  };

  return (
    <TableContainer component={Paper}>      
      <Box sx={{ mt: 2 }}> 
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Issue</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Reporter</TableCell>
              <TableCell>Reported Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assignee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id} hover onClick={() => handleRowClick(issue.id)} style={{ cursor: 'pointer' }}>
                <TableCell>{issue.id}</TableCell>
                <TableCell>{issue.title}</TableCell>
                <TableCell>{issue.reporter}</TableCell>
                <TableCell>{issue.reportedDate}</TableCell>
                <TableCell>{issue.priority}</TableCell>
                <TableCell>{issue.status}</TableCell>
                <TableCell>{issue.assignee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default ViewIssues;
