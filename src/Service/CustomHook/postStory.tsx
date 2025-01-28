import apiConfig from "../../Authentication/api";
import axios from 'axios';

export const postStory = async (description: string, files: File[]) => {
    const formData = new FormData();
    formData.append('description', description);
    files.forEach((file) => {
        formData.append('images', file);
    });

    try {
        const response = await apiConfig.post('/stories/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error posting story:', error);
        throw error;
    }
};

export const fetchLatestStory = async (userId: number) => {
    try {
        const response = await axios.get(`/api/stories/user/${userId}/latest`);
        return response.data;
    } catch (error) {
        console.error('Error fetching latest story:', error);
        return null;
    }
};