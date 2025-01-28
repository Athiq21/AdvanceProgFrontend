import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CircularProgress, IconButton } from '@mui/material';
import { Comment, Bookmark } from '@mui/icons-material';
import apiConfig from '../../../Authentication/api';
import PopupCard from '../../../common/Component/Cards/PostCard/PopupCard';

interface Blob {
  id: number;
  uuid: string;
}

interface Post {
  id: number;
  userId: number;
  profileImageBlob: string | null;
  imageUrl: string;
  firstName: string;
  lastName: string;
  designation: string;
  title: string;
  description: string;
  likeCount: number;
  isLoggedUserReacted: boolean;
  blobs: Blob[];
}

interface PostViewProps {
  postId: number;
}

const PostView: React.FC<PostViewProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentOpen, setCommentOpen] = useState(false); // Comment popup state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await apiConfig.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch post details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleCommentOpen = () => setCommentOpen(true); // Open comment popup
  const handleCommentClose = () => setCommentOpen(false); // Close comment popup

  // Handle image navigation in popup
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : post?.blobs.length - 1 || 0));
  const handleNextImage = () => setCurrentImageIndex((prev) => (prev < (post?.blobs.length - 1 || 0) ? prev + 1 : 0));

  const imageUrl = post?.blobs.length ? `${apiConfig.defaults.baseURL}/blobs/fetch/${post.blobs[0].uuid}` : 'fallback-image-url';

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return <Typography variant="body1">Post not found.</Typography>;
  }

  return (
    <>
      <Card sx={{ minWidth: 200, maxWidth: 500,  p: 0, borderRadius: '10px', height: 340 }}>
        {post.blobs.length > 0 && (
          <CardMedia
            component="img"
            image={imageUrl}
            alt={post.title}
            sx={{ width: 500, height: 250 }}
          />
        )}
        <Box sx={{ padding: 1 }}>
          <Typography variant="h6">{post.title}</Typography>

          {/* Action Buttons */}
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Box>
              <IconButton onClick={handleCommentOpen}>
                <Comment />
              </IconButton>
            </Box>
            <IconButton>
              <Bookmark />
            </IconButton>
          </Box>
        </Box>
      </Card>

      {/* PopupCard for Comments */}
      <PopupCard
        open={commentOpen}
        onClose={handleCommentClose}
        blobs={post.blobs}
        currentImageIndex={currentImageIndex}
        profilePic={post.profileImageBlob || 'default-profile-pic-url'} 
        username={`${post.firstName} ${post.lastName}`} 
        title={post.title}
        description={post.description}
        postId={postId}
        imageUrl={post.imageUrl}
        handlePrevImage={handlePrevImage}
        handleNextImage={handleNextImage}
      />
    </>
  );
};

export default PostView;
