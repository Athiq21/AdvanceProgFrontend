import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { fetchAllSubCategories, addSubCategory, deleteSubCategory, updateSubCategory } from '../../../store/features/subCategorySlice';
import { fetchCategories } from '../../../store/features/categorySlice';
import AddButtons from '../../../common/Component/Button/Add/AddButtons';
import CancelButtons from '../../../common/Component/Button/Cancel/CancelButtons';

interface SubCategory {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

interface CategoryWithSubCategories {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

const AddNewSubCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subCategories } = useSelector((state: RootState) => state.subCategory);
  const { categories } = useSelector((state: RootState) => state.categories);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [editableRow, setEditableRow] = useState<number | null>(null);
  const [editedSubCategory, setEditedSubCategory] = useState<string>('');
  const [editedCategoryId, setEditedCategoryId] = useState<number | null>(null);

  // States for delete confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllSubCategories());
  }, [dispatch]);

  const handleEditClick = (rowId: number, subCategoryName: string, categoryId: number) => {
    setEditableRow(rowId);
    setEditedSubCategory(subCategoryName);
    setEditedCategoryId(categoryId);
  };

  const handleSaveClick = () => {
    if (editableRow !== null && editedCategoryId !== null) {
      dispatch(updateSubCategory({
        id: editableRow,
        name: editedSubCategory,
        categoryId: editedCategoryId
      }));
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
  };

  const handleAdd = () => {
    if (category && subCategory) {
      const newSubCategory = {
        name: subCategory,
        category_id: Number(category) 
      };
  
      console.log('Subcategory Payload:', newSubCategory); // Debugging
  
      dispatch(addSubCategory(newSubCategory))
        .then(response => {
          console.log('Subcategory added successfully', response);
        })
        .catch(error => {
          console.error('Error adding subcategory:', error);
        });
  
      setCategory('');
      setSubCategory('');
      setOpen(false);
    }
  };
  

  // Handle Delete Button Click
  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteSubCategory(deleteId));
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  // Cancel Delete
  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const groupedCategories: CategoryWithSubCategories[] = categories
    .map(cat => ({
      id: cat.id,
      name: cat.name,
      subCategories: subCategories.filter(sub => sub.category?.id === cat.id) // Safeguard against undefined category
    }))
    .filter(category => category.subCategories.length > 0); // Filter out categories without subcategories

  return (
    <Container maxWidth="lg" sx={{ padding: { xs: 1, sm: 2, md: 3 }, overflowX: 'auto' }}>
      <Box display="flex" justifyContent="center" sx={{ marginBottom: 2 }}>
        <AddButtons variant="contained" color="primary" onClick={handleClickOpen} sx={{ height:"40px", fontSize:'12px', width:'220px'}} text={''}>
       Add New SubCategory
             </AddButtons>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 2, overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Category Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sub Categories</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Edit</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedCategories.map(category => (
              <React.Fragment key={category.id}>
                <TableRow>
                  <TableCell align="center" rowSpan={category.subCategories.length + 1}>
                    {category.name}
                  </TableCell>
                </TableRow>
                {category.subCategories.map(subcategory => (
                  <TableRow key={subcategory.id}>
                    <TableCell align="center">
                      {editableRow === subcategory.id ? (
                        <TextField
                          fullWidth
                          value={editedSubCategory}
                          onChange={(e) => setEditedSubCategory(e.target.value)}
                        />
                      ) : (
                        subcategory.name
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {editableRow === subcategory.id ? (
                        <>
                          <IconButton onClick={handleSaveClick}>
                            <CheckSharpIcon />
                          </IconButton>
                          <IconButton onClick={handleCancelClick}>
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton onClick={() => handleEditClick(subcategory.id, subcategory.name, subcategory.category.id)}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDeleteClick(subcategory.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Subcategory Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Subcategory</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="select-category-label">Select Category</InputLabel>
            <Select
              labelId="select-category-label"
              value={category}
              label="Select Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            label="Sub Category"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#263B4A', '&:hover': { backgroundColor: 'white', color: '#263B4A', border: '1px solid #263B4A' } }}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} sx={{ backgroundColor: '#263B4A', color: 'white', borderRadius: '8px', '&:hover': { backgroundColor: 'white', color: '#263B4A', border: '1px solid #263B4A' } }}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this subcategory?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddNewSubCategory;
