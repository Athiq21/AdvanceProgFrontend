import { useState, useEffect } from 'react';
import apiConfig from '../../Authentication/api';

interface User {
  id: number;
  image_url: string;
  first_name: string; 
}


interface Story {
  id: number;
  description: string;
  imagePath: string;
  createdAt: string;
  user: User;
}

export const useStories = (endpoint: string) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStories = async (): Promise<Story[]> => {
    try {
      const response = await apiConfig.get(endpoint); 
      console.log('API Response:', response.data); 
      const data = response.data.map((story: any) => {
        console.log('Story:', story);
        const user = story.user ? {
          id: story.user.id,
          image_url: story.user.image_url,
        } : { id: 0, image_url: '' };
        return {
          id: story.id,
          description: story.description,
          imagePath: story.imagePath,
          createdAt: story.createdAt,
          user,
        };
      });
      
      return data;
    } catch (error) {
      console.error('Error fetching stories:', error);
      throw new Error('Failed to fetch stories');
    }
  };

  const loadStories = async () => {
    try {
      const fetchedStories = await fetchStories();
      setStories(fetchedStories);
    } catch (err) {
      setError('Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, [endpoint]);

  const refreshStories = async () => {
    setLoading(true);
    await loadStories();
  };

  return { stories, loading, error, refreshStories };
};