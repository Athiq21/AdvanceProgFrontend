// import React, { useState } from 'react';
// import { Card, CardMedia, IconButton, Box, Avatar, Menu, MenuItem, CardHeader, Button } from '@mui/material';
// import { BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon, Send, MoreVert, Visibility, Edit, Delete } from '@mui/icons-material';
// import ViewCard from '../View/ViewCard';
// import AddButtons from '../../Button/Add/AddButtons';
// import MarketDescriptionCard from './MarketDescriptionCard';
// import EditMarketCard from './EditMarketCard';

// interface MainCardProps {
//   id: number;userProfilePic: string;
//   userName: string;
//   title: string;
//   description: string;
//   images: string[];
//   onSave: () => void;
//   onForward: () => void;
//   onEdit?: () => void;
//   onDelete?: () => void;
//   showEyeIcon?: boolean;
//   showMoreIcon?: boolean;
//   categoryOptions?: string[];
//   subCategoryOptions?: string[];
//   showForwardButton?: boolean;
//   onForwardButtonClick?: () => void;
// }

// const MarketCards: React.FC<MainCardProps> = ({
//   id,
//   userProfilePic,
//   userName,
//   title,
//   description,
//   images,
//   onSave,
//   onForward,
//   onEdit,
//   onDelete,
//   showEyeIcon,
//   showMoreIcon,
//   categoryOptions = [],
//   subCategoryOptions = [],
//   showForwardButton = false,
//   onForwardButtonClick
// }) => {
//   const [open, setOpen] = useState(false);
//   const [editPopupOpen, setEditPopupOpen] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [profilePopupOpen, setProfilePopupOpen] = useState(false);

//   const handleImageClick = () => {
//     setOpen(true);
//   };

//   const handleClickMoreVert = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleEdit = () => {
//     setEditPopupOpen(true);
//     handleCloseMenu();
//   };

//   const handleDelete = () => {
//     onDelete?.();
//     handleCloseMenu();
//   };

//   const handleSave = () => {
//     setIsBookmarked(!isBookmarked);
//     onSave();
//   };

//   const handleProfilePopupOpen = () => setProfilePopupOpen(true);
//   const handleProfilePopupClose = () => setProfilePopupOpen(false);

//   const handleEditPopupClose = () => setEditPopupOpen(false);

//   const handleSaveEdit = (title: string, description: string, category: string, subCategory: string) => {
//     // Implement saving logic here
//     console.log('Saved Edit:', title, description, category, subCategory);
//     setEditPopupOpen(false);
//   };

//   return (
//     <>
//       <Card
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           marginTop: '5px',
//           height: '310px',
//           width: '260px',
//           borderRadius: '10px',
//           '@media (max-width: 600px)': {
//             width: '240px',
//             height: '300px',
//           }
//         }}
//       >
//         <CardHeader
//           avatar={<Avatar src={userProfilePic} />}
//           title={title}
//           sx={{ cursor: 'pointer', position: 'relative' }}
//           action={
//             <>
//               {showMoreIcon && (
//               <IconButton aria-label="more" onClick={handleClickMoreVert} sx={{ position: 'absolute', right: 0, top: 16}}>
//                 <MoreVert />
//               </IconButton>
//                   )}
//               {showEyeIcon && (
//                 <IconButton aria-label="view-profile" onClick={handleProfilePopupOpen} sx={{ position: 'absolute', right: 40, top: 16 }}>
//                   <Visibility />
//                 </IconButton>
//               )}
//             </>
//           }
//         />
//         <CardMedia
//           component="img"
//           image={images}
//           alt="card image"
//           onClick={handleImageClick}
//           sx={{ height: '180px', objectFit: 'cover' }}
//         />
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
//           {showForwardButton && (
//             <AddButtons
//               variant="contained"
//           sx={{width:'60px'}}
//               onClick={onForwardButtonClick} text={''}            >
//               Sold
//             </AddButtons>
//           )}
//           <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
//             <IconButton aria-label="Add to favorites" onClick={handleSave} sx={{marginTop:'8px'}}>
//               {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
//             </IconButton>
//             <IconButton onClick={onForward}>
//               <Send sx={{ rotate: '-38deg' }} />
//             </IconButton>
//           </Box>
//         </Box>
//         <ViewCard
//           open={profilePopupOpen}
//           onClose={handleProfilePopupClose}
//           profilePic={userProfilePic}
//           username={userName}
//         />
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleCloseMenu}
//         >
//           {onEdit && (
//             <MenuItem onClick={handleEdit}>
//               <Edit sx={{ mr: 1 }} /> Edit
//             </MenuItem>
//           )}
//           {onDelete && (
//             <MenuItem onClick={handleDelete}>
//               <Delete sx={{ mr: 1 }} /> Delete
//             </MenuItem>
//           )}
//         </Menu>
//       </Card>
//       <MarketDescriptionCard
//         userProfilePic={userProfilePic}
//         userName={userName}
//         title={title}
//         description={description}
//         open={open}
//         onClose={() => setOpen(false)}
//         images={images}
//       />
//       {onEdit && (
//         <EditMarketCard
//           open={editPopupOpen}
//           onClose={handleEditPopupClose}
//           userProfilePic={userProfilePic}
//           userName={userName}
//           title={title}
//           description={description}
//           images={images}
//           categoryOptions={categoryOptions}
//           subCategoryOptions={subCategoryOptions}
//           onSave={handleSaveEdit}  
//         />
//       )}
//     </>
//   );
// };

// export default MarketCards;
