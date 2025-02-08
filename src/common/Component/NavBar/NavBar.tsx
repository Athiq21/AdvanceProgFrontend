import React, { useState, useEffect, MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Popover,
  Typography,
  List,
  ListItem,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Notifications, Message } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdbIcon from '@mui/icons-material/Adb';
import AvatarComponent from '../../../pages/Setting/Avatar';
import taxi from '/asset/taxi.png';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

const iconMap: { [key: string]: JSX.Element } = {
  category: <StorefrontOutlinedIcon />,
  event: <EventAvailableOutlinedIcon />,
  admin: <SupervisorAccountIcon />,
  chat: <AdbIcon />,
  finance: <AccountBalanceIcon />,
};

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Array<string>>([
    'Your Account has successfully been Activated',
  ]);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = sessionStorage.getItem('roleName') || localStorage.getItem('roleName');
    setUserRole(role);
  }, []);

  const navData = [
    { label: 'Category', path: '/home/markets' },
    { label: 'Event', path: '/home/event' },
    { label: 'Finance', path: '/home/finance' },
    ...(userRole === 'ROLE_ADMIN' ? [{ label: 'Admin', path: '/home/admin' }] : []),
  ];

  const handleProfileClick = () => {
    navigate('/home/setting');
  };

  const handleMessagesClick = () => {
    navigate('/home/messages');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#ffffff',
          color: 'black',
          height: '60px',
          ...(isMobile && { bottom: 0, top: 'auto' }),
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
        <img src={taxi} alt="Company Logo" style={{ height: '40px', width: '40px',
          marginLeft:'-10px', marginRight:'5px'
        }} />
        
          {navData.map((item) => {
            const isSelected = pathname === item.path;
            return (
              <div
                key={item.label}
                style={{
                  margin: '0 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <IconButton
                  component={Link}
                  to={item.path}
                  style={{
                    color: isSelected ? '#000000' : '#6C6B6B',
                  }}
                >
                  {iconMap[item.label.toLowerCase()] || <HomeOutlinedIcon />}
                </IconButton>

          
              </div>
            );
          })}

     {/* Messages */}
     <IconButton onClick={handleMessagesClick}>
            <Message sx={{ color: '#646262', height: '30px', marginLeft:'10px' }} />
          </IconButton>

                   {/* Profile */}
                   <IconButton onClick={handleProfileClick}>
            <AvatarComponent style={{ width: 30, height: 30 , marginLeft:'20px' }} />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
