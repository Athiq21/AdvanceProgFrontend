

// import React from 'react';
// import { Avatar, Box, Typography, IconButton } from '@mui/material';
// import { styled } from '@mui/system';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddButtons from '../../Button/Add/AddButtons';
// import { useDispatch } from 'react-redux';
// import { promoteUserToAdmin } from '../../../../store/features/adminSlice';

// interface UserCardProps {
//   profilePic: string;
//   name: string;
//   email: string;
//   showButton?: boolean;
//   showDeleteIcon?: boolean; 
//   onDelete?: () => void; // Add onDelete as an optional prop
// }

// const CardContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2),
//   border: `1px solid ${theme.palette.divider}`,
//   borderRadius: '10px',
//   boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
//   position: 'relative',
//   width: '800px',
// }));

// const UserInfo = styled(Box)(({ theme }) => ({
//   marginLeft: theme.spacing(2),
// }));

// const StyledAddButtons = styled(AddButtons)(({ theme }) => ({
//   position: 'absolute',
//   bottom: theme.spacing(1),
//   right: theme.spacing(1),
//   width: '80px',
//   height: '30px',
//   textDecoration: 'none',
// }));

// const DeleteIconStyled = styled(IconButton)(({ theme }) => ({
//   position: 'absolute',
//   top: theme.spacing(1),
//   right: theme.spacing(1),
// }));

// const UserCard: React.FC<UserCardProps> = ({
//   profilePic,
//   name,
//   email,
//   showButton = false,
//   showDeleteIcon = false,
//   onDelete // Add onDelete prop
// }) => {
//   const dispatch = useDispatch();

//   const handleButtonClick = async () => {
//     console.log(`Button clicked for user: ${email}`);
//     try {
//       await dispatch(promoteUserToAdmin({ email }));
//       // Optionally handle success feedback here
//     } catch (error) {
//       console.error('Failed to promote user to admin:', error);
//     }
//   };

//   const handleDeleteClick = () => {
//     if (onDelete) {
//       onDelete(); // Call the onDelete function if provided
//     }
//   };

//   return (
//     <CardContainer>
//       <Avatar src={profilePic} alt={name} />
//       <UserInfo>
//         <Typography variant="h6">{name}</Typography>
//         <Typography variant="body2">{email}</Typography>
//       </UserInfo>
//       {showButton && (
//         <StyledAddButtons onClick={handleButtonClick} text={''}>
//           Admin
//         </StyledAddButtons>
//       )}
//       {showDeleteIcon && (
//         <DeleteIconStyled color="error" onClick={handleDeleteClick}>
//           <DeleteIcon />
//         </DeleteIconStyled>
//       )}
//     </CardContainer>
//   );
// };

// export default UserCard;


import React from 'react';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import AddButtons from '../../Button/Add/AddButtons';
import { useDispatch } from 'react-redux';
import { promoteUserToAdmin } from '../../../../store/features/adminSlice';

interface UserCardProps {
  profilePic: string;
  name: string;
  email: string;
  showButton?: boolean;
  showDeleteIcon?: boolean; 
  showReactivateButton?: boolean; // Add this prop
  onDelete?: () => void;
  onReactivate?: () => void; // Add this prop
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

const UserCard: React.FC<UserCardProps> = ({
  profilePic,
  name,
  email,
  showButton = false,
  showDeleteIcon = false,
  showReactivateButton = false, // Handle the showReactivateButton prop
  onDelete,
  onReactivate // Handle the onReactivate prop
}) => {
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    console.log(`Button clicked for user: ${email}`);
    try {
      await dispatch(promoteUserToAdmin({ email }));
      // Optionally handle success feedback here
    } catch (error) {
      console.error('Failed to promote user to admin:', error);
    }
  };

  return (
    <CardContainer>
      <Avatar src={profilePic} alt={name} />
      <UserInfo>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{email}</Typography>
      </UserInfo>
      {showButton && (
        <StyledAddButtons onClick={handleButtonClick} text={''}>
          Admin
        </StyledAddButtons>
      )}
      {showDeleteIcon && (
        <DeleteIconStyled color="error" onClick={onDelete}>
          <DeleteIcon />
        </DeleteIconStyled>
      )}
      {showReactivateButton && (
        <ReactivateIconStyled color="primary" onClick={onReactivate}>
          <Typography>Reactivate</Typography>
        </ReactivateIconStyled>
      )}
    </CardContainer>
  );
};

export default UserCard;
