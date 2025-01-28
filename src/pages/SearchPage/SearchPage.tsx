import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import PostSearch from './SearchItem/PostSearch';
import UserSearch from './SearchItem/UserSearch';
import ViewCard from '../../common/Component/Cards/View/ViewCard';
import { UserDetailPost } from '../../type/UserDetailPost';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('s') || '';
  const searchType = searchParams.get('type') || 'posts';

  const [viewCardOpen, setViewCardOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState(null);

  const handleView = (userId, userInfo) => {
    console.log('Selected User Info:', userInfo); 
    setSelectedUser(userId);
    setUserDetails(userInfo); // Store user info
    setViewCardOpen(true);
  };
  

  const handleCloseViewCard = () => {
    setViewCardOpen(false);
    setSelectedUser(null);
    setUserDetails(null); // Reset user details
  };

  return (
    <Box 
    sx={{ 
      marginLeft: 'auto', 
      marginRight: 'auto', 
      width: '100%', 
      maxWidth: 600 
    }}>
      {searchType === 'users' ? (
        <UserSearch searchQuery={searchQuery} onView={handleView} />
      ) : (
        <PostSearch searchQuery={searchQuery} />
      )}
    <ViewCard 
  open={viewCardOpen} 
  onClose={handleCloseViewCard} 
  userId={selectedUser} 
  profilePic={userDetails?.imageUrl || ''} 
  username={`${userDetails?.firstName || ''} ${userDetails?.lastName || ''}`} 
  designation={userDetails?.designation || ''} 
  designationUrl={userDetails?.designationUrl || ''} 
/>
    </Box>
  );
};

export default SearchPage;
