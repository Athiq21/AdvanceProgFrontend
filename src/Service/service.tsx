// import apiConfig from '../Authentication/api';


// export const fetchItems = async () => {
//     const response = await apiConfig.get('/items');
//     const data = response.data.map((post: any) => ({
//       ...post,
//       blobset: Array.isArray(post.blobset) ? post.blobset : [post.blobset],
//     }));
//     console.log('Fetched items:', data); 
//     return data;
//   };

import apiConfig from '../Authentication/api';
import { FileBlob } from '../type/FileBlob';
import { Page } from '../type/Page';


interface Post {
  profilePic: string;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  blobs: FileBlob[];
  likeCount: number;
}



export const fetchPostPagination = async (pageNumber: number): Promise<Page<Post>> => {
  try {
    const response = await apiConfig.get(`/posts?pageNo=${pageNumber}`);
    // const data = response.data.map((post: any) => ({
    //   ...post,
    //   blobs: post.blobs.map((post: any) => ({
    //     id: post.id,
    //     uuid: post.uuid
    //   })) 
    // })); 
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw new Error('Failed to fetch posts');
  }
};


// export const fetchPosts = async () => {
//     try {
//         const response = await apiConfig.get('/api/posts');
//         const data = response.data.map((post: any) => ({
//             ...post,
//             imageUrl: Array.isArray(post.imageUrl) ? post.imageUrl : [post.imageUrl], // Ensure imageUrl is an array
//         }));
//         return data;
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         throw new Error('Failed to fetch posts');
//     }
// };
