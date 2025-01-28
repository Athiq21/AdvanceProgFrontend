
// import React, { useState, useEffect, Suspense, lazy } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleLike, fetchLikedPosts, fetchLikeCount } from '../../../../store/features/reactionSlice';
// import { RootState } from '../../../../store';
// import { Card, CardHeader, CardContent, CardMedia, Avatar, IconButton, Typography, Box, Divider, Menu, MenuItem, CircularProgress, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemAvatar, ListItemText, Button, TextField } from '@mui/material';
// import { Favorite, FavoriteBorder, Bookmark, BookmarkBorder, ArrowBackIos, ArrowForwardIos, Send, Comment, MoreVert, Delete, Edit, Visibility } from '@mui/icons-material';
// import apiConfig, { BASE_URL } from '../../../../Authentication/api';
// import { UserDetailPost } from '../../../../type/UserDetailPost';
// import { savePost, fetchSavedPosts } from '../../../../store/features/savedSlice';
// import { fetchUsersWithMessages } from '../../../../Service/messageService';
// import { sendMessage } from '../../../../Service/messageService';

// const PopupCard = lazy(() => import('./PopupCard'));
// const ViewCard = lazy(() => import('../View/ViewCard'));
// const EditPopupCard = lazy(() => import('./EditPopupCard'));

// interface PostCardProps {
//   onEdit?: () => void;
//   onDelete: (id: number) => void;
//   showEyeIcon?: boolean;
//   showMoreIcon?: boolean;
//   post: UserDetailPost;
// }

// const PostCards: React.FC<PostCardProps> = ({ post, onEdit, onDelete, showEyeIcon, showMoreIcon }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [openPopup, setOpenPopup] = useState(false);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [profilePopupOpen, setProfilePopupOpen] = useState(false);
//   const [editPopupOpen, setEditPopupOpen] = useState(false);
//   const [loading, setLoading] = useState(true); // New loading state
//   const [shareDialogOpen, setShareDialogOpen] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
//   const [messageContent, setMessageContent] = useState('');
//   const [users, setUsers] = useState<User[]>([]);
//   const [fetchingUsers, setFetchingUsers] = useState(true);


//   const dispatch = useDispatch();
//   const { likedPosts, likeCounts } = useSelector((state: RootState) => state.reactions);
//   const { savedPosts } = useSelector((state: RootState) => state.saved);

//   const isLiked = likedPosts[post.id] || false;
//   const likeCount = likeCounts[post.id] || 0;
//   const isSaved = savedPosts[post.id] || false; // Determine if post is saved

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         await dispatch(fetchLikeCount(post.id));
//         await dispatch(fetchLikedPosts());
//         await dispatch(fetchSavedPosts()); // Fetch saved posts

//         // Fetch users who can receive messages
//         const usersData = await fetchUsersWithMessages();
//         setUsers(usersData.data);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       } finally {
//         setLoading(false); // All data is loaded
//         setFetchingUsers(false);
//       }
//     };

//     loadData();
//   }, [dispatch, post.id]);

//   const handleLikeToggle = async () => {
//     try {
//       await dispatch(toggleLike(post.id)).unwrap();
//       dispatch(fetchLikeCount(post.id));
//     } catch (error) {
//       console.error('Failed to toggle like:', error);
//     }
//   };

//   const handleSaveToggle = async () => {
//     try {
//       await dispatch(savePost(post.id)).unwrap();
//       // No need to manually fetch saved posts again as savePost will trigger state update
//     } catch (error) {
//       console.error('Failed to toggle save:', error);
//     }
//   };

//   const handlePrevImage = () => setCurrentImageIndex(prevIndex =>
//     (prevIndex > 0 ? prevIndex - 1 : post.blobs!.length - 1)
//   );

//   const handleNextImage = () => setCurrentImageIndex(prevIndex =>
//     (prevIndex < post.blobs!.length - 1 ? prevIndex + 1 : 0)
//   );

//   const handleCardClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setOpenPopup(true);
//   };

//   const handleClosePopup = () => setOpenPopup(false);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

//   const handleCloseMenu = () => setAnchorEl(null);

//   const handleDelete = () => {
//     if (onDelete) onDelete(post.id);
//     handleCloseMenu();
//   };

//   const handleEdit = () => {
//     setEditPopupOpen(true);
//     handleCloseMenu();
//   };

