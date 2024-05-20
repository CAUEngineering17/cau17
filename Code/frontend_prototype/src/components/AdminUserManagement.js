import React from 'react';
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
  // 사용자 데이터 배열
  const users = [
    {
      username: 'jaehwan',
      password: '00000',
      role: 'dev',
    },
    {
      username: 'jihyung',
      password: '1111',
      role: 'tester',
    },
    // 필요한 만큼 사용자 데이터를 추가
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Manage User Accounts
      </Typography>
      <form>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <TextField id="username" label="Username" type="text" />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField id="password" label="Password" type="password" />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
          <TextField id="confirm-password" label="Confirm Password" type="password" />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select id="role" label="Role">
            <MenuItem value="PL">PL</MenuItem>
            <MenuItem value="dev">dev</MenuItem>
            <MenuItem value="tester">tester</MenuItem>
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
          <TableRow sx={{ backgroundColor: '#e0e0e0' }}> {/* TableHead에 배경색 적용 */}
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
              <TableCell>username</TableCell>
              <TableCell>password</TableCell>
              <TableCell>role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>{user.username}</TableCell>
            <TableCell sx={{ borderRight: '1px solid #e0e0e0' }}>{user.password}</TableCell>
            <TableCell>{user.role}</TableCell> {/* 마지막 열에는 경계선을 적용하지 않음 */}
          </TableRow>
        ))}
        </TableBody>
      </Table>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" type="button">
          Reset passwords
        </Button>
        <Button variant="contained" color="error" type="button">
          Remove selected Accounts
        </Button>
      </Box>
    </Box>
  );
};

export default AdminUserManagement;
