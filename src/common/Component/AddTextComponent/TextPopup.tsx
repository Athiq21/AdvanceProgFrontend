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
import { PopupConfig} from './PopupConfig';
import AddButtons from '../Button/Add/AddButtons';
import AvatarComponent from '../../../pages/Setting/Avatar';


interface TextPopupProps {
  open: boolean;
  onClose: () => void;
  config: PopupConfig;
  onPost: (postData: {
    title: string;
    description: string;
    selectedImages: File[];
  }) => void;
  profilePic: string; // URL of the user's profile picture
  firstName: string;
}

const TextPopup: React.FC<TextPopupProps> = ({ open, onClose, config , onPost,firstName}) => {
  const [openImagePopup, setOpenImagePopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [description, setText] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const [userName, setUserName] = useState<string>('User');


  useEffect(() => {
    const firstName = sessionStorage.getItem('userFirstName') || 'User';

    const lastName = sessionStorage.getItem('userLastName') || 'User';
    setUserName(firstName+' '+lastName);

  });
  

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
    // Posting page validation
    if (config.title && config.description && config.images) {
      if (!title.trim() && !description.trim() && selectedImages.length === 0) {
        setError('At least one of title, description, or image is required');
        return;
      }
    }

    // Marketplace page validation
    if (config.title && config.category && config.subCategory) {
      if (!title.trim()) {
        setError('Title is required');
        return;
      }
      if (selectedImages.length === 0) {
        setError('At least one image is required');
        return;
      }
    }

    // Perform the post action here
    console.log('Posting:', { title, description, selectedImages, });
    onPost({ title, description, selectedImages, });
    setText('');
    setTitle('');
    setSelectedImages([]);
    // setCategory('');
    // setSubCategory('');
    setError('');
    onClose();
  };

  const handleCancel = () => {
    setText('');
    setTitle('');
    setSelectedImages([]);
    // setCategory('');
    // setSubCategory('');
    setError('');
    onClose();
  };

  // useEffect(() => {
  //   if (category) {
  //     setSubCategories(categories[category] || []);
  //   } else {
  //     setSubCategories([]);
  //     setSubCategory('');
  //   }
  // }, [category]);

  return (
    <>
      <Dialog open={open} onClose={handleCancel} fullWidth >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AvatarComponent/>
            {/* <Typography variant="h6" sx={{ ml: 2 }}>
              {firstName}
            </Typography> */}
            <Typography variant="body2" sx={{ ml: 1}}>
                            <strong>{userName}</strong>
                          </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {config?.title && (
            <InputBase
              sx={{ width: '100%', mb: 2 }}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!error && config.title && !title.trim()}
            />
          )}
          {config?.description && (
            <InputBase
              sx={{ width: '100%', mb: 2 }}
              placeholder="Write something..."
              multiline
              rows={4}
              value={description}
              onChange={(e) => setText(e.target.value)}
              error={!!error && config.description && !description.trim()}
            />
          )}
          {config?.images && (
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
          )}
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