//   const handleProfilePopupOpen = () => setProfilePopupOpen(true);
//   const handleProfilePopupClose = () => setProfilePopupOpen(false);

//   const handleEditPopupClose =()=> setEditPopupOpen(false)
  

//   const handleSave = async (id: number, title: string, description: string) => {
//     const formData = new FormData();
//     const jsonBlob = new Blob([JSON.stringify({ title, description })], { type: 'application/json' });

//     formData.append('data', jsonBlob);

//     try {
//       await apiConfig.put(`/posts/${id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//     } catch (error) {
//       console.error('Error updating post:', error);
//       throw error;
//     }
//   };

//   const handleShare = () => setShareDialogOpen(true);

//   const handleShareToUser = async () => {
//     if (selectedUserId && messageContent) {
//       try {
//         await sendMessage(selectedUserId, `Shared a post with you: ${post.id}.${post.title}.${post.description}.${messageContent}`, post.id);
//         alert('Post shared successfully!');
//         setShareDialogOpen(false);
//       } catch (error) {
//         console.error('Error sharing post:', error);
//       }
//     }
//   };

//   // Loading screen while the post is loading
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Card sx={{ minWidth: 300, maxWidth: 600, marginBottom: 2, p: 0, borderRadius: '10px' }}>
//       <CardHeader
//         avatar={<Avatar src={`${BASE_URL}/blobs/fetch/${post.profileImageBlob?.uuid}`} />}
//         title={post.firstName}
//         sx={{ cursor: 'pointer', position: 'relative' }}
//         action={
//           <>
//             {showMoreIcon && (
//               <IconButton aria-label="more" onClick={handleClick} sx={{ position: 'absolute', right: 0, top: 0 }}>
//                 <MoreVert />
//               </IconButton>
//             )}
//             {showEyeIcon && (
//               <IconButton aria-label="view-profile" onClick={handleProfilePopupOpen} sx={{ position: 'absolute', right: 40, top: 0 }}>
//                 <Visibility />
//               </IconButton>
//             )}
//           </>
//         }
//       />
//       <CardContent>
//         {/* <Typography variant="body1" gutterBottom>
//           Post ID: {post.id}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           Post createdby: {post.firstName}
//         </Typography> */}
//         {post.title && (
//           <Typography variant="body1" gutterBottom>
//             {post.title}
//           </Typography>
//         )}
//         {post.description && (
//           <Typography variant="body2" color="textSecondary" gutterBottom>
//             {post.description}
//           </Typography>
//         )}
//         {post.blobs && post.blobs.length > 0 && (
//           <Box position="relative">
//             <CardMedia
//               component="img"
//               image={`${BASE_URL}/blobs/fetch/${post.blobs[currentImageIndex].uuid}`}
//               alt={post.title || 'Post Image'}
//             />
//             {post.blobs.length > 1 && (
//               <>
//                 <Box
//                   position="absolute"
//                   top="50%"
//                   left={0}
//                   sx={{ cursor: 'pointer' }}
//                   onClick={handlePrevImage}
//                 >
//                   <IconButton aria-label="prev" sx={{ color: 'white' }}>
//                     <ArrowBackIos />
//                   </IconButton>
//                 </Box>
//                 <Box
//                   position="absolute"
//                   top="50%"
//                   right={0}
//                   sx={{ cursor: 'pointer' }}
//                   onClick={handleNextImage}
//                 >
//                   <IconButton aria-label="next" sx={{ color: 'white' }}>
//                     <ArrowForwardIos />
//                   </IconButton>
//                 </Box>
//               </>
//             )}
//           </Box>
//         )}
//         <Divider />
//         <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
//           <Typography sx={{ fontSize: '10px' }}>{likeCount} likes</Typography>
//         </Box>
//         <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
//           <Box>
//             <IconButton aria-label="like" sx={{ marginTop: "2px" }} onClick={handleLikeToggle}>
//               {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
//             </IconButton>
//             <IconButton aria-label="comment" onClick={handleCardClick} sx={{ marginTop: "6px" }}>
//               <Comment />
//             </IconButton>
//             <IconButton aria-label="share" onClick={handleShare}>
//               <Send sx={{ rotate: '-45deg' }} />
//             </IconButton>
//           </Box>
//           <IconButton aria-label="save" onClick={handleSaveToggle}>
//             {isSaved ? <Bookmark /> : <BookmarkBorder />}
//           </IconButton>
//         </Box>
//       </CardContent>

