import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../../../common/Component/Cards/View/UserCard';
import { fetchUsers } from '../../../store/features/userSlice';
import { RootState } from '../../../store';

interface UserSearchProps {
  searchQuery: string;
  onView: (userId: number, username: string, designation: string, designationUrl:string ) => void; // Updated to match parameters
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  designation: string;
  designationUrl :string;
}

const UserSearch: React.FC<UserSearchProps> = ({ searchQuery, onView }) => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state: RootState) => state.users);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = Object.values(users).filter(user => {
        const firstName = user?.firstName?.toLowerCase() || '';
        const lastName = user?.lastName?.toLowerCase() || '';
        return firstName.includes(lowercasedQuery) || lastName.includes(lowercasedQuery);
      });
      setFilteredUsers(results);
    } else {
      setFilteredUsers(Object.values(users));
    }
  }, [searchQuery, users]);

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography color="error">{error}</Typography>;

  return (
    <Box marginTop={"100px"}>
      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <Box key={user.id} mb={2}>
         <UserCard
                        profilePic={user.imageUrl}
                        username={`${user.firstName} ${user.lastName}`} 
                        userId={user.id}
                        designation={user.designation || 'Group N/A'} 
                        designationUrl={user.designationUrl|| 'Group N/A'}
                        onView={() => onView(user.id, user)} 
                    />
          </Box>
        ))
      ) : (
        <Typography>No users found.</Typography>
      )}
    </Box>
  );
};

export default UserSearch;
