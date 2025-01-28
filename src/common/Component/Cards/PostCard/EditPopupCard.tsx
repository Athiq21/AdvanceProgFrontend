import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Avatar, Box, Typography, CardMedia, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { updatePost } from '../../../../store/features/userPostSlice';
import CancelButtons from '../../Button/Cancel/CancelButtons';
import AddButtons from '../../Button/Add/AddButtons';
import { BASE_URL } from '../../../../Authentication/api';
import { FileBlob } from '../../../../type/FileBlob';

interface EditPopupCardProps {
  open: boolean;
  id: number;
  onClose: () => void;
  imageUrl:string;
  username: string;
  blobs?: FileBlob[];
  currentImageIndex: number;
  title: string;
  description: string;
}

const EditPopupCard: React.FC<EditPopupCardProps> = ({ id, open, onClose,imageUrl, username, currentImageIndex, blobs, title, description }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();
  useSelector((state: RootState) => state.userPosts);


  const handleSubmit = async () => {
    try {
      await dispatch(updatePost({ id, title: editTitle, description: editDescription })).unwrap();
      setSnackbarMessage('Post updated successfully!');
    } catch (err) {
      setSnackbarMessage('Post updated successfully!');
    }
    setSnackbarOpen(true);
    onClose();
  };
  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2}>
            {blobs && blobs.length > 0 && currentImageIndex >= 0 && currentImageIndex < blobs.length && (
              <CardMedia
                component="img"
                image={`${BASE_URL}/blobs/fetch/${blobs[currentImageIndex].uuid}`}
                alt={`Post image ${currentImageIndex + 1}`}
                sx={{ width: 300, height: 300, objectFit: 'cover' }}
              />
            )}
            <Box flex={1}>
              <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={imageUrl} /> 
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {username}
                </Typography>
              </Box>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <CancelButtons onClick={onClose} variant="outlined">
            Cancel
          </CancelButtons>
          <AddButtons
            variant="contained"
            onClick={handleSubmit}
            text=""
            height="35px"
          >
            Apply
          </AddButtons>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditPopupCard;








// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Avatar, Box, Typography, CardMedia, Snackbar, Alert } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../../../store';
// import { updatePost } from '../../../../store/features/userPostSlice';
// import CancelButtons from '../../Button/Cancel/CancelButtons';
// import AddButtons from '../../Button/Add/AddButtons';
// import { BASE_URL } from '../../../../Authentication/api';
// import { FileBlob } from '../../../../type/FileBlob';

// interface EditPopupCardProps {
//   open: boolean;
//   id: number;
//   onClose: () => void;
//   profilePic: string;
//   username: string;
//   blobs?: FileBlob[];
//   currentImageIndex: number;
//   title: string;
//   description: string;
// }

// const EditPopupCard: React.FC<EditPopupCardProps> = ({ id, open, onClose, profilePic, username, currentImageIndex, blobs, title, description }) => {
//   const [editTitle, setEditTitle] = useState(title);
//   const [editDescription, setEditDescription] = useState(description);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const dispatch = useDispatch();
//   useSelector((state: RootState) => state.userPosts);
//   console.log("Profile Pic URL:", profilePic);

//   const handleSubmit = async () => {
//     try {
//       await dispatch(updatePost({ id, title: editTitle, description: editDescription })).unwrap();
//       setSnackbarMessage('Post updated successfully!');
//     } catch (err) {
//       setSnackbarMessage('Post updated successfully!');
//     }
//     setSnackbarOpen(true);
//     onClose();
//   };
  

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//         <DialogTitle>Edit Post</DialogTitle>
//         <DialogContent>
//           <Box display="flex" gap={2}>
//             {blobs && blobs.length > 0 && currentImageIndex >= 0 && currentImageIndex < blobs.length && (
//               <CardMedia
//                 component="img"
//                 image={`${BASE_URL}/blobs/fetch/${blobs[currentImageIndex].uuid}`}
//                 alt={`Post image ${currentImageIndex + 1}`}
//                 sx={{ width: 300, height: 300, objectFit: 'cover' }}
//               />
//             )}
//             <Box flex={1}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar src={profilePic} />
//                 <Typography variant="h6" sx={{ ml: 2 }}>
//                   {username}
//                 </Typography>
//               </Box>
//               <TextField
//                 label="Title"
//                 variant="outlined"
//                 fullWidth
//                 value={editTitle}
//                 onChange={(e) => setEditTitle(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 label="Description"
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={editDescription}
//                 onChange={(e) => setEditDescription(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//             </Box>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <CancelButtons onClick={onClose} variant="outlined">
//             Cancel
//           </CancelButtons>
//           <AddButtons
//             variant="contained"
//             onClick={handleSubmit}
//             text=""
//             height="35px"
//           >
//             Apply
//           </AddButtons>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default EditPopupCard;
