

// // import React, { useState, useEffect } from 'react';
// // import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// // import PostCards from '../../../common/Component/Cards/PostCard/PostCards';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { RootState } from '../../../store';
// // import { fetchUserPosts, deletePost } from '../../../store/features/userPostSlice';
// // import CancelButtons from '../../../common/Component/Button/Cancel/CancelButtons';
// // import DeleteButton from '../../../common/Component/Button/Delete/DeleteButton';

// // const PostedItem: React.FC = () => {
// //   const dispatch = useDispatch();
// //   const userId = Number(sessionStorage.getItem('userId')); // Adjust based on your auth logic
// //   const { userPosts, loading, error } = useSelector((state: RootState) => state.userPosts);

// //   const [open, setOpen] = useState(false);
// //   const [deleteId, setDeleteId] = useState<number | null>(null);

// //   useEffect(() => {
// //     dispatch(fetchUserPosts({ userId })); // Fetch posts with userId
// //   }, [dispatch, userId]);

// //   const handleDelete = async () => {
// //     if (deleteId === null) {
// //       console.error('No ID to delete');
// //       return;
// //     }

// //     try {
// //       await dispatch(deletePost(deleteId)).unwrap();
// //       console.log(`Post with ID ${deleteId} deleted successfully.`);
// //     } catch (error) {
// //       console.error('Failed to delete post:', error);
// //     } finally {
// //       handleClose();
// //     }
// //   };

// //   const handleEdit = (id: number) => {
// //     console.log(id);
// //     // Implement edit functionality here
// //   };

// //   const handleClickOpen = (id: number) => {
// //     setDeleteId(id);
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //     setDeleteId(null);
// //   };

// //   if (loading) return <div><CircularProgress /></div>;
// //   if (error) return <div>Error: {error}</div>;

// //   // Ensure userPosts has the content array
// //   const posts = userPosts?.content || [];

// //   return (
// //     <Box sx={{ padding: '20px',ml:20 }}>
// //       {posts.length > 0 ? (
// //         posts.map((post) => (
// //           <PostCards
// //             key={post.id}
// //             post={post}
// //             onDelete={() => handleClickOpen(post.id)}
// //             onEdit={() => handleEdit(post.id)}
// //             showMoreIcon={true}
// //             showEyeIcon={true} // or false depending on your needs
// //           />
// //         ))
// //       ) : (
// //         <div>No posts available.</div>
// //       )}

// //       {/* Confirmation Dialog */}
// //       <Dialog
// //         open={open}
// //         onClose={handleClose}
// //         aria-labelledby="alert-dialog-title"
// //         aria-describedby="alert-dialog-description"
// //       >
// //         <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
// //         <DialogContent>
// //           <DialogContentText id="alert-dialog-description">
// //             Are you sure you want to delete this post?
// //           </DialogContentText>
// //         </DialogContent>
// //         <DialogActions>
// //           <CancelButtons onClick={handleClose}>
// //             Cancel
// //           </CancelButtons>
// //           <DeleteButton onClick={handleDelete} autoFocus>
// //             Delete
// //           </DeleteButton>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default PostedItem;



// import React, { useState, useEffect } from 'react';
// import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
// import PostCards from '../../../common/Component/Cards/PostCard/PostCards';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../store';
// import { fetchUserPosts, deletePost } from '../../../store/features/userPostSlice';
// import CancelButtons from '../../../common/Component/Button/Cancel/CancelButtons';
// import DeleteButton from '../../../common/Component/Button/Delete/DeleteButton';

// const PostedItem: React.FC = () => {
//   const dispatch = useDispatch();
//   const userId = Number(sessionStorage.getItem('userId')); // Adjust based on your auth logic
//   const { userPosts, loading, error } = useSelector((state: RootState) => state.userPosts);

//   const [open, setOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState<number | null>(null);

//   useEffect(() => {
//     dispatch(fetchUserPosts({ userId })); // Fetch posts with userId
//   }, [dispatch, userId]);

//   const handleDelete = async () => {
//     if (deleteId === null) {
//       console.error('No ID to delete');
//       return;
//     }

//     try {
//       await dispatch(deletePost(deleteId)).unwrap();
//       console.log(`Post with ID ${deleteId} deleted successfully.`);
//     } catch (error) {
//       console.error('Failed to delete post:', error);
//     } finally {
//       handleClose();
//     }
//   };

//   const handleEdit = (id: number) => {
//     console.log(id);
//     // Implement edit functionality here
//   };

//   const handleClickOpen = (id: number) => {
//     setDeleteId(id);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setDeleteId(null);
//   };

//   if (loading) return <div><CircularProgress /></div>;
//   if (error) return <div>Error: {error}</div>;

//   // Ensure userPosts has the content array
//   const posts = userPosts?.content || [];

//   return (
//     <Box sx={{ padding: '20px', ml: -40 }}>
//       <Grid container spacing={2}>
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <Grid item xs={12} sm={6} key={post.id}> {/* 12 columns on extra-small screens, 6 on small and up (2 per row) */}
//               <PostCards
//                 post={post}
//                 onDelete={() => handleClickOpen(post.id)}
//                 onEdit={() => handleEdit(post.id)}
//                 showMoreIcon={true}
//                 showEyeIcon={true} // or false depending on your needs
//               />
//             </Grid>
//           ))
//         ) : (
//           <div>No posts available.</div>
//         )}
//       </Grid>

//       {/* Confirmation Dialog */}
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to delete this post?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <CancelButtons onClick={handleClose}>
//             Cancel
//           </CancelButtons>
//           <DeleteButton onClick={handleDelete} autoFocus>
//             Delete
//           </DeleteButton>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default PostedItem;


import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import PostCards from '../../../common/Component/Cards/PostCard/PostCards';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchUserPosts, deletePost } from '../../../store/features/userPostSlice';
import CancelButtons from '../../../common/Component/Button/Cancel/CancelButtons';
import DeleteButton from '../../../common/Component/Button/Delete/DeleteButton';

const PostedItem: React.FC = () => {
  const dispatch = useDispatch();
  const userId = Number(sessionStorage.getItem('userId')); // Adjust based on your auth logic
  const { userPosts, loading, error } = useSelector((state: RootState) => state.userPosts);

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUserPosts({ userId })); // Fetch posts with userId
  }, [dispatch, userId]);

  const handleDelete = async () => {
    if (deleteId === null) {
      console.error('No ID to delete');
      return;
    }

    try {
      await dispatch(deletePost(deleteId)).unwrap();
      console.log(`Post with ID ${deleteId} deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      handleClose();
    }
  };

  const handleEdit = (id: number) => {
    console.log(id);
    // Implement edit functionality here
  };

  const handleClickOpen = (id: number) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  if (loading) return <div><CircularProgress /></div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure userPosts has the content array
  const posts = userPosts?.content || [];

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}> {/* Adjust grid item sizes for mobile, tablet, and desktop */}
              <PostCards
                post={post}
                onDelete={() => handleClickOpen(post.id)}
                onEdit={() => handleEdit(post.id)}
                showMoreIcon={true}
                showEyeIcon={true} // or false depending on your needs
              />
            </Grid>
          ))
        ) : (
          <div>No posts available.</div>
        )}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButtons onClick={handleClose}>
            Cancel
          </CancelButtons>
          <DeleteButton onClick={handleDelete} autoFocus>
            Delete
          </DeleteButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostedItem;
