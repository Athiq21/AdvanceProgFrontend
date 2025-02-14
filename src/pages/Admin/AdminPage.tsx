import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Event from './Event/Event';
import PostSetting from './PostSetting/PostSetting';
import CategorySetting from './CategorySetting/CategorySetting';
import AccountSetting from './AccountSetting/AccountSetting';

import SideBar from './SideBar/SideBar';
import CarAvai from './CarAvai/CarAvai'
import RoleAdmin from './AddRole/role';


const AdminPage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>('Event');
  const [isSidebarVisible] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = sessionStorage.getItem('roleName') || localStorage.getItem('roleName');
    setUserRole(role);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'Event Setting':
        return <Event />;
      case 'Listing Setting':
        return <PostSetting />;
      case 'Category Setting':
        return <CategorySetting />;
      case 'Account Setting':
        return userRole === 'ROLE_ADMIN' ? <AccountSetting /> : null;
      case 'Add Role':
        return userRole === 'ROLE_ADMIN' ? <RoleAdmin /> : null;
      case 'Availability':
        return <CarAvai />;
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
            marginLeft: { xs: isSidebarVisible ? '0' : '0', sm: isSidebarVisible ? '10%' : '0' },
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default AdminPage;
