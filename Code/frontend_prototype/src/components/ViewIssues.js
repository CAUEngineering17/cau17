import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
//import './ViewIssues.css';

const issues = [
  { id: 1, title: '사용자 전체 삭제 기능', reporter: '오재환', reportedDate: '2000.06.26', priority: '중요함', status: '해결안됨', asignee: '박지형' },
  // 추가 티켓 데이터
  // 임시 데이터
];

const ViewIssues = () => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/view-issues/${id}`);
  };

  return (
    <TableContainer component={Paper}>      
      {/* Add spacing between SearchBar and Table */}
      <Box sx={{ mt: 2 }}> 
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Issue</TableCell>
              <TableCell>title</TableCell>
              <TableCell>reporter</TableCell>
              <TableCell>reportedDate</TableCell>
              <TableCell>priority</TableCell>
              <TableCell>status</TableCell>
              <TableCell>asignee</TableCell>
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
                <TableCell>{issue.asignee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );

};

export default ViewIssues;