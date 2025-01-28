import React, { useState, useEffect } from 'react';
import { Box, Avatar, InputBase,Typography} from '@mui/material';
import TextPopup from './TextPopup';
import { PopupConfig, postingPageConfig } from './PopupConfig';
import { createPost } from '../../../Service/CustomHook/createPost';
import { FileBlob } from '../../../type/FileBlob';
import { Post } from '../../../type/Posts';
import AvatarComponent from '../../../pages/Setting/Avatar';
import { UserMinDTO } from '../../../DTO/UserMinDTO';

interface TextComponentProps {
  width?: string;
  height?: string;
  onPost: (newPost: Post) => void;

}


const TextComponent: React.FC<TextComponentProps> = ({ width = '620px', height = '50px' }) => {
  const [openTextPopup, setOpenTextPopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [userName, setUserName] = useState<string>('User');


  useEffect(() => {
    const firstName = sessionStorage.getItem('userFirstName') || 'User';

    const lastName = sessionStorage.getItem('userLastName') || 'User';
    setUserName(firstName+' '+lastName);

  });
  
  const handleOpenTextPopup = () => {
    setOpenTextPopup(true);
  };

  const handleCloseTextPopup = () => {
    setOpenTextPopup(false);
  };
  const handlePost = async (postData: { title: string; description: string; selectedImages: File[]; }) => {
    try {
      const result = await createPost(postData);
     
      console.log('Post created successfully:', result);
      setPosts((prevPosts) => [result, ...prevPosts]);
      
    

    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'grey.100', 
        p: 2,
        borderRadius: 5,
        width: width,
        height: height,
      }}
    >
      <AvatarComponent/>

      <InputBase
        sx={{ 
          ml: 2, 
          flex: 1, 
          borderRadius: 10, 
          background: 'white',
          height: '45px', 
          textAlign: 'center', 
          cursor: 'pointer', 
        }}
        placeholder="What's on your mind?"
        onClick={handleOpenTextPopup}
        readOnly
      />
      <TextPopup
        open={openTextPopup}
        onClose={handleCloseTextPopup}
        config={postingPageConfig}
        onPost={handlePost} 
        profilePic={''} 
        firstName={''}       
      
      />
    </Box>
  );
};

export default TextComponent;
