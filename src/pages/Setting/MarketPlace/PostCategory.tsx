
import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, deleteItem } from "../../../store/features/itemSlice";
import MainCard from "../../../common/Component/Cards/TravelCards/MainCard";
import SearchComponent from "../../../common/Component/SearchBar/SearchComponent";
import CancelButtons from "../../../common/Component/Button/Cancel/CancelButtons";
import DeleteButton from "../../../common/Component/Button/Delete/DeleteButton";
import { RootState } from "../../../store/index";

const PostCategory = () => {
    const dispatch = useDispatch();
    const { items: postItems, loading, error } = useSelector((state: RootState) => state.items);
    const [soldItems, setSoldItems] = useState<{ [key: number]: boolean }>({});
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredItems = postItems.filter((item) => {
        const fullName = item.createdBy ? `${item.createdBy.firstName} ${item.createdBy.lastName}`.toLowerCase() : '';
        const searchLowerCase = searchQuery.toLowerCase();
        return (
            item.name.toLowerCase().includes(searchLowerCase) ||
            fullName.includes(searchLowerCase) ||
            item.description.toLowerCase().includes(searchLowerCase)
        );
    });

    const handleDelete = (id: number) => {
        dispatch(deleteItem(id));
    };

    const openConfirmDialog = (id: number) => {
        setItemToDelete(id);
        setConfirmDialogOpen(true);
    };

    const closeConfirmDialog = () => {
        setConfirmDialogOpen(false);
        setItemToDelete(null);
    };

    const confirmDelete = () => {
        if (itemToDelete !== null) {
            handleDelete(itemToDelete);
        }
        closeConfirmDialog();
    };

    const handleEdit = (id: number) => {
        console.log('Edit clicked');
    };

    const toggleSoldStatus = (id: number) => {
        setSoldItems((prevSoldItems) => ({
            ...prevSoldItems,
            [id]: !prevSoldItems[id],
        }));
    };

    if (loading) return <div><CircularProgress /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{ padding: "20px", marginLeft:0 }}>
            <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2, marginTop: '25px' }}>
                <Box sx={{ width: '500px', mt: '-30px' }}>
                    <SearchComponent value={searchQuery} onChange={handleSearchChange} />
                </Box>
            </Box>

<Grid container spacing={1}>
  {filteredItems.length > 0 ? (
    filteredItems.map((item) => (
      <Grid item xs={11} sm={6} md={2.5} key={item.id}>
        <Box sx={{marginLeft:"30px"}}>
        <MainCard
          id={item.id}
          userId={item.createdBy?.id || ''}
          imageUrl={item.createdBy?.imageUrl || ''}
          userName={`${item.createdBy?.firstName || ''} ${item.createdBy?.lastName || ''}`}
          title={item.name}
          description={item.description}
          mileage={item.mileage} 
          price={item.price} 
          fuelType={item.fuelType} 
          transmission={item.transmission}
          seatingCapacity={item.seatingCapacity}
          luggageCapacity={item.luggageCapacity}
          color={item.color}
          yearOfManufacture={item.yearOfManufacture}
          engineCapacity={item.engineCapacity}
          fuelEfficiency={item.fuelEfficiency}
          licensePlate={item.licensePlate}
          deposit={item.deposit}
          status={item.status}


          blob={item.imageBlob}
          showMoreIcon={true}
          onDelete={() => openConfirmDialog(item.id)}
          onEdit={() => handleEdit(item.id)}
          onSave={() => { }}
          onForward={() => { }}
          forwardButtonLabel={soldItems[item.id] ? 'Unsold' : 'Sold'}
          selectedCategory={0}
          selectedSubCategory={0}
        />
        </Box>
      </Grid>
    ))
  ) : (
    <div>No Items available, Try posting some.</div>
  )}
</Grid>


            <Dialog open={confirmDialogOpen} onClose={closeConfirmDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <CancelButtons onClick={closeConfirmDialog}>Cancel</CancelButtons>
                    <DeleteButton onClick={confirmDelete}>
                        Delete
                    </DeleteButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PostCategory;
