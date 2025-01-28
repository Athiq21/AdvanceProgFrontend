// import React, { useState, MouseEvent } from 'react';
// import { AppBar, Toolbar, IconButton, Avatar, Box, Popover, Typography, List, ListItem, Button } from '@mui/material';
// import { Notifications, Message } from '@mui/icons-material';
// import Logo from '/asset/Logo.png';
// import HomeSearch from '../SearchBar/HomeSearch';
// import { useNavigate } from 'react-router-dom';
// import AvatarComponent from '../../../pages/Setting/Avatar';

// interface HeaderProps {
//   showSearch?: boolean;
// }

// const Header: React.FC<HeaderProps> = ({ showSearch = true }) => {
//     const navigate = useNavigate();


//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [notifications, setNotifications] = useState<Array<string>>([
//         'Your Account has successfully been Activated',
      
//     ]);

//     const handleProfileClick = () => {
//         navigate('/home/setting');
//     };

//     const handleNotificationsClose = () => {
//         setAnchorEl(null);
//     };

//     const handleMessagesClick = () => {
//         navigate('/home/messages');
//     };

//     const handleClearNotifications = () => {
//      //notification backend
//         setNotifications([]);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? 'simple-popover' : undefined;

//     return (
//         <AppBar position="fixed" sx={{ backgroundColor: '#EFEFEF' }}>
//             <Toolbar>
//                 {/* Logo */}
//                 <img src={Logo} alt="Company Logo" style={{ height: '40px', width: '110px', marginLeft: '0px' }} />
                
//                 <Box sx={{ flexGrow: 1 }} />

                

//                 <IconButton onClick={handleProfileClick}>
//                 <AvatarComponent style={{ width: 40, height: 40 }} />
//                 </IconButton>
          
                
//                 <IconButton onClick={handleMessagesClick}>
//                     <Message sx={{ color: "#646262", marginRight: "30px", height: "30px" }} />
//                 </IconButton>
                
//                 <Popover
//     id={id}
//     open={open}
//     anchorEl={anchorEl}
//     onClose={handleNotificationsClose}
//     anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'left',
//     }}
//     transformOrigin={{
//         vertical: 'top',
//         horizontal: 'left',
//     }}
//     sx={{ padding: '10px' , height:"100vh" }}
// > 
//     <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
//         <Typography variant="h6">
//             Notifications
//         </Typography>
//         <Button onClick={handleClearNotifications} sx={{marginBottom:"20px"}}>Clear All</Button>
//     </Box>
//     <List >
//         {notifications.length === 0 ? (
//             <ListItem>
//                 <Typography variant="body2">No notifications</Typography>
//             </ListItem>
//         ) : (
//             notifications.map((notification, index) => (
//                 <ListItem key={index}>
//                     <Typography variant="body2">{notification}</Typography>
//                 </ListItem>
//             ))
//         )}
//     </List>
// </Popover>

//             </Toolbar>
//         </AppBar>
//     );
// };

// export default Header;