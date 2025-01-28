import React, { useState } from 'react';
import { Box, Avatar, Typography, IconButton, TextField } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface ReplyProps {
  id: number;
  username: string;
  text: string;
  avatar: string;
}

interface CommentProps {
  id: number;
  username: string;
  text: string;
  avatar: string;
  replies: ReplyProps[];
}

interface CommentBoxProps {
  comments: CommentProps[];
  profilePic: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({ comments, profilePic }) => {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => setLiked(!liked);

  return (
    <Box sx={{ mt: 2 }}>
      {comments.map((comment) => (
        <Box key={comment.id} sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center">
            <Avatar src={comment.avatar} sx={{ width: 24, height: 24 }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {comment.username}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ ml: 3 }}>
            {comment.text}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ ml: 3 }}>
            <Typography variant="body2" sx={{ cursor: 'pointer', color: 'blue' }}>
              Show reply
            </Typography>
            <IconButton aria-label="like" sx={{ p: 0, ml: 1 }} onClick={handleLike}>
              {liked ? <Favorite fontSize="small" color="error" /> : <FavoriteBorder fontSize="small" />}
            </IconButton>
          </Box>
          {comment.replies.length > 0 && (
            <Box sx={{ ml: 3, mt: 1 }}>
              {comment.replies.map((reply) => (
                <Box key={reply.id} sx={{ mb: 1 }}>
                  <Box display="flex" alignItems="center">
                    <Avatar src={reply.avatar} sx={{ width: 20, height: 20 }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {reply.username}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ ml: 3 }}>
                    {reply.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
      <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
        <Avatar src={profilePic} sx={{ width: 24, height: 24 }} />
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a comment."
          sx={{ ml: 2 }}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default CommentBox;
