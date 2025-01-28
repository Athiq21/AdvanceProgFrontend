import apiConfig from "../../Authentication/api";

export const updateProfilePic = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await apiConfig.put('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return response.data;
  };
  
  export const updatePrimarySettings = async (data: any) => {
    const response = await apiConfig.put('/user', data);
    return response.data;
  };
  