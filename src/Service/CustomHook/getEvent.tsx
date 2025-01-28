import { useEffect, useState } from "react";
import apiConfig from "../../Authentication/api";

export const useEvents = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvnets = async () => {
            try {
                const response = await apiConfig.get('/offer'); 
                setEvents(response.data);
            } catch (err) {
                setError('Failed to fetch items');
            } finally {
                setLoading(false);
            }
        };

        fetchEvnets();
    }, []);

    return { events, loading, error };
};