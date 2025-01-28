import apiConfig from '../../Authentication/api';

interface CreatePostRequestDTO {
  title: string;
  description: string;
  selectedImages: File[];
}

export const createPost = async (postData: CreatePostRequestDTO) => {

  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify({
    title: postData.title,
    description:postData.description,
  }
  )], { type: 'application/json' });
    formData.append('data',jsonBlob);

  postData.selectedImages.forEach((file) => {
    formData.append('files', file);
  });

  try {
    const response = await apiConfig.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};