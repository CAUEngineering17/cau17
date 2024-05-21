import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Divider 
} from '@mui/material';

const ViewIssueDetail = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'User02', text: '이 이슈에 동의합니다. 빠른 해결 부탁드립니다.' }
  ]);

  const { id } = useParams();
  const navigate = useNavigate();

  const defectData = {
    title: '사용자 결제 삭제 기능 오류',
    description: '결제가 오류가 났는데 이런저런 문제까지 겹치고 못해먹겠어요...에러 죽어',
    reporter: 'User01',
    reportedDate: '2000.06.26',
    priority: 'major',
    status: 'new',
    Assignee: '박지형',
    Fixer: '-',
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComment = { id: comments.length + 1, user: '현재 사용자', text: comment };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

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
            <strong>담당자:</strong> {defectData.Assignee}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">
            <strong>상태:</strong> {defectData.status}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">
            <strong>해결자:</strong> {defectData.Fixer}
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
          <Typography variant="body2">
            {defectData.description}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <Button variant="contained" onClick={() => console.log('이슈 수정', comment)}>
          이슈 수정
        </Button>
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
              <strong>{comment.user}:</strong> {comment.text}
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
