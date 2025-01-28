
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, MenuItem, Button, Grid, Typography, Box, Divider, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ProfileAvatar from '../Avatar/ProfileAvatar';
import apiConfig from '../../../Authentication/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesignations } from '../../../store/features/designation';
import { RootState } from '../../../store';
import { deactivateUser } from '../../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';


const primarySettingsSchema = yup.object().shape({
  firstName: yup.string()
    .required('First Name is required')
    .matches(/^[A-Za-z]{3,}$/, 'At least 3 letters, no numbers or symbols'),
  lastName: yup.string()
    .required('Last Name is required')
    .matches(/^[A-Za-z]{3,}$/, 'At least 3 letters, no numbers or symbols'),
  designation: yup.string().required('Designation is required'),
});

const passwordSettingsSchema = yup.object().shape({
  password: yup.string()
    .required('New Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm New Password is required'),
});

const AccountSetting = () => {
  const [profilePic, setProfilePic] = useState<string>('default-profile-pic-url');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch designations from Redux store
  const designations = useSelector((state: RootState) => state.designations.designations);
  const status = useSelector((state: RootState) => state.designations.status);
  const error = useSelector((state: RootState) => state.designations.error);

  const { control: primaryControl, handleSubmit: handlePrimarySubmit, formState: { errors: primaryErrors }, setValue, getValues } = useForm({
    resolver: yupResolver(primarySettingsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      designation: '',
    },
  });

  const { control: passwordControl, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm({
    resolver: yupResolver(passwordSettingsSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    dispatch(fetchDesignations());
    
    const firstName = sessionStorage.getItem('userFirstName') || '';
    const lastName = sessionStorage.getItem('userLastName') || '';
    const designationId = sessionStorage.getItem('userDesignationId') || '';

    setValue('firstName', firstName);
    setValue('lastName', lastName);
    setValue('designation', designationId);
  }, [dispatch, setValue]);

  const onSubmitPrimarySettings = async (data: any) => {
    const { firstName, lastName, designation } = data;

    try {
      const response = await apiConfig.put('/users/updateDetails', null, {
        params: {
          firstName,
          lastName,
          designation
        },
      });

      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      sessionStorage.setItem('userFirstName', firstName);
      sessionStorage.setItem('userLastName', lastName);
      sessionStorage.setItem('userDesignationId', designation);
    } catch (error) {
      setSnackbarMessage('Error updating profile. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const onSubmitPasswordSettings = async (data: any) => {
    const { password } = data;

    try {
      const response = await apiConfig.put('/users/changePassword', {
        newPassword: password
      });

      setSnackbarMessage('Password changed successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error changing password. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await apiConfig.post('/users/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setProfilePic(response.data);
          setSnackbarMessage('Profile picture updated successfully!');
          setSnackbarSeverity('success');
        } else {
          setSnackbarMessage('Error uploading image. Please try again.');
          setSnackbarSeverity('error');
        }
      } catch (error) {
        setSnackbarMessage('Error uploading image. Please try again.');
        setSnackbarSeverity('error');
      }

      setSnackbarOpen(true);
    }
  };

  const handleDeactivateAccount = async () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmDeactivate = async () => {
    setOpenConfirmDialog(false);

    const userId = 1; // Replace with actual user ID

    try {
      await dispatch(deactivateUser(userId)).unwrap();
      setSnackbarMessage('Account deleted successfully!');
      setSnackbarSeverity('success');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      navigate('/', { state: { message: 'You are about to be logged out' } });
    } catch (error) {
      setSnackbarMessage('Error deactivating account. Please try again.');
      setSnackbarSeverity('error');
    }

    setSnackbarOpen(true);
  };

  const handleCancelDeactivate = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginLeft:'10px',
  marginBottom:'90px',
      }}
    >
      <Box sx={{
        border: '2px solid', 
        borderColor: '#9C9C9C',
        borderRadius: 2, 
        p: 3,
        width: '300px'
      }}>
        <Box display={'flex'} alignItems="center" sx={{ position: 'relative' }}>
        <ProfileAvatar profilePic={profilePic} onImageChange={setProfilePic} />
        </Box>

        <form onSubmit={handlePrimarySubmit(onSubmitPrimarySettings)}>
          <Typography sx={{fontSize:'16px', color:'#0F212E'}} mt={1}>Primary Settings</Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Controller
                name="firstName"
                control={primaryControl}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="First Name"
                    {...field}
                    error={!!primaryErrors.firstName}
                    helperText={primaryErrors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="lastName"
                control={primaryControl}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...field}
                    error={!!primaryErrors.lastName}
                    helperText={primaryErrors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="designation"
                control={primaryControl}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    select
                    label="Department"
                    {...field}
                    error={!!primaryErrors.designation}
                    helperText={primaryErrors.designation?.message}
                  >
                    {status === 'loading' ? (
                      <MenuItem value="">Loading...</MenuItem>
                    ) : status === 'failed' ? (
                      <MenuItem value="">Error loading designations</MenuItem>
                    ) : (
                      designations.map(designation => (
                        <MenuItem key={designation.id} value={designation.id}>
                          {designation.name}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#0A5704', textTransform: 'none',
                  '&:hover': { 
                    backgroundColor: '#085503' 
                  }
              }}
              type="submit"
            >
              Confirm
            </Button>
          </Box>
        </form>

        <form onSubmit={handlePasswordSubmit(onSubmitPasswordSettings)}>
          <Typography sx={{fontSize:'16px', color:'#0F212E'}} mt={1}>Password Settings</Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Controller
                name="password"
                control={passwordControl}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    {...field}
                    error={!!passwordErrors.password}
                    helperText={passwordErrors.password?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="confirmPassword"
                control={passwordControl}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    {...field}
                    error={!!passwordErrors.confirmPassword}
                    helperText={passwordErrors.confirmPassword?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#0A5704', textTransform: 'none',
                  '&:hover': { 
                    backgroundColor: '#085503' 
                  }
              }}
              type="submit"
            >
              Confirm
            </Button>
          </Box>
        </form>

        <Divider sx={{ my: 2 }} />
        
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ fontSize: '16px', color: '#0F212E' }}>Advanced Settings</Typography>
          <Button 
            onClick={handleDeactivateAccount}
            variant="contained"
            sx={{ 
              backgroundColor: '#850000', 
              textTransform: 'none',
              '&:hover': { 
                backgroundColor: '#660000' 
              } 
            }}>
            Delete Account
          </Button>
        </Box>
      </Box>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDeactivate}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDeactivate}>No</Button>
          <Button onClick={handleConfirmDeactivate} color="error">Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountSetting;