//       {/* Lazy-loaded components */}
//       <Suspense fallback={<div>Loading Popup...</div>}>
//         <PopupCard
//           open={openPopup}
//           onClose={handleClosePopup}
//           blobs={post.blobs}
//           currentImageIndex={currentImageIndex}
//           profilePic={`${BASE_URL}/blobs/fetch/${post.profileImageBlob?.uuid}`}
//           username={post.firstName + " " + post.lastName}
//           title={post.title}
//           postId={post.id}
//           description={post.description}
//           handlePrevImage={handlePrevImage}
//           handleNextImage={handleNextImage}
//         />
//       </Suspense>
//       <Suspense fallback={<div>Loading View...</div>}>
//         <ViewCard
//           open={profilePopupOpen}
//           onClose={handleProfilePopupClose}
//           profilePic={`${BASE_URL}/blobs/fetch/${post.profileImageBlob?.uuid}`}
//           username={post.firstName + " " + post.lastName}
//         />
//       </Suspense>
//       <Suspense fallback={<div>Loading Edit...</div>}>
        
//         <EditPopupCard
//           open={editPopupOpen}
//           onClose={handleEditPopupClose}
//           profilePic={`${BASE_URL}/blobs/fetch/${post.profileImageBlob?.uuid}`}
//           currentImageIndex={currentImageIndex}
//           username={post.firstName + " " + post.lastName}
//           blobs={post.blobs}
//           title={post.title || ''}
//           description={post.description || ''}
//           id={post.id}
//           onSave={handleSave}
//         />
//       </Suspense>

//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
//         {onEdit && (
//           <MenuItem onClick={handleEdit}>
//             <Edit sx={{ mr: 1 }} /> Edit
//           </MenuItem>
//         )}
//         {onDelete && (
//           <MenuItem onClick={handleDelete} sx={{ color: '#A81400' }}>
//             <Delete sx={{ mr: 1, color: '#A81400' }} /> Delete
//           </MenuItem>
//         )}
//       </Menu>

//       {/* Share Dialog */}
//       <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
//         <DialogTitle>Select User to Share With</DialogTitle>
//         <DialogContent>
//           <List>
//             {fetchingUsers ? (
//               <CircularProgress />
//             ) : (
//               users.map(user => (
//                 <ListItem button key={user.id} onClick={() => setSelectedUserId(user.id)}>
//                   <ListItemAvatar>
//                     <Avatar src={`${BASE_URL}/blobs/fetch/${user.avatarUrl}`} />
//                   </ListItemAvatar>
//                   <ListItemText primary={`${user.firstName} ${user.lastName}`} />
//                 </ListItem>
//               ))
//             )}
//           </List>
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             placeholder="Add a message..."
//             value={messageContent}
//             onChange={e => setMessageContent(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleShareToUser}
//             disabled={!selectedUserId || !messageContent}
//             sx={{ mt: 2 }}
//           >
//             Share
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default PostCards;

// import React, { useState, useEffect, Suspense, lazy } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleLike, fetchLikedPosts, fetchLikeCount } from '../../../../store/features/reactionSlice';
// import { RootState } from '../../../../store';
// import { Card, CardHeader, CardContent, CardMedia, Avatar, IconButton, Typography, Box, Divider, Menu, MenuItem, CircularProgress, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemAvatar, ListItemText, Button, TextField } from '@mui/material';
// import { Favorite, FavoriteBorder, Bookmark, BookmarkBorder, ArrowBackIos, ArrowForwardIos, Send, Comment, MoreVert, Delete, Edit, Visibility } from '@mui/icons-material';
// import apiConfig, { BASE_URL } from '../../../../Authentication/api';
// import { UserDetailPost } from '../../../../type/UserDetailPost';
// import { savePost, fetchSavedPosts } from '../../../../store/features/savedSlice';
// import { fetchUsersWithMessages, sendMessage } from '../../../../Service/messageService';
// import { Link } from 'react-router-dom';

// const PopupCard = lazy(() => import('./PopupCard'));
// const ViewCard = lazy(() => import('../View/ViewCard'));
// const EditPopupCard = lazy(() => import('./EditPopupCard'));

// interface PostCardProps {
//   onEdit?: () => void;
//   onDelete: (id: number) => void;
//   showEyeIcon?: boolean;
//   showMoreIcon?: boolean;
//   post: UserDetailPost;
// }

