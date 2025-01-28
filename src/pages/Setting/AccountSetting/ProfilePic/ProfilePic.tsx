import React, { useState } from 'react';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ProfilePic = () => {
  const [hover, setHover] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload here
    }
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Avatar
        alt="Profile Picture"
        src="/path/to/profile.jpg" // Update this with the actual path
        sx={{ width: 100, height: 100 }}
      />
      {hover && (
        <Tooltip title="Change">
          <IconButton
            component="label"
            style={{ position: 'absolute', bottom: 0, right: 0 }}
          >
            <PhotoCamera />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default ProfilePic;
