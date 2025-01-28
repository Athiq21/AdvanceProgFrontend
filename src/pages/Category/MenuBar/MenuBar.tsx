import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';

const iconMap: { [key: string]: JSX.Element } = {
  electronic: <DevicesOutlinedIcon  />,
  vehicle: <DirectionsCarOutlinedIcon />,
  property: <AddHomeOutlinedIcon />,
  Cake: <CakeOutlinedIcon />,
  fashion: <WatchOutlinedIcon />,
  homeGarden: <GrassOutlinedIcon />,
  other: <Inventory2OutlinedIcon />,
};

const Data = [
  { label: 'Electronic', path: '/electronic' },
  { label: 'Vehicle', path: '/vehicles' },
  { label: 'Property', path: '/properties' },
  { label: 'Cake', path: '/cakes' },
  { label: 'fashion', path: '/fashions' },
  { label: 'Home & Garden', path: '/homeG' },
  { label: 'Other', path: '/others' },
];

const MenuBar = () => {
  const { pathname } = useLocation();
  
  return (
    <Box style={{ 
      backgroundColor: '#E6E6E6',
      color: 'black',
      height: '60px',
      marginLeft:'80px',
    }}>
      <Box >
        {Data.map((item) => {
          const isSelected = pathname === item.path;
          return (
            <div
              key={item.label}
              // style={{
              //   margin: '0 10px',
              //   display: 'flex',
              //   flexDirection: 'column',
              //   alignItems: 'center',
              //   cursor: 'pointer',
              // }}
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
              <Typography
                variant="caption"
                style={{
                  color: isSelected ? '#000000' : '#6C6B6B', 
                }}
              >
                {item.label}
              </Typography>
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default MenuBar;
