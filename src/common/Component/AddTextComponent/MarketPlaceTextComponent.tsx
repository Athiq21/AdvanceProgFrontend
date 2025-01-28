import React, { useState ,useEffect} from 'react';
import { Box, Avatar, InputBase } from '@mui/material';
import TextPopup from './TextPopup';
import { marketplacePageConfig, PopupConfig, postingPageConfig } from './PopupConfig';
import MarketPlacePopup from './MarketPlacePopup';
import AvatarComponent from '../../../pages/Setting/Avatar';

interface TextComponentProps {
  width?: string;
  height?: string;

}

const TextComponent: React.FC<TextComponentProps> = ({ width = '620px', height = '50px',  }) => {
  const [openTextPopup, setOpenTextPopup] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
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
  const handlePost = (postData: { title: string; text: string; selectedImages: File[]; }) => {

    console.log('Posting from MyPage:', postData);
   
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
          marginLeft:2,
          flex: 1, 
          borderRadius: 10, 
          background: 'white',
          height: '45px', 
          textAlign: 'center', 
          cursor: 'pointer', 
        }}
        placeholder="    POST A LISTING ON A CAB."
        onClick={handleOpenTextPopup}
        readOnly
      />
      <MarketPlacePopup
        open={openTextPopup}
        onClose={handleCloseTextPopup}
        config={marketplacePageConfig} 
        profilePic={''} 
        firstName={''}        
        // onPost={handlePost}
        // selectedImages={selectedImages}
        // setSelectedImages={setSelectedImages}
      />
    </Box>
  );
};

export default TextComponent;
