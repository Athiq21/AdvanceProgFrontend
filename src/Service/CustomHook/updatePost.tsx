// import apiConfig from "../../Authentication/api";

import apiConfig from "../../Authentication/api";
import { Post } from "../../type/Posts";

interface UpdatePostRequestDTO {
  title: string;
  description: string;
  id:number;
  // selectedImages: File[];
}

export const updatePost = async (postData: UpdatePostRequestDTO) => {
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify({
    title: postData.title,
    description:postData.description,
  }
)], { type: 'application/json' });
formData.append('data',jsonBlob);
  
    try {
      const response = await apiConfig.put(`/posts/${postData.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(`Post with ID ${postData.id} updated successfully.`);
      return response.data;
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };
  

// export const handleEdit = async (id: number, updatedPost: any, updateUI: (updatedPost: any) => void) => {
//   console.log('Editing post with ID:', id);

//   try {
//     const response = await apiConfig.put(`/posts/${id}`, updatedPost);
//     console.log(`Post with ID ${id} updated successfully.`);

//     // Update the UI state without reloading the page
//     updateUI(response.data);
//   } catch (error) {
//     console.error('Failed to update post:', error);
//     alert('Failed to update post. Please try again.');
//   }
// };
