import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdbIcon from '@mui/icons-material/Adb';
import AvatarComponent from '../../../pages/Setting/Avatar';
import taxi from '/asset/taxi.png';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useSelector, useDispatch } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { RootState, AppDispatch } from '../../../store/store';
import { fetchNotifications, markNotificationAsRead } from '../../../store/slices/notificationSlice';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useSnackbar } from 'notistack';


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
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector((state: RootState) => 
    state.notifications.notifications.filter(notif => 
      notif.user.id === Number(sessionStorage.getItem('userId') || localStorage.getItem('userId'))
    )
  );
  const loading = useSelector((state: RootState) => state.notifications.loading);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [lastNotificationCount, setLastNotificationCount] = useState(0);

  useEffect(() => {
    const role = sessionStorage.getItem('roleName') || localStorage.getItem('roleName');
    setUserRole(role);
  }, []);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    const pollInterval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 30000);

    return () => clearInterval(pollInterval);
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > lastNotificationCount && lastNotificationCount !== 0) {
      enqueueSnackbar('You have new notifications!', {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
    setLastNotificationCount(notifications.length);
  }, [notifications.length, lastNotificationCount, enqueueSnackbar]);

  const navData = [
    { label: 'Category', path: '/home/markets' },
    { label: 'Event', path: '/home/event' },
    ...(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_MODERATOR' 
      ? [{ label: 'Finance', path: '/home/finance' }] 
      : []),
    ...(userRole === 'ROLE_ADMIN' || userRole === 'ROLE_MODERATOR' 
      ? [{ label: 'Admin', path: '/home/admin' }] 
      : []),
  ];

  const handleProfileClick = () => {
    navigate('/home/setting');
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (notificationId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    await dispatch(markNotificationAsRead(notificationId));
    handleNotificationClose();
  };

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

          <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={loading ? 0 : notifications.length} color="error">
              <NotificationsIcon sx={{ color: '#646262', height: '30px', marginLeft: '10px' }} />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleNotificationClose}
            PaperProps={{
              style: {
                maxHeight: 300,
                width: '50%',
              },
            }}
          >
            {loading ? (
              <MenuItem>Loading notifications...</MenuItem>
            ) : (
              <>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <MenuItem 
                      key={notification.id} 
                      onClick={handleNotificationClose}
                      sx={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%',
                        padding: '8px 16px'
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        width: '100%',
                        alignItems: 'center'
                      }}>
                        <div style={{ flex: 1, marginRight: '8px' }}>{notification.message}</div>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMarkAsRead(notification.id, e)}
                          sx={{ 
                            ml: 1,
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            }
                          }}
                        >
                          <DoneAllIcon fontSize="small" sx={{ color: '#666' }} />
                        </IconButton>
                      </Box>
                      <div style={{ fontSize: '0.8em', color: '#666', marginTop: '4px' }}>
                        {new Date(notification.createdDatetime).toLocaleString()}
                      </div>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>No notifications</MenuItem>
                )}
              </>
            )}
          </Menu>

          {/* Profile */}
          <IconButton onClick={handleProfileClick}>
            <AvatarComponent style={{ width: 30, height: 30, marginLeft:'20px' }} />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
