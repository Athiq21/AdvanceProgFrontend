// import React, { useCallback, useEffect, useState } from 'react';
// import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
// import SearchComponent from '../../../common/Component/SearchBar/SearchComponent';
// import CalendarPicker from '../../../common/Component/Calendar/CalendarPicker';
// import PostCards from '../../../common/Component/Cards/PostCard/PostCards';
// import dayjs, { Dayjs } from 'dayjs';
// import { Post } from '../../../type/Posts';
// import { Page } from '../../../type/Page';
// import usePosts from '../../../Service/CustomHook/getPost';
// import apiConfig from '../../../Authentication/api';
// import CancelButtons from '../../../common/Component/Button/Cancel/CancelButtons';
// import DeleteButton from '../../../common/Component/Button/Delete/DeleteButton';
// import index from '../../../store/index';

// interface PostPageProps {
//   initialPostPage?: Page<Post>;
// }
// const EditPost: React.FC<PostPageProps> = ({ initialPostPage })=> {
//   const { loading, error, postPage, fetchNextPage } = usePosts(initialPostPage ? initialPostPage.number : 0);
//   const [selectedDate,setSelectedDate] =useState<Dayjs|null>(dayjs());
//   const [deletingEventId, setDeletingEventId] = useState<number | null>(null);

//   // Delete Confirm Button
//   const [openDialog, setOpenDialog] = useState(false);
//   const [currentDeleteId, setCurrentDeleteId] = useState<number | null>(null);

// // Handle DialogBox Openeing and Closing
//   const handleClickOpenDialog = (id: number) => {
//     setCurrentDeleteId(id);
//     setOpenDialog(true);
//   };
  
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setCurrentDeleteId(null);
//   };
  
//   const handleConfirmDelete = async () => {
//     if (currentDeleteId !== null) {
//       await handleDelete(currentDeleteId);
//     }
//     handleCloseDialog();
//   };

//   const handleScroll = useCallback(() => {
//     if (
//       window.innerHeight + window.scrollY >= document.body.offsetHeight &&
//       !loading &&
//       postPage && 
//       !postPage.last 
//     ) {
//       fetchNextPage(); 
//     }
//   }, [loading, postPage, fetchNextPage]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);


//   const handleDateChange = (date: Dayjs | null) => {
//     setSelectedDate(date);
//   };

//   const handleDelete = async (id: number) => {
//     console.log('Deleting event with ID:', id);

//     if (typeof id !== 'number' || isNaN(id)) {
//       console.error('Invalid ID:', id);
//       return;
//     }

//     setDeletingEventId(id); 
//     try {
//       await apiConfig.delete(`/posts/${id}`);
//       console.log(`Post with ID ${id} deleted successfully.`);
//       window.location.reload();
//     } catch (error) {
//       console.error('Failed to delete post:', error);
//       setDeletingEventId(null); 
//     }
//   };

//   if (loading && (postPage === undefined || postPage?.number === 0)) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </div>
//     );
//   }


  
//   if (error) return <div>{error}</div>;
//   if (!postPage) return null; 

//   const uniquePosts = Array.from(new Set(postPage.content.map(post => post.id)))
//   .map(id => postPage.content.find(post => post.id === id));


//   return (
//     <>
//    <Box display="flex" alignItems="center" sx={{ marginBottom: 2, marginTop: '25px' }}>
    
//         <SearchComponent value={''} onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
//           throw new Error('Function not implemented.');
//         } }/>
//         {/* <CalendarPicker selectedDate={selectedDate} onDateChange={handleDateChange} /> */}

//       </Box>
      
        
//       <Container sx={{alignItems:'center', justifyContent:'center'}}>

//       {uniquePosts.map((post, index) => (
//           <Grid item xs={12} sm={8} md={6} key={index}>
//             <PostCards
           
//             showEyeIcon={false}
//             showMoreIcon={true}
//             onDelete={(id) => handleClickOpenDialog(id)}
//             liked={false} onLikeToggle={function (): void {
//               throw new Error('Function not implemented.');
//             } } post={post}            />
//           </Grid>
//         ))}
//       </Container>



// {/* dialog box */}
//     <Dialog open={openDialog} onClose={handleCloseDialog}>
//       <DialogTitle>Confirm Delete</DialogTitle>
//       <DialogContent>
//         Are you sure you want to delete this post?
//       </DialogContent>
//       <DialogActions>
//         <CancelButtons onClick={handleCloseDialog}>
//           Cancel
//         </CancelButtons>
//         <DeleteButton onClick={handleConfirmDelete} >
//           Delete
//         </DeleteButton>
//       </DialogActions>
//     </Dialog>

//     </>
//   );
// };

// export default EditPost;



import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import SearchComponent from '../../../common/Component/SearchBar/SearchComponent';
import CalendarPicker from '../../../common/Component/Calendar/CalendarPicker';
import PostCards from '../../../common/Component/Cards/PostCard/PostCards';
import dayjs, { Dayjs } from 'dayjs';
import { Post } from '../../../type/Posts';
import { Page } from '../../../type/Page';
import usePosts from '../../../Service/CustomHook/getPost';
import apiConfig from '../../../Authentication/api';
import CancelButtons from '../../../common/Component/Button/Cancel/CancelButtons';
import DeleteButton from '../../../common/Component/Button/Delete/DeleteButton';

interface PostPageProps {
  initialPostPage?: Page<Post>;
}

const EditPost: React.FC<PostPageProps> = ({ initialPostPage }) => {
  const { loading, error, postPage, fetchNextPage } = usePosts(initialPostPage ? initialPostPage.number : 0);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [deletingEventId, setDeletingEventId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState<number | null>(null);

  const handleClickOpenDialog = (id: number) => {
    setCurrentDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (currentDeleteId !== null) {
      await handleDelete(currentDeleteId);
    }
    handleCloseDialog();
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading &&
      postPage &&
      !postPage.last
    ) {
      fetchNextPage();
    }
  }, [loading, postPage, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleDelete = async (id: number) => {
    console.log('Deleting event with ID:', id);

    if (typeof id !== 'number' || isNaN(id)) {
      console.error('Invalid ID:', id);
      return;
    }

    setDeletingEventId(id);
    try {
      await apiConfig.delete(`/posts/${id}`);
      console.log(`Post with ID ${id} deleted successfully.`);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete post:', error);
      setDeletingEventId(null);
    }
  };

  if (loading && (postPage === undefined || postPage?.number === 0)) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  if (!postPage) return null;

  const uniquePosts = Array.from(new Set(postPage.content.map(post => post.id)))
    .map(id => postPage.content.find(post => post.id === id));

  return (
    <>
   <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    marginBottom: 2,
    marginTop: '15px',
    marginLeft: '10px',
  }}
>
  <SearchComponent
    value={''}
    onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
      throw new Error('Function not implemented.');
    }}
  />
</Box>


      <Container>
        <Grid container spacing={2} justifyContent="center"> {/* Use Grid container */}
          {uniquePosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}> {/* Adjusted sizing to 6 */}
              <PostCards
                showEyeIcon={false}
                showMoreIcon={true}
                onDelete={(id) => handleClickOpenDialog(id)}
                liked={false}
                onLikeToggle={function (): void {
                  throw new Error('Function not implemented.');
                }}
                post={post}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Dialog box */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <CancelButtons onClick={handleCloseDialog}>
            Cancel
          </CancelButtons>
          <DeleteButton onClick={handleConfirmDelete}>
            Delete
          </DeleteButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditPost;
