
import React, { useCallback, useEffect, useState } from 'react';
import PostCards from '../../common/Component/Cards/PostCard/PostCards';
import { CircularProgress } from '@mui/material';
import { Post } from '../../type/Posts';
import { Page } from '../../type/Page';
import usePosts from '../../Service/CustomHook/getPost';

interface PostPageProps {
  initialPostPage?: Page<Post>;
}

const PostPage: React.FC<PostPageProps> = ({ initialPostPage }) => {
  const { loading, error, postPage, fetchNextPage } = usePosts(initialPostPage ? initialPostPage.number : 0);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading &&
      postPage && 
      !postPage.last 
    ) {
      fetchNextPage(); 
    }
  }, [loading, postPage, fetchNextPage]);

  const handleLikeToggle = () => {
    if (liked) {
      setLikeCount(likeCount - 1); 
    } else {
      setLikeCount(likeCount + 1); 
    }
    setLiked(!liked);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading && (postPage === undefined || postPage?.number === 0)) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  if (!postPage) return null; 

  // Create a Set to filter duplicates based on post IDs
  const uniquePosts = Array.from(new Set(postPage.content.map(post => post.id)))
    .map(id => postPage.content.find(post => post.id === id));

  return (
    <div>
      {uniquePosts.map((post) => (
        <PostCards 
          key={post.id} // Ensure to use a unique key
          post={post}
          showEyeIcon={true}
        />
      ))}
    </div>
  );
};

export default PostPage;
