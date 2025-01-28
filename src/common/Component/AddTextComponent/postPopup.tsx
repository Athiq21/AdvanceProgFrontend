import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Avatar,
  Typography,
  InputBase,
  Grid,
  IconButton,
  Button,
} from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DeleteIcon from '@mui/icons-material/Delete';
import ImagePopup from './ImagePopup';
import AddButtons from '../Button/Add/AddButtons';


interface TextPopupProps {
  open: boolean;
  onClose: () => void;
  onPost: (postData: {
    title: string;
    description: string;
    selectedImages: File[];
  }) => void;
}

const TextPopup: React.FC<TextPopupProps> = ({ open, onClose , onPost}) => {

  const [openImagePopup, setOpenImagePopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [description, setText] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleOpenImagePopup = () => {
    setOpenImagePopup(true);
  };

  const handleCloseImagePopup = () => {
    setOpenImagePopup(false);
  };

  const handleImagesSelected = (images: File[]) => {
    setSelectedImages(images);
    setOpenImagePopup(false);
  };

  const handlePost = () => {
    // Posting page validatio
    if (!title.trim() && !description.trim() && selectedImages.length === 0) {
        setError('At least one of title, description, or image is required');
        return;
      }

   
    console.log('Posting:', { title, description, selectedImages });
    onPost({ title, description, selectedImages });
    setText('');
    setTitle('');
    setSelectedImages([]);
    setError('');
    onClose();
  };

  const handleCancel = () => {
    setText('');
    setTitle('');
    setSelectedImages([]);
    setError('');
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleCancel} fullWidth >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt="User Profile" src="/path/to/profile.jpg" />
            <Typography variant="h6" sx={{ ml: 2 }}>
              User Name
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
            <InputBase
              sx={{ width: '100%', mb: 2 }}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!error && !title.trim()}
            />
          )
            <InputBase
              sx={{ width: '100%', mb: 2 }}
              placeholder="Write something..."
              multiline
              rows={4}
              value={description}
              onChange={(e) => setText(e.target.value)}
              error={!!error && !description.trim()}
            />

            <>
              <Grid container spacing={2}>
                {selectedImages.map((image, index) => (
                  <Grid item xs={6} key={index}>
                    <Box sx={{ position: 'relative' }}>
                      <img src={URL.createObjectURL(image)} alt={`preview-${index}`} style={{ width: '100%', borderRadius: 8 }} />
                      <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        color="error"
                        onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button startIcon={<PhotoLibraryIcon sx={{color:'black'}}/>} onClick={handleOpenImagePopup}
              sx={{color:'black'}}>
                Media
              </Button>
            </>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <AddButtons variant="contained"  onClick={handlePost} text={'Post'} sx={{width:'80px', height:'35px'}}>
              Post
            </AddButtons>
            <Button variant="outlined"   sx={{
            borderRadius:'8px',
            width:'100px',
             color: '#263B4A',
            '&:hover': { 
              backgroundColor: 'white', 
              color: '#263B4A', 
              border: '1px solid #263B4A' }
          }} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <ImagePopup open={openImagePopup} onClose={handleCloseImagePopup} onImagesSelected={handleImagesSelected} />
    </>
  );
};

export default TextPopup;


// function setSelectedImages(arg0: never[]) {
//     throw new Error('Function not implemented.');
// }

// function setText(arg0: string) {
//     throw new Error('Function not implemented.');
// }

// function setTitle(arg0: string) {
//     throw new Error('Function not implemented.');
// }

// function setError(arg0: string) {
//     throw new Error('Function not implemented.');
// }

// function onClose() {
//     throw new Error('Function not implemented.');
// }

