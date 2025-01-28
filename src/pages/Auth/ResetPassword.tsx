import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import TextFields from '../../common/Component/TextField/TextFields';
import apiConfig from '../../Authentication/api';

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [tokenError, setTokenError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>(''); 
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const otp = queryParams.get('token'); 
    if (otp) {
      setToken(otp);
    }
  }, [location.search]);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUppercase && hasLowercase && hasSpecialChar;
  };

  const handleBlur = () => {
    if (!token) {
      setTokenError('OTP is required');
    } else {
      setTokenError('');
    }

    if (!newPassword) {
      setPasswordError('New password is required');
    } else if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, and a special character');
    } else {
      setPasswordError('');
    }

    if (confirmPassword !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleBlur();

    if (tokenError || passwordError || confirmPasswordError) {
      return;
    }

    setLoading(true);

    try {
      const response = await apiConfig.post('/auth/reset-password', { token, newPassword });
      setMessage(response.data.message || 'Password has been reset successfully.');
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          setMessage('Invalid OTP or password.');
        } else {
          setMessage('An error occurred. Please try again.');
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
        onSubmit={handleResetPassword}
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
        <Typography sx={{ mt: 4, fontSize: '36px', textAlign: 'center', color: '#263B4A' }} gutterBottom>
          Reset Password
        </Typography>

        <Box sx={{display:'none'}}>
          <TextFields
            label="OTP"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onBlur={handleBlur}
            errorText={tokenError}
          />
        </Box>

        <TextFields
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={handleBlur}
          errorText={passwordError}
        />

        <TextFields
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleBlur}
          errorText={confirmPasswordError}
        />

        {message && (
          <Typography sx={{ color: 'red', textAlign: 'center', mt: 2 }}>
            {message}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 2, width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPassword;