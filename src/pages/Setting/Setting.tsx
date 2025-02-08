
// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Grid } from '@mui/material';
// import SideBar from './SideBar/SideBar';
// import PostItem from './PostItem/PostItem';
// import MarketPlace from './MarketPlace/MarketPlace';
// import AccountSetting from './AccountSetting/AccountSetting';
// import { useNavigate } from 'react-router-dom';
// import AddButtons from '../../common/Component/Button/Add/AddButtons';
// import apiConfig from '../../Authentication/api';
// import AvatarComponent from './Avatar';

// const Setting: React.FC = () => {
//   const [selectedContent, setSelectedContent] = useState<string>('Post Item');
//   const [userName, setUserName] = useState<string>('User');
//   const [userDesignation, setUserDesignation] = useState<string>('Loading...'); // Initial state for designation
//   const navigate = useNavigate();

//   useEffect(() => {
//     const firstName = sessionStorage.getItem('userFirstName') || 'User';

//     const lastName = sessionStorage.getItem('userLastName') || 'User';
//     setUserName(firstName+' '+lastName);

//     // Fetch user designation
//     const fetchDesignation = async () => {
//       try {
//         const response = await apiConfig.get('/users/designation', {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
//           },
//         });

//         // Assuming the response is the designation string itself
//         const designation = response.data || 'No Designation'; 
//         setUserDesignation(designation); // Set designation
//       } catch (error) {
//         console.error('Error fetching designation:', error);
//         setUserDesignation('Error fetching designation'); // Display error message
//       }
//     };

//     fetchDesignation();
//   }, []);

//   const renderContent = () => {
//     switch (selectedContent) {
//       case 'Post Item':
//         return <PostItem />;
//       case 'Market Place':
//         return <MarketPlace />;
//       case 'Account Setting':
//         return <AccountSetting />;
//       default:
//         return <PostItem />;
//     }
//   };

//   const signOut = () => {
//     // Clear session tokens
//     sessionStorage.removeItem('authToken');
//     sessionStorage.removeItem('userFirstName');

//     // Navigate to sign-in page
//     navigate('/');
//   };

//   return (
//     <Box marginTop={"160px"}>
//       <Box display="flex" alignItems="center" justifyContent="center" mb={5}>
//         <Box display="flex" alignItems="center" marginTop={'10px'}>
//           <Box display="flex" alignItems="center" marginTop={'10px'}>
//             <AvatarComponent style={{ width: 100, height: 100 }} />
//             <Box ml={2}>
//               <Typography sx={{ fontSize: 22 }}>{userName}</Typography>
//               <Typography sx={{ fontSize: 18 }}>{userDesignation}</Typography> {/* Display designation */}
//               <AddButtons 
//                 variant="contained"
//                 height='30px'
//                 sx={{ marginTop: 1 }}
//                 onClick={signOut}
//                 text={'Sign Out'}>Sign Out</AddButtons>
//             </Box>
//           </Box>
//         </Box>
//       </Box>      

//       <Grid container spacing={1}>
//         <Grid item xs={0.2} md={1}></Grid>
//         <Grid item xs={2} md={2}>
//           <Box sx={{ marginTop: '160px' }}>
//             <SideBar onSelect={setSelectedContent} />
//           </Box>
//         </Grid>
//         <Grid item xs={10} md={9}>
//           {renderContent()}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Setting;

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot'; 
import SideBar from './SideBar/SideBar';
import PostItem from './PostItem/PostItem';
import MarketPlace from './MarketPlace/MarketPlace';
import AccountSetting from './AccountSetting/AccountSetting';
import { useNavigate } from 'react-router-dom';
import AddButtons from '../../common/Component/Button/Add/AddButtons';
import apiConfig from '../../Authentication/api';
import AvatarComponent from './Avatar';
import { orange } from '@mui/material/colors';

const Setting: React.FC = () => {
  // const [selectedContent, setSelectedContent] = useState<string>('Post Item');
   const [selectedContent, setSelectedContent] = useState<string>('Market Place');
  const [userName, setUserName] = useState<string>('User');
  const [userDesignation, setUserDesignation] = useState<string>('Loading...');
  const [designationImage, setDesignationImage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const firstName = sessionStorage.getItem('userFirstName') || 'User';
    const lastName = sessionStorage.getItem('userLastName') || 'User';
    setUserName(firstName + ' ' + lastName);

    // Fetch user designation with image
    const fetchDesignation = async () => {
      try {
        const response = await apiConfig.get('/users/designation', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        });
        console.log("API Response:", response.data);

        const { name, image_url } = response.data;
        setUserDesignation(name || 'No Designation'); 
        setDesignationImage(image_url || ''); 

        // Log what is being set
        console.log("Designation:", name);
        console.log("Designation Image URL:", image_url);
      } catch (error) {
        console.error('Error fetching designation:', error);
        setUserDesignation('Error fetching designation');
      }
    };

    fetchDesignation();
  }, []);

  const renderContent = () => {
    switch (selectedContent) {
      case 'Bookings':
        return <MarketPlace />;
      case 'Account Setting':
        return <AccountSetting />;
      default:
        return <MarketPlace />;
    }
  };

  const signOut = () => {
    // Clear all data in sessionStorage
    sessionStorage.clear();
  
    // Clear all data in localStorage
    localStorage.clear();
  
    // Navigate to the sign-in page
    navigate('/');
  };
  

  const userRole = sessionStorage.getItem('role');
  const isAdmin = userRole === 'ROLE_ADMIN';

  return (
    // <Box marginTop={"130px"}>
    <Box 
  sx={{
    marginTop: {
      xs: '20px', 
      md: '50px',
    },
  }}
>

<Box display="flex" alignItems="flex-start" justifyContent="center" mb={5}>
<Box  sx={{
    marginTop: {
      xs: '20px', 
    },
    marginLeft:{
      xs: '-20px', 
      md: '-300px',
    },
    marginRight:{
      md: '10%',
    },
  }}>
  <SideBar onSelect={setSelectedContent} />
</Box>
  <Box display="flex" alignItems="center">
    <Box sx={{ marginTop: '80px' }}>
      <AvatarComponent style={{ width: 100, height: 100, marginTop: -50 }} />
    </Box>

    <Box ml={5} sx={{ textAlign: 'center' }}>
      <Typography variant="h7" sx={{ fontSize: 22, ml: -3 }}>
        {userName}{' '}
        {isAdmin && (
          <WhatshotIcon sx={{ fontSize: 25, color: 'orange' }} />
        )}
      </Typography>

      <Box sx={{ display: 'flex', ml: -4, mt: -1 }}>
        {/* {designationImage && (
          <Avatar
            src={designationImage}
            alt="Designation Image"
            sx={{ width: 50, height: 50, marginRight:1 }}
          />
        )}
        <Typography variant="h7" sx={{ fontSize: 18, marginTop: 1 }}>
          {userDesignation}
        </Typography> */}
      </Box>
      <AddButtons
        variant="contained"
        height="30px"
        sx={{ marginTop: 1, ml: -3 }}
        onClick={signOut}
        text={'Sign Out'}
      >
        Sign Out
      </AddButtons>
    </Box>
  </Box>
</Box>


      <Grid container spacing={1}>
        <Box
      sx={{
        display: 'flex', width:'100%',
        justifyContent: { xs: 'center', md: 'flex-start' }, // Center content on mobile
        alignItems: 'center', // Optional: vertical alignment
      }}
    >
      {renderContent()}
    </Box>
      </Grid>
    </Box>
  );
};

export default Setting;
