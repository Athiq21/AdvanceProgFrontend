import React, { useState } from 'react';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import UploadDialog from './UploadDialog';

interface ProfileAvatarProps {
  profilePic: string;
  onImageChange: (newImage: string) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ profilePic, onImageChange }) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  return (
    <div>
      <Tooltip title="Change">
        <IconButton
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpenDialog}
          style={{ position: 'relative' }}
        >
          <Avatar src={profilePic} style={{ width: 100, height: 100 }} />
          {hover && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: 20,
              }}
            >
              Change
            </div>
          )}
        </IconButton>
      </Tooltip>
      <UploadDialog open={open} onClose={handleCloseDialog} onImageChange={onImageChange} />
    </div>
  );
};

export default ProfileAvatar;
