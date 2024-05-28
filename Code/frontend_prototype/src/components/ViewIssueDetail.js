import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, TextField, Button, Paper, Divider, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const ViewIssueDetail = () => {
  const [defectData, setDefectData] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState(''); // 선택된 담당자 ID 저장
  const [projectDevelopers, setProjectDevelopers] = useState([]); // 프로젝트 개발자 목록

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchIssueDetails = async () => {
    try {
      const response = await fetch('http://localhost:8080/issues/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        const data = await response.json();
        setDefectData(data);
      } else {
        console.error('Failed to fetch issue details');
      }
    } catch (error) {
      console.error('Error fetching issue details:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:8080/issue-comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issue_id: id }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUsername(storedUser);

        try {
          const usersResponse = await fetch('http://localhost:8080/users');
          const usersData = await usersResponse.json();
          const user = usersData.find(user => user.userName === storedUser);
          if (user) {
            const userId = user.id;
            const userResponse = await fetch(`http://localhost:8080/users/${userId}`);
            const userData = await userResponse.json();

            setRole(userData.userType);
          } else {
            console.error('User not found');
          }
        } catch (error) {
          console.error('Failed to fetch user or project ID:', error);
        }
      }
    };

    const fetchProjectDevelopers = async () => {
      if (defectData) {
        try {
          const projectId = defectData.projectId;
    
          const response = await fetch('http://localhost:8080/users');
          const users = await response.json();
   
          console.log(users);
          // 프로젝트 ID가 일치하고 userType이 'dev'인 유저만 필터링
          const developers = users.filter(
            (user) => user.project_id === projectId && user.userType === 'dev'
          );
          setProjectDevelopers(developers);
        } catch (error) {
          console.error('Error fetching project developers:', error);
        }
      }
    };

    
    fetchIssueDetails();
    fetchComments();
    fetchUserRole();
    fetchProjectDevelopers(); // defectData를 가져온 후에 실행
  }, [id]); // defectData가 변경될 때도 실행

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (comment.trim() !== '') {
      const newComment = {
        issue_id: id,
        content: comment,
        user_id: username,
      };

      try {
        const response = await fetch('http://localhost:8080/issue-comments/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });

        if (response.ok) {
          const savedComment = await response.json();
          setComment(''); // Clear the comment input field
          fetchComments(); // Fetch the updated list of comments
        } else {
          console.error('Failed to add comment');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    const requestPayload = {
      issue_id: id,
      user_id: username,
    };

    try {
      const response = await fetch('http://localhost:8080/issue-statuses/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      if (response.ok) {
        // Update the defect data status
        await fetchIssueDetails();
      } else {
        console.error('Failed to update issue status');
      }
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };

  const handleAssigneeChange = (event) => {
    setSelectedAssignee(event.target.value);
  };

  const handleAssigneeSubmit = async () => {

  };

  const renderActionButton = () => {
    if (!role || !defectData) return null;

    if (role === 'dev' && defectData.assignee === username && defectData.status === 'assigned') {
      return (
        <Button variant="contained" onClick={() => handleStatusUpdate('Fixed')}>
          To Fixed
        </Button>
      );
    }
    if (role === 'tester' && defectData.reporter === username && defectData.status === 'fixed') {
      return (
        <Button variant="contained" onClick={() => handleStatusUpdate('Resolved')}>
          To Resolved
        </Button>
      );
    }
    if (role === 'PL' && defectData.status === 'resolved') {
      return (
        <Button variant="contained" onClick={() => handleStatusUpdate('Closed')}>
          To Closed
        </Button>
      );
    }
    if (role === 'PL' && defectData.status === 'new') {
      return (
        <Grid container spacing={2} alignItems="center"> 
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="assignee-select-label">담당자 선택</InputLabel>
              <Select
                labelId="assignee-select-label"
                id="assignee-select"
                value={selectedAssignee}
                label="담당자 선택"
                onChange={handleAssigneeChange}
              >
                {projectDevelopers.map((developer) => (
                  <MenuItem key={developer.id} value={developer.id}>
                    {developer.userName} ({developer.userType}) 
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleAssigneeSubmit} disabled={!selectedAssignee}>
              담당자 할당
            </Button>
          </Grid>
        </Grid>
      );
    }
    return null;
  };

  if (!defectData) {
    return <Typography variant="h6" component="h2">Loading...</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: '20px auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            #{defectData.title}
          </Typography>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
            25 분 전에 업데이트
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">
            <strong>작성자:</strong> {defectData.reporter}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">
            <strong>우선 순위:</strong> {defectData.priority}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">
            <strong>담당자:</strong> {defectData.assignee}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">
            <strong>상태:</strong> {defectData.status}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">
            <strong>해결자:</strong> {defectData.fixer || '-'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">
            <strong>작성 날짜:</strong> {defectData.reportedDate}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
            이슈 설명
          </Typography>
          <Typography variant="body2" dangerouslySetInnerHTML={{ __html: defectData.description }} />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        {renderActionButton()}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h3">
            댓글
          </Typography>
        </Grid>
        {comments.map((comment) => (
          <Grid item xs={12} key={comment.id}>
            <Typography variant="body2">
              <strong>{comment.commenter}:</strong> {comment.comment}
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" component="h3">
            댓글 추가
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            multiline 
            rows={4} 
            placeholder="여기에 댓글을 사용할 수 있습니다." 
            value={comment} 
            onChange={handleCommentChange} 
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={handleAddComment}>
            댓글 저장
          </Button>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={() => navigate('/view-issues')}>목록으로 돌아가기</Button>
    </Paper>
  );
}

export default ViewIssueDetail;