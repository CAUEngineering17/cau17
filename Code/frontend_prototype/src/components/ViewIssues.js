import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import SearchBar from './SearchBar';

const ViewIssues = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      const username = localStorage.getItem('user');
      if (username) {
        try {
          const response = await fetch('http://localhost:8080/issues', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: username }),
          });

          const data = await response.json();
          console.log(data);
          setIssues(data);
        } catch (error) {
          console.error('Failed to fetch issues:', error);
        }
      } else {
        console.error('User not found');
      }
    };

    fetchIssues();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/view-issues/${id}`);
  };

  const handleSearch = (searchResults) => {
    setIssues(searchResults);
  };

  return (
    <TableContainer component={Paper}>
      <Box sx={{ mt: 2 }}>
        <SearchBar onSearch={handleSearch} />
        <Table>
          <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
            <TableRow>
              <TableCell sx={{ borderRight: '1px solid #aaaaaa' }}>Issue</TableCell>
              <TableCell sx={{ borderRight: '1px solid #aaaaaa' }}>Title</TableCell>
              <TableCell sx={{ borderRight: '1px solid #aaaaaa' }}>Reporter</TableCell>
              <TableCell sx={{ borderRight: '1px solid #aaaaaa' }}>Reported Date</TableCell>
              <TableCell sx={{ borderRight: '1px solid #aaaaaa' }}>Priority</TableCell>
              <TableCell sx={{ borderRight: '1px solid #aaaaaa' }}>Status</TableCell>
              <TableCell sx={{ borderRight: '1px solid #aaaaaa' }}>Assignee</TableCell>
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
