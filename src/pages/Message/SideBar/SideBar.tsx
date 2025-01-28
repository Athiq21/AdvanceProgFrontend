
// // import React, { useState } from 'react';
// // import { TextField, Avatar, List, ListItem, ListItemText, Divider, Box, Badge, Drawer, IconButton } from '@mui/material';
// // import SearchIcon from '@mui/icons-material/Search';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import { User } from '../../../store/types';
// // import { searchUsersByFirstName } from '../../../Service/messageService';

// // interface SidebarProps {
// //     users: User[];
// //     onUserSelect: (user: User) => void;
// //     onUsersUpdate: (users: User[]) => void;
// // }

// // const Sidebar: React.FC<SidebarProps> = ({ users, onUserSelect, onUsersUpdate }) => {
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [open, setOpen] = useState(false);

// //     const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
// //         const value = event.target.value;
// //         setSearchTerm(value);

// //         if (value) {
// //             try {
// //                 const fetchedUsers = await searchUsersByFirstName(value);
// //                 onUsersUpdate(fetchedUsers);
// //             } catch (error) {
// //                 console.error('Error fetching users:', error);
// //             }
// //         } else {
// //             onUsersUpdate([]); // Clear the list if the search term is empty
// //         }
// //     };

// //     const handleUserSelect = (selectedUser: User) => {
// //         const updatedUsers = users.map(user =>
// //             user.id === selectedUser.id ? { ...user, isread: false } : user
// //         );

// //         onUsersUpdate(updatedUsers);
// //         onUserSelect(selectedUser);
// //     };

// //     const toggleDrawer = () => {
// //         setOpen(!open);
// //     };

// //     return (
// //         <>
// //             <IconButton
// //                 edge="start"
// //                 sx={{ position: 'fixed', top: 60, left: 16, zIndex: 1200 }}
// //                 onClick={toggleDrawer}
// //             >
// //                 <MenuIcon />
// //             </IconButton>
// //             <Drawer
// //                 anchor="left"
// //                 open={open}
// //                 onClose={toggleDrawer}
// //                 sx={{
// //                     '& .MuiDrawer-paper': {
// //                         width: 260,
// //                         borderRadius: '10px',
// //                         boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
// //                     },
// //                 }}
// //             >
// //                 <Box sx={{ padding: 2 }}>
// //                     <TextField
// //                         sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '20px' } }}
// //                         variant="outlined"
// //                         placeholder="Search"
// //                         value={searchTerm}
// //                         onChange={handleSearchChange}
// //                         InputProps={{ endAdornment: <SearchIcon /> }}
// //                     />
// //                     <Divider sx={{ my: 2 }} />
// //                     <List>
// //                         {users.map(user => (
// //                             <ListItem button key={user.id} onClick={() => handleUserSelect(user)}>
// //                                 <Box sx={{ mr: 2 }}>
// //                                     <Badge
// //                                         color="error"
// //                                         variant="dot"
// //                                         invisible={!user.hasUnreadMessages}
// //                                         overlap="circular"
// //                                         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// //                                     >
// //                                         <Avatar src={user.imageUrl} />
// //                                     </Badge>
// //                                 </Box>
// //                                 <ListItemText primary={`${user.firstName} ${user.lastName}`} />
// //                             </ListItem>
// //                         ))}
// //                     </List>
// //                 </Box>
// //             </Drawer>
// //         </>
// //     );
// // };

// // export default Sidebar;

// import React, { useState, useEffect } from 'react';
// import { TextField, Avatar, List, ListItem, ListItemText, Divider, Box, Badge, Drawer, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import MenuIcon from '@mui/icons-material/Menu';
// import { User, Message } from '../../../store/types';
// import { searchUsersByFirstName, getUnreadMessages } from '../../../Service/messageService';

// interface SidebarProps {
//     users: User[];
//     onUserSelect: (user: User) => void;
//     onUsersUpdate: (users: User[]) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ users, onUserSelect, onUsersUpdate }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [open, setOpen] = useState(false);

//     useEffect(() => {
//         const fetchUnreadMessages = async () => {
//             try {
//                 const unreadMessages = await getUnreadMessages();
//                 const updatedUsers = users.map(user => ({
//                     ...user,
//                     hasUnreadMessages: unreadMessages.some(msg => msg.senderId === user.id), // Check if user has unread messages
//                 }));
//                 onUsersUpdate(updatedUsers);
//             } catch (error) {
//                 console.error('Error fetching unread messages:', error);
//             }
//         };

//         fetchUnreadMessages();
//     }, [users, onUsersUpdate]);

//     const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value;
//         setSearchTerm(value);

//         if (value) {
//             try {
//                 const fetchedUsers = await searchUsersByFirstName(value);
//                 onUsersUpdate(fetchedUsers);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         } else {
//             onUsersUpdate([]); // Clear the list if the search term is empty
//         }
//     };

//     const handleUserSelect = (selectedUser: User) => {
//         const updatedUsers = users.map(user =>
//             user.id === selectedUser.id ? { ...user, hasUnreadMessages: false } : user
//         );

//         onUsersUpdate(updatedUsers);
//         onUserSelect(selectedUser);
//     };

