import React, { useEffect, useState } from 'react';
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Dialog, DialogTitle, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { fetchAdminUsers, demoteUserToUser, deactivateUser } from '../../../store/features/adminSlice';
import AddRoleSearch from './AddRoleSearch';
import AddButtons from '../../../common/Component/Button/Add/AddButtons';

const AddRole = () => {
    const dispatch: AppDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    
    // Get admin users from Redux store
    const adminUsers = useSelector((state: RootState) => state.admin.users);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDemoteUser = (email: string) => {
        dispatch(demoteUserToUser({ email }));
    };

    // Fetch admin users on mount
    useEffect(() => {
        dispatch(fetchAdminUsers());
    }, [dispatch]);

    return (
        <Box marginTop={"0px"}  marginLeft={"-50px"}>
            <Typography marginLeft={"30px"}>Admin Users</Typography>
            <Container>
                <Paper sx={{ padding: '20px', marginTop: '20px' }}>
                    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>E-mail</TableCell>
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
                                        <TableCell align="center">
                                            <AddButtons
                                                variant="contained"
                                                color="primary"
                                                height="40px"
                                                onClick={() => handleDemoteUser(user.email)}
                                            >
                                                Demote to User
                                            </AddButtons>
                                      
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <AddButtons variant="contained" color="primary" height="40px" onClick={handleClickOpen}>
                        Add New
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
                <DialogTitle>Add Role</DialogTitle>
                <AddRoleSearch />
            </Dialog>
        </Box>
    );
}

export default AddRole;
