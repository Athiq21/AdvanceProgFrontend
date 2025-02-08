import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu, Settings, Logout, Close } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import taxi from '/asset/taxi.png';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';

const iconMap: { [key: string]: JSX.Element } = {
  category: <StorefrontOutlinedIcon />, 
  order: <Inventory2Icon />, 
  finance: <AttachMoneyIcon />,
  report: <ReportIcon />,
  issue: <WarningIcon />,
  logout: <Logout />,
};

const NavBar2 = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [userRole, setUserRole] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem('roleName') || localStorage.getItem('roleName');
    setUserRole(role);
  }, []);

  const signOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };

  const navData = [
    { label: 'Dashboard', path: '/home/finance/dashboard' },
    { label: 'Order', path: '/home/finance/order' },
    { label: 'Finance', path: '/home/finance/finances' },
    { label: 'Report', path: '/home/finance/reports' },
    // { label: 'Issue', path: '/home/finance/issue' },
    { label: 'Logout', path: '/', action: signOut },
  ];

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  const renderNavLinks = () => (
    <List>
      {navData.map((item) => {
        const isSelected = pathname === item.path;
        return (
          <ListItem
            key={item.label}
            button
            component={item.action ? 'button' : Link}
            to={item.action ? undefined : item.path}
            onClick={item.action ? item.action : toggleDrawer(false)}
            sx={{ color: isSelected ? 'black' : 'gray' }}
          >
            <ListItemIcon sx={{ color: isSelected ? 'black' : 'gray' }}>
              {iconMap[item.label.toLowerCase()] || <HomeOutlinedIcon />}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile ? (
        <>
          <AppBar position="fixed" sx={{ backgroundColor: '#E6E6E6', color: 'black' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                <Menu />
              </IconButton>
              <Typography variant="h6">FITLK</Typography>
            </Toolbar>
          </AppBar>

          <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}

            >
              <IconButton sx={{ alignSelf: 'flex-end', marginRight: 1 }} onClick={toggleDrawer(false)}>
                <Close />
              </IconButton>
              <img src={taxi} alt="Company Logo" style={{ height: '50px', width: '50px', marginBottom: '20px' }} />
              {renderNavLinks()}
            </Box>
          </Drawer>
        </>
      ) : (
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: '#E6E6E6',
            color: 'black',
            width: 100,
            height: '100vh',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 4,
          }}
        >
          <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 4 }}>
            <img src={taxi} alt="Company Logo" style={{ height: '40px', width: '40px', marginBottom: '20px' }} />

            {navData.map((item) => {
              const isSelected = pathname === item.path;
              return (
                <div
                  key={item.label}
                  style={{
                    margin: '10px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <IconButton
                    component={item.action ? 'button' : Link}
                    to={item.action ? undefined : item.path}
                    onClick={item.action ? item.action : undefined}
                    style={{ color: isSelected ? '#000000' : '#6C6B6B', padding: 0 }}
                  >
                    {iconMap[item.label.toLowerCase()] || <HomeOutlinedIcon />}
                  </IconButton>
                  <Typography variant="caption" sx={{ color: isSelected ? '#000000' : '#6C6B6B' }}>
                    {item.label}
                  </Typography>
                </div>
              );
            })}
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
};

export default NavBar2;
