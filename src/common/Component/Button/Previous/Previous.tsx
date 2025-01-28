import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { colors } from '@mui/material';
import AddButtons from '../Add/AddButtons';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Previous: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AddButtons
    sx={{height:40, width:2}}
      onClick={() => navigate(-1)}
    >
     
  <ArrowBackIosNewIcon />
    </AddButtons>
  );
};

export default Previous;