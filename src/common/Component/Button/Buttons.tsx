
import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TwoColorButtonProps extends ButtonProps {
  buttonText: string;
}

const StyledButton = styled(Button)(() => ({
  // background: 'linear-gradient(45deg, #FF8A00 30%, #C4B108 90%)',
  border: 0,
  backgroundColor: '#263B4A', 
  // borderRadius: 5,
  borderRadius: '8px',
  '&:hover': { 
    backgroundColor: 'white', 
    color: '#263B4A', 
    border: '1px solid #263B4A' },
  boxShadow: '0 3px 5px 2px rgba(98, 137, 23, .3)',
  color: 'white',
  height: 38,
  padding: '0 30px',
  textDecoration:'none'
}));

const Buttons: React.FC<TwoColorButtonProps> = ({ buttonText, ...otherProps }) => {
  return (
    <StyledButton {...otherProps}>
      {buttonText}
    </StyledButton>
  );
};

export default Buttons;
