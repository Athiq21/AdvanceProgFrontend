import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography, Grid, Card, CardMedia, CardContent, Avatar, IconButton, Popover, TextField, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon, Send } from '@mui/icons-material';
import apiConfig from '../../../Authentication/api'; // Ensure apiConfig is correctly imported
import DescriptionCard from '../../../common/Component/Cards/TravelCards/DescriptionCard';
import { fetchUsersWithMessages, sendMessage } from '../../../Service/messageService';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { saveItem } from '../../../store/features/savedSlice'; 
import SearchComponent from '../../../common/Component/SearchBar/SearchComponent';

// Define the structure for SavedItem
interface SavedItem {
  id: number;
  description: string;
  name: string;
  imageBlob?: {
    uuid: string;
  };
  isSold: boolean;
  tags: any[];
  subcategory: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
      subCategories: any[];
    };
    items: any[];
  };
  category: {
    id: number;
    name: string;
    subCategories: any[];
    items: any[];
  };
}

interface CreatedBy {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

// SaveCategory component
const SaveCategory: React.FC = () => {
  const [savedItems, setSavedItems] = useState<{ item: SavedItem; createdBy: CreatedBy }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ item: SavedItem; createdBy: CreatedBy } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState<null | HTMLElement>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const dispatch = useDispatch(); // Initialize dispatch
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
};

  // Fetch saved items from the API on component mount
  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const response = await apiConfig.get('/saved/items'); // Adjust endpoint as needed
        setSavedItems(response.data); // Save the entire response
      } catch (err) {
        console.error('Error fetching saved items:', err);
        setError('Failed to load saved items');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedItems(); // Call the fetch function
  }, []);

  // Fetch users for sharing functionality
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

  // Show loading indicator
  if (loading) {
    return <CircularProgress />;
  }

  // Show error message if there's an error
  if (error) {
    return (
      <Typography color="error" variant="h6">
        {error}
      </Typography>
    );
  }

  // Function to handle opening the dialog
  const handleImageClick = (item: { item: SavedItem; createdBy: CreatedBy }) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleSave = (itemId: number) => {
    dispatch(saveItem(itemId)).catch((error) => {
      console.error('Error dispatching saveItem action:', error);
    });
  };

  const handleShareClick = (event: React.MouseEvent<HTMLElement>, item: { item: SavedItem; createdBy: CreatedBy }) => {
    setPopoverAnchor(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClosePopover = () => setPopoverAnchor(null);

  const handleShareToUser = async () => {
    if (selectedUserId && messageContent) {
      try {
        await sendMessage(selectedUserId, `Shared an item with you: ${selectedItem?.item.name}. ${selectedItem?.item.description}. ${messageContent}`, null, selectedItem?.item.id);
        alert('Item shared successfully!');
        handleClosePopover();
      } catch (error) {
        console.error('Error sharing item:', error);
      }
    }
  };

  // Render saved items
  return (
    <Box sx={{ padding: "20px"}}>
        <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2, marginTop: '25px' }}>
                <Box sx={{ width: '500px', mt: '-30px' }}>
                    <SearchComponent value={searchQuery} onChange={handleSearchChange} />
                </Box>
            </Box>
      <Grid container spacing={1.5}>
        {savedItems.length > 0 ? (
          savedItems.map(({ item, createdBy }) => {
            const isBookmarked = savedItems.some(saved => saved.item.id === item.id); 

            return (
              <Grid item xs={12} sm={6} md={2.5} key={item.id}>
                <Card sx={{ height: '90%',width:'80%', display: 'flex', flexDirection: 'column' ,marginLeft:3}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', padding: '13px' }}>
                    <Avatar
                      alt={`${createdBy.firstName} ${createdBy.lastName}`}
                      src={createdBy.imageUrl}
                      sx={{ width: 40, height: 40, marginRight: 2 }}
                    />
                    <Typography variant="body1">
                      <Typography variant="h8">{item.name}</Typography>
                    </Typography>
                  </Box>

                  {item.imageBlob ? (
                    <CardMedia
                      component="img"
                      image={`${apiConfig.defaults.baseURL}/blobs/fetch/${item.imageBlob.uuid}`}
                      alt={item.name}
                      sx={{ height: 200, objectFit: 'cover', cursor: 'pointer' }} 
                      onClick={() => handleImageClick({ item, createdBy })} 
                    />
                  ) : (
                    <CardMedia
                      component="div"
                      sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}
                    >
                      <Typography>No Image Available</Typography>
                    </CardMedia>
                  )}
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton aria-label="Add to favorites" onClick={() => handleSave(item.id)} sx={{ marginTop: '5px' }}>
                        {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      </IconButton>
                      <IconButton onClick={(e) => handleShareClick(e, { item, createdBy })} sx={{ rotate: '-38deg' }}>
                        <Send />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <div>No saved items available.</div>
        )}
      </Grid>

      {/* Description Card Dialog */}
      <DescriptionCard
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        blob={selectedItem?.item.imageBlob}
        userProfilePic={selectedItem?.createdBy.imageUrl}
        userId={selectedItem?.createdBy.id}
        userName={`${selectedItem?.createdBy.firstName} ${selectedItem?.createdBy.lastName}`}
        title={selectedItem?.item.name || ""}
        description={selectedItem?.item.description || ""}
        itemId={selectedItem?.item.id || 0}
      />

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
    </Box>
  );
};

export default SaveCategory;
