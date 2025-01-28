
import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  TextField,
  InputAdornment,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ExpandLess, ExpandMore, Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { fetchCategories } from '../../../store/features/categorySlice';
import { fetchSubCategoriesByCategoryId } from '../../../store/features/subCategorySlice';

interface SidebarProps {
  onSubcategorySelect: (subcategoryId: number) => void;
  onSearch: (query: string) => void; // For updating search in Marketplace
}

const SideBar: React.FC<SidebarProps> = ({ onSubcategorySelect, onSearch }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.categories);
  const { subCategories } = useSelector((state: RootState) => state.subCategory);

  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  
  useEffect(() => {
    if (openCategoryId !== null) {
      dispatch(fetchSubCategoriesByCategoryId(openCategoryId));
    }
  }, [dispatch, openCategoryId]);
  

  const handleCategoryClick = (categoryId: number) => {
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query); // Update the Marketplace's search query directly
  };

  const handleAllClick = () => {
    onSearch(''); // Clear search in Marketplace
    setOpenCategoryId(null); // Close all expanded categories
    onSubcategorySelect(-1); // Reset subcategory selection
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Hamburger Icon for Mobile */}
      {isMobile && (
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={openDrawer}
        onClose={handleDrawerToggle}
        sx={{
          width: isMobile ? 260 : 180,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? 250 : 250,
            boxSizing: 'border-box',
            boxShadow: 3,
            borderRadius: 2,
            mt: isMobile ? 7.5 : 15,
          },
        }}
      >
        {/* Search and All Button */}
        <Box sx={{ padding: 1, borderBottom: '1px solid #ddd' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search items..."
            onChange={handleSearchChange} // No local state, updates Marketplace search directly
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 20,
              },
            }}
          />
          {/* <Button>
            All
          </Button> */}
        </Box>

        <List>
          {categories.map((category) => (
            <div key={category.id}>
              <ListItem
                button
                onClick={() => handleCategoryClick(category.id)}
              >
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{ sx: { fontSize: '12px' } }}
                />
                {openCategoryId === category.id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>


              <Collapse
                in={openCategoryId === category.id}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {subCategories
                    .filter((sub) => sub.categoryId === category.id)
                    .map((subcategory) => (
                      <ListItem
                        button
                        key={subcategory.id}
                        onClick={() => onSubcategorySelect(subcategory.id)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText
                          primary={subcategory.name}
                          primaryTypographyProps={{ sx: { fontSize: '12px' } }}
                        />
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
