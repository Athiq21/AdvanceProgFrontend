import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import apiConfig from '../../../Authentication/api';
import { fetchItemById, selectItemById } from '../../../store/features/itemSlice';
import DescriptionCard from '../../../common/Component/Cards/TravelCards/DescriptionCard';

interface ItemCardProps {
  id: number; // Change the prop type to accept an ID instead of the entire item
}

const ItemCard: React.FC<ItemCardProps> = ({ id }) => {
  const dispatch = useDispatch();
  const [openDescriptionCard, setOpenDescriptionCard] = useState(false); // State to control popup visibility

  // Select the item from the Redux store
  const item = useSelector((state: any) => selectItemById(state, id));

  // Fetch item if not present in the store
  useEffect(() => {
    if (!item) {
      dispatch(fetchItemById(id)); 
    }
  }, [id, item, dispatch]);

  // Construct image URL from the imageBlob UUID
  const imageUrl = item?.imageBlob ? `${apiConfig.defaults.baseURL}/blobs/fetch/${item.imageBlob.uuid}` : 'fallback-image-url'; 

  // Function to open the DescriptionCard
  const handleCardClick = () => {
    setOpenDescriptionCard(true); // Open the popup
  };

  // Function to close the DescriptionCard
  const handleClose = () => {
    setOpenDescriptionCard(false); // Close the popup
  };

  return (
    <>
      <Card sx={{ display: 'flex', marginBottom: '1rem', maxWidth: 300 }} onClick={handleCardClick}> {/* Add onClick here */}
        <CardMedia
          component="img"
          image={imageUrl} 
          alt={item?.name || 'Unknown...'}
          sx={{ width: 100, height: 120 }} 
        />
        <Box sx={{ padding: 1 }}>
          <Typography variant="h6">{item?.name || 'Unknown...'}</Typography>
          <Typography variant="body2">{item?.description || 'Unknown...'}</Typography>
          <Typography variant="caption" color="text.secondary">
            Category: {item?.category?.name || 'Unknown'}, Subcategory: {item?.subCategory?.name || 'Unknown'}
          </Typography>
        </Box>
      </Card>

      {/* DescriptionCard Popup */}
      {item && ( // Ensure item exists before rendering DescriptionCard
        <DescriptionCard
          open={openDescriptionCard}
          onClose={handleClose}
          blob={item.imageBlob} // Pass the blob object
          userProfilePic={item.createdBy?.imageUrl || 'default-profile-pic-url'} // Use createdBy profile picture
          userId={item.createdBy?.id} // Pass user ID from createdBy
          userName={`${item.createdBy?.firstName || 'Unknown'} ${item.createdBy?.lastName || ''}`.trim()} // Format full user name
          title={item.name}
          description={item.description}
          itemId={item.id} // Pass item ID
        />
      )}
    </>
  );
};

export default ItemCard;
