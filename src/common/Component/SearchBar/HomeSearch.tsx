
// import React, { useState } from 'react';
// import { TextField, InputAdornment, IconButton, Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useNavigate } from 'react-router-dom';

// const HomeSearch: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [searchType, setSearchType] = useState<'posts' | 'users'>('posts');
//   const navigate = useNavigate();

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   // Updated to SelectChangeEvent
//   const handleSearchTypeChange = (event: SelectChangeEvent<'posts' | 'users'>) => {
//     setSearchType(event.target.value as 'posts' | 'users');
//   };

//   const handleSearchSubmit = () => {
//     if (searchQuery.trim()) {
//       navigate(`/home/search?s=${encodeURIComponent(searchQuery)}&type=${searchType}`);
//       setSearchQuery('');
//     }
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === 'Enter') {
//       handleSearchSubmit();
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         padding: '1px',
//       }}
//     >
//       <Select
//         value={searchType}
//         onChange={handleSearchTypeChange}
//         variant="outlined"
//         sx={{ marginRight: '9px', height: '40px' }}
//       >
//         <MenuItem value="users">Friends</MenuItem>
//         <MenuItem value="posts">Posts</MenuItem>
//       </Select>
//       <TextField
//         value={searchQuery}
//         onChange={handleSearchChange}
//         placeholder="What are you looking for?"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <IconButton onClick={handleSearchSubmit}>
//                 <SearchIcon />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//         variant="outlined"
//         size="small"
//         sx={{ width: '800px' }}
//         onKeyDown={handleKeyDown}
//       />
//     </Box>
//   );
// };

// export default HomeSearch;


import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const HomeSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<'posts' | 'users'>('posts');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchTypeChange = (event: SelectChangeEvent<'posts' | 'users'>) => {
    setSearchType(event.target.value as 'posts' | 'users');
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/home/search?s=${encodeURIComponent(searchQuery)}&type=${searchType}`);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        padding: '10px', // Add some padding for spacing
      }}
    >
      {/* Select dropdown to choose search type */}
      <Select
        value={searchType}
        onChange={handleSearchTypeChange}
        variant="outlined"
        sx={{
          marginRight: '10px', // Add a little space between dropdown and search field
          height: '40px',
          flexShrink: 0, // Prevent shrinking
        }}
      >
        <MenuItem value="users">Friends</MenuItem>
        <MenuItem value="posts">Posts</MenuItem>
      </Select>

      {/* TextField for search query */}
      <TextField
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="What are you looking for?"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearchSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        size="small"
        sx={{
          width: '90%', // Make the search bar take up 100% of available space
          maxWidth: '800px', // Set a max width to prevent the search bar from becoming too wide
        }}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export default HomeSearch;
