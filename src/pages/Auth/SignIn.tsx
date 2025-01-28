import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TextFields from '../../common/Component/TextField/TextFields';
import apiConfig from '../../Authentication/api';
import { ResponseStatusEnum } from '../../constant/ResponseStatusEnum';
import { UserMinDTO } from '../../DTO/UserMinDTO';
import UserSearch from '../SearchPage/SearchItem/UserSearch';

// Style for Router Link
const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: '15px',
  color: '#263B4A',
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:active': {
    color: 'darkbrown',
  },
}));

const SignIn: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showActivation, setShowActivation] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // On page load, synchronize sessionStorage with localStorage
    if (!sessionStorage.getItem('accessToken')) {
      // If sessionStorage doesn't have the data, try to load it from localStorage
      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      const role = localStorage.getItem('role');
      const userFirstName = localStorage.getItem('userFirstName');
      const userLastName = localStorage.getItem('userLastName');
      const userEmail = localStorage.getItem('userEmail');
      const designation = localStorage.getItem('designation');

      if (accessToken) {
        // Store all the values in sessionStorage to keep the session alive
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('userId', userId || '');
        sessionStorage.setItem('role', role || '');
        sessionStorage.setItem('userFirstName',   userFirstName || '');
        sessionStorage.setItem('userLastName', userLastName || '');
        sessionStorage.setItem('userEmail', userEmail || '');
        sessionStorage.setItem('designation', designation || '');
      }
    }

    const isAuthenticated = !!sessionStorage.getItem('accessToken');
    if (isAuthenticated) {
      navigate('/home/markets'); // Redirect to home if already authenticated
    }
  }, [navigate]);

  const validateEmail = (email: string) => /^[^\s@]+@(gmail\.com|icloud\.com)$/.test(email);
  const validatePassword = (password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password);

  const handleBlur = (field: string) => {
    switch (field) {
      case 'email':
        if (!email) {
          setEmailError('Email is required');
        } else if (!validateEmail(email)) {
          setEmailError('Enter a valid email (username@gmail.com)');
        } else {
          setEmailError('');
        }
        break;
      case 'password':
        if (!password) {
          setPasswordError('Password is required');
        } else {
          setPasswordError('');
        }
        break;
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    handleBlur('email');
    handleBlur('password');
  
    if (emailError || passwordError || !validateEmail(email) || !validatePassword(password)) {
      setErrorMessage('Password or Email isn\'t correct.');
      return;
    }
  
    try {
      const response = await apiConfig.post<{ accessToken: string, user: UserMinDTO, role:[] }>('/auth/signin', { email, password });
  
      const { accessToken, user, role } = response.data;
      console.log(response.data);
  
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("email", user.email);
      localStorage.setItem('userFirstName', user.firstName);
      localStorage.setItem('userLastName', user.lastName);
      localStorage.setItem('role_id', user.roleId.toString());
    localStorage.setItem('roleName', user.roleName);
  
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem("userId", user.id.toString());
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem('userFirstName', user.firstName);
      sessionStorage.setItem('userLastName', user.lastName);
      sessionStorage.setItem('role_id', user.roleId.toString());
    sessionStorage.setItem('roleName', user.roleName);

      if (response.status === 200) {
        navigate('/home/markets');
      }
    } catch (error: any) {
      if (error.response) {
        // Log the error response to inspect the error data
        console.log(error.response);
  
        if (error.response.data.error === "Account not activated. Please verify your email with the OTP.") {
          setErrorMessage('Your account is not activated. Please check your email for the OTP.');
          setTimeout(() => navigate('/active', { state: { email } }), 3000); // Redirect to activation page
        } else {
          setErrorMessage('Invalid email or password.');
        }
      } else {
   
        setErrorMessage('An unexpected error occurred. Please try again later.');
        console.error(error);
      }
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
        onSubmit={handleSignIn}
        sx={{
          mt: 1,
          width: 550,
          height: 550,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 3
        }}
      >
        <Box variant="h1" align="center" sx={{ mt: '-15px' , mb:'-60px'}}>
          <Typography
            variant="body3"
            gutterBottom
            sx={{
              fontSize: '4rem',
              background: 'linear-gradient(45deg, #4B0082, #E6E6FA)', 
              WebkitBackgroundClip: 'text', 
              
              WebkitTextFillColor: 'transparent', 
            }}
          >
            MEGA CITY CAB
          </Typography>
        </Box>

        <Typography variant="body3" sx={{ marginTop: '45px', fontSize: '40px', textAlign: 'center', color: '#263B4A' ,  background: 'linear-gradient(45deg, #4B0082, #E6E6FA)', 
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} gutterBottom>
          Sign In
        </Typography>

        <TextFields
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          errorText={emailError}
        />

        <TextFields
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          errorText={passwordError}
        />

        {errorMessage && (
          <Typography sx={{ color: 'red', textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}

        <Typography sx={{ color: '#918787', textAlign: 'right', fontSize: '12px' }}>
          <StyledLink to="/forgot">Forgot Password?</StyledLink>
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1.5, backgroundColor: '#263B4A', color: 'white', borderRadius: '8px', '&:hover': { backgroundColor: 'white', color: '#263B4A', border: '1px solid #263B4A' } }}
          >
            Sign In
          </Button>
          <Typography sx={{ color: '#918787', textAlign: 'right', fontSize: '12px' }}>
            Don't have an account?
            <StyledLink to="/signup"> Sign Up</StyledLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
