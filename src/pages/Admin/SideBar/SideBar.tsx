// import React, { useState } from 'react';
// import { Box, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';


// const drawerWidth = 200;

// const drawerHeight = 290;

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
//       marginTop: '300px',
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
//       {['Event', 'Post Setting', 'Category Setting', 'Account Setting', 'Add Role','Group'].map((text, index) => (
//         <ListItem button key={text} onClick={() => onSelect(text)}>
//           <ListItemText primary={text} primaryTypographyProps={{ sx: { fontSize: '14px' } }}/>
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


import React, { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 200;
const drawerHeight = '100%';

interface SidebarProps {
  onSelect: (selected: string) => void;
}

const SideBar: React.FC<SidebarProps> = ({ onSelect }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    if (isSmallScreen) {
      setOpen(false);
    }
  };

  return (
    <Box>
      {isSmallScreen && (
        <IconButton
          onClick={toggleDrawer}
          aria-label="menu"
          sx={{
            position: 'fixed',
            top: '15%',
            left: '10px',
            transform: 'translateY(-50%)',
            zIndex: 1201, // Ensure it is above other elements
            backgroundColor: '#656565',
            color: 'white',
            '&:hover': {
              backgroundColor: '#454545',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        anchor="left"
        open={isSmallScreen ? open : true}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            height: drawerHeight,
            marginLeft: '10px',
            marginTop: '120px',
            borderRadius: '10px',
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#656565',
            height: '4px',
            width: '100%',
          }}
        />
        <List>
          {['Event', 'Post Setting', 'Category Setting', 'Account Setting', 'Add Role', 'Availability'].map((text) => (
            <ListItem button key={text} onClick={() => onSelect(text)}>
              <ListItemText primary={text} primaryTypographyProps={{ sx: { fontSize: '14px' } }} />
            </ListItem>
          ))}
        </List>
     
      </Drawer>
    </Box>
  );
};

export default SideBar;
