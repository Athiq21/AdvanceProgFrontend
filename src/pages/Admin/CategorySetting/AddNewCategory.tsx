import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Button, Container, Dialog,
  DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography,
  DialogContentText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../../store/features/categorySlice';
import AddButtons from '../../../common/Component/Button/Add/AddButtons';
import CancelButtons from '../../../common/Component/Button/Cancel/CancelButtons';


const AddNewCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const status = useSelector((state: RootState) => state.categories.status);
  const error = useSelector((state: RootState) => state.categories.error);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  // const [subCategories, setSubCategories] = useState<string[]>(['']);
  const [editableRow, setEditableRow] = useState<number | null>(null);
  const [editedCategory, setEditedCategory] = useState<string>('');
  // const [editedSubCategories, setEditedSubCategories] = useState<{ id: number; name: string }[]>([]);
  const [categoryError, setCategoryError] = useState<string>(''); 
  // const [subCategoriesError, setSubCategoriesError] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // subCategories: { id: number; name: string }[]) 
  const handleEditClick = (rowId: number, categoryName: string,) => {
    setEditableRow(rowId);
    setEditedCategory(categoryName);
    // setEditedSubCategories(subCategories);
  };

  const handleSaveClick = () => {
    if (editableRow !== null) {
      const updatedCategory = {
        id: editableRow,
        name: editedCategory,
        // subCategory: editedSubCategories
      };
      dispatch(updateCategory(updatedCategory));
    }
    setEditableRow(null);
  };

  const handleCancelClick = () => {
    setEditableRow(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategory('');
    // setSubCategories(['']);
    setCategoryError(''); 
    // setSubCategoriesError([]); 
  };


  const validate = () => {
    let valid = true;
    if (category.trim() === '') {
      setCategoryError('Category name is required.');
      valid = false;
    } else {
      setCategoryError('');
    }


    return valid;
  };

  const handleAdd = () => {
    if (validate()) {
      const newCategory = { name: category };
      dispatch(addCategory(newCategory))
        .unwrap() // To handle promise responses
        .then(() => {
          setOpen(false);
          setCategory('');
        })
        .catch((error) => {
          setCategoryError(`Failed to add category: ${error.message}`);
        });
    }
  };



  const handleConfirmDelete = () => {
    if (categoryToDelete !== null) {
      dispatch(deleteCategory(categoryToDelete));
      handleCloseDeleteDialog();
    }
  };

  const handleOpenDeleteDialog = (id: number) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return (
 <Container maxWidth="lg" sx={{ padding: { xs: 1, sm: 2, md: 3 }, overflowX: 'auto' }}>
      <Box display="flex" justifyContent="center" sx={{ marginBottom: 2 }}>
        <AddButtons variant="contained" color="primary" onClick={handleClickOpen} sx={{ height:"40px", fontSize:'12px', width:'220px'}} text={''}>
       Add New SubCategory
             </AddButtons>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: '20px'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Category Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Edit</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status === 'loading' && <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>}
            {status === 'failed' && <TableRow><TableCell colSpan={4}>Error: {error}</TableCell></TableRow>}
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell component="th" scope="row">
                  {category.id}
                </TableCell>
                <TableCell align="center">
                  {editableRow === category.id ? (
                    <TextField
                      fullWidth
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                    />
                  ) : (
                    category.name
                  )}
                </TableCell>
                <TableCell align="center">
                  {editableRow === category.id ? (
                    <>
                      <IconButton onClick={handleSaveClick}>
                        <CheckSharpIcon color="success" />
                      </IconButton>
                      <IconButton onClick={handleCancelClick}>
                        <CancelIcon color="error" />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={() => handleEditClick(category.id, category.name)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenDeleteDialog(category.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            error={Boolean(categoryError)}
            helperText={categoryError}
          />
          {/* {subCategories.map((subCategory, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <TextField
                margin="dense"
                label={`Subcategory ${index + 1}`}
                type="text"
                fullWidth
                variant="standard"
                value={subCategory}
                onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                error={Boolean(subCategoriesError[index])}
                helperText={subCategoriesError[index]}
              />
              <IconButton
                onClick={() => handleRemoveSubCategoryField(index)}
                sx={{ marginLeft: '10px' }}
                disabled={subCategories.length === 1}
              >
                <RemoveIcon color="error" />
              </IconButton>
            </Box>
          ))} */}
          {/* <Button onClick={handleAddSubCategoryField} startIcon={<AddIcon />} color="primary">
            Add Subcategory
          </Button> */}
        </DialogContent>
        <DialogActions>
          <CancelButtons onClick={handleClose}>Cancel</CancelButtons>
          <AddButtons onClick={handleAdd} text={''} sx={{ width :'auto',  height : '35px'}} 
 >Add</AddButtons>
        </DialogActions>
      </Dialog>



       {/* Confirmation Dialog */}
    <Dialog
      open={deleteDialogOpen}
      onClose={handleCloseDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this category?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleting this category will remove it permanently.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </Container>
  );
};

export default AddNewCategory;
