import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  InputBase,
  Grid,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { fetchCategories } from '../../../store/features/categorySlice';
import { fetchSubCategoriesByCategoryId } from '../../../store/features/subCategorySlice';
import ImagePopup from './ImagePopup';
import AddButtons from '../Button/Add/AddButtons';
import AvatarComponent from '../../../pages/Setting/Avatar';
import { PopupConfig, SubCategory } from './PopupConfig';
import { SelectChangeEvent } from '@mui/material/Select';
import { addItem } from '../../../store/features/itemSlice'; 

interface TextPopupProps {
  open: boolean;
  onClose: () => void;
  config: PopupConfig;
  profilePic: string;
  firstName: string;
}

const MarketPlacePopup: React.FC<TextPopupProps> = ({ open, onClose, config, firstName }) => {
  const [openImagePopup, setOpenImagePopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [name, setName] = useState('');
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fueltype, setFueltype] = useState('');
  const [price, setPrice] = useState('');
  const [created_by, setCreated_by] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status: categoriesStatus } = useSelector((state: RootState) => state.categories);
  const { subCategories, status: subCategoriesStatus } = useSelector((state: RootState) => state.subCategory);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);


  const [userName, setUserName] = useState<string>('User');
  const [role, setRole] = useState<string | null>(null);



  useEffect(() => {
    const firstName = sessionStorage.getItem('userFirstName') || 'User';
    const lastName = sessionStorage.getItem('userLastName') || 'User';
    setUserName(`${firstName} ${lastName}`);
    const userRole = sessionStorage.getItem('role');
    setRole(userRole);
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchSubCategoriesByCategoryId(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  const handleOpenImagePopup = () => setOpenImagePopup(true);
  const handleCloseImagePopup = () => setOpenImagePopup(false);

  const handleImagesSelected = (images: File[]) => {
    setSelectedImages(images);
    setOpenImagePopup(false);
  };

  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    const categoryId = event.target.value as number;
    setSelectedCategory(categoryId);
    console.log("category ID:"+categoryId);
  };

  const handleSubCategoryChange = (event: SelectChangeEvent<number>) => {
    const subCategoryId = event.target.value as number;
    setSelectedSubCategory(subCategoryId);
    console.log('Subcategory ID:', subCategoryId);
  };


  const userId = sessionStorage.getItem('userId');

  const handlePost = async () => {
    if (!name.trim() || !price.trim() || !fueltype.trim() || !mileage.trim() || !transmission.trim() || !selectedCategory) {
      setError('All fields are required');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('color', color);
    formData.append('mileage', mileage);
    formData.append('transmission', transmission);
    formData.append('fueltype', fueltype);
    formData.append('price', price);
    formData.append('created_by', userId);
    formData.append('category_id', String(selectedCategory));
    formData.append('subcategory_id', String(selectedSubCategory));
    if (selectedImages.length > 0) {
      formData.append('image', selectedImages[0]); 
    }
  
    try {
      const response = await dispatch(addItem(formData));
      console.log('Server Response:', response);
  
      // Reset fields after success
      setName('');
      setDescription('');
      setColor('');
      setMileage('');
      setTransmission('');
      setFueltype('');
      setPrice('');
      setCreated_by('');
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setSelectedImages([]);
      setError('');
  
      onClose(); // Close the modal
      alert('Item added successfully!');
    } catch (error) {
      console.error('Failed to create post:', error);
      setError('Failed to create post');
    }
  };


  const handleCancel = () => {
    setDescription('');
    setName('');
    setColor('');
    setMileage('');
    setTransmission('');
    setFueltype('');
    setPrice('');

    setSelectedImages([]);
    setError('');
    onClose();
  };

  const isPostDisabled = !name.trim() || !selectedCategory;
  const filteredCategories = role === 'ROLE_USER' ? categories.slice(1) : categories;

  if (categoriesStatus === 'loading' || subCategoriesStatus === 'loading') {
    return <CircularProgress />;
  }

  return (
    <>
      <Dialog open={open} onClose={handleCancel} fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AvatarComponent />
            <Typography variant="body2" sx={{ ml: 1 }}>
              <strong>{userName}</strong>
            </Typography>
            <Typography variant="h6" sx={{ ml: 2 }}>
              {firstName}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {config?.name && (
            <InputBase
              sx={{ width: '100%', mb: 2 }}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!error && !name.trim()}
            />
          )}
          {config?.description && (
            <InputBase
              sx={{ width: '100%', mb: 2 }}
              placeholder="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={!!error && !description.trim()}
            />
          )}
          {config?.color && (
            <InputBase
              sx={{ width: '100%', mb: 2 }}
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              error={!!error && !color.trim()}
            />
          )}
          {config?.mileage &&(
            <InputBase
            sx={{ width: '100%', mb: 2 }}
            placeholder="Mileage"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            error={!!error && !mileage.trim()}
            />
          )}
             {config?.transmission &&(
            <InputBase
            sx={{ width: '100%', mb: 2 }}
            placeholder="Transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            error={!!error && !transmission.trim()}
            />
          )}
            {config?.fueltype &&(
            <InputBase
            sx={{ width: '100%', mb: 2 }}
            placeholder="Fuel Type"
            value={fueltype}
            onChange={(e) => setFueltype(e.target.value)}
            error={!!error && !fueltype.trim()}
            />
          )}
            {config?.price &&(
            <InputBase
            sx={{ width: '100%', mb: 2 }}
            placeholder="Rent Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={!!error && !price.trim()}
            />
          )}
          {config?.images && (
            <>
              <Grid container spacing={2}>
                {selectedImages.map((image, index) => (
                  <Grid item xs={6} key={index}>
                    <Box sx={{ position: 'relative' }}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        style={{ width: '100%', borderRadius: 8 }}
                      />
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
              <Button
                startIcon={<PhotoLibraryIcon sx={{ color: 'black' }} />}
                onClick={handleOpenImagePopup}
                sx={{ color: 'black' }}
              >
                Media
              </Button>
            </>
          )}
          {config?.category && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory || ''}
                onChange={handleCategoryChange}
              >
                {filteredCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {config?.subCategory && selectedCategory && (
            <FormControl fullWidth style={{ marginTop: '1rem' }}>
              <InputLabel id="subcategory-label">Subcategory</InputLabel>
              <Select
                labelId="subcategory-label"
                value={selectedSubCategory || ''}
                onChange={handleSubCategoryChange}
                disabled={subCategories.length === 0}
              >
                {subCategories
                  .filter((sub) => sub.categoryId === selectedCategory)
                  .map((subCategory) => (
                    <MenuItem key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <AddButtons
              variant="contained"
              onClick={handlePost}
              text={'Post'}
              sx={{ width: '80px', height: '35px' }}
              disabled={isPostDisabled}
            >
              Post
            </AddButtons>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '8px',
                width: '100px',
                color: '#263B4A',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#263B4A',
                  border: '1px solid #263B4A',
                },
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <ImagePopup open={openImagePopup} onClose={handleCloseImagePopup} onImagesSelected={handleImagesSelected} />
    </>
  );
};

export default MarketPlacePopup;
