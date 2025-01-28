import axios from 'axios';
import apiConfig from '../../Authentication/api';

export const createItem = async (itemData: CreateItemRequestDTO) => {
  try {
    const formData = new FormData();
    const jsonData = new Blob([JSON.stringify({
      name: itemData.title,
      description: itemData.description,
      category: { id: itemData.category.id },  
      subCategory: itemData.subCategory ? { id: itemData.subCategory.id } : undefined,  

    })], { type: 'application/json' });

    formData.append('data', jsonData);
    formData.append('file', itemData.blob);

    const response = await apiConfig.post('/items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to create item');
  }
};
