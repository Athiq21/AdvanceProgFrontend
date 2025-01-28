

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

// Define the state structure
interface ReactionState {
  likedPosts: { [key: number]: boolean }; // Maps postId to liked status
  likeCounts: { [key: number]: number };
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ReactionState = {
  likeCounts:{},
  likedPosts: {},
  status: 'idle',
  error: null,
};

// Thunk to toggle the like status
export const toggleLike = createAsyncThunk(
  'reactions/toggleLike',
  async (postId: number, { getState }) => {
    const { likedPosts } = (getState() as { reactions: ReactionState }).reactions;
    const isLiked = likedPosts[postId];
  
    try {
      // Send a request to toggle the like status
      await apiConfig.post(`/reactions/post/${postId}`);
  
      return postId; // Return postId to update the state
    } catch (error) {
      console.error('Failed to toggle like:', error);
      throw new Error('Failed to toggle like');
    }
  }
);

// Thunk to fetch liked posts for the current user
export const fetchLikedPosts = createAsyncThunk(
  'reactions/fetchLikedPosts',
  async () => {
    try {
      const response = await apiConfig.get('/reactions/posts/liked');
      return response.data.map((post: { id: number }) => post.id);
    } catch (error) {
      console.error('Failed to fetch liked posts:', error);
      throw new Error('Failed to fetch liked posts');
    }
  }
);


export const fetchLikeCount = createAsyncThunk(
    'reactions/fetchLikeCount',
    async (postId: number) => {
      try {
        const response = await apiConfig.get(`/reactions/post/${postId}/count`);
        return { postId, count: response.data };
      } catch (error) {
        console.error('Failed to fetch like count:', error);
        throw new Error('Failed to fetch like count');
      }
    }
  );

// Reaction slice
const reactionSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {
    // Reducer to set the like count for a post
    setLikeCount: (state, action: PayloadAction<{ postId: number; count: number }>) => {
      const { postId, count } = action.payload;
      state.likedPosts[postId] = count > 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleLike.fulfilled, (state, action: PayloadAction<number>) => {
        const postId = action.payload;
        // Toggle the liked status for the post
        state.likedPosts[postId] = !state.likedPosts[postId];
        state.status = 'idle'; // Reset status on success
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to toggle like';
      })
      .addCase(fetchLikedPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLikedPosts.fulfilled, (state, action: PayloadAction<number[]>) => {
        // Update liked posts from fetched data
        const likedPosts = action.payload.reduce((acc, postId) => {
          acc[postId] = true;
          return acc;
        }, {} as { [key: number]: boolean });
        state.likedPosts = likedPosts;
        state.status = 'idle'; // Reset status on success
      })
      .addCase(fetchLikedPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch liked posts';
      })
      .addCase(fetchLikeCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLikeCount.fulfilled, (state, action: PayloadAction<{ postId: number; count: number }>) => {
        // Update like count for the specific post
        const { postId, count } = action.payload;
        state.likeCounts[postId] = count;
        state.status = 'idle'; // Reset status on success
      })
      .addCase(fetchLikeCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch like count';
      });
  },
});

// Export the action creator and reducer
export const { setLikeCount } = reactionSlice.actions;
export default reactionSlice.reducer;
