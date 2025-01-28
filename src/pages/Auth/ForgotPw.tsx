import React, { useState } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextFields from '../../common/Component/TextField/TextFields';
import apiConfig from '../../Authentication/api';
import Previous from '../../common/Component/Button/Previous/Previous';
import AddButtons from '../../common/Component/Button/Add/AddButtons';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleBlur = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleBlur();

    if (emailError || !validateEmail(email)) {
      return;
    }

    setLoading(true);

    try {
      const response = await apiConfig.post('/auth/forgot-password', { email });
      setMessage(response.data.message || 'Password reset instructions have been sent to your email.');

      // setTimeout(() => navigate('/reset-password'), 2000);
    } catch (error: any) {
      console.error('Error during forgot password request:', error);
      if (error.response) {
        if (error.response.status === 404) {
          setMessage('No account found with that email address.');
        } else {
          setMessage('An error occurred. Please try refreshing the page.');
        }
      } else {
        setMessage('Network error or server not reachable.');
      }
    } finally {
      setLoading(false);
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

      <Container
        component="form"
        onSubmit={handleForgotPassword}
        sx={{
          mt: 1,
          width: { xs: '90%', sm: 400 },
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 3
        }}
      >
        <Box sx={{marginBottom:-4, marginTop:-2,marginLeft:-2}}> 
        <Previous/>
        </Box>
        <Typography sx={{ mt: 4, fontSize: '36px', textAlign: 'center', color: '#263B4A' }} gutterBottom>
          Forgot Password
        </Typography>

        <TextFields
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          errorText={emailError}
        />

        {message && (
          <Typography sx={{ color: 'red', textAlign: 'center', mt: 2 }}>
            {message}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
          <AddButtons
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 2, width: '100%' ,height:50}}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </AddButtons>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
