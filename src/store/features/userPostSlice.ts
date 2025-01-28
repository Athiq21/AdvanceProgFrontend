import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface UserPost {
  id: number;
  title: string;
  description: string;
}

interface UserPostState {
  userPosts: UserPost[];
  loading: boolean;
  error: string | null;
}

const initialState: UserPostState = {
  userPosts: [],
  loading: false,
  error: null,
};

export const fetchUserPosts = createAsyncThunk(
    'userPosts/fetchUserPosts',
    async (params: { pageNo?: number, pageSize?: number, sortBy?: string, sortDirection?: string }) => {
      const { pageNo = 0, pageSize = 10, sortBy = 'lastModifiedDatetime', sortDirection = 'DESC' } = params;
      const response = await apiConfig.get(`/posts/user`, {
        params: {
          pageNo,
          pageSize,
          sortBy,
          sortDirection
        }
      });
      return response.data;
    }
  );
  

  export const deletePost = createAsyncThunk(
    'userPosts/deletePost',
    async (postId: number, { rejectWithValue }) => {
      try {
        await apiConfig.delete(`/posts/${postId}`);
        return postId; // Return the postId to filter it out from the state
      } catch (error: any) {
        console.error('Error deleting post:', error);
        return rejectWithValue(error.response?.data || 'Failed to delete post');
      }
    }
  );


export const updatePost = createAsyncThunk(
  'userPosts/updatePost',
  async ({ id, title, description }: { id: number; title: string; description: string }, { rejectWithValue }) => {
    try {
      const response = await apiConfig.put(`/posts/${id}`, {
        title,
        description
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating post:', error);
      return rejectWithValue(error.response?.data || 'Failed to update post');
    }
  }
);


const userPostSlice = createSlice({
    name: 'userPosts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserPosts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserPosts.fulfilled, (state, action) => {
          console.log('Fetched posts:', action.payload); // Check what data is received
          state.userPosts = action.payload;
          state.loading = false;
        })
        .addCase(fetchUserPosts.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to fetch posts';
          state.loading = false;
        })
        .addCase(deletePost.pending, (state) => {
          state.error = null;
        })
        .addCase(deletePost.fulfilled, (state, action) => {
          state.userPosts = state.userPosts.filter((post) => post.id !== action.payload);
        })
        .addCase(deletePost.rejected, (state, action) => {
          state.error = action.payload as string;
        })
        // .addCase(updatePost.pending, (state) => {
        //   state.loading = true;
        // })
        .addCase(updatePost.fulfilled, (state, action) => {
          console.log('Update fulfilled:', action.payload);
          const updatedPost = action.payload;
          const postIndex = state.userPosts.findIndex((post) => post.id === updatedPost.id);
          if (postIndex !== -1) {
            state.userPosts[postIndex] = updatedPost;
          }
          state.loading = false;
        })
        .addCase(updatePost.rejected, (state, action) => {
          console.log('Update rejected:', action.payload);
          state.error = action.payload as string;
          state.loading = false;
        });
    },
  });
  

export default userPostSlice.reducer;
