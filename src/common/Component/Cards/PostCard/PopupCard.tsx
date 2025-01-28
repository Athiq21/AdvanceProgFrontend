// // import WhatshotIcon from '@mui/icons-material/Whatshot';
// // import React, { useEffect, useState, useRef } from 'react';
// // import { Box, Avatar, Typography, IconButton, CardMedia, Divider, Dialog, DialogContent, TextField } from '@mui/material';
// // import { ArrowBackIos, ArrowForwardIos, Favorite, FavoriteBorder, Bookmark, BookmarkBorder, Comment, Send, Delete } from '@mui/icons-material';
// // import { styled } from '@mui/material/styles';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { AppDispatch, RootState } from '../../../../store/index';
// // import { toggleLike, fetchLikeCount } from '../../../../store/features/reactionSlice';
// // import { fetchComments, createComment, deleteComment } from '../../../../store/features/CommentSlice';
// // import { FileBlob } from '../../../../type/FileBlob';
// // import { BASE_URL } from '../../../../Authentication/api';

// // interface PostDialogProps {
// //   open: boolean;
// //   onClose: () => void;
// //   blobs?: FileBlob[];
// //   currentImageIndex: number;
// //   profilePic: string;
// //   username: string;
// //   firstName:string;
// //   lastName:string;
// //   Role:string;
// //   createdby:string;
// //   title?: string;
// //   description?: string;
// //   handlePrevImage: () => void;
// //   handleNextImage: () => void;
// //   postId: number;
// //   imageUrl:string;
// //   postAuthorId: number; // Add postAuthorId to props
// // }

// // const PostText = styled(Typography)(({ theme }) => ({
// //   background: 'linear-gradient(45deg, #FF8A00 30%, #C4B108 90%)',
// //   WebkitBackgroundClip: 'text',
// //   WebkitTextFillColor: 'transparent',
// //   fontWeight: 'bold',
// //   cursor: 'pointer',
// //   padding: theme.spacing(0, 1)
// // }));

// // const CommentTextContainer = styled(Box)(({ theme }) => ({
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'space-between', // This pushes the delete button to the right
// // }));

// // const PopupCard: React.FC<PostDialogProps> = ({
// //   open,
// //   onClose,
// //   blobs,
// //   currentImageIndex,
// //   profilePic,
// //   username,
// //   title,
// //   description,
// //   postId,
// //   imageUrl,
// //   Role,
// //   createdby,
// //   postAuthorId, // Receive postAuthorId as a prop
// //   handlePrevImage,
// //   handleNextImage,
// // }) => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const { likedPosts, likeCounts } = useSelector((state: RootState) => state.reactions);
// //   const { comments = [], status: commentStatus, error: commentError } = useSelector((state: RootState) => state.comments);
  
// //   const [liked, setLiked] = useState(likedPosts[postId] || false);
// //   const [saved, setSaved] = useState(false);
// //   const [comment, setComment] = useState('');
// //   const [isFocused, setIsFocused] = useState(false);
// //   const [replyText, setReplyText] = useState('');
// //   const [replyingTo, setReplyingTo] = useState<number | null>(null);
// //   const [showReplies, setShowReplies] = useState<number | null>(null);
// //   const [userId, setUserId] = useState<number | null>(null);

// //   // Create a ref for the comment section
// //   const commentContainerRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     // Retrieve user ID from session storage
// //     const storedUserId = sessionStorage.getItem('userId');
// //     if (storedUserId) {
// //       setUserId(Number(storedUserId));
// //       console.log('User ID from session storage:', storedUserId);
// //     } else {
// //       console.log('No user ID found in session storage');
// //     }
    
// //     if (open) {
// //       dispatch(fetchLikeCount(postId));
// //       dispatch(fetchComments(postId));
// //     }
// //   }, [dispatch, open, postId]);

// //   useEffect(() => {
// //     setLiked(likedPosts[postId] || false);
// //   }, [likedPosts, postId]);

// //   useEffect(() => {
// //     dispatch(fetchLikeCount(postId));
// //   }, [dispatch, likedPosts, postId]);

// //   const handleLike = () => {
// //     dispatch(toggleLike(postId)).then(() => {
// //       setLiked(!liked);
// //     });
// //   };

// //   const handleSaved = () => setSaved(!saved);

