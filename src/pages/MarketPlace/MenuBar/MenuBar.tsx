import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    onSearch: (query: string) => void;
    onAllClick: () => void; // New prop to handle the "All" click
}

const MenuBar: React.FC<SidebarProps> = ({ onSearch, onAllClick }) => {
    const [open, setOpen] = useState<boolean>(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();

    const handlesold = () => {
        navigate('/home/sold');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {isMobile && (
                <IconButton onClick={handleDrawerToggle} sx={{ mb:- 2 }}>
                    <MenuIcon />
                </IconButton>
            )}

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
                        height: '92px',
                        boxShadow: 3,
                        borderRadius: 2,
                        mt: isMobile ? 7.5 : 18,
                        ml: isMobile ? 0 : 4,
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
                        marginTop: '2px',
                    }}>
                        <TextField 
                            variant="outlined" 
                            size="small"
                            placeholder="Search..."
                            onChange={(e) => onSearch(e.target.value)} 
                            sx={{ 
                                width: "60px",
                                height: '20px',
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
                    </Box>

                    <Box sx={{ fontSize: '60px' }}>
                        <List>
                            <ListItem button onClick={onAllClick}> {/* Updated here */}
                                <ListItemText primary="All" 
                                    primaryTypographyProps={{ sx: { fontSize: '10px' } }} />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default MenuBar;

