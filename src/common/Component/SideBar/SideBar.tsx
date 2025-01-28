// import React, { useState, useEffect } from 'react';
// import { Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery, useTheme, Box, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// const drawerWidth = 250;
// const maxDrawerHeight = 350;

// interface SideBarProps {
//   data: Array<{ id: number; name: string }>;
//   selectedItem: number;
//   onItemClick: (id: number) => void;
// }

// const SideBar: React.FC<SideBarProps> = ({ data, selectedItem, onItemClick }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const [open, setOpen] = useState(false);
//   const [drawerHeight, setDrawerHeight] = useState('auto');

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   const closeDrawer = () => {
//     if (isSmallScreen) {
//       setOpen(false);
//     }
//   };

//   useEffect(() => {
//     const itemHeight = 32;
//     const maxItems = 12;
//     const calculatedHeight = Math.min(data.length * itemHeight, itemHeight * maxItems);
//     setDrawerHeight(calculatedHeight > maxDrawerHeight ? `${maxDrawerHeight}px` : `${calculatedHeight}px`);
//   }, [data]);

//   return (
//     <Box>
//       {isSmallScreen ? (
//         <IconButton onClick={toggleDrawer} aria-label="menu">
//           <MenuIcon />
//         </IconButton>
//       ) : null}
//       <Drawer
//         variant={isSmallScreen ? 'temporary' : 'permanent'}
//         anchor="left"
//         open={isSmallScreen ? open : true}
//         onClose={toggleDrawer}
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             maxHeight: maxDrawerHeight,
//             width: drawerWidth,
//             marginLeft: '30px',
//             marginTop: '350px',
//             position: 'fixed',
//             borderRadius: '2px',
//             boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
//             overflowY: 'auto',
//             overflowX: 'hidden', 
//           },
//         }}
//       >
//         <Box
//           sx={{
//             height: drawerHeight,
        
//           }}
//         >
//           <List>
//             {data.map((item) => (
//               <ListItem 
//                 button 
//                 key={item.id} 
//                 onClick={() => { onItemClick(item.id); closeDrawer(); }}
//                 selected={item.id === selectedItem}
//               >
//                 <ListItemText 
//                   primary={
//                     <Typography sx={{ fontSize: '12px' }}>
//                       {item.name}
//                     </Typography>
//                   } 
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// };

// export default SideBar;


import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery, useTheme, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 250;
const maxDrawerHeight = 350;

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface SideBarProps {
  categories: Category[];
  selectedCategory: number | null;
  selectedSubcategory: number | null;
  onCategoryClick: (id: number) => void;
  onSubcategoryClick: (id: number) => void;
}

const SideBar: React.FC<SideBarProps> = ({ categories, selectedCategory, selectedSubcategory, onCategoryClick, onSubcategoryClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState('auto');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    if (isSmallScreen) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const itemHeight = 32;
    const maxItems = 12;
    const calculatedHeight = Math.min(categories.length * itemHeight, itemHeight * maxItems);
    setDrawerHeight(calculatedHeight > maxDrawerHeight ? `${maxDrawerHeight}px` : `${calculatedHeight}px`);
  }, [categories]);

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
            maxHeight: maxDrawerHeight,
            width: drawerWidth,
            marginLeft: '30px',
            marginTop: '350px',
            position: 'fixed',
            borderRadius: '2px',
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
            overflowY: 'auto',
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            height: drawerHeight,
          }}
        >
          <List>
            {categories.map((category) => (
              <div key={category.id}>
                <ListItem 
                  button 
                  onClick={() => onCategoryClick(category.id)}
                  selected={category.id === selectedCategory}
                >
                  <ListItemText 
                    primary={
                      <Typography sx={{ fontSize: '12px' }}>
                        {category.name}
                      </Typography>
                    } 
                  />
                </ListItem>
                {category.id === selectedCategory && (
                  <List sx={{ pl: 4 }}>
                    {category.subcategories.map((subcategory) => (
                      <ListItem 
                        button 
                        key={subcategory.id}
                        onClick={() => onSubcategoryClick(subcategory.id)}
                        selected={subcategory.id === selectedSubcategory}
                      >
                        <ListItemText 
                          primary={
                            <Typography sx={{ fontSize: '10px' }}>
                              {subcategory.name}
                            </Typography>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideBar;









  {/* <Container sx={{maxWidth :"680px", paddingTop:10}} > */}
          {/* <Box sx={{
             bgcolor: '#F1F1F1',
              height: '100%',
              display: 'flex',  
              justifyContent: 'center',  
              alignItems: 'center', paddingTop: 2, borderRadius:8, paddingBottom: 2}}>

    <Stack
          spacing={1}
          alignItems="center"
        >
                    <Avatar sx={{height:180, width:180}}></Avatar>
                    <Typography>User</Typography>
                    <Typography>IT- Department</Typography>
                    <Typography sx={{paddingTop:5}}>Category Item</Typography>
                    <Typography>Travel Post</Typography>
                    <Typography>Events</Typography>
                    <Typography onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>Account Setting</Typography>


    </Stack>

          </Box> */}


        {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change your Setting</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
            <Avatar></Avatar>

            <Typography>Primary Setting</Typography>
            <TextField id="standard-basic" label="Name" variant="standard"  required/>

            <Typography sx={{paddingTop:2}}>Password Setting</Typography>
            <FormControl sx={{ m: 1, width: '25ch', color:'red'}} variant="standard">
          <InputLabel>Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'password'}
          />
        </FormControl>
       
          
          </DialogContentText> */}
          {/* Add your account setting form or content here */}
        {/* </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>

       </Container> */}