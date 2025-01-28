// import React, { useState } from 'react';
// import { Dialog, DialogContent, Box, Typography, IconButton, CardMedia, Avatar } from '@mui/material';
// import { ArrowForward, ArrowBack, Save, Forward } from '@mui/icons-material';
// import Buttons from '../../Button/Buttons'; // Adjust path as necessary

// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import {  Send } from '@mui/icons-material';

// interface DescriptionCardProps {
//   open: boolean;
//   onClose: () => void;
//   images: string[];
//   userProfilePic: string;
//   userName: string;
//   title: string;
//   description: string;
// }

// const MarketDescriptionCard: React.FC<DescriptionCardProps> = ({ open, onClose, images, userProfilePic, userName, title, description }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNextImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePreviousImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };
//   const [isBookmarked, setIsBookmarked] = useState(false);


 

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{
//         sx: {
//           borderRadius: 2,
//           width: '80%',
//           height: '80%'
//         }
//       }}>
//       <DialogContent sx={{ p: 0 }}>
//         <Box sx={{ display: 'flex', height: '100%' }}>
//           <Box sx={{ width: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <IconButton onClick={handlePreviousImage} sx={{ position: 'absolute', top: '50%', left: 0, zIndex: 1 }}>
//               <ArrowBack />
//             </IconButton>
//             <CardMedia
//               component="img"
//               image={images[currentIndex]}
//               alt="popup image"
//               sx={{ height: '100%', width: '100%', objectFit: 'cover', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
//             />
//             <IconButton onClick={handleNextImage} sx={{ position: 'absolute', top: '50%', right: 0, zIndex: 1 }}>
//               <ArrowForward />
//             </IconButton>
//           </Box>
//           <Box sx={{ width: '50%', pl: 2, display: 'flex', flexDirection: 'column' }}>
//             <Box display="flex" alignItems="center" mb={2} marginTop='10px'>
//               <Avatar src={userProfilePic} sx={{ mr: 1, width: 40, height: 40 }} />
//               <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>{userName}</Typography>
//             </Box>
//             <Typography >{title}</Typography>
//             <Typography>{description}</Typography>
//             <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end', p: 2 }}>
//               <Buttons buttonText="Message" />
//               <IconButton aria-labl="Add to favorites" >
//          <BookmarkBorderIcon />
//       </IconButton>
//               <IconButton sx={{ ml: 1 }}>
//                 <Send />
//               </IconButton>
//             </Box>
//           </Box>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default MarketDescriptionCard;
