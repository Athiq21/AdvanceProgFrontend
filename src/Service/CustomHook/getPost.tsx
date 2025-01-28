// // import { useState, useEffect } from 'react';
// // import { fetchPosts } from '../service';

// // interface FileBlob {
// //   id: string;
// //   uuid: string;
// // }

// // interface Post {
// //   profilePic: string;
// //   firstName: string;
// //   lastName: string;
// //   title: string;
// //   description: string;
// //   blobs: FileBlob[];
// //   likeCount: number;
// // }
// // export const usePosts = () => {
// //   const [posts, setPosts] = useState<Post[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const getPosts = async () => {
// //       try {
//         // const data = await fetchPosts();
// //         setPosts(data);
// //       } catch (err) {
// //         setError('Sorry, failed to load posts');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     getPosts();
// //   }, []);

// //   return { posts, loading, error };
// // };

// // import { useState, useEffect } from 'react';
// // import { fetchPosts } from '../service';
// // import { Page } from '../../type/Page';
// // import { Post } from '../../type/Posts';


// // export const usePosts = (pageNumber: number) => {
// //   const [posts, setPosts] = useState<Page<Post>>();
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const getPosts = async () => {
// //       try {
// //         const data = await fetchPosts(pageNumber);
// //         setPosts(data);
// //       } catch (err) {
// //         setError('Sorry, failed to load posts');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     getPosts();
// //   }, []);



// //   return { posts, loading, error };
// // };

// import { useState, useEffect } from 'react';
// import { Page } from '../../type/Page';
// import { Post } from '../../type/Posts';
// import { fetchPostPagination } from '../service';

// function usePosts(initialPageNumber: number) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [postPage, setPostPage] = useState<Page<Post> | null>(null);
//   const [pageNumber, setPageNumber] = useState(initialPageNumber);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchPostPagination(pageNumber);
       
//         setPostPage((prevPage) => {
//           if (!prevPage) return data; // Initial load
//           return {
//             ...data,
//             content: [...prevPage.content, ...data.content], // Append new posts
//           };
//         });
//       } catch (err) {
//         setError('Failed to load posts');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts(); // Fetch posts when pageNumber changes
//   }, [pageNumber]);

//   const fetchNextPage = () => {
//     setPageNumber((prevPageNumber) => prevPageNumber + 1);
//   };

//   return { loading, error, postPage, fetchNextPage };
// }

// export default usePosts;


import { useState, useEffect } from 'react';
import { Page } from '../../type/Page';
import { Post } from '../../type/Posts';
import { fetchPostPagination } from '../service';

function usePosts(initialPageNumber: number) {
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [postPage, setPostPage] = useState<Page<Post> | null>(null); // Current posts
  const [pageNumber, setPageNumber] = useState(initialPageNumber); // Current page number

  // Fetch posts when the component mounts or the pageNumber changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error before new request
      try {
        const data = await fetchPostPagination(pageNumber); // Fetch paginated posts

        setPostPage((prevPage) => {
          if (!prevPage) return data; // If first load, set data directly
          return {
            ...data,
            content: [...prevPage.content, ...data.content], // Append new posts to the previous posts
          };
        });
      } catch (err) {
        setError('Failed to load posts'); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPosts(); // Call the fetchPosts function
  }, [pageNumber]);

  // Function to fetch the next page of posts
  const fetchNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return { loading, error, postPage, fetchNextPage }; // Return loading, error, posts, and function to fetch the next page
}

export default usePosts;
