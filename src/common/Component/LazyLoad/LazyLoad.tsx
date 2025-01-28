
import React, { useState, useEffect, ReactNode } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

interface LazyLoadProps {
  fetchData: (page: number) => Promise<any[]>; // Function to fetch data with pagination
  children: (data: any[]) => ReactNode; // Render prop for displaying data
  loadingText?: string; // Optional text for loading state
}

const LazyLoad: React.FC<LazyLoadProps> = ({ fetchData, children, loadingText = 'Loading...' }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: '0px 0px 100px 0px',
  });

  useEffect(() => {
    const loadData = async () => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await fetchData(page); // Fetch data from the backend with pagination
        if (response.length === 0) {
          setHasMore(false);
        } else {
          setData((prevData) => [...prevData, ...response]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  return (
    <Box>
      {children(data)}
      {loading && <CircularProgress />}
      <div ref={ref} />
    </Box>
  );
};

export default LazyLoad;
