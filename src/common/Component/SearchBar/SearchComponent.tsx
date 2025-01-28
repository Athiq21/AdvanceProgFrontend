import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchComponent: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        sx: {
          borderRadius: '30px',
        },
      }}
    
      sx={{
        width:300,
        '& .MuiOutlinedInput-root': {
          borderRadius: '30px',
        
        },
      }}
    />
  );
};

export default SearchComponent;