// const PostCards: React.FC<PostCardProps> = ({ post, onEdit, onDelete, showEyeIcon, showMoreIcon }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [openPopup, setOpenPopup] = useState(false);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [profilePopupOpen, setProfilePopupOpen] = useState(false);
//   const [editPopupOpen, setEditPopupOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [shareDialogOpen, setShareDialogOpen] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
//   const [messageContent, setMessageContent] = useState('');
//   const [users, setUsers] = useState<User[]>([]);
//   const [fetchingUsers, setFetchingUsers] = useState(true);

//   const dispatch = useDispatch();
//   const { likedPosts, likeCounts } = useSelector((state: RootState) => state.reactions);
//   const { savedPosts } = useSelector((state: RootState) => state.saved);

//   const isLiked = likedPosts[post.id] || false;
//   const likeCount = likeCounts[post.id] || 0;
//   const isSaved = savedPosts[post.id] || false;

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         await dispatch(fetchLikeCount(post.id));
//         await dispatch(fetchLikedPosts());
//         await dispatch(fetchSavedPosts());

//         const usersData = await fetchUsersWithMessages();
//         setUsers(usersData.data);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       } finally {
//         setLoading(false);
//         setFetchingUsers(false);
//       }
//     };

//     loadData();
//   }, [dispatch, post.id]);

//   const handleLikeToggle = async () => {
//     try {
//       await dispatch(toggleLike(post.id)).unwrap();
//       dispatch(fetchLikeCount(post.id));
//     } catch (error) {
//       console.error('Failed to toggle like:', error);
//     }
//   };

//   const handleSaveToggle = async () => {
//     try {
//       await dispatch(savePost(post.id)).unwrap();
//     } catch (error) {
//       console.error('Failed to toggle save:', error);
//     }
//   };

//   const handlePrevImage = () => setCurrentImageIndex(prevIndex =>
//     (prevIndex > 0 ? prevIndex - 1 : post.blobs!.length - 1)
//   );

//   const handleNextImage = () => setCurrentImageIndex(prevIndex =>
//     (prevIndex < post.blobs!.length - 1 ? prevIndex + 1 : 0)
//   );

//   const handleCardClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setOpenPopup(true);
//   };

//   const handleClosePopup = () => setOpenPopup(false);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

//   const handleCloseMenu = () => setAnchorEl(null);

//   const handleDelete = () => {
//     if (onDelete) onDelete(post.id);
//     handleCloseMenu();
//   };

//   const handleEdit = () => {
//     setEditPopupOpen(true);
//     handleCloseMenu();
//   };

//   const handleProfilePopupOpen = () => setProfilePopupOpen(true);
//   const handleProfilePopupClose = () => setProfilePopupOpen(false);

//   const handleEditPopupClose = () => setEditPopupOpen(false);

//   const handleSave = async (id: number, title: string, description: string) => {
//     const formData = new FormData();
//     const jsonBlob = new Blob([JSON.stringify({ title, description })], { type: 'application/json' });

//     formData.append('data', jsonBlob);

//     try {
//       await apiConfig.put(`/posts/${id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//     } catch (error) {
//       console.error('Error updating post:', error);
//       throw error;
//     }
//   };

//   const handleShare = () => setShareDialogOpen(true);

