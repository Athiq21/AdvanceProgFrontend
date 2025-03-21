import { Box } from '@mui/material';
import SearchComponent from '../../../common/Component/SearchBar/SearchComponent';
import {useEffect, useState } from 'react';
import UserCard from '../../../common/Component/Cards/UserCard/UserCard';
import apiConfig from '../../../Authentication/api';

interface Role {
  id: number;
  authority: string;
  created_datetime: string | null;
}

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  department: string;
  designation: string;
  role: Role;
}

const AddRoleSearch =() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
    
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response1 = await apiConfig.post('/permissions/role/5'); 
          const response2 = await apiConfig.post('/permissions/role/6'); 
          // Combine the data from both responses
          const combinedUsers = [...response1.data, ...response2.data];
          setUsers(combinedUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      
      fetchUsers();
    }, []);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    // Filter users based on search query
    const filteredUsers = users
    .filter(user => user.id !== 1)
    .filter(user => 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  

    return (
        <> 
            <Box display="flex" alignItems="center" gap={2} marginLeft={"100px"}>
            <Box  marginTop={2} display="flex" justifyContent="flex-end" alignItems="center" gap={2} marginBottom={5}> 
                 <SearchComponent value={searchQuery} onChange={handleSearch}/>
             </Box>
        </Box>

<Box marginTop={"30px"} marginLeft={"200px"}>

{filteredUsers.map(user => (

<Box key={user.id} marginBottom={3}>
  <UserCard
    profilePic={user.imageUrl}
    name={`${user.firstName} ${user.lastName}`}
    email={user.email}
    showButton={true}
    role={user.role.authority}
  />
</Box>
))}
   

</Box>
       



        </>
    );
}
export default AddRoleSearch;