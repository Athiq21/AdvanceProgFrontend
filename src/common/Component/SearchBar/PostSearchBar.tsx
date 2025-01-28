import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


interface SearchComponentProps {
  onSearch: (query: string) => void;
}

const PostSearchBar: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', padding: '16px' }}>
      <TextField
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        size="small"
              sx={{
        width:300,
        '& .MuiOutlinedInput-root': {
          borderRadius: '30px',
        
        },
      }}
        // sx={{ width: '800px' }}
      />
    </Box>
  );
};

export default PostSearchBar;
