import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  fileBlobId: string | null; // ID for the image
  avatarUrl: string | null; // URL for the avatar image
}

interface ProfileState {
  profile: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

// Thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk<UserProfile, void, { rejectValue: string }>(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConfig.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });
      console.log('User profile data:', response.data); // Log profile data
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue('Failed to fetch user profile');
    }
  }
);

// Thunk to fetch user image
export const fetchUserImage = createAsyncThunk<string, string, { rejectValue: string }>(
  'profile/fetchUserImage',
  async (fileBlobId, { rejectWithValue }) => {
    try {
      console.log('Fetching user image with ID:', fileBlobId); // Log image ID
      const response = await apiConfig.get(`/api/users/image`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });
      console.log('User image response:', response); // Log response object
      const imageUrl = URL.createObjectURL(response.data);
      console.log('Created image URL:', imageUrl); // Log image URL
      return imageUrl;
    } catch (error) {
      console.error('Error fetching user image:', error);
      return rejectWithValue('Failed to fetch user image');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
        if (action.payload.fileBlobId) {
          // Fetch user image if fileBlobId exists
          fetchUserImage(action.payload.fileBlobId)
            .then((imageUrl) => {
              state.profile!.avatarUrl = imageUrl;
              state.status = 'succeeded';
            })
            .catch(() => {
              state.status = 'failed';
              state.error = 'Failed to fetch user image';
            });
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch user profile';
      })
      .addCase(fetchUserImage.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.profile) {
          state.profile.avatarUrl = action.payload;
        }
      })
      .addCase(fetchUserImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch user image';
      });
  },
});

export default profileSlice.reducer;
