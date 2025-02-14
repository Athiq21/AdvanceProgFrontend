import React, { useState } from 'react';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import AddButtons from '../../Button/Add/AddButtons';
import { useDispatch } from 'react-redux';
import { updateUserRole } from '../../../../store/features/adminSlice';
import SnackbarAlert from '../../Snackbar/SnackbarAlert';

interface UserCardProps {
  profilePic: string;
  name: string;
  email: string;
  role: string;
  showButton?: boolean;
  showDeleteIcon?: boolean; 
  showReactivateButton?: boolean; 
  onDelete?: () => void;
  onReactivate?: () => void; 
}

const CardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '10px',
  boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  width: '800px',
}));

const UserInfo = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const StyledAddButtons = styled(AddButtons)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  width: '80px',
  height: '30px',
  textDecoration: 'none',
}));

const DeleteIconStyled = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const ReactivateIconStyled = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(8),
}));

const ModeratorCard: React.FC<UserCardProps> = ({
  profilePic,
  name,
  email,
  role,
  showButton = false,
  showDeleteIcon = false,
  showReactivateButton = false, 
  onDelete,
  onReactivate
}) => {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleButtonClick = async () => {
    try {
      await dispatch(updateUserRole({ email, role: 'ROLE_MODERATOR' }));
      setSnackbar({
        open: true,
        message: 'User successfully promoted to moderator',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to promote user to moderator',
        severity: 'error'
      });
    }
  };

  return (
    <>
      <CardContainer>
        <Avatar src={profilePic} alt={name} />
        <UserInfo>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{email}</Typography>
          <Typography variant="body2" color="textSecondary">
            {role}
          </Typography>
        </UserInfo>
        {showButton && (
          <StyledAddButtons onClick={handleButtonClick} text={''}>
          Mod
          </StyledAddButtons>
        )}
        {showDeleteIcon && (
          <DeleteIconStyled color="error" onClick={onDelete}>
            <Typography variant="h6">Deactivate</Typography>
          </DeleteIconStyled>
        )}
        {showReactivateButton && (
          <ReactivateIconStyled color="primary" onClick={onReactivate}>
            <Typography>Reactivate</Typography>
          </ReactivateIconStyled>
        )}
      </CardContainer>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default ModeratorCard;