//   const handleShareToUser = async () => {
//     if (selectedUserId && messageContent) {
//       try {
//         await sendMessage(selectedUserId, `Shared a post with you: ${post.id}.${post.title}.${post.description}.${messageContent}`, post.id);
//         alert('Post shared successfully!');
//         setShareDialogOpen(false);
//       } catch (error) {
//         console.error('Error sharing post:', error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Card sx={{ minWidth: 300, maxWidth: 600, marginBottom: 2, p: 0, borderRadius: '10px' }}>
//       <Link to={`/home/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//         <CardHeader
//           avatar={<Avatar src={`${BASE_URL}/blobs/fetch/${post.profileImageBlob?.uuid}`} />}
//           title={post.firstName}
//           sx={{ cursor: 'pointer', position: 'relative' }}
//           action={
//             <>
//               {showMoreIcon && (
//                 <IconButton aria-label="more" onClick={handleClick} sx={{ position: 'absolute', right: 0, top: 0 }}>
//                   <MoreVert />
//                 </IconButton>
//               )}
//               {showEyeIcon && (
//                 <IconButton aria-label="view-profile" onClick={handleProfilePopupOpen} sx={{ position: 'absolute', right: 40, top: 0 }}>
//                   <Visibility />
//                 </IconButton>
//               )}
//             </>
//           }
//         />
//         <CardContent>
//            <Typography variant="body1" gutterBottom>
//      Post ID: {post.id}
//     </Typography>
//           {post.title && (
//             <Typography variant="body1" gutterBottom>
//               {post.title}
//             </Typography>
//           )}
//           {post.description && (
//             <Typography variant="body2" color="textSecondary" gutterBottom>
//               {post.description}
//             </Typography>
//           )}
//           {post.blobs && post.blobs.length > 0 && (
//             <Box position="relative">
//               <CardMedia
//                 component="img"
//                 image={`${BASE_URL}/blobs/fetch/${post.blobs[currentImageIndex].uuid}`}
//                 alt={post.title || 'Post Image'}
//               />
//               {post.blobs.length > 1 && (
//                 <>
//                   <Box
//                     position="absolute"
//                     top="50%"
//                     left={0}
//                     sx={{ cursor: 'pointer' }}
//                     onClick={handlePrevImage}
//                   >
//                     <IconButton aria-label="prev" sx={{ color: 'white' }}>
//                       <ArrowBackIos />
//                     </IconButton>
//                   </Box>
//                   <Box
//                     position="absolute"
//                     top="50%"
//                     right={0}
//                     sx={{ cursor: 'pointer' }}
//                     onClick={handleNextImage}
//                   >
//                     <IconButton aria-label="next" sx={{ color: 'white' }}>
//                       <ArrowForwardIos />
//                     </IconButton>
//                   </Box>
//                 </>
//               )}
//             </Box>
//           )}
//           <Divider />
//           <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
//             <Typography sx={{ fontSize: '10px' }}>{likeCount} likes</Typography>
//           </Box>
//           <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
//             <Box>
//               <IconButton aria-label="like" sx={{ marginTop: "2px" }} onClick={handleLikeToggle}>
//                 {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
//               </IconButton>
//               <IconButton aria-label="comment" onClick={handleCardClick} sx={{ marginTop: "6px" }}>
//                 <Comment />
//               </IconButton>
//               <IconButton aria-label="share" onClick={handleShare}>
//                 <Send sx={{ rotate: '-45deg' }} />
//               </IconButton>
//             </Box>
//             <IconButton aria-label="save" onClick={handleSaveToggle}>
//               {isSaved ? <Bookmark /> : <BookmarkBorder />}
//             </IconButton>
//           </Box>
//         </CardContent>
//       </Link>

//       {/* Lazy-loaded components */}
//       <Suspense fallback={<div>Loading Popup...</div>}>
//         <PopupCard
//           open={openPopup}
//           onClose={handleClosePopup}
//           blobs={post.blobs}
//           currentImageIndex={currentImageIndex}
//           profilePic={`${BASE_URL}/blobs/fetch/${post.profileImageBlob?.uuid}`}
//           username={post.firstName + " " + post.lastName}
//           title={post.title}
//           postId={post.id}
//           description={post.description}
//           handlePrevImage={handlePrevImage}
//           handleNextImage={handleNextImage}
//         />
//       </Suspense>
//       <Suspense fallback={<div>Loading View...</div>}>
//         <ViewCard
//           open={profilePopupOpen}
//           onClose={handleProfilePopupClose}
//           profilePic={`${BASE_URL}/blobs/fetch/${post.profileImageBlob?.uuid}`}
//           username={post.firstName + " " + post.lastName}
//         />
//       </Suspense>
//       <Suspense fallback={<div>Loading Edit...</div>}>
//         <EditPopupCard
//           open={editPopupOpen}
//           onClose={handleEditPopupClose}
//           profilePic={`${BASE_URL}/blobs/fetch/${post.profileImageBlob?.uuid}`}
//           currentImageIndex={currentImageIndex}
//           username={post.firstName + " " + post.lastName}
//           blobs={post.blobs}
//           title={post.title || ''}
//           description={post.description || ''}
//           id={post.id}
//           onSave={handleSave}
//         />
//       </Suspense>

//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
//         {onEdit && (
//           <MenuItem onClick={handleEdit}>
//             <Edit sx={{ mr: 1 }} /> Edit
//           </MenuItem>
//         )}
//         {onDelete && (
//           <MenuItem onClick={handleDelete} sx={{ color: '#A81400' }}>
//             <Delete sx={{ mr: 1, color: '#A81400' }} /> Delete
//           </MenuItem>
//         )}
//       </Menu>

