// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Typography, Avatar, IconButton, TextField, Button, Container } from '@mui/material';
// import { Favorite, Bookmark, BookmarkBorder, Send, LocationOn, ChatBubble } from '@mui/icons-material';
// import { catagoryData } from '../../common/Component/Cards/CategoryCards/CategoryComponentCard/categoryData';
// import Buttons from '../../common/Component/Button/Buttons';
// import CardDescription from '../../common/Component/Cards/CategoryCards/CardDescription/CardDescription';
// import CardDes from '../../common/Component/Cards/CategoryCards/CardDescription/CardDes';
// // import { useUser } from '../../UserContext';


// const CategoryDescription: React.FC = () => {
//   const { id } = useParams<{ id: string }>();

//   if (!id) {
//     return <div>Invalid category item</div>;
//   }

//   const categoryItem = catagoryData.find(item => item.id.toString() === id);

//   if (!categoryItem) {
//     return <div>Invalid category not found</div>;
//   }

// //   const handleBookmarkClick = () => {
// //     if (isBookmarked) {
// //       removeItem(Number(id));
// //     } else {
// //       saveItem(Number(id));
// //     }
// //   };

//   return (
//     <>
//         {/* <CardDescription
//          photos={categoryItem.image} 
//          profilePic={categoryItem.userProfilePic}
//          username={categoryItem.name}
//          title={categoryItem.title} 
//          description={categoryItem.Description}
//         onMessageClick={() => console.log('Message button clicked')} 
//         onSaveClick={() => console.log('icon Saved')}
//          onForwardClick={ () => console.log('forward')}/> */}
//          <CardDes
//           photos={categoryItem.image} 
//           profilePic={categoryItem.userProfilePic}
//           username={categoryItem.name} 
//           title={categoryItem.title} 
//           description={categoryItem.Description}
//           onMessageClick={() => console.log('Message button clicked')} 
//           onSaveClick={() => console.log('icon Saved')} 
//       onForwardClick={() => console.log('forward') }/>

//     </>
//   );
// };

// export default CategoryDescription;
 const  CategoryDescription =()=>{
  return(<>
    CategoryDescription
    </>)
 }

export default CategoryDescription;