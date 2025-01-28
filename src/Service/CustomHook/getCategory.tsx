import { useState, useEffect } from 'react';
import apiConfig from '../../Authentication/api';

export const useItems = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await apiConfig.get('/item'); 
                setItems(response.data);
            } catch (err) {
                setError('Failed to fetch items');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return { items, loading, error };
};

