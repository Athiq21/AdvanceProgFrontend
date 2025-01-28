import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BASE_URL } from '../../../Authentication/api';
import {
    Box,
    CircularProgress,
    IconButton,
    Typography,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    CardMedia,
    Divider,
    Dialog, 
    DialogTitle,
    DialogContent,
    List,
    TextField,
    ListItem,
    ListItemAvatar,ListItemText,
} from '@mui/material';
import {
    ArrowBackIos,
    ArrowForwardIos,
    Favorite,
    FavoriteBorder,
    Comment,
    Send,
    Bookmark,
    BookmarkBorder,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchSavedPosts } from '../../../store/features/savedSlice';
import apiConfig from '../../../Authentication/api';
import { FileBlob } from '../../../type/FileBlob';
import { UserDetailPost } from '../../../type/UserDetailPost';
import { fetchUsersWithMessages } from '../../../Service/messageService';
import { sendMessage } from '../../../Service/messageService';
import AddButtons from '../../../common/Component/Button/Add/AddButtons';
import {  toggleLike, fetchLikeCount  } from '../../../store/features/reactionSlice';

interface PostCardProps {
  post: UserDetailPost;
}

interface Post {
    id: number;
    title: string;
    description: string;
    blobs: FileBlob[];
    comments: any[];
    reactions: any[];
    fileBlobs: Array<{ uuid: string; id: number }>; // Specify the structure of fileBlobs
}

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
}

// Define the structure of the saved post data
interface SavedPostData {
    post: Post;
    createdBy: User;
}

const SavedItem: React.FC<PostCardProps> = ( post) => {

    const PostPopup = lazy(() => import('./../../../common/Component/Cards/PostCard/PopupCard'))

    const dispatch = useDispatch();
      const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const { savedPosts, status, error } = useSelector((state: RootState) => state.saved);
    const [profilePopupOpen, setProfilePopupOpen] = useState(false);
    const [isPostPopupOpen, setIsPostPopupOpen] = useState(false); // Renamed state for popup
    const [activePostId, setActivePostId] = useState<number | null>(null); // Track the active post id
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // For image carousel
    const [isSaved, setIsSaved] = useState(false); // To manage save state
      const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [fetchingUsers, setFetchingUsers] = useState(true);
    const [loading, setLoading] = useState(true);
      const [messageContent, setMessageContent] = useState('');

     
        const { likedPosts, likeCounts } = useSelector((state: RootState) => state.reactions);
      
       
      useEffect(() => {
        const loadData = async () => {
          setFetchingUsers(true); // Start fetching users
          try {
            // Fetching users that can receive messages
            const usersData = await fetchUsersWithMessages();
            console.log('Fetched users:', usersData.data); // Debug log for users
            setUsers(usersData.data);
          } catch (error) {
            console.error('Failed to fetch users:', error);
          } finally {
            setFetchingUsers(false); // Finished fetching users
          }
        };
    
        loadData();
      }, [dispatch, post.id]);
      

    useEffect(() => {
        dispatch(fetchSavedPosts());
    }, [dispatch]);

    const handleClickOpenPopup = (postId: number) => {
        setActivePostId(postId);
        setIsPostPopupOpen(true);  // Open the post popup when clicked
    };

    const handleClosePopup = () => {
        setIsPostPopupOpen(false);  // Close the post popup
        setActivePostId(null);  // Reset the active post id after closing
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const handleNextImage = () => {
        // Ensure we don't exceed the bounds of fileBlobs array
        setCurrentImageIndex((prevIndex) => (prevIndex < (currentImageIndex.length - 1) ? prevIndex + 1 : prevIndex));
    };

    const handleSaveToggle = () => {
        setIsSaved((prev) => !prev);
    };

    if (status === 'loading') return <CircularProgress />;
    if (status === 'failed') return <div>Error: {error}</div>;

    const posts = Object.values(savedPosts);

    return (
        <Box sx={{ padding: '20px', ml: 0 }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                    gap: 3, 
                }}
            >
                {posts.length > 0 ? (
                    posts.map((postData: SavedPostData, index) => {
                        if (!postData.post || !postData.createdBy) {
                            console.error(`Invalid post data at index ${index}:`, postData);
                            return null; 
                        }

                        const { post, createdBy } = postData;

                        const handleLikeToggle = async () => {
                            try {
                              await dispatch(toggleLike(post.id)).unwrap();
                              dispatch(fetchLikeCount(post.id));
                            } catch (error) {
                              console.error('Failed to toggle like:', error);
                            }
                          };

                        const isLiked = likedPosts[post.id] || false;
                        const likeCount = likeCounts[post.id] || 0;
  
    const handleShare =()=>{
        console.log("Post ID:", post.id);
    setShareDialogOpen(true);
    }
                        const handleShareToUser = async () => {
                            if (selectedUserId && messageContent) {
                              try {
                                await sendMessage(selectedUserId, `Shared a post with you: ${messageContent}`, post.id);
                                alert('Post shared successfully!');
                                setShareDialogOpen(false);
                              } catch (error) {
                                console.error('Error sharing post:', error);
                              }
                            }
                          };

                        return (
                            <Card key={post.id} sx={{ padding: '10px', borderRadius: '10px' }}>
                                <CardHeader
                                    avatar={<Avatar src={createdBy.imageUrl} />}
                                    title={`${createdBy.firstName} ${createdBy.lastName}`}
                                   sx={{ cursor: 'pointer', position: 'relative', marginBottom:'-10px' }}
                                  
                                />
                                <CardContent>
                                    {post.title && (
                                        <Typography variant="body1" gutterBottom>
                                            {post.title}
                                        </Typography>
                                    )}
                                    {post.description && (
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            {post.description}
                                        </Typography>
                                    )}
                                    {post.fileBlobs && post.fileBlobs.length > 0 && (
                                        <Box position="relative">
                                            <CardMedia
                                                component="img"
                                                image={`${apiConfig.defaults.baseURL}/blobs/fetch/${post.fileBlobs[currentImageIndex]?.uuid}`}
                                                alt={post.title || 'Post Image'}
                                            />
                                            {post.fileBlobs.length > 1 && (
                                                <>
                                                    <Box
                                                        position="absolute"
                                                        top="50%"
                                                        left={0}
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={handlePrevImage}
                                                    >
                                                        <IconButton aria-label="prev" sx={{ color: 'white' }}>
                                                            <ArrowBackIos />
                                                        </IconButton>
                                                    </Box>
                                                    <Box
                                                        position="absolute"
                                                        top="50%"
                                                        right={0}
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={handleNextImage}
                                                    >
                                                        <IconButton aria-label="next" sx={{ color: 'white' }}>
                                                            <ArrowForwardIos />
                                                        </IconButton>
                                                    </Box>
                                                </>
                                            )}
                                        </Box>
                                    )}
                                    <Divider />
                                      <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                                            <Typography sx={{ fontSize: '10px' }}>{likeCount} likes</Typography>
                                          </Box>
                                    <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
                                        <Box>
                                              <IconButton aria-label="like" sx={{ marginTop: "2px" }} onClick={handleLikeToggle}>
                                                        {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
                                                      </IconButton>
                                            <IconButton
                                                aria-label="comment"
                                                onClick={() => handleClickOpenPopup(post.id)}  // Pass post ID to handle the popup
                                                sx={{ marginTop: "6px" }}
                                            >
                                                <Comment />
                                            </IconButton>
                                            <IconButton aria-label="share" onClick={handleShare}>
                                                       <Send sx={{ rotate: '-45deg' }} />
                                                     </IconButton>
                                        </Box>
                                        <IconButton aria-label="save" onClick={handleSaveToggle}>
                                            {isSaved ? <Bookmark /> : <BookmarkBorder />}
                                        </IconButton>
                                    </Box>
                                </CardContent>

                                {/* Lazy-loaded components */}
                                <Suspense>
                                    {isPostPopupOpen && activePostId === post.id && (
                                        <PostPopup
                                            open={isPostPopupOpen}
                                            onClose={handleClosePopup} // Close function for PostPopup
                                            blobs={post.fileBlobs}
                                            currentImageIndex={currentImageIndex}
                                            username={`${createdBy.firstName} ${createdBy.lastName}`}
                                            title={post.title}
                                            postId={post.id}
                                            imageUrl={createdBy.imageUrl}
                                            description={post.description}
                                            handlePrevImage={handlePrevImage}
                                            handleNextImage={handleNextImage}
                                        />
                                    )}
                                </Suspense>

                                       {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <DialogTitle>Select User to Share With</DialogTitle>
        <DialogContent>
          <List>
            {fetchingUsers ? (
              <CircularProgress />
            ) : (
              users.map(user => (
                <ListItem button key={user.id} onClick={() => setSelectedUserId(user.id)}>
                  <ListItemAvatar>
                    <Avatar src={user.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                </ListItem>
              ))
            )}
          </List>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add a message..."
            value={messageContent}
            onChange={e => setMessageContent(e.target.value)}
            sx={{ mt: 2 }}
          />
          <AddButtons
            variant="contained"
            color="primary"
            onClick={handleShareToUser}
            disabled={!selectedUserId || !messageContent}
            sx={{ mt: 2,height:30 }}
          >
            Share
          </AddButtons>
        </DialogContent>
      </Dialog>

                            </Card>
                        );
                    })
                ) : (
                    <div>No posts available.</div>
                )}
            </Box>
        </Box>
    );
};

export default SavedItem;
