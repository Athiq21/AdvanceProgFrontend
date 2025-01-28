import React from 'react';
import TextField from '@mui/material/TextField';

interface TextFieldsProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errorText?: string;
  readOnly?: boolean;
 

}

const TextFields: React.FC<TextFieldsProps> = ({ label, type, value, onChange, onBlur, errorText, readOnly = false,}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value} 
      onChange={onChange}
      onBlur={onBlur}
      error={!!errorText}
      helperText={errorText}
      fullWidth
      variant="outlined"
      InputProps={{
        readOnly: readOnly, 
      }}
    />
  );
};

export default TextFields;