// //   const handlePostClick = () => {
// //     if (comment.trim()) {
// //       dispatch(createComment({ text: comment, postId }))
// //         .unwrap()
// //         .then(() => {
// //           setComment('');
// //           if (commentContainerRef.current) {
// //             commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
// //           }
// //         })
// //         .catch((error) => {
// //           console.error('Failed to post comment:', error);
// //         });
// //     }
// //   };

// //   const handleReplyClick = (id: number) => {
// //     if (replyText.trim()) {
// //       const updatedComments = comments.map((c) => {
// //         if (c.id === id) {
// //           return {
// //             ...c,
// //             replies: c.replies ? [
// //               ...c.replies,
// //               {
// //                 id: c.replies.length + 1,
// //                 username: 'User 1',
// //                 text: replyText,
// //                 avatar: profilePic
// //               }
// //             ] : [
// //               {
// //                 id: 1,
// //                 username: 'User 1',
// //                 text: replyText,
// //                 avatar: profilePic
// //               }
// //             ]
// //           };
// //         }
// //         return c;
// //       });
// //       setReplyText('');
// //       setReplyingTo(null);
// //       setShowReplies(id); // Show replies when a new reply is added
// //     }
// //   };

// //   const toggleReplies = (id: number) => {
// //     setShowReplies(showReplies === id ? null : id);
// //   };

// //   const renderReplies = (replies: ReplyProps[]) => {
// //     return (replies || []).map((reply) => (
// //       <Box key={reply.id} display="flex" alignItems="flex-start" ml={4} mt={1}>
// //         <Avatar src={reply.avatar} sx={{ mr: 1, width: 32, height: 32 }} />
// //         <Box>
// //           <Typography variant="body2">
// //             <strong>{reply.username}</strong> {reply.text}
// //           </Typography>
// //         </Box>
// //       </Box>
// //     ));
// //   };

// //   const handleDeleteComment = (commentId: number) => {
// //     dispatch(deleteComment(commentId))
// //       .unwrap()
// //       .then(() => {
// //         // Optionally, handle any additional logic after deletion
// //       })
// //       .catch((error) => {
// //         console.error('Failed to delete comment:', error);
// //       });
// //   };

