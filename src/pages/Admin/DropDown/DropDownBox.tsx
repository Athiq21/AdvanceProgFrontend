// Dropdown.tsx
import React from 'react';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { SelectProps } from '@mui/material/Select';

interface DropdownProps extends Omit<SelectProps<unknown>, 'onChange'> {
  label: string;
  options: { value: string | number; label: string }[];
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onChange, value, ...props }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
