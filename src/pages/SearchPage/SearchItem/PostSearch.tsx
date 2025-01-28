// import React, { useState, useEffect } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import PostCards from '../../../common/Component/Cards/PostCard/PostCards';
// import apiConfig from '../../../Authentication/api';

// interface PostSearchProps {
//   searchQuery: string;
// }

// const PostSearch: React.FC<PostSearchProps> = ({ searchQuery }) => {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await apiConfig.get('/posts'); 
//         setPosts(response.data.content);
//         setFilteredPosts(response.data.content);
//       } catch (err) {
//         setError('Failed to fetch posts.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       const lowercasedQuery = searchQuery.toLowerCase();
//       const results = posts.filter(post => {
      
//         const titleParts = post.title.toLowerCase().split(' ');
//         const matchesTitle = titleParts.some(part => part.includes(lowercasedQuery));

        
//         const matchesDescription = post.description.toLowerCase().includes(lowercasedQuery);

//         return matchesTitle || matchesDescription;
//       });
//       setFilteredPosts(results);
//     } else {
//       setFilteredPosts(posts);
//     }
//   }, [searchQuery, posts]);

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box marginTop={"180px"}>
//       {filteredPosts.length > 0 ? (
//         filteredPosts.map(post => (
//           <Box key={post.id} mb={2}>
//             <PostCards
//               onDelete={() => {
                
//                 console.log('Delete post:', post.id);
//               }}
//               liked={false} 
//               onLikeToggle={() => {
               
//                 console.log('Like toggled for post:', post.id);
//               }}
//               post={post}
//             />
//           </Box>
//         ))
//       ) : (
//         <Typography>No posts found.</Typography>
//       )}
//     </Box>
//   );
// };

// export default PostSearch;


import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import PostCards from '../../../common/Component/Cards/PostCard/PostCards';
import apiConfig from '../../../Authentication/api';
import ViewCard from '../../../common/Component/Cards/View/ViewCard';

interface PostSearchProps {
  searchQuery: string;
}

const PostSearch: React.FC<PostSearchProps> = ({ searchQuery }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

  // States for ViewCard
  const [viewCardOpen, setViewCardOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null); // Replace with your post type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConfig.get('/posts'); 
        setPosts(response.data.content);
        setFilteredPosts(response.data.content);
      } catch (err) {
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const results = posts.filter(post => {
        const titleParts = post.title.toLowerCase().split(' ');
        const matchesTitle = titleParts.some(part => part.includes(lowercasedQuery));
        const matchesDescription = post.description.toLowerCase().includes(lowercasedQuery);
        return matchesTitle || matchesDescription;
      });
      setFilteredPosts(results);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  const handleView = (post) => {
    setSelectedPost(post);
    setViewCardOpen(true);
  };

  const handleCloseViewCard = () => {
    setViewCardOpen(false);
    setSelectedPost(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box marginTop={"100px"}>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <Box key={post.id} mb={2}>
            <PostCards
              post={post}
              onDelete={() => {
                console.log('Delete post:', post.id);
              }}
              liked={false} 
              onLikeToggle={() => {
                console.log('Like toggled for post:', post.id);
              }}
              showEyeIcon={true}
            />
          </Box>
          
        ))
      ) : (
        <Typography>No posts found.</Typography>
      )}

      <ViewCard 
        open={viewCardOpen} 
        onClose={handleCloseViewCard} 
        userId={selectedPost?.userId || null} // Pass userId if needed
        profilePic={selectedPost?.userImageUrl || ''} // Ensure to have this data in your post
        username={selectedPost?.userName || ''} // Ensure to have this data in your post
        designation={selectedPost?.userDesignation || ''} // Ensure to have this data in your post
        designationUrl={selectedPost?.userDesignationUrl || ''} // Ensure to have this data in your post
      />
    </Box>
  );
};

export default PostSearch;