// //   return (
// //     <Dialog
// //       open={open}
// //       onClose={onClose}
// //       maxWidth="md"
// //       fullWidth
// //       PaperProps={{
// //         sx: {
// //           borderRadius: 2,
// //           width: '80%',
// //           height: '80%'
// //         }
// //       }}
// //     >
// //       <DialogContent sx={{ p: 0 }}>
// //         <Box display="flex" height="100%">
// //           {blobs && blobs.length > 0 ? (
// //             <Box flex={1.3} position="relative">
// //               <CardMedia
// //                 component="img"
// //                 image={`${BASE_URL}/blobs/fetch/${blobs[currentImageIndex].uuid}`}
// //                 alt={`Post image ${currentImageIndex + 1}`}
// //                 sx={{ height: '100%', objectFit: 'cover', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
// //               />
// //               {blobs.length > 1 && (
// //                 <>
// //                   <Box position="absolute" display="flex" justifyContent="space-between" width="100%" top="50%">
// //                     <IconButton size="small" aria-label="previous" onClick={handlePrevImage}>
// //                       <ArrowBackIos fontSize="small" />
// //                     </IconButton>
// //                     <IconButton size="small" aria-label="next" onClick={handleNextImage}>
// //                       <ArrowForwardIos fontSize="small" />
// //                     </IconButton>
// //                   </Box>
// //                   <Box
// //                     sx={{
// //                       position: "absolute",
// //                       bottom: 8,
// //                       display: "flex",
// //                       justifyContent: "center",
// //                       width: "100%"
// //                     }}
// //                   >
// //                     {blobs.map((_, index) => (
// //                       <Box key={index} width={8} height={8} borderRadius="50%" bgcolor={index === currentImageIndex ? 'white' : 'gray'} mx={0.5} />
// //                     ))}
// //                   </Box>
// //                 </>
// //               )}
// //             </Box>
// //           ) : null}
// //           <Box flex={1} p={2} display="flex" flexDirection="column" position="relative">
// //             <Box display="flex" alignItems="center">
// //               <Avatar src={imageUrl} sx={{ mr: 0.8, width: 32, height: 32 }} />
// //               <Typography sx={{ fontSize: '14px' }}>{username}</Typography>
// //               {Role === 'ROLE_ADMIN' && ( // Check if the user is an admin
// //                 <WhatshotIcon sx={{ ml: 0.5, color: 'gold' }} /> // Render Admin icon
// //               )}
// //             </Box>
// //             <Typography sx={{ fontSize: '16px', marginTop: '15px' }}>{title}</Typography>
// //             <Typography sx={{ fontSize: '14px', marginTop: '10px' }}>{description}</Typography>
// //             <Divider sx={{ my: 2 }} />
// //             <Box flex={1} overflow="auto" ref={commentContainerRef}>
// //               {comments.map((comment) => (
// //                 <Box key={comment.id} mb={2}>
// //                   <Box display="flex" alignItems="flex-start">
// //                     <Avatar src={comment.createdBy.imageUrl} sx={{ mr: 1, width: 32, height: 32 }} />
// //                     <Box flex={1}>
// //                       <CommentTextContainer>
// //                         <Box>
// //                           <Typography variant="body2">
// //                             <strong>{comment.createdBy.firstName + ' ' +comment.createdBy.LastName}</strong>
// //                           </Typography>
// //                           <Typography variant="body2">
// //                             {comment.text}
// //                           </Typography>
// //                         </Box>
// //                         {(comment.createdBy?.id === userId || postAuthorId === userId) && (
// //                           <IconButton
// //                             size="small"
// //                             aria-label="delete"
// //                             onClick={() => handleDeleteComment(comment.id)}
// //                           >
// //                             <Delete color="error" />
// //                           </IconButton>
// //                         )}
// //                       </CommentTextContainer>
// //                       <Box display="flex" alignItems="center" mt={1}>
// //                         {replyingTo === comment.id ? (
// //                           <>
// //                             <TextField
// //                               fullWidth
// //                               variant="outlined"
// //                               size="small"
// //                               placeholder="Write a reply..."
// //                               value={replyText}
// //                               onChange={(e) => setReplyText(e.target.value)}
// //                               InputProps={{
// //                                 sx: {
// //                                   border: 'none',
// //                                   '& fieldset': {
// //                                     border: 'none'
// //                                   }
// //                                 }
// //                               }}
// //                             />
// //                             <PostText onClick={() => handleReplyClick(comment.id)}>
// //                               Post
// //                             </PostText>
// //                           </>
// //                         ) : (
// //                           <Typography
// //                             variant="caption"
// //                             sx={{ cursor: 'pointer', color: 'gray' }}
// //                             onClick={() => setReplyingTo(comment.id)}
// //                           >
// //                             Reply
// //                           </Typography>
// //                         )}
// //                       </Box>
// //                       <Box display="flex" flexDirection="column" mt={1}>
// //                         {comment.replies && comment.replies.length > 0 && (
// //                           <Typography
// //                             variant="caption"
// //                             sx={{ cursor: 'pointer', color: 'gray', textAlign: 'end' }}
// //                             onClick={() => toggleReplies(comment.id)}
// //                           >
// //                             {showReplies === comment.id ? 'Hide replies' : 'View replies'}
// //                           </Typography>
// //                         )}
// //                         {showReplies === comment.id && renderReplies(comment.replies || [])}
// //                       </Box>
// //                     </Box>
// //                   </Box>
// //                 </Box>
// //               ))}
// //             </Box>
// //             <Divider />
// //             <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
// //               <Typography sx={{ fontSize: '10px' }}>{likeCounts[postId] || 0} likes</Typography>
// //             </Box>
// //             <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
// //               <Box>
// //                 <IconButton size="small" aria-label="like" onClick={handleLike}>
// //                   {liked ? <Favorite color="error" /> : <FavoriteBorder />}
// //                 </IconButton>
// //                 <IconButton size="small" aria-label="comment">
// //                   <Comment />
// //                 </IconButton>
// //                 <IconButton size="small" aria-label="share">
// //                   <Send />
// //                 </IconButton>
// //               </Box>
// //               <IconButton size="small" aria-label="save" onClick={handleSaved}>
// //                 {saved ? <Bookmark /> : <BookmarkBorder />}
// //               </IconButton>
// //             </Box>
// //             <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
// //               <TextField
// //                 fullWidth
// //                 variant="outlined"
// //                 size="small"
// //                 placeholder="Share Your Thoughts... "
// //                 value={comment}
// //                 onFocus={() => setIsFocused(true)}
// //                 onBlur={() => setIsFocused(!!comment)}
// //                 onChange={(e) => setComment(e.target.value)}
// //                 InputProps={{
// //                   sx: {
// //                     border: 'none',
// //                     '& fieldset': {
// //                       border: 'none'
// //                     }
// //                   }
// //                 }}
// //               />
// //               {isFocused && (
// //                 <PostText onClick={handlePostClick}>
// //                   Post
// //                 </PostText>
// //               )}
// //             </Box>
// //             <Divider
// //               sx={{
// //                 position: 'absolute',
// //                 bottom: 0,
// //                 right: 0,
// //                 width: '100%',
// //                 borderBottom: '8px solid gray'
// //               }}
// //             />
// //           </Box>
// //         </Box>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default PopupCard;



