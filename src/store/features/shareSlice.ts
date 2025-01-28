// shareSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface ShareState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShareState = {
  status: 'idle',
  error: null,
};

export const sharePost = createAsyncThunk<void, { postId: number, userId: number }, { rejectValue: string }>(
  'shares/sharePost',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      await apiConfig.post(`/posts/${postId}/share`, { userId });
    } catch (error) {
      return rejectWithValue('Failed to share post');
    }
  }
);

const shareSlice = createSlice({
  name: 'shares',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sharePost.pending, state => {
        state.status = 'loading';
      })
      .addCase(sharePost.fulfilled, state => {
        state.status = 'succeeded';
      })
      .addCase(sharePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to share post';
      });
  },
});

export default shareSlice.reducer;
