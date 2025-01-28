import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface User {
  id: number;
  image_url?: string;
}

interface Story {
  id: number;
  description: string;
  imagePath: string;
  userId: number;
  user: User;
}


interface StoryState {
  stories: Story[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  form: {
    description: string;
    selectedFiles: string[];
    previews: string[];
    status: string[]; 
    error: string[];  
  };
  loading: boolean;
}

const initialState: StoryState = {
  stories: [],
  status: 'idle',
  error: null,
  form: {
    description: '',
    selectedFiles: [],
    previews: [],
    status: [],
    error: [],
  },
  loading: false,
};

export const postStory = createAsyncThunk<Story, FormData, { rejectValue: string }>(
  'stories/postStory',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiConfig.post<Story>('/stories/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to post story');
    }
  }
);



export const fetchStories = createAsyncThunk<Story[], void, { rejectValue: string }>(
  'stories/fetchStories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConfig.get<Story[]>('/stories/my-stories');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch stories');
    }
  }
);


export const deleteStory = createAsyncThunk<void, number, { rejectValue: string }>(
  'stories/deleteStory',
  async (id: number, { rejectWithValue }) => {
    try {
      await apiConfig.delete(`/stories/${id}`);
    } catch (error) {
      return rejectWithValue('Failed to delete story');
    }
  }
);


const storySlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setDescription: (state, action: { payload: string }) => {
      state.form.description = action.payload;
    },
    setSelectedFiles: (state, action: { payload: { fileNames: string[], fileObjects: File[] } }) => {
      state.form.selectedFiles = action.payload.fileNames;
      // Handle previews separately, not in the Redux state
    },
    removeFile: (state, action: { payload: number }) => {
      state.form.selectedFiles = state.form.selectedFiles.filter((_, i) => i !== action.payload);
    },
    clearForm: (state) => {
      state.form = { description: '', selectedFiles: [], previews: [], status: [], error: [] };
      state.loading = false; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postStory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postStory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stories.push(action.payload);
        state.form = { description: '', selectedFiles: [], previews: [], status: [], error: [] };
      })
      .addCase(postStory.rejected, (state, action) => {
        state.status = 'failed';
        state.form.error = [action.payload as string];
      })
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteStory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stories = state.stories.filter(story => story.id !== action.meta.arg);
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setDescription, setSelectedFiles, removeFile, clearForm } = storySlice.actions;
export default storySlice.reducer;