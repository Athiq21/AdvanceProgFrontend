import React from 'react';
import { Card, CardContent, Avatar, Typography, IconButton,Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface UserCardProps {
  profilePic: string;
  username: string;
  userId: number;
  designation: string;
  designationUrl: string;
  onView: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ profilePic, username, userId, designation,designationUrl, onView }) => {
  return (
    <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      <Avatar src={profilePic} alt={username} sx={{ width: 56, height: 56, marginRight: 2 }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography  variant="h7" >{username}</Typography>
        
        <Box sx={{display:'flex',ml:-3}}>
           {designationUrl && <img src={designationUrl} alt={designation} width="50"/>}
          <Typography color="textSecondary" mt={1}>{designation}</Typography> {/* Reduced margin bottom */}
          </Box>
      </CardContent>
      <IconButton onClick={() => onView(userId)} color="primary">
        <VisibilityIcon />
      </IconButton>
    </Card>
  );
};

export default UserCard;
