// usePosts.ts
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Page } from '../../type/Page';
import { Post } from '../../type/Posts';


const usePosts = (initialPage: number = 0, searchQuery: string = '') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postPage, setPostPage] = useState<Page<Post> | null>(null);

  const fetchPosts = useCallback(async (page: number, query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/search`, {
        params: {
          pageNo: page,
          searchText: query,
        },
      });
      setPostPage(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching posts');
      setLoading(false);
    }
  }, []);

  const fetchNextPage = useCallback(() => {
    if (postPage && !postPage.last) {
      fetchPosts(postPage.number + 1, searchQuery);
    }
  }, [postPage, fetchPosts]);

  useEffect(() => {
    fetchPosts(initialPage, searchQuery);
  }, [initialPage, searchQuery, fetchPosts]);

  return { loading, error, postPage, fetchNextPage };
};

export default usePosts;
