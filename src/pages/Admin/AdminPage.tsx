// import React, { useState } from 'react';
// import { Box, Grid } from '@mui/material';
// import Event from './Event/Event';
// import PostSetting from './PostSetting/PostSetting';
// import CategorySetting from './CategorySetting/CategorySetting';
// import AccountSetting from './AccountSetting/AccountSetting';
// import AddRole from './AddRole/AddRole';
// import SideBar from './SideBar/SideBar';
// import Header from '../../common/Component/Header/Header';
// import NavBar from '../../common/Component/NavBar/NavBar';
// import Depart from './Depart/Depart';

// const AdminPage: React.FC = () => {
//   const [selectedContent, setSelectedContent] = useState<string>('Event');

//   const renderContent = () => {
//     switch (selectedContent) {
//       case 'Event':
//         return <Event/>;
//       case 'Post Setting':
//         return <PostSetting />;
//       case 'Category Setting':
//         return <CategorySetting />;
//       case 'Account Setting':
//         return <AccountSetting />;
//         case 'Add Role':
//             return <AddRole />;
//       case 'Department':
//             return <Depart />;
//       default:
//         return <Depart/>;
//     }
//   };

//   return (
//     <>
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <Box sx={{ width: '30%' }}>
//         <SideBar onSelect={setSelectedContent}/>
//       </Box>
      
//       <Box sx={{ width: '100%', padding: '1px' }}>
//         {renderContent()}
//       </Box>
//     </Box>
//     </>
//   );
// };

// export default AdminPage;


import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Event from './Event/Event';
import PostSetting from './PostSetting/PostSetting';
import CategorySetting from './CategorySetting/CategorySetting';
import AccountSetting from './AccountSetting/AccountSetting';
import AddRole from './AddRole/AddRole';
import SideBar from './SideBar/SideBar';
import Depart from './Depart/Depart';

const AdminPage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>('Event');
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'Event':
        return <Event />;
      case 'Post Setting':
        return <PostSetting />;
      case 'Category Setting':
        return <CategorySetting />;
      case 'Account Setting':
        return <AccountSetting />;
      case 'Add Role':
        return <AddRole />;
      default:
        return <Event />;
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh' }}>
     
       
            <SideBar onSelect={setSelectedContent} />
        
        <Box
          sx={{
            width: { xs: '100%', sm: isSidebarVisible ? '70%' : '100%' },
            marginLeft: { xs: isSidebarVisible ? '0' : '0', sm: isSidebarVisible ? '30%' : '0' },
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default AdminPage;
