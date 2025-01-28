import React from 'react';
// import Header from '../common/Component/Header/Header';
import NavBar from '../common/Component/NavBar/NavBar';
import { useAuth } from './AuthContext';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
         {/* <Header /> */}
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
