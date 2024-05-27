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
          const response = await fetch('http://localhost:8080/issues', {
            method: 'POST', // 변경된 메소드
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: username }), // body로 데이터 전송
          });
          
          const data = await response.json(); // 응답을 JSON 형식으로 파싱
          setIssues(data); // issues 상태 업데이트
        } 
        catch (error) {
            console.error('Failed to fetch issues:', error);
        } 
      }
      else {
            console.error('User not found');
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
