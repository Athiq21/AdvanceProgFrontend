import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography, Container, Grid, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import apiConfig from '../../Authentication/api';

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

const schema = yup.object().shape({
 firstName: yup
 .string()
 .required('First Name is required')
 .matches(/^[A-Za-z]{3,}$/, 'First Name must be at least 3 characters and contain only letters'),
 lastName: yup
 .string()
 .required('Last Name is required')
 .matches(/^[A-Za-z]{3,}$/, 'Last Name must be at least 3 characters and contain only letters'),
 email: yup
 .string()
 .required('Email is required')
//  .matches(/^[^\s@]+@gmail\.com$/, 'Enter a valid email (username@gmail.com)'),
.matches(/^[^\s@]+@(gmail\.com|icloud\.com)$/, 'Enter a valid email (username@gmail.com or username@icloud.com)'),
 confirmEmail: yup
 .string()
 .oneOf([yup.ref('email')], 'Emails do not match')
 .required('Confirm Email is required'),
 password: yup
 .string()
 .required('Password is required')
 .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'),
 confirmPassword: yup
 .string()
 .oneOf([yup.ref('password')], 'Passwords do not match')
 .required('Confirm Password is required'),
});

const SignUp: React.FC = () => {
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState('');
 const navigate = useNavigate();

 const { control, handleSubmit, formState: { errors } } = useForm({
 resolver: yupResolver(schema),
 defaultValues: {
 firstName: '',
 lastName: '',
 email: '',
 confirmEmail: '',
 password: '',
 confirmPassword: '',
 },
 });

 const onSubmit = async (data: any) => {
 setIsLoading(true);
 setError('');
 const { firstName, lastName, email, password } = data;
 try {
 const response = await apiConfig.post('/auth/signup', {
 firstName,
 lastName,
 email,
 password,
 });
 if (response.status === 200) {
 navigate('/otp', { state: { email } });
 }
 } catch (error: any) {
 if (error.response && error.response.status === 400) {
 setError('You are already registered with this email.');
 } else {
 setError('Sign up error. Please try again.');
 }
 console.error('Sign up error:', error);
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
//  backgroundColor: '#f0f0f0'
 }}>
 <Container component="form" onSubmit={handleSubmit(onSubmit)} 
 sx={{ 
 mt: 1, 
 width: 600, 
 backgroundColor: 'white', 
 borderRadius: '12px', 
 boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)', 
 display: 'flex', 
 flexDirection: 'column',
 padding: 3
 }}>
  <Typography variant="body3" sx={{ marginTop: '10px', fontSize: '40px', textAlign: 'center', color: '#263B4A' ,  background: 'linear-gradient(45deg, #1b2857, #2648b6)', 
    WebkitBackgroundClip: 'text', 
    WebkitTextFillColor: 'transparent' }} gutterBottom>
          SIGN UP
        </Typography>

 <Grid container spacing={2}>
 <Grid item xs={6}>
 <Controller
 name="firstName"
 control={control}
 render={({ field }) => (
 <TextField
 {...field}
 label="First Name"
 error={!!errors.firstName}
 helperText={errors.firstName?.message}
 fullWidth
 />
 )}
 />
 </Grid>
 <Grid item xs={6}>
 <Controller
 name="lastName"
 control={control}
 render={({ field }) => (
 <TextField
 {...field}
 label="Last Name"
 error={!!errors.lastName}
 helperText={errors.lastName?.message}
 fullWidth
 />
 )}
 />
 </Grid>
 </Grid>
 <Controller
 name="email"
 control={control}
 render={({ field }) => (
 <TextField
 {...field}
 label="Email"
 error={!!errors.email}
 helperText={errors.email?.message}
 fullWidth
 sx={{ mt: 2 }}
 />
 )}
 />
 <Controller
 name="confirmEmail"
 control={control}
 render={({ field }) => (
 <TextField
 {...field}
 label="Confirm Email"
 error={!!errors.confirmEmail}
 helperText={errors.confirmEmail?.message}
 fullWidth
 sx={{ mt: 2 }}
 />
 )}
 />
 <Controller
 name="password"
 control={control}
 render={({ field }) => (
 <TextField
 {...field}
 label="Password"
 type="password"
 error={!!errors.password}
 helperText={errors.password?.message}
 fullWidth
 sx={{ mt: 2 }}
 />
 )}
 />
 <Controller
 name="confirmPassword"
 control={control}
 render={({ field }) => (
 <TextField
 {...field}
 label="Confirm Password"
 type="password"
 error={!!errors.confirmPassword}
 helperText={errors.confirmPassword?.message}
 fullWidth
 sx={{ mt: 2 }}
 />
 )}
 />
 {error && (
 <Typography variant="body2" color="error" sx={{ mb: 2 }}>
 {error}
 </Typography>
 )}
 <Button
 type="submit"
 fullWidth
 variant="contained"
 sx={{ mt: 3, mb: 2, p: 1.5, backgroundColor: '#263B4A', color: 'white', borderRadius: '8px', '&:hover': { backgroundColor: 'white', color: '#263B4A', border: '1px solid #263B4A' } }}
 disabled={isLoading}
 >
 {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
 </Button>
 <Grid container justifyContent="center">
 <StyledLink to="/">Already have an account? Sign In</StyledLink>
 </Grid>
 </Container>
 </Box>
 );
};

export default SignUp;