

import React, { useState } from 'react';
import { Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import SearchComponent from '../../../common/Component/SearchBar/SearchComponent';
import MainCard from '../../../common/Component/Cards/TravelCards/MainCard';
import { useItems } from '../../../Service/CustomHook/getCategory';
import CancelButtons from '../../../common/Component/Button/Cancel/CancelButtons';
import DeleteButton from '../../../common/Component/Button/Delete/DeleteButton';
import apiConfig from '../../../Authentication/api';
import { useNavigate } from 'react-router-dom';

const EditCategory: React.FC = () => {
  const { items } = useItems();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

const handleDelete = async (id: number) => {
  try {
    await apiConfig.delete(`/item/${id}`);
    console.log(`Item with ID ${id} deleted successfully.`);
    navigate(0);
  } catch (error) {
    console.error("Failed to delete item:", error);
  }
};

  const handleClickOpenDialog = (id: number) => {
    setCurrentDeleteId(id);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentDeleteId(null);
  };
  
  const handleConfirmDelete = async () => {
    if (currentDeleteId !== null) {
      await handleDelete(currentDeleteId);
    }
    handleCloseDialog();
  };
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setOpenEditDialog(true);
      setSelectedItem(item);  

      console.log("data:", item);
    }
  };

  const filteredItems = items.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    const searchLowerCase = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLowerCase) ||
      fullName.includes(searchLowerCase)|| item.description.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <>
        <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    marginBottom: 2,
    marginTop: '15px',
    marginLeft: '10px',
  }}
>
          <SearchComponent value={searchQuery} onChange={handleSearchChange} />
      </Box>
<Container>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
             <MainCard
              key={item.id}
              id={item.id}
              userId={item.createdBy?.id || ''}
              imageUrl={item.createdBy?.imageUrl || ''}
              userName={`${item.createdBy?.firstName || ''} ${item.createdBy?.lastName || ''}`}
              image={item.imageBlob}
              title={item.name}
              description={item.description}
              mileage={item.mileage}
              price={item.price}
              fueltype={item.fueltype}
              transmission={item.transmission}
              seatingCapacity={item.seatingCapacity}
              luggageCapacity={item.luggageCapacity}
              color={item.color}
              yearOfManufacture={item.yearOfManufacture}
              engineCapacity={item.engineCapacity}
              fuelEfficiency={item.fuelEfficiency}
              deposit={item.deposit}
              status={item.status}
              licensePlate={item.licensePlate}
              blob={item.imageBlob}
              showMoreIcon={true}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleClickOpenDialog(item.id)}
              onSave={() => { /* Implement save functionality */ }}
              onForward={() => { /* Implement forward functionality */ }}
            />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      
{/* dialog box */}
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this post?
      </DialogContent>
      <DialogActions>
        <CancelButtons onClick={handleCloseDialog}>
          Cancel
        </CancelButtons>
        <DeleteButton onClick={handleConfirmDelete} >
          Delete
        </DeleteButton>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default EditCategory;




