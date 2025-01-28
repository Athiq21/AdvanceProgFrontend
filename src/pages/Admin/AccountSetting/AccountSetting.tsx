import { Box, Typography ,Grid} from '@mui/material';
import { useState, useEffect } from 'react';
import apiConfig from '../../../Authentication/api';
import SearchComponent from '../../../common/Component/SearchBar/SearchComponent';
import UserCard from '../../../common/Component/Cards/UserCard/UserCard';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  department: string;
  designation: string;
  isActivated: boolean; 
}

const AccountSetting = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [deactivatedUsers, setDeactivatedUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setStatus('loading');
        const activeResponse = await apiConfig.get('/roles/users/active');
        const deactivatedResponse = await apiConfig.get('/roles/users/deactivated');
        
        setActiveUsers(activeResponse.data);
        setDeactivatedUsers(deactivatedResponse.data);
        setStatus('succeeded');
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
        setStatus('failed');
      }
    };
    
    fetchUsers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDeactivate = async (email: string) => {
    try {
      setStatus('loading');
      await apiConfig.put(`/roles/users/deactivate/${email}`);
      setActiveUsers(activeUsers.filter(user => user.email !== email));
      setDeactivatedUsers([...deactivatedUsers, { ...activeUsers.find(user => user.email === email), isActivated: false }]);
      setStatus('succeeded');
    } catch (error) {
      console.error('Error deactivating user:', error);
      setError('Failed to deactivate user');
      setStatus('failed');
    }
  };

  const handleReactivate = async (email: string) => {
    try {
      setStatus('loading');
      await apiConfig.put(`/roles/users/reactivate/${email}`);
      setDeactivatedUsers(deactivatedUsers.filter(user => user.email !== email));
      setActiveUsers([...activeUsers, { ...deactivatedUsers.find(user => user.email === email), isActivated: true }]);
      setStatus('succeeded');
    } catch (error) {
      console.error('Error reactivating user:', error);
      setError('Failed to reactivate user');
      setStatus('failed');
    }
  };

  const filterUsers = (users: User[]) =>
    users.filter(user =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredActiveUsers = filterUsers(activeUsers);
  const filteredDeactivatedUsers = filterUsers(deactivatedUsers);

  return (
    <Box marginTop={"130px"}>
 <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    marginBottom: 2,
    marginLeft: '10px',
  }}
>
        <SearchComponent value={searchQuery} onChange={handleSearch} />
      </Box>

      {/* <Box marginLeft={'-8px'}>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}

        <Typography variant="h6">Active Users</Typography>
        {filteredActiveUsers.length === 0 ? (
          <Typography>No active users available</Typography>
        ) : (
          filteredActiveUsers.map(user => (
            <Box key={user.id} marginBottom={3}>
              <UserCard
                profilePic={user.imageUrl}
                name={`${user.firstName} ${user.lastName}`}
                email={user.email}
                showDeleteIcon={true} // Show delete icon for active users
                onDelete={() => handleDeactivate(user.email)} // Pass the deactivation handler
              />
            </Box>
          ))
        )}

        <Typography variant="h6" marginTop={5}>Deactivated Users</Typography>
        {filteredDeactivatedUsers.length === 0 ? (
          <Typography>No deactivated users available</Typography>
        ) : (
          filteredDeactivatedUsers.map(user => (
            <Box key={user.id} marginBottom={3}>
              <UserCard
                profilePic={user.imageUrl}
                name={`${user.firstName} ${user.lastName}`}
                email={user.email}
                showReactivateButton={true} // Show reactivate button for deactivated users
                onReactivate={() => handleReactivate(user.email)} // Pass the reactivation handler
              />
            </Box>
          ))
        )}
      </Box> */}

<Box sx={{ width: '100%', padding: { xs: 2, sm: 3, md: 4 } }}>
  {status === 'loading' && <Typography variant="body1">Loading...</Typography>}
  {status === 'failed' && <Typography variant="body1" color="error">Error: {error}</Typography>}

  <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Active Users</Typography>
  {filteredActiveUsers.length === 0 ? (
    <Typography>No active users available</Typography>
  ) : (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {filteredActiveUsers.map(user => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <UserCard
            profilePic={user.imageUrl}
            name={`${user.firstName} ${user.lastName}`}
            email={user.email}
            showDeleteIcon={true} // Show delete icon for active users
            onDelete={() => handleDeactivate(user.email)} // Pass the deactivation handler
          />
        </Grid>
      ))}
    </Grid>
  )}

  <Typography variant="h6" marginTop={5} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Deactivated Users</Typography>
  {filteredDeactivatedUsers.length === 0 ? (
    <Typography>No deactivated users available</Typography>
  ) : (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {filteredDeactivatedUsers.map(user => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <UserCard
            profilePic={user.imageUrl}
            name={`${user.firstName} ${user.lastName}`}
            email={user.email}
            showReactivateButton={true} // Show reactivate button for deactivated users
            onReactivate={() => handleReactivate(user.email)} // Pass the reactivation handler
          />
        </Grid>
      ))}
    </Grid>
  )}
</Box>
    </Box>
  );
};

export default AccountSetting;
