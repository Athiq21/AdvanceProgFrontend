import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ReusableButtonProps extends ButtonProps {
  width?: string;
  height?: string;
  onClick?: () => void;
  // hoverBackgroundColor?: string;
}

const DeleteButton: React.FC<ReusableButtonProps> = ({
  width = 'auto',
  height = 'auto',
  onClick,
  children,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      style={{ width, height }}
      variant="contained"
      sx={{
        borderRadius:'8px',
        color: '#A81400',
        backgroundColor:'transparent',
        '&:hover': { 
          backgroundColor: '#A81400', 
          color: 'white', 
          border: '1px solid #A81400' }
      }}
      
      {...props}
    >
      {children}
    </Button>
  );
};

export default DeleteButton;
