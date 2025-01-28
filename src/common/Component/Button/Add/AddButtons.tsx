import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

interface ReusableButtonProps extends ButtonProps {
  width?: string;
  height?: string;
  text: string;
  onClick?: () => void;
}

const StyledButton = styled(Button)(() => ({
  // background: 'linear-gradient(45deg, #FF8A00 30%, #C4B108 90%)',
  backgroundColor: '#263B4A', 
  border: 0,
  // borderRadius: 5,
  borderRadius: '8px',
  boxShadow: '0 3px 5px 2px rgba(98, 137, 23, .3)',
  color: 'white',
  padding: '0 30px',
  textDecoration:'none',
  '&:hover': { 
              backgroundColor: 'white', 
              color: '#263B4A', 
              border: '1px solid #263B4A' }
  
}));

const AddButtons: React.FC<ReusableButtonProps> = ({
  width,
  height,
  text,
  onClick,
  children,
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={{ width, height }}
      variant="contained"
      
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default AddButtons;
