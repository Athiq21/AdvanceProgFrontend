import React, { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 200;

const drawerHeight = 168;

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
{isSmallScreen ? (
  <IconButton onClick={toggleDrawer} aria-label="menu">
    <MenuIcon />
  </IconButton>
) : null}
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
      marginLeft: '140px',
      marginTop: '400px',
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
      {['Posted', 'Market Place', 'Employee',].map((text, index) => (
        <ListItem button key={text} onClick={() => onSelect(text)}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>

  <Box
    sx={{
      backgroundColor: '#656565',
      height: '4px',
      width: '100%',
    }}
  />
</Drawer>
</Box>
  );
};

export default SideBar;
