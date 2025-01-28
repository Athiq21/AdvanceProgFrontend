import apiConfig from '../../Authentication/api';

export const getItemsByCategory = async (categoryId: string) => {
  const response = await apiConfig.get(`/items?category=${categoryId}`);
  return response.data;
};
