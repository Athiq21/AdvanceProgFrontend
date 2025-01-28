import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, Avatar, Typography, IconButton, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { fetchUserPosts, deletePost } from '../../../../store/features/userPostSlice';
import PostCards from '../PostCard/PostCards';
import apiConfig from '../../../../Authentication/api';

interface ViewCardProps {
  open: boolean;
  onClose: () => void;
  profilePic: string;
  username: string;
  userId: number;
  designation: string;
  designationUrl: string; 
}

const ViewCard: React.FC<ViewCardProps> = ({ open, onClose, profilePic, username, userId, designation,  designationUrl}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.userPosts);
  const [posts, setPosts] = useState<any[]>([]); // Replace `any` with your Post type
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetch user posts when the dialog opens
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (open) {
        try {
          const response = await apiConfig.get(`/posts/user/${userId}`);
          setPosts(response.data.content); // Assuming posts are in `content`
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
      }
    };

    fetchUserPosts();
  }, [open, userId]);

  const handleDelete = async () => {
    if (deleteId === null) return;

    try {
      await dispatch(deletePost(deleteId)).unwrap();
      console.log(`Post with ID ${deleteId} deleted successfully.`);
      // Optionally, you can refetch the posts here after a successful delete
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleClickOpen = (id: number) => {
    setDeleteId(id);
  };

  const handleCloseDialog = () => {
    setDeleteId(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" mb="-10px">
          <Avatar src={profilePic} sx={{ width: 80, height: 80, mb: 1 }} />
          <Typography variant="h6" mb={0.5}>{username}</Typography> {/* Reduced margin bottom */}
          <Box sx={{display:'flex'}}>
          {designationUrl && (
            <Avatar 
              src={designationUrl} 
              alt="Designation Image" 
              sx={{ width: 50, height: 50, mb: 0 }} 
            />
          )}
          <Typography variant="subtitle1" color="textSecondary" mt={1}>{designation}</Typography> {/* Reduced margin bottom */}
          </Box>
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16 }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : posts.length > 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            {posts.map((post) => (
              <Box
                key={post.id}
                sx={{
                  width: '65%',
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <PostCards post={post} />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography align="center">No posts available.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewCard;