//       {/* Share Dialog */}
//       <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
//         <DialogTitle>Select User to Share With</DialogTitle>
//         <DialogContent>
//           <List>
//             {fetchingUsers ? (
//               <CircularProgress />
//             ) : (
//               users.map(user => (
//                 <ListItem button key={user.id} onClick={() => setSelectedUserId(user.id)}>
//                   <ListItemAvatar>
//                     <Avatar src={`${BASE_URL}/blobs/fetch/${user.avatarUrl}`} />
//                   </ListItemAvatar>
//                   <ListItemText primary={`${user.firstName} ${user.lastName}`} />
//                 </ListItem>
//               ))
//             )}
//           </List>
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             placeholder="Add a message..."
//             value={messageContent}
//             onChange={e => setMessageContent(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleShareToUser}
//             disabled={!selectedUserId || !messageContent}
//             sx={{ mt: 2 }}
//           >
//             Share
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default PostCards;





























import AddButtons from '../../Button/Add/AddButtons';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, fetchLikedPosts, fetchLikeCount } from '../../../../store/features/reactionSlice';
import { RootState } from '../../../../store';
import { Card, CardHeader, CardContent, CardMedia, Avatar, IconButton, Typography, Box, Divider, Menu, MenuItem, CircularProgress, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemAvatar, ListItemText, Button, TextField } from '@mui/material';
import { Favorite, FavoriteBorder, Bookmark, BookmarkBorder, ArrowBackIos, ArrowForwardIos, Send, Comment, MoreVert, Delete, Edit, Visibility } from '@mui/icons-material';
import apiConfig, { BASE_URL } from '../../../../Authentication/api';
import { UserDetailPost } from '../../../../type/UserDetailPost';
import { savePost, fetchSavedPosts } from '../../../../store/features/savedSlice';
import { fetchUsersWithMessages } from '../../../../Service/messageService';
import { sendMessage } from '../../../../Service/messageService';

const PopupCard = lazy(() => import('./PopupCard'));
const ViewCard = lazy(() => import('../View/ViewCard'));
const EditPopupCard = lazy(() => import('./EditPopupCard'));

interface PostCardProps {
  onEdit?: () => void;
  onDelete: (id: number) => void;
  showEyeIcon?: boolean;
  showMoreIcon?: boolean;
  post: UserDetailPost;
}

