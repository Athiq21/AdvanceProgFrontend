import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ReusableButtonProps extends ButtonProps {
  width?: string;
  height?: string;
  onClick?: () => void;
  // hoverBackgroundColor?: string;
}

const CancelButtons: React.FC<ReusableButtonProps> = ({
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
        color: '#263B4A',
        backgroundColor:'transparent',
        '&:hover': { 
          backgroundColor: 'white', 
          color: '#263B4A', 
          border: '1px solid #263B4A' }
      }}
      
      {...props}
    >
      {children}
    </Button>
  );
};

export default CancelButtons;
