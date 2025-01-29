// import React, { useState } from 'react';
// import { Box, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';


// const drawerWidth = 200;

// const drawerHeight = 168;

// interface SidebarProps {
//   onSelect: (selected: string) => void;
// }

// const SideBar: React.FC<SidebarProps> = ({ onSelect }) => {
//     const theme = useTheme();
//     const [open, setOpen] = useState(false);

//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


//     const toggleDrawer = () => {
//         setOpen(!open);
//       };
    
//       const closeDrawer = () => {
//         if (isSmallScreen) {
//           setOpen(false);
//         }
//       };

      
//   return (
   


// <Box>
// {isSmallScreen ? (
//   <IconButton onClick={toggleDrawer} aria-label="menu">
//     <MenuIcon />
//   </IconButton>
// ) : null}
// <Drawer
//   variant={isSmallScreen ? 'temporary' : 'permanent'}
//   anchor="left"
//   open={isSmallScreen ? open : true}
//   onClose={toggleDrawer}
//   sx={{
//     width: drawerWidth,
//     flexShrink: 0,
//     '& .MuiDrawer-paper': {
//       width: drawerWidth,
//       height: drawerHeight,
//       marginLeft: '80px',
//       marginTop: '400px',
//       borderRadius: '10px',
//       boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
//     },
//   }}
// >
//   <Box
//     sx={{
//       backgroundColor: '#656565',
//       height: '4px',
//       width: '100%',
//     }}
//   />
//  <List>
//       {['Posted Item', 'Market Place', 'Account Setting',].map((text, index) => (
//         <ListItem button key={text} onClick={() => onSelect(text)}>
//           <ListItemText primary={text} />
//         </ListItem>
//       ))}
//     </List>

//   <Box
//     sx={{
//       backgroundColor: '#656565',
//       height: '4px',
//       width: '100%',
//     }}
//   />
// </Drawer>
// </Box>
//   );
// };

// export default SideBar;

// import React from 'react';
// import {
//   Box,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// const drawerWidth = 200;

// interface SidebarProps {
//   onSelect: (selected: string) => void;
// }

// const SideBar: React.FC<SidebarProps> = ({ onSelect }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Box>
//       {/* If you want a button to toggle visibility on small screens */}
//       {isSmallScreen && (
//         <IconButton onClick={() => {/* Logic to toggle sidebar on small screens */}} aria-label="menu">
//           <MenuIcon />
//         </IconButton>
//       )}

//       {/* Fixed position sidebar at the top */}
//       <Box
//         sx={{
//           position: 'relative',      // Fixed positioning
//           bottom: '3px',               // Align to the top of the page
//           left: 0,
//           width: drawerWidth,
//           height: 'auto',         // Height can adjust based on content
//           backgroundColor: '#faf6f6',
//           borderRadius: '10px',
//           boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
//           // zIndex: 1200,           // Ensure it stays above other content
//         }}
//       >
//         {/* <Box
//           sx={{
//             backgroundColor: '#656565',
//             height: '4px',
//             width: '100%',
//           }}
//         /> */}
//         <List>
//           {['Posted Item', 'Market Place', 'Account Setting'].map((text) => (
//             <ListItem button key={text} onClick={() => onSelect(text)}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//         {/* <Box
//           sx={{
//             backgroundColor: '#656565',
//             height: '4px',
//             width: '100%',
//           }}
//         /> */}
//       </Box>
//     </Box>
//   );
// };

// export default SideBar;

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 200;

interface SidebarProps {
  onSelect: (selected: string) => void;
}

const SideBar: React.FC<SidebarProps> = ({ onSelect }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false); // State to toggle the drawer

  const toggleDrawer = () => {
    setOpen(!open); // Toggle the open state
  };

  return (
    <Box>
      {isSmallScreen ? (
        <>
          {/* Icon button to toggle the drawer */}
          <IconButton onClick={toggleDrawer} aria-label="menu">
            <MenuIcon />
          </IconButton>

          {/* Drawer for mobile */}
          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                top:'10%' ,
                height: '20%',
                boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
              },
            }}
          >
            <List>
              {['Market Place', 'Account Setting'].map((text) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => {
                    onSelect(text);
                    setOpen(false);
                  }}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      ) : (
        // Fixed sidebar for larger screens
        <Box
          sx={{
            position: 'relative',
            width: drawerWidth,
            height: 'auto', // Adjustable height for desktop
            backgroundColor: '#faf6f6',
            borderRadius: '10px',
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <List>
            {['Bookings', 'Account Setting'].map((text) => (
              <ListItem button key={text} onClick={() => onSelect(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SideBar;
