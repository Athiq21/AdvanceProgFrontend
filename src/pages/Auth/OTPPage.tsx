import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress, Alert,IconButton } from '@mui/material';
import apiConfig from '../../Authentication/api';
import Previous from '../../common/Component/Button/Previous/Previous';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface LocationState {
  email: string;
}

const validOtpPattern = /^[\w\s!@#$%^&*()_+{}|:"<>?`~\[\]\-=/,.]*$/;

const OTPPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const email = state?.email;
  const [otp, setOTP] = useState(Array(6).fill(''));
  const [resendEnabled, setResendEnabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    if (validOtpPattern.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleResend = async () => {
    setCountdown(60);
    setResendEnabled(false);
    setError('');
    try {
      await apiConfig.post('/auth/otp/resend', { email });
      setSuccessMessage('OTP has been resent. Please check your email.');
    } catch (error) {
      setError('Error resending OTP. Please try again.');
      console.error('Error resending OTP:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const enteredOTP = otp.join('');
      const response = await apiConfig.post('/auth/otp/validate', { email, otp: enteredOTP });


      console.dir("data:"+ response);
      console.log("data:"+ email);
      console.log("data:"+ otp);

      
      if (response.status === 200) {
        setSuccessMessage('OTP verified successfully. Redirecting to sign-up page...');
        setTimeout(() => navigate('/'), 3000);
      } 
    } catch (error: any) {
      setError('Invalid OTP. Please try again.');
      console.error('Invalid OTP:', error);
      setResendEnabled(false);
      setCountdown(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <Box component="form" onSubmit={handleSubmit} 
        sx={{
          mt: 1, 
          width: 600, 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 3
        }}>
          
          <IconButton 
          sx={{ mt: 2, backgroundColor: '#263B4A', color: 'white',marginLeft:-65, marginTop:4}}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography sx={{ marginTop: '-50px', fontSize: '40px', textAlign: 'center', color: '#263B4A' }} gutterBottom>
          Verify OTP
        </Typography>
        <Typography sx={{ fontSize: '15px', textAlign: 'center', color: '#263B4A', marginBottom: '15px' }}>
          Enter the 6-digit OTP sent to your email
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: '20px' }}>
          {otp.map((value, index) => (
            <TextField
              key={index}
              inputRef={el => inputRefs.current[index] = el!}
              value={value}
              onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>, index)}
              variant="outlined"
              sx={{ width: '45px', textAlign: 'center' }}
              inputProps={{
                style: { textAlign: 'center', fontSize: '20px', padding: '10px' },
                maxLength: 1
              }}
            />
          ))}
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '100%', p: 1.5, backgroundColor: '#263B4A', color: 'white', borderRadius: '8px', '&:hover': { backgroundColor: 'white', color: '#263B4A', border: '1px solid #263B4A' } }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Verify OTP'}
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            onClick={handleResend}
            disabled={!resendEnabled}
            sx={{ color: resendEnabled ? '#263B4A' : 'grey' }}
          >
            {resendEnabled ? 'Resend OTP' : `Resend OTP in ${countdown}s`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OTPPage;
