// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Typography, Avatar, IconButton, TextField, Button } from '@mui/material';
// import { Favorite, Bookmark, BookmarkBorder, Send, LocationOn, ChatBubble } from '@mui/icons-material';
// import { catagoryData } from '../../../common/Component/Cards/CategoryCards/CategoryComponentCard/categoryData';
// // import { useUser } from '../../UserContext';

// const CategoryDetail = () => {
//   const { id } = useParams<{ id: string }>();
// //   const { savedItems, saveItem, removeItem } = useUser();
// //   const isBookmarked = savedItems.includes(Number(id));

//   if (!id) {
//     return <div>Invalid Category item</div>;
//   }

//   const CategoryItem = catagoryData.find(item => item.id.toString() === id);


//   return (
//     <Box display="flex" p={3}>
//       {/* Left Side Image */}
//       <Box flex={1} mr={3}>
//         <img src={CategoryItem.image} alt={CategoryItem.title} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
//       </Box>

//       {/* Right Side Details */}
//       <Box flex={2}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Avatar src={CategoryItem.userProfilePic} />
//           <Typography variant="h6" ml={2}>{CategoryItem.name}</Typography>
//         </Box>
//         <Typography variant="h6" ml={2}>{CategoryItem.title}</Typography>
//         <Typography variant="body1" ml={2}>{CategoryItem.description}</Typography>

//         {/* Comments Section */}

//         {/* Icon Section */}
//         <Box display="flex" alignItems="center">
//           <IconButton>
//             <Favorite />
//           </IconButton>
//           <IconButton>
//             <ChatBubble />
//           </IconButton>
//           <IconButton>
//             <Send />
//           </IconButton>
//           <IconButton>
//             <LocationOn />
//           </IconButton>
//           <IconButton>
//             <Bookmark />
//           </IconButton>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default CategoryDetail;
