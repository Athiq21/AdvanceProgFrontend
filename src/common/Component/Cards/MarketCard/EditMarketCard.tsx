import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Avatar, Box, Typography, CardMedia, Button, MenuItem } from '@mui/material';
import { Cancel, Check, CheckCircle } from '@mui/icons-material';

interface EditPopupCardProps {
  open: boolean;
  onClose: () => void;
  userProfilePic: string;
  userName: string;
  images: string[];
  title: string;
  description: string;
  categoryOptions: string[];
  subCategoryOptions: string[];
  onSave: (title: string, description: string, category: string, subCategory: string) => void;
}

const EditMarketCard: React.FC<EditPopupCardProps> = ({ 
    open,
     onClose, userProfilePic, userName, images, title,
      categoryOptions,
  subCategoryOptions, description, onSave }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  if (!open) return null;

  const handleSave = () => {
    onSave(editTitle, editDescription,selectedCategory,selectedSubCategory);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2}>

            <CardMedia
              component="img"
              image={images[0]}
              alt="Post image"
              sx={{ width: '40%', height: '100%', objectFit: 'cover' }}
            />
        
          <Box flex={1}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={userProfilePic} />
              <Typography variant="h6" sx={{ ml: 2 }}>
                {userName}
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

        <TextField
            select
            label="Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          >

{categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Sub-category"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          >
            {subCategoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose} startIcon={<Cancel />} sx={{ mr: 1 }}>Cancel</Button>
            <Button
              onClick={() => onSave(editTitle, editDescription, selectedCategory, selectedSubCategory)}
              startIcon={<CheckCircle />}
            >
              Apply
            </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMarketCard;