const PostCards: React.FC<PostCardProps> = ({ post, onEdit, onDelete, showEyeIcon, showMoreIcon }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [fetchingUsers, setFetchingUsers] = useState(true);


  const dispatch = useDispatch();
  const { likedPosts, likeCounts } = useSelector((state: RootState) => state.reactions);
  const { savedPosts } = useSelector((state: RootState) => state.saved);

  const isLiked = likedPosts[post.id] || false;
  const likeCount = likeCounts[post.id] || 0;
  const isSaved = savedPosts[post.id] || false;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchLikeCount(post.id));
        await dispatch(fetchLikedPosts());
        await dispatch(fetchSavedPosts());

        // Fetch users who can receive messages
        const usersData = await fetchUsersWithMessages();
        setUsers(usersData.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false); // All data is loaded
        setFetchingUsers(false);
      }
    };

    loadData();
  }, [dispatch, post.id]);

  const handleLikeToggle = async () => {
    try {
      await dispatch(toggleLike(post.id)).unwrap();
      dispatch(fetchLikeCount(post.id));
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const handleSaveToggle = async () => {
    try {
      await dispatch(savePost(post.id)).unwrap();
    
    } catch (error) {
      console.error('Failed to toggle save:', error);
    }
  };

  const handlePrevImage = () => setCurrentImageIndex(prevIndex =>
    (prevIndex > 0 ? prevIndex - 1 : post.blobs!.length - 1)
  );

  const handleNextImage = () => setCurrentImageIndex(prevIndex =>
    (prevIndex < post.blobs!.length - 1 ? prevIndex + 1 : 0)
  );

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenPopup(true);
  };

  const handleClosePopup = () => setOpenPopup(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleDelete = () => {
    if (onDelete) onDelete(post.id);
    handleCloseMenu();
  };

  const handleEdit = () => {
    setEditPopupOpen(true);
    handleCloseMenu();
  };

  const handleProfilePopupOpen = () => setProfilePopupOpen(true);
  const handleProfilePopupClose = () => setProfilePopupOpen(false);

  const handleEditPopupClose =()=> setEditPopupOpen(false)
  

  const handleSave = async (id: number, title: string, description: string) => {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify({ title, description })], { type: 'application/json' });

    formData.append('data', jsonBlob);

    try {
      await apiConfig.put(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };

  const handleShare = () => setShareDialogOpen(true);

  // const handleShareToUser = async () => {
  //   if (selectedUserId && messageContent) {
  //     try {
  //       await sendMessage(selectedUserId, `Shared a post with you: ${post.id}.${post.title}.${post.description}.${messageContent}`, post.id);
  //       alert('Post shared successfully!');
  //       setShareDialogOpen(false);
  //     } catch (error) {
  //       console.error('Error sharing post:', error);
  //     }
  //   }
  // };

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

  // Loading screen while the post is loading
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card sx={{ minWidth: 300, maxWidth: 600, marginBottom: 2, p: 0, borderRadius: '10px' }}>
      <CardHeader 
  avatar={<Avatar src={post.imageUrl} />}
  title={
    <Box display="flex" alignItems="center">
      <Typography>{post.firstName + ' ' + post.lastName}</Typography>
      {post.Role === "ROLE_ADMIN" && (
        <WhatshotIcon sx={{ marginLeft: 0.5, color: 'orange' }} />
      )}
    </Box>
  }
  sx={{ cursor: 'pointer', position: 'relative', marginBottom:'-10px' }}
  action={
    <>
      {showMoreIcon && (
        <IconButton aria-label="more" onClick={handleClick} sx={{ position: 'absolute', right: 0, top: 0 }}>
          <MoreVert />
        </IconButton>
      )}
      {showEyeIcon && (
        <IconButton aria-label="view-profile" onClick={handleProfilePopupOpen} sx={{ position: 'absolute', right: 40, top: 0 }}>
          <Visibility />
        </IconButton>
      )}
    </>
  }
/>

      <CardContent>
        {/* <Typography variant="body1" gutterBottom>
          Post ID: {post.id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Post createdby: {post.firstName}
        </Typography> */}
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
        {post.blobs && post.blobs.length > 0 && (
          <Box position="relative">
            <CardMedia
              component="img"
              image={`${BASE_URL}/blobs/fetch/${post.blobs[currentImageIndex].uuid}`}
              alt={post.title || 'Post Image'}
            />
            {post.blobs.length > 1 && (
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
            <IconButton aria-label="comment" onClick={handleCardClick} sx={{ marginTop: "6px" }}>
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
      <Suspense fallback={<div>Loading Popup...</div>}>
        <PopupCard
          open={openPopup}
          onClose={handleClosePopup}
          blobs={post.blobs}
          currentImageIndex={currentImageIndex}
          profilePic={`${BASE_URL}/blobs/fetch/${post.profileImageBlob?.uuid}`}
          username={post.firstName + " " + post.lastName}
          title={post.title}
          postId={post.id}
          imageUrl={post.imageUrl}
          description={post.description}
          handlePrevImage={handlePrevImage}
          handleNextImage={handleNextImage}
        />
      </Suspense>
      <Suspense fallback={<div>Loading View...</div>}>
        <ViewCard
          open={profilePopupOpen}
          onClose={handleProfilePopupClose}
          profilePic={post.imageUrl}
          username={post.firstName + " " + post.lastName}
          userId={post.userId}
          designation={post.designation}
          designationUrl={post.designationUrl}
        />
      </Suspense>
      <Suspense fallback={<div>Loading Edit...</div>}>
        
        <EditPopupCard
          open={editPopupOpen}
          onClose={handleEditPopupClose}
          currentImageIndex={currentImageIndex}
          imageUrl={post.imageUrl}
          username={post.firstName + " " + post.lastName}
          blobs={post.blobs}
          title={post.title || ''}
          description={post.description || ''}
          id={post.id}
          onSave={handleSave}
        />
      </Suspense>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {onEdit && (
          <MenuItem onClick={handleEdit}>
            <Edit sx={{ mr: 1 }} /> Edit
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem onClick={handleDelete} sx={{ color: '#A81400' }}>
            <Delete sx={{ mr: 1, color: '#A81400' }} /> Delete
          </MenuItem>
        )}
      </Menu>

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
};

export default PostCards;