//     const toggleDrawer = () => {
//         setOpen(!open);
//     };

//     return (
//         <>
//             <IconButton
//                 edge="start"
//                 sx={{ position: 'fixed', top: 60, left: 16, zIndex: 1200 }}
//                 onClick={toggleDrawer}
//             >
//                 <MenuIcon />
//             </IconButton>
//             <Drawer
//                 anchor="left"
//                 open={open}
//                 onClose={toggleDrawer}
//                 sx={{
//                     '& .MuiDrawer-paper': {
//                         width: 260,
//                         borderRadius: '10px',
//                         boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
//                     },
//                 }}
//             >
//                 <Box sx={{ padding: 2 }}>
//                     <TextField
//                         sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '20px' } }}
//                         variant="outlined"
//                         placeholder="Search"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         InputProps={{ endAdornment: <SearchIcon /> }}
//                     />
//                     <Divider sx={{ my: 2 }} />
//                     <List>
//                         {users.map(user => (
//                             <ListItem button key={user.id} onClick={() => handleUserSelect(user)}>
//                                 <Box sx={{ mr: 2 }}>
//                                     <Badge
//                                          color="error"
//                                          variant="dot"
//                                          invisible={!user.hasUnreadMessages} 
//                                          overlap="circular"
//                                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                                          sx={{
//                                              '& .MuiBadge-dot': {
//                                                  width: 15, 
//                                                  height: 15, 
//                                                  borderRadius: '50%',
//                                              },
//                                          }}
//                                      >
//                                         <Avatar src={user.imageUrl} />
//                                     </Badge>
//                                 </Box>
//                                 <ListItemText primary={`${user.firstName} ${user.lastName}`} />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Box>
//             </Drawer>
//         </>
//     );
// };

// export default Sidebar;
import React, { useState, useEffect } from 'react';
import { TextField, Avatar, List, ListItem, ListItemText, Divider, Box, Badge, Drawer, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { User, Message } from '../../../store/types';
import { searchUsersByFirstName, getUnreadMessages } from '../../../Service/messageService';

interface SidebarProps {
    users: User[];
    onUserSelect: (user: User) => void;
    onUsersUpdate: (users: User[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users, onUserSelect, onUsersUpdate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Fetch unread messages
                const unreadMessages = await getUnreadMessages();

                // Sort users by latest message timestamp
                const updatedUsers = users
                    .map(user => {
                        // Find the latest message for the user
                        const userMessages = unreadMessages.filter(
                            msg => msg.senderId === user.id || msg.receiverId === user.id
                        );
                        const latestMessage = userMessages.sort(
                            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                        )[0];

                        return {
                            ...user,
                            hasUnreadMessages: unreadMessages.some(msg => msg.senderId === user.id),
                            latestMessageTimestamp: latestMessage ? latestMessage.timestamp : null,
                            latestMessageContent: latestMessage ? latestMessage.content : 'No messages yet',
                        };
                    })
                    .sort((a, b) => {
                        const timeA = a.latestMessageTimestamp ? new Date(a.latestMessageTimestamp).getTime() : 0;
                        const timeB = b.latestMessageTimestamp ? new Date(b.latestMessageTimestamp).getTime() : 0;
                        return timeB - timeA; // Sort by latest message timestamp, descending
                    });

                onUsersUpdate(updatedUsers);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [users, onUsersUpdate]);

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            try {
                const fetchedUsers = await searchUsersByFirstName(value);
                onUsersUpdate(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        } else {
            onUsersUpdate([]); // Clear the list if the search term is empty
        }
    };

    const handleUserSelect = (selectedUser: User) => {
        const updatedUsers = users.map(user =>
            user.id === selectedUser.id ? { ...user, hasUnreadMessages: false } : user
        );

        onUsersUpdate(updatedUsers);
        onUserSelect(selectedUser);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <IconButton
                edge="start"
                sx={{ position: 'fixed', top: 60, left: 16, zIndex: 1200 }}
                onClick={toggleDrawer}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 260,
                        borderRadius: '10px',
                        boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <Box sx={{ padding: 2 }}>
                    <TextField
                        sx={{ width: '100%', '& .MuiOutlinedInput-root': { borderRadius: '20px' } }}
                        variant="outlined"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{ endAdornment: <SearchIcon /> }}
                    />
                    <Divider sx={{ my: 2 }} />
                    <List>
                        {users.map(user => (
                            <ListItem button key={user.id} onClick={() => handleUserSelect(user)}>
                                <Box sx={{ mr: 2 }}>
                                    <Badge
                                        color="error"
                                        variant="dot"
                                        invisible={!user.hasUnreadMessages}
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        sx={{
                                            '& .MuiBadge-dot': {
                                                width: 15,
                                                height: 15,
                                                borderRadius: '50%',
                                            },
                                        }}
                                    >
                                        <Avatar src={user.imageUrl} />
                                    </Badge>
                                </Box>
                                <ListItemText
                                    primary={`${user.firstName} ${user.lastName}`}
                                    secondary={user.latestMessageContent || 'No messages yet'}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar;
