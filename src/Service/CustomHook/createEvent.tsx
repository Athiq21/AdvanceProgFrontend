import apiConfig from '../../Authentication/api';
import { FileBlob } from '../../type/FileBlob';

interface CreateEventRequestDTO {
  title: string;
  blob: File;
}

export const createEvent = async (eventData: CreateEventRequestDTO) => {

    try {
        const formData = new FormData();
        const jsonData = new Blob([JSON.stringify({
          name: eventData.title,
       
        })], { type: 'application/json' });
    
        formData.append('data', jsonData);
        formData.append('image', eventData.blob);
        console.log(eventData.blob);

        const response = await apiConfig.post('/offer', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        return response.data;
      } catch (error) {
        throw new Error('Failed to create item');
      }
};