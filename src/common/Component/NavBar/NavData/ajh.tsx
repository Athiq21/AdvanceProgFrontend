// src/components/NavBar.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Popover, Paper, MenuList,MenuItem as MaterialMenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import NavData, { NavItem } from './NavData/NavData'
import { useState } from 'react';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(false);

  const handleMouseEnter = () => {
    // if (item.subLinks) {
    //   setAnchorEl(event.currentTarget);
    // }
    setAnchorEl(true);

  };

  const handleMouseLeave = () => {
    setAnchorEl(false);
  };

  const handleSubMenuMouseEnter = () => {
    setAnchorEl(true);
  };

  const handleSubMenuMouseLeave = () => {
    setAnchorEl(false);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#656565' }} >
      <Toolbar sx={{ justifyContent:'center', display:'flex'}}>
        {NavData.map((item) => (
          <div
            key={item.label}
            onMouseEnter={item.label === 'Category' ?  handleMouseEnter : undefined}
            onMouseLeave={item.label === 'Category' ? handleMouseLeave : undefined}
            style={{
              textTransform: 'capitalize',
              margin: '0 10px',
              // justifyContent:'center',
              // display:'flex',
              cursor: 'pointer',
              position: 'relative',
              fontFamily: 'Poppins',
              fontSize:'8',
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to={item.path}
            >
              {item.label}
            </Button>
            {item.label === 'Category' && anchorEl && (
                <Paper
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 1,
                    minWidth: '200px',
                    backgroundColor: '#656565',
                    color: '#ffffff',
                  }}
                  onMouseEnter={handleSubMenuMouseEnter}
                  onMouseLeave={handleSubMenuMouseLeave}
                >
                  <MenuList>
                    {item.subLinks &&
                      item.subLinks.map((subItem) => (
                        <MaterialMenuItem key={subItem.id} style={{ fontSize: '13px' }}>{subItem.label}</MaterialMenuItem>
                      ))}
                  </MenuList>
                </Paper>
              )}
          </div>
        ))}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
