import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextFields from '../../common/Component/TextField/TextFields';
import apiConfig from '../../Authentication/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ActivateAccount: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleResendOTP = async () => {
    try {
      await apiConfig.post('/auth/otp/resend',{ email });
      navigate('/otp', { state: { email } });
    } catch (error) {
      console.error('Failed to resend OTP', error);
    }
  };

  const setEmail = (value: string) => {
    console.log('Email set to:', value);
  };

  const handleBlur = () => {
    console.log('Input field blurred');
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <Box sx={{
        width: 300,
        padding: 3,
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <Typography sx={{ fontSize: '20px', marginBottom: 3, color: '#263B4A' }}>
          Account Not Activated
        </Typography>
        <TextFields
                  label="Email Address"
                  type="email"
                  value={email || ''}  
                  readOnly={true}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur()}        
                  />
                <IconButton 
          sx={{ mt: 2, backgroundColor: '#263B4A', color: 'white',ml:-2}}
          onClick={() => navigate(-1)}
        >
       <ArrowBackIcon/>
        </IconButton>


        <IconButton 
          sx={{ mt: 2, backgroundColor: '#263B4A', color: 'white',ml:2}}
          onClick={handleResendOTP}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ActivateAccount;
