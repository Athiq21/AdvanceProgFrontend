import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveItem, fetchSavedItems } from '../../../../store/features/savedSlice';
import { Card, CardMedia, IconButton, Box, Avatar, Menu, MenuItem, CardHeader, Popover, List, ListItem, ListItemAvatar, ListItemText, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon, Send, MoreVert, Visibility, Edit, Delete } from '@mui/icons-material';
import DescriptionCard from './DescriptionCard';
import EditCategoryCard from './EditCategoryCard';
import AddButtons from '../../Button/Add/AddButtons';
import { BASE_URL } from '../../../../Authentication/api';
import { fetchUsersWithMessages, sendMessage } from '../../../../Service/messageService';


const MainCard: React.FC<MainCardProps> = ({
  id, userId, imageUrl, userName,image,firstName,
  title, description,mileage,price,fueltype,transmission,seatingCapacity,luggageCapacity, color,yearOfManufacture,engineCapacity,fuelEfficiency,deposit,status,licensePlate,
  blob,onSave, onForward, onEdit, onDelete,
  showEyeIcon, showMoreIcon,
  selectedCategory, selectedSubCategory,
  showForwardButton = false, onForwardButtonClick
}) => {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.saved.savedItems);
  const isBookmarked = savedItems[id] || false;

  const [open, setOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    dispatch(fetchSavedItems());
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchUsersWithMessages();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSave = () => {
    dispatch(saveItem(id)).catch((error) => {
      console.error('Error dispatching saveItem action:', error);
    });
  };

  const handleClickMoreVert = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleEdit = () => {
    setEditPopupOpen(true);
    handleCloseMenu();
  };
  const handleDelete = () => {
    onDelete?.();
    handleCloseMenu();
  };
  const handleProfilePopupOpen = () => setProfilePopupOpen(true);
  const handleProfilePopupClose = () => setProfilePopupOpen(false);
  const handleEditPopupClose = () => setEditPopupOpen(false);

  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => setPopoverAnchor(event.currentTarget);
  const handleClosePopover = () => setPopoverAnchor(null);

  const handleShareToUser = async () => {
    if (selectedUserId && messageContent) {
      console.log("Sharing item:", { itemId: id, postId: null }); // Add this log to verify
      try {
        await sendMessage(selectedUserId, `Shared an Listing with you: ${messageContent}`, null, id);
        alert('Item shared successfully!');
        handleClosePopover();
      } catch (error) {
        console.error('Error sharing item:', error);
      }
    }
  };
  
  console.log("fuelType:", fueltype);
  
  console.log('Props in MainCard:', { userId, userName});
  
  return (
    <>
      <Card
        sx={{ display: 'flex', flexDirection: 'column', marginTop: '5px', height: '330px', width: '230px', borderRadius: '10px', '@media (max-width: 600px)': { width: '240px', height: '330px' } }}
      >
        <CardHeader
          avatar={<Avatar src={imageUrl} />}
          title={title}
          sx={{ cursor: 'pointer', position: 'relative' }}
          action={
            <>
              {showMoreIcon && (
                <IconButton aria-label="more" onClick={handleClickMoreVert} sx={{ position: 'absolute', right: 0, top: 16 }}>
                  <MoreVert />
                </IconButton>
              )}
              {showEyeIcon && (
                <IconButton aria-label="view-profile" onClick={handleProfilePopupOpen} sx={{ position: 'absolute', right: 40, top: 16 }}>
                  <Visibility />
                </IconButton>
              )}
            </>
          }
        />

<CardMedia
  component="img"
  image={`${image}`}
  alt=""
  onClick={() => setOpen(true)}
  sx={{ height: 200, objectFit: 'cover', borderRadius: 2 }}
  onError={(e) => {
    console.error("Image failed to load:");
  }}
  onLoad={() => {
    console.log("Image loaded successfully:", `${image}`);
  }}
/>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
          {showForwardButton && (
            <AddButtons
              variant="contained"
              sx={{ width: '60px' }}
              onClick={onForwardButtonClick}
              text="Sold"
            >
              Sold
            </AddButtons>
          )}
          <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
            <IconButton aria-label="Add to favorites" onClick={handleSave} sx={{ marginTop: '5px' }}>
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
            <IconButton onClick={handleShareClick} sx={{ rotate: '-38deg' }}>
              <Send />
            </IconButton>
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {onEdit && (
            <MenuItem onClick={handleEdit}>
              <Edit sx={{ mr: 1 }} /> Edit
            </MenuItem>
          )}
          {onDelete && (
            <MenuItem onClick={handleDelete} sx={{ color: '#A81400' }}>
              <Delete sx={{ mr: 1, color: '#A81400' }} /> Delete
            </MenuItem>
          )}
        </Menu>
        <DescriptionCard
          userId={userId}   
          userProfilePic={imageUrl}
          userName={userName}
          firstName={firstName}
          title={title}
          description={description}
          mileage={mileage}
          price={price}
          fueltype={fueltype}
          image={image}
          transmission={transmission}
          seatingCapacity={seatingCapacity}
          luggageCapacity={luggageCapacity}
          color={color}
          yearOfManufacture={yearOfManufacture}
          engineCapacity={engineCapacity}
          fuelEfficiency ={fuelEfficiency}
          deposit={deposit}
          status={status}
          licensePlate={licensePlate}

          open={open}
          onClose={() => setOpen(false)}
          blob={blob}
          itemId={id} 
        />
        {onEdit && (
   <EditCategoryCard
   id={id}
   open={editPopupOpen}
   onClose={handleEditPopupClose}
   userProfilePic={imageUrl}
   userName={userName}
   title={title}
   description={description}
   mileage={mileage}
   price={price}
   transmission={transmission}
   color={color}
   fueltype={fueltype}
   blob={blob}
   status={status}
   selectedCategory={selectedCategory}
   selectedSubCategory={selectedSubCategory}
 />
        )}
      </Card>

      {/* Share Popover */}
      <Popover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: '300px' }}>
          {loadingUsers ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h6">Share with:</Typography>
              <List>
                {users.map(user => (
                  <ListItem button key={user.id} onClick={() => setSelectedUserId(user.id)}>
                    <ListItemAvatar>
                      <Avatar src={user.imageUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                  </ListItem>
                ))}
              </List>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Add a message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Button variant="contained" onClick={handleShareToUser} sx={{ mt: 2 }}>
                Share
              </Button>
            </>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default MainCard;
