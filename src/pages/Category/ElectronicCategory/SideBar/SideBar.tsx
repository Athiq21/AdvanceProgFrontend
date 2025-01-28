
import React, { useState } from 'react';
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, InputAdornment, useMediaQuery, useTheme, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SellIcon from '@mui/icons-material/AttachMoney';

import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setOpen(!open);
    };


    const navigate = useNavigate();

    const handleall = () => {
        navigate('/home/markets');
    };

    const handlesold = () => {
        navigate('/home/sold');
    };
    return (
        <Box sx={{ display: 'flex' }}>
            {/* Button to open the sidebar on mobile */}
            {isMobile && (
                <IconButton onClick={handleDrawerToggle} sx={{ mb: 2 }}>
                    <MenuIcon />
                </IconButton>
            )}

            {/* Sidebar Drawer */}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={open}
                onClose={handleDrawerToggle}
                sx={{
                    width: isMobile ? 200 : 250,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMobile ? 250 : 250,
                        boxSizing: 'border-box',
                        height: '152px',
                        boxShadow: 3,
                        borderRadius: 2,
                        mt: isMobile ? 0 : 20, 
                        ml: isMobile ? 0 : 4
                    },
                }}
            >
                <Box sx={{ padding: 0.4 }}>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 1,
                        flexDirection: 'row',
                        gap: 1,
                    }}>
                        <TextField 
                        
                            variant="outlined" 
                            size="small"
                            placeholder="Search..."
                            sx={{ 
                                width:"60px",
                                height:'20px',
                                flexGrow: 1,
                                borderRadius: 20,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 20,
                                    '& fieldset': {
                                        borderColor: 'divider',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                            }} 
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton >
                            <FilterListIcon  />
                        </IconButton>
                    </Box>
                    
                    <Box sx={{fontSize:'60px'}}>
                    <List >
                        <ListItem
                            button
                            onClick={handleall}
                            sx={{ 
                                borderRadius: 1, 
                              
                               
                            }}
                        >
                            <ListItemText sx={{marginLeft:'8px'}}primary="All" 
                            primaryTypographyProps={{ sx: { fontSize: '10px' } }}  />
                        </ListItem>
                        <ListItem
                            button
                          
                        >
                            <ListItemIcon onClick={handlesold}  sx={{ minWidth: '30px', mr: 0 }}>
                                <SellIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary="Sell Item" 
                             primaryTypographyProps={{ sx: { fontSize: '10px', } }} />
                        </ListItem>
                    </List>
                    </Box>

                </Box>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
