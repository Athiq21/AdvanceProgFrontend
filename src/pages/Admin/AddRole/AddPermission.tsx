import React, { useEffect, useState } from 'react';
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Dialog, DialogTitle, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { fetchmoderatorUsers, demoteUserToUser, updateUserRole } from '../../../store/features/adminSlice';
import AddPermissionSearch from './AddPermissionSearch';
import AddButtons from '../../../common/Component/Button/Add/AddButtons';
import SnackbarAlert from '../../../common/Component/Snackbar/SnackbarAlert';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  department: string;
  designation: string;
  role: {
    id: number;
    authority: string;
    created_datetime: string | null;
  };
}

const AddPermission = () => {
    const dispatch: AppDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });
    
    // Get admin users from Redux store
    const adminUsers = useSelector((state: RootState) => state.admin.users);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleDemoteUser = async (email: string) => {
        try {
            await dispatch(updateUserRole({ email, role: 'ROLE_USER' }));
            setSnackbar({
                open: true,
                message: 'User successfully demoted to regular user',
                severity: 'success'
            });
            dispatch(fetchmoderatorUsers()); // Refresh the list
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to demote user',
                severity: 'error'
            });
        }
    };

    // Fetch admin users on mount
    useEffect(() => {
        dispatch(fetchmoderatorUsers());
    }, [dispatch]);

    return (
        <Box marginTop={"0px"}  marginLeft={"-50px"}>
            <Typography marginLeft={"30px"}>Moderator Users</Typography>
            <Container>
                <Paper sx={{ padding: '20px', marginTop: '20px' }}>
                    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>E-mail</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Role</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {adminUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell component="th" scope="row" align="center">
                                            {user.id}
                                        </TableCell>
                                        <TableCell align="center">{`${user.firstName} ${user.lastName}`}</TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell align="center">{user.role.authority}</TableCell>
                                        <TableCell align="center">
                                            <AddButtons
                                                variant="contained"
                                                color="primary"
                                                height="40px"
                                                onClick={() => handleDemoteUser(user.email)}
                                                text="Revoke Permission"
                                            >
                                                Revoke Permission
                                            </AddButtons>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <AddButtons 
                        variant="contained" 
                        color="primary" 
                        height="40px" 
                        onClick={handleClickOpen}
                        text="Grant Permission"
                    >
                        Grant Permission
                    </AddButtons>
                </Box>
            </Container>

            <Dialog open={open} onClose={handleClose}
                PaperProps={{
                    style: {
                        minWidth: '80%',
                        height: '100vh',
                        margin: 0,
                        padding: 0,
                        borderRadius: '10px'
                    },
                }}>
                <DialogTitle>Permissions</DialogTitle>
                <AddPermissionSearch />
            </Dialog>

            <SnackbarAlert
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Box>
    );
}

export default AddPermission;
