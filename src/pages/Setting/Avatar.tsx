import React, { useState, useEffect } from 'react';
import { Avatar, AvatarProps } from '@mui/material';
import apiConfig from '../../Authentication/api';

const AvatarComponent: React.FC<AvatarProps> = (props) => {
  const [profilePic, setProfilePic] = useState<string>('');

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        console.log('Fetching profile picture...'); // Log before the API call

        const response = await apiConfig.get('/users/image');
        console.log('API Response:', response); // Log the API response

        // Extract image URL from the response (assuming the response includes the URL directly)
        if (response.data && response.data.imageUrl) {
          const imageUrl = response.data.imageUrl; // Use the URL from the response
          console.log('Image URL:', imageUrl); // Log the constructed URL
          setProfilePic(imageUrl);
        } else {
          console.error('Invalid response format', response);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error); // Log errors
      }
    };

    fetchProfilePic();
  }, []); // Empty dependency array ensures this runs once after the initial render

  console.log('Profile Picture State:', profilePic); // Log the state value

  return (
    <Avatar src={profilePic} {...props} />
  );
};

export default AvatarComponent;
