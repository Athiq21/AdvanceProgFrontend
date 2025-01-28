import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Box,
  Typography,
  CardMedia,
  Snackbar,
  Alert,
} from '@mui/material';
import AddButtons from '../../Button/Add/AddButtons';
import CancelButtons from '../../Button/Cancel/CancelButtons';

interface EditCategoryCardProps {
  id: number;
  open: boolean;
  onClose: () => void;
  userProfilePic: string;
  userName: string;
  title: string;
  description: string;
  color: string;
  transmission: string;
  fueltype: string;
  category: string;
  price: string;
  mileage: string;
  status: string;
  blob: any; 
  selectedCategory: string;
  selectedSubCategory: string;
  onSave: (
    id: number,
    title: string,
    image: string,
    description: string,
    color: string,
    transmission: string,
    fueltype: string,
    mileage: string,
    price: string,
    status: string,
    category: string,
    subCategory: string
  ) => void;
}

const EditCategoryCard: React.FC<EditCategoryCardProps> = ({
  id,
  open,
  onClose,
  userProfilePic,
  userName,
  title,
  description,
  color,
  transmission,
  mileage,
  fueltype,
  price,
  status,
  blob,
  selectedCategory,
  selectedSubCategory,
  onSave,
}) => {
  // State variables for all the editable fields
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editCategory, setEditCategory] = useState(selectedCategory);
  const [editSubCategory, setEditSubCategory] = useState(selectedSubCategory);
  const [editImage, setEditImage] = useState(blob);
  const [editTransmission, setEditTransmission] = useState(transmission);
  const [editMileage, setEditMileage] = useState(mileage);
  const [editColor, setEditColor] = useState(color);
  const [editFueltype, setEditFueltype] = useState(fueltype);
  const [editPrice, setEditPrice] = useState(price);
  const [editStatus, setEditStatus] = useState(status);

  // Snackbar state for showing success/error messages
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Handle form submission to save the edited data
  const handleSubmit = () => {
    onSave(
      id,
      editTitle,
      editImage,
      editDescription,
      editColor,
      editTransmission,
      editFueltype,
      editMileage,
      editPrice,
      editStatus,
      editCategory,
      editSubCategory
    );
    setSnackbarMessage('Item updated successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2}>
            {/* Image preview */}
            <CardMedia
              component="img"
              image={editImage}
              alt="Post image"
              sx={{ width: '40%', height: '100%', objectFit: 'cover' }}
            />
            <Box flex={1}>
              {/* User info */}
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={userProfilePic} />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {userName}
                </Typography>
              </Box>
              {/* Form fields */}
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
                label="Color"
                variant="outlined"
                fullWidth
                value={editColor}
                onChange={(e) => setEditColor(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Transmission"
                variant="outlined"
                fullWidth
                value={editTransmission}
                onChange={(e) => setEditTransmission(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mileage"
                variant="outlined"
                fullWidth
                value={editMileage}
                onChange={(e) => setEditMileage(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Fuel Type"
                variant="outlined"
                fullWidth
                value={editFueltype}
                onChange={(e) => setEditFueltype(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <CancelButtons onClick={onClose}>Cancel</CancelButtons>
          <AddButtons width="80px" onClick={handleSubmit} text="" height="35px">
            Apply
          </AddButtons>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditCategoryCard;
