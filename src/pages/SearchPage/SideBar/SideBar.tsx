import React, { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 200;

const drawerHeight = 168;

interface SidebarProps {
  selected: string;
  onSelect: (selected: string) => void;
}

const SideBar: React.FC<SidebarProps> = ({ selected, onSelect }) => {
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
            marginLeft: '30px',
            marginTop: '280px',
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
          {['Post Item', 'Market Place', 'User'].map((text) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                onSelect(text);
                closeDrawer();
              }}
              sx={{
                backgroundColor: selected === text ? '#d3d3d3' : 'transparent',
                '&:hover': {
                  backgroundColor: '#b0b0b0',
                },
              }}
            >
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