import WhatshotIcon from '@mui/icons-material/Whatshot';
import React, { useEffect, useState, useRef } from 'react';
import { Box, Avatar, Typography, IconButton, CardMedia, Divider, Dialog, DialogContent, TextField } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Favorite, FavoriteBorder, Bookmark, BookmarkBorder, Comment, Send, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/index';
import { toggleLike, fetchLikeCount } from '../../../../store/features/reactionSlice';
import { fetchComments, createComment, deleteComment } from '../../../../store/features/CommentSlice';
import { FileBlob } from '../../../../type/FileBlob';
import { BASE_URL } from '../../../../Authentication/api';

interface PostDialogProps {
  open: boolean;
  onClose: () => void;
  blobs?: FileBlob[];
  currentImageIndex: number;
  profilePic: string;
  username: string;
  firstName:string;
  lastName:string;
  Role:string;
  createdby:string;
  title?: string;
  description?: string;
  handlePrevImage: () => void;
  handleNextImage: () => void;
  postId: number;
  imageUrl:string;
  postAuthorId: number; // Add postAuthorId to props
}

const PostText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF8A00 30%, #C4B108 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  cursor: 'pointer',
  padding: theme.spacing(0, 1)
}));

const CommentTextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', // This pushes the delete button to the right
}));

const PopupCard: React.FC<PostDialogProps> = ({
  open,
  onClose,
  blobs,
  currentImageIndex,
  profilePic,
  username,
  title,
  description,
  postId,
  imageUrl,
  Role,
  createdby,
  postAuthorId, // Receive postAuthorId as a prop
  handlePrevImage,
  handleNextImage,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { likedPosts, likeCounts } = useSelector((state: RootState) => state.reactions);
  const { comments = [], status: commentStatus, error: commentError } = useSelector((state: RootState) => state.comments);
  
  const [liked, setLiked] = useState(likedPosts[postId] || false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [showReplies, setShowReplies] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const [commentsVisible, setCommentsVisible] = useState(false);
  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const commentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Retrieve user ID from session storage
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));
      console.log('User ID from session storage:', storedUserId);
    } else {
      console.log('No user ID found in session storage');
    }
    
    if (open) {
      dispatch(fetchLikeCount(postId));
      dispatch(fetchComments(postId));
    }
  }, [dispatch, open, postId]);

  useEffect(() => {
    setLiked(likedPosts[postId] || false);
  }, [likedPosts, postId]);

  useEffect(() => {
    dispatch(fetchLikeCount(postId));
  }, [dispatch, likedPosts, postId]);

  const handleLike = () => {
    dispatch(toggleLike(postId)).then(() => {
      setLiked(!liked);
    });
  };

  const handleSaved = () => setSaved(!saved);

  const handlePostClick = () => {
    if (comment.trim()) {
      dispatch(createComment({ text: comment, postId }))
        .unwrap()
        .then(() => {
          setComment('');
          if (commentContainerRef.current) {
            commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
          }
        })
        .catch((error) => {
          console.error('Failed to post comment:', error);
        });
    }
  };

  const handleReplyClick = (id: number) => {
    if (replyText.trim()) {
      const updatedComments = comments.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            replies: c.replies ? [
              ...c.replies,
              {
                id: c.replies.length + 1,
                username: 'User 1',
                text: replyText,
                avatar: profilePic
              }
            ] : [
              {
                id: 1,
                username: 'User 1',
                text: replyText,
                avatar: profilePic
              }
            ]
          };
        }
        return c;
      });
      setReplyText('');
      setReplyingTo(null);
      setShowReplies(id); // Show replies when a new reply is added
    }
  };

  const toggleReplies = (id: number) => {
    setShowReplies(showReplies === id ? null : id);
  };

  const renderReplies = (replies: ReplyProps[]) => {
    return (replies || []).map((reply) => (
      <Box key={reply.id} display="flex" alignItems="flex-start" ml={4} mt={1}>
        <Avatar src={reply.avatar} sx={{ mr: 1, width: 32, height: 32 }} />
        <Box>
          <Typography variant="body2">
            <strong>{reply.username}</strong> {reply.text}
          </Typography>
        </Box>
      </Box>
    ));
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId))
      .unwrap()
      .then(() => {
        // Optionally, handle any additional logic after deletion
      })
      .catch((error) => {
        console.error('Failed to delete comment:', error);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: '80%',
          height: '68%'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>

      <Box display="flex" alignItems="center" mt="10px" mb="10px" ml="30px">
              <Avatar src={imageUrl} sx={{ mr: 0.8, width: 32, height: 32 }} />
              <Typography sx={{ fontSize: '14px' }}>{username}</Typography>
              {Role === 'ROLE_ADMIN' && ( // Check if the user is an admin
                <WhatshotIcon sx={{ ml: 0.5, color: 'gold' }} /> // Render Admin icon
              )}
            </Box>


      <Box display="flex" flexDirection="column" height="100%">
  {blobs && blobs.length > 0 ? (
    <Box position="relative">
      <CardMedia
        component="img"
        image={`${BASE_URL}/blobs/fetch/${blobs[currentImageIndex].uuid}`}
        alt={`Post image ${currentImageIndex + 1}`}
        sx={{
          height:"100%", // Adjust height as needed
          objectFit: 'cover',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      {blobs.length > 1 && (
        <>
          <Box position="absolute" display="flex" justifyContent="space-between" width="100%" top="50%">
            <IconButton size="small" aria-label="previous" onClick={handlePrevImage}>
              <ArrowBackIos fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="next" onClick={handleNextImage}>
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {blobs.map((_, index) => (
              <Box
                key={index}
                width={8}
                height={8}
                borderRadius="50%"
                bgcolor={index === currentImageIndex ? 'white' : 'gray'}
                mx={0.5}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  ) : null}

          <Box flex={1} p={2} display="flex" flexDirection="column" position="relative">
            <Typography sx={{ fontSize: '18px' , marginBottom: '-10px',marginTop: '-7px'  }}>{title}</Typography>
            <Typography sx={{ fontSize: '14px', marginTop: '10px' }}>{description}</Typography>
            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="center" my={2}>
          <button
            style={{
              backgroundColor: '#29292a',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop:'-20px'
            }}
            onClick={() => setCommentsVisible(!commentsVisible)}
          >
            {commentsVisible ? 'Hide Comments' : 'Show Comments'}
          </button>
        </Box>

        {commentsVisible && (
            <Box flex={1} overflow="auto" ref={commentContainerRef}>
              {comments.map((comment) => (
                <Box key={comment.id} mb={2}>
                  <Box display="flex" alignItems="flex-start">
                    <Avatar src={comment.createdBy.imageUrl} sx={{ mr: 1, width: 32, height: 32 }} />
                    <Box flex={1}>
                      <CommentTextContainer>
                        <Box>
                          <Typography variant="body2">
                            <strong>{comment.createdBy.firstName + ' ' +comment.createdBy.LastName}</strong>
                          </Typography>
                          <Typography variant="body2">
                            {comment.text}
                          </Typography>
                        </Box>
                        {(comment.createdBy?.id === userId || postAuthorId === userId) && (
                          <IconButton
                            size="small"
                            aria-label="delete"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Delete color="error" />
                          </IconButton>
                        )}
                      </CommentTextContainer>
                      <Box display="flex" alignItems="center" mt={1}>
                        {replyingTo === comment.id ? (
                          <>
                            <TextField
                              fullWidth
                              variant="outlined"
                              size="small"
                              placeholder="Write a reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              InputProps={{
                                sx: {
                                  border: 'none',
                                  '& fieldset': {
                                    border: 'none'
                                  }
                                }
                              }}
                            />
                            <PostText onClick={() => handleReplyClick(comment.id)}>
                              Post
                            </PostText>
                          </>
                        ) : (
                          <Typography
                            variant="caption"
                            sx={{ cursor: 'pointer', color: 'gray' }}
                            onClick={() => setReplyingTo(comment.id)}
                          >
                            Reply
                          </Typography>
                        )}
                      </Box>
                      <Box display="flex" flexDirection="column" mt={1}>
                        {comment.replies && comment.replies.length > 0 && (
                          <Typography
                            variant="caption"
                            sx={{ cursor: 'pointer', color: 'gray', textAlign: 'end' }}
                            onClick={() => toggleReplies(comment.id)}
                          >
                            {showReplies === comment.id ? 'Hide replies' : 'View replies'}
                          </Typography>
                        )}
                        {showReplies === comment.id && renderReplies(comment.replies || [])}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
        )}
            <Divider />
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <Typography sx={{ fontSize: '10px' }}>{likeCounts[postId] || 0} likes</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
              <Box>
                <IconButton size="small" aria-label="like" onClick={handleLike}>
                  {liked ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <IconButton size="small" aria-label="comment">
                  <Comment />
                </IconButton>
                <IconButton size="small" aria-label="share">
                  <Send />
                </IconButton>
              </Box>
              <IconButton size="small" aria-label="save" onClick={handleSaved}>
                {saved ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Share Your Thoughts... "
                value={comment}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(!!comment)}
                onChange={(e) => setComment(e.target.value)}
                InputProps={{
                  sx: {
                    border: 'none',
                    '& fieldset': {
                      border: 'none'
                    }
                  }
                }}
              />
              {isFocused && (
                <PostText onClick={handlePostClick}>
                  Post
                </PostText>
              )}
            </Box>
            <Divider
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '100%',
                borderBottom: '8px solid gray'
              }}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PopupCard;



// import WhatshotIcon from '@mui/icons-material/Whatshot';
// import React, { useEffect, useState, useRef } from 'react';
// import { Box, Avatar, Typography, IconButton, CardMedia, Divider, Dialog, DialogContent, TextField } from '@mui/material';
// import { ArrowBackIos, ArrowForwardIos, Favorite, FavoriteBorder, Bookmark, BookmarkBorder, Comment, Send, Delete } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppDispatch, RootState } from '../../../../store/index';
// import { toggleLike, fetchLikeCount } from '../../../../store/features/reactionSlice';
// import { fetchComments, createComment, deleteComment } from '../../../../store/features/CommentSlice';
// import { FileBlob } from '../../../../type/FileBlob';
// import { BASE_URL } from '../../../../Authentication/api';

// interface PostDialogProps {
//   open: boolean;
//   onClose: () => void;
//   blobs?: FileBlob[];
//   currentImageIndex: number;
//   profilePic: string;
//   username: string;
//   firstName:string;
//   lastName:string;
//   Role:string;
//   createdby:string;
//   title?: string;
//   description?: string;
//   handlePrevImage: () => void;
//   handleNextImage: () => void;
//   postId: number;
//   imageUrl:string;
//   postAuthorId: number; // Add postAuthorId to props
// }

// const PostText = styled(Typography)(({ theme }) => ({
//   background: 'linear-gradient(45deg, #FF8A00 30%, #C4B108 90%)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   fontWeight: 'bold',
//   cursor: 'pointer',
//   padding: theme.spacing(0, 1)
// }));

// const CommentTextContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between', // This pushes the delete button to the right
// }));

// const PopupCard: React.FC<PostDialogProps> = ({
//   open,
//   onClose,
//   blobs,
//   currentImageIndex,
//   profilePic,
//   username,
//   title,
//   description,
//   postId,
//   imageUrl,
//   Role,
//   createdby,
//   postAuthorId, // Receive postAuthorId as a prop
//   handlePrevImage,
//   handleNextImage,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { likedPosts, likeCounts } = useSelector((state: RootState) => state.reactions);
//   const { comments = [], status: commentStatus, error: commentError } = useSelector((state: RootState) => state.comments);
  
//   const [liked, setLiked] = useState(likedPosts[postId] || false);
//   const [saved, setSaved] = useState(false);
//   const [comment, setComment] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const [replyText, setReplyText] = useState('');
//   const [replyingTo, setReplyingTo] = useState<number | null>(null);
//   const [showReplies, setShowReplies] = useState<number | null>(null);
//   const [userId, setUserId] = useState<number | null>(null);

//   // Create a ref for the comment section
//   const commentContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Retrieve user ID from session storage
//     const storedUserId = sessionStorage.getItem('userId');
//     if (storedUserId) {
//       setUserId(Number(storedUserId));
//       console.log('User ID from session storage:', storedUserId);
//     } else {
//       console.log('No user ID found in session storage');
//     }
    
//     if (open) {
//       dispatch(fetchLikeCount(postId));
//       dispatch(fetchComments(postId));
//     }
//   }, [dispatch, open, postId]);

//   useEffect(() => {
//     setLiked(likedPosts[postId] || false);
//   }, [likedPosts, postId]);

//   useEffect(() => {
//     dispatch(fetchLikeCount(postId));
//   }, [dispatch, likedPosts, postId]);

//   const handleLike = () => {
//     dispatch(toggleLike(postId)).then(() => {
//       setLiked(!liked);
//     });
//   };

//   const handleSaved = () => setSaved(!saved);

//   const handlePostClick = () => {
//     if (comment.trim()) {
//       dispatch(createComment({ text: comment, postId }))
//         .unwrap()
//         .then(() => {
//           setComment('');
//           if (commentContainerRef.current) {
//             commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight;
//           }
//         })
//         .catch((error) => {
//           console.error('Failed to post comment:', error);
//         });
//     }
//   };

//   const handleReplyClick = (id: number) => {
//     if (replyText.trim()) {
//       const updatedComments = comments.map((c) => {
//         if (c.id === id) {
//           return {
//             ...c,
//             replies: c.replies ? [
//               ...c.replies,
//               {
//                 id: c.replies.length + 1,
//                 username: 'User 1',
//                 text: replyText,
//                 avatar: profilePic
//               }
//             ] : [
//               {
//                 id: 1,
//                 username: 'User 1',
//                 text: replyText,
//                 avatar: profilePic
//               }
//             ]
//           };
//         }
//         return c;
//       });
//       setReplyText('');
//       setReplyingTo(null);
//       setShowReplies(id); // Show replies when a new reply is added
//     }
//   };

//   const toggleReplies = (id: number) => {
//     setShowReplies(showReplies === id ? null : id);
//   };

//   const renderReplies = (replies: ReplyProps[]) => {
//     return (replies || []).map((reply) => (
//       <Box key={reply.id} display="flex" alignItems="flex-start" ml={4} mt={1}>
//         <Avatar src={reply.avatar} sx={{ mr: 1, width: 32, height: 32 }} />
//         <Box>
//           <Typography variant="body2">
//             <strong>{reply.username}</strong> {reply.text}
//           </Typography>
//         </Box>
//       </Box>
//     ));
//   };

//   const handleDeleteComment = (commentId: number) => {
//     dispatch(deleteComment(commentId))
//       .unwrap()
//       .then(() => {
//         // Optionally, handle any additional logic after deletion
//       })
//       .catch((error) => {
//         console.error('Failed to delete comment:', error);
//       });
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 2,
//           width: '80%',
//           height: '80%'
//         }
//       }}
//     >
//       <DialogContent sx={{ p: 0 }}>
//         <Box display="flex" height="100%">
//           {blobs && blobs.length > 0 ? (
//             <Box flex={1.3} position="relative">
//               <CardMedia
//                 component="img"
//                 image={`${BASE_URL}/blobs/fetch/${blobs[currentImageIndex].uuid}`}
//                 alt={`Post image ${currentImageIndex + 1}`}
//                 sx={{ height: '100%', objectFit: 'cover', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
//               />
//               {blobs.length > 1 && (
//                 <>
//                   <Box position="absolute" display="flex" justifyContent="space-between" width="100%" top="50%">
//                     <IconButton size="small" aria-label="previous" onClick={handlePrevImage}>
//                       <ArrowBackIos fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small" aria-label="next" onClick={handleNextImage}>
//                       <ArrowForwardIos fontSize="small" />
//                     </IconButton>
//                   </Box>
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       bottom: 8,
//                       display: "flex",
//                       justifyContent: "center",
//                       width: "100%"
//                     }}
//                   >
//                     {blobs.map((_, index) => (
//                       <Box key={index} width={8} height={8} borderRadius="50%" bgcolor={index === currentImageIndex ? 'white' : 'gray'} mx={0.5} />
//                     ))}
//                   </Box>
//                 </>
//               )}
//             </Box>
//           ) : null}
//           <Box flex={1} p={2} display="flex" flexDirection="column" position="relative">
//             <Box display="flex" alignItems="center">
//               <Avatar src={imageUrl} sx={{ mr: 0.8, width: 32, height: 32 }} />
//               <Typography sx={{ fontSize: '14px' }}>{username}</Typography>
//               {Role === 'ROLE_ADMIN' && ( // Check if the user is an admin
//                 <WhatshotIcon sx={{ ml: 0.5, color: 'gold' }} /> // Render Admin icon
//               )}
//             </Box>
//             <Typography sx={{ fontSize: '16px', marginTop: '15px' }}>{title}</Typography>
//             <Typography sx={{ fontSize: '14px', marginTop: '10px' }}>{description}</Typography>
//             <Divider sx={{ my: 2 }} />
//             <Box flex={1} overflow="auto" ref={commentContainerRef}>
//               {comments.map((comment) => (
//                 <Box key={comment.id} mb={2}>
//                   <Box display="flex" alignItems="flex-start">
//                     <Avatar src={comment.createdBy.imageUrl} sx={{ mr: 1, width: 32, height: 32 }} />
//                     <Box flex={1}>
//                       <CommentTextContainer>
//                         <Box>
//                           <Typography variant="body2">
//                             <strong>{comment.createdBy.firstName + ' ' +comment.createdBy.LastName}</strong>
//                           </Typography>
//                           <Typography variant="body2">
//                             {comment.text}
//                           </Typography>
//                         </Box>
//                         {(comment.createdBy?.id === userId || postAuthorId === userId) && (
//                           <IconButton
//                             size="small"
//                             aria-label="delete"
//                             onClick={() => handleDeleteComment(comment.id)}
//                           >
//                             <Delete color="error" />
//                           </IconButton>
//                         )}
//                       </CommentTextContainer>
//                       <Box display="flex" alignItems="center" mt={1}>
//                         {replyingTo === comment.id ? (
//                           <>
//                             <TextField
//                               fullWidth
//                               variant="outlined"
//                               size="small"
//                               placeholder="Write a reply..."
//                               value={replyText}
//                               onChange={(e) => setReplyText(e.target.value)}
//                               InputProps={{
//                                 sx: {
//                                   border: 'none',
//                                   '& fieldset': {
//                                     border: 'none'
//                                   }
//                                 }
//                               }}
//                             />
//                             <PostText onClick={() => handleReplyClick(comment.id)}>
//                               Post
//                             </PostText>
//                           </>
//                         ) : (
//                           <Typography
//                             variant="caption"
//                             sx={{ cursor: 'pointer', color: 'gray' }}
//                             onClick={() => setReplyingTo(comment.id)}
//                           >
//                             Reply
//                           </Typography>
//                         )}
//                       </Box>
//                       <Box display="flex" flexDirection="column" mt={1}>
//                         {comment.replies && comment.replies.length > 0 && (
//                           <Typography
//                             variant="caption"
//                             sx={{ cursor: 'pointer', color: 'gray', textAlign: 'end' }}
//                             onClick={() => toggleReplies(comment.id)}
//                           >
//                             {showReplies === comment.id ? 'Hide replies' : 'View replies'}
//                           </Typography>
//                         )}
//                         {showReplies === comment.id && renderReplies(comment.replies || [])}
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//             <Divider />
//             <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
//               <Typography sx={{ fontSize: '10px' }}>{likeCounts[postId] || 0} likes</Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
//               <Box>
//                 <IconButton size="small" aria-label="like" onClick={handleLike}>
//                   {liked ? <Favorite color="error" /> : <FavoriteBorder />}
//                 </IconButton>
//                 <IconButton size="small" aria-label="comment">
//                   <Comment />
//                 </IconButton>
//                 <IconButton size="small" aria-label="share">
//                   <Send />
//                 </IconButton>
//               </Box>
//               <IconButton size="small" aria-label="save" onClick={handleSaved}>
//                 {saved ? <Bookmark /> : <BookmarkBorder />}
//               </IconButton>
//             </Box>
//             <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 size="small"
//                 placeholder="Share Your Thoughts... "
//                 value={comment}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(!!comment)}
//                 onChange={(e) => setComment(e.target.value)}
//                 InputProps={{
//                   sx: {
//                     border: 'none',
//                     '& fieldset': {
//                       border: 'none'
//                     }
//                   }
//                 }}
//               />
//               {isFocused && (
//                 <PostText onClick={handlePostClick}>
//                   Post
//                 </PostText>
//               )}
//             </Box>
//             <Divider
//               sx={{
//                 position: 'absolute',
//                 bottom: 0,
//                 right: 0,
//                 width: '100%',
//                 borderBottom: '8px solid gray'
//               }}
//             />
//           </Box>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PopupCard;