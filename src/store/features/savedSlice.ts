import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface SavedState {
  savedPosts: SavedPostData[]; // Store an array of saved posts
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Define the structure of the post data
interface Post {
  id: number;
  title: string;
  description: string;
  comments: any[];
  reactions: any[];
  fileBlobs: any[];
}

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

interface SavedPostData {
  post: Post;
  createdBy: User;
}


interface SavedState {
  savedPosts: SavedPostData[]; 
  savedItems: { [key: number]: boolean }; // Maps itemId to saved status
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Initial state
const initialState: SavedState = {
  savedPosts: [],
  savedItems: {},
  status: 'idle',
  error: null,
};

// Thunks
export const savePost = createAsyncThunk(
  'saved/savePost',
  async (postId: number, { getState }) => {
    const { savedPosts } = (getState() as { saved: SavedState }).saved;
    const isSaved = savedPosts[postId];

    try {
      if (isSaved) {
        // Unsave the post if it's already saved
        await apiConfig.post(`/saved/post/${postId}`);
      } else {
        // Save the post
        await apiConfig.post(`/saved/post/${postId}`);
      }
      return postId; // Return postId to update the state
    } catch (error) {
      console.error('Failed to save post:', error);
      throw new Error('Failed to save post');
    }
  }
);

export const saveItem = createAsyncThunk(
  'saved/saveItem',
  async (itemId: number, { getState }) => {
    const { savedItems } = (getState() as { saved: SavedState }).saved;
    const isSaved = savedItems[itemId];

    try {
      if (isSaved) {
        // Unsave the item if it's already saved
        await apiConfig.post(`/saved/item/${itemId}`);
      } else {
        // Save the item
        await apiConfig.post(`/saved/item/${itemId}`);
      }
      return itemId; 
    } catch (error) {
      console.error('Failed to save item:', error);
      throw new Error('Failed to save item');
    }
  }
);

export const fetchSavedPosts = createAsyncThunk(
  'saved/fetchSavedPosts',
  async () => {
      try {
          const response = await apiConfig.get('/saved/posts');
          return response.data; // Expecting the full post data here
      } catch (error) {
          console.error('Failed to fetch saved posts:', error);
          throw new Error('Failed to fetch saved posts');
      }
  }
);

// export const fetchSavedPosts = createAsyncThunk(
//   'saved/fetchSavedPosts',
//   async () => {
//     try {
//       const response = await apiConfig.get('/saved/posts');
//       return response.data; // Expecting the full post data here
//     } catch (error) {
//       console.error('Failed to fetch saved posts:', error);
//       throw new Error('Failed to fetch saved posts');
//     }
//   }
// );



export const fetchSavedItems = createAsyncThunk(
  'saved/fetchSavedItems',
  async () => {
    try {
      const response = await apiConfig.get('/saved/items');
      return response.data.map((item: { id: number }) => item.id);
    } catch (error) {
      console.error('Failed to fetch saved items:', error);
      throw new Error('Failed to fetch saved items');
    }
  }
);

// Slice
const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savePost.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(savePost.fulfilled, (state, action: PayloadAction<number>) => {
      //   const postId = action.payload;
      //   state.savedPosts[postId] = !state.savedPosts[postId];
      //   state.status = 'idle';
      // })
      .addCase(savePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to save post';
      })
      .addCase(saveItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveItem.fulfilled, (state, action: PayloadAction<number>) => {
        const itemId = action.payload;
        state.savedItems[itemId] = !state.savedItems[itemId];
        state.status = 'idle';
      })
      .addCase(saveItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to save item';
      })
      // .addCase(fetchSavedPosts.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchSavedPosts.fulfilled, (state, action: PayloadAction<number[]>) => {
      //   const savedPosts = action.payload.reduce((acc, postId) => {
      //     acc[postId] = true;
      //     return acc;
      //   }, {} as { [key: number]: boolean });
      //   state.savedPosts = savedPosts;
      //   state.status = 'idle';
      // })
      // .addCase(fetchSavedPosts.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message || 'Failed to fetch saved posts';
      // })
      // .addCase(fetchSavedItems.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchSavedItems.fulfilled, (state, action: PayloadAction<number[]>) => {
      //   const savedItems = action.payload.reduce((acc, itemId) => {
      //     acc[itemId] = true;
      //     return acc;
      //   }, {} as { [key: number]: boolean });
      //   state.savedItems = savedItems;
      //   state.status = 'idle';
      // })
      // .addCase(fetchSavedItems.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message || 'Failed to fetch saved items';
      // });
      .addCase(fetchSavedPosts.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchSavedPosts.fulfilled, (state, action: PayloadAction<SavedPostData[]>) => {
        state.savedPosts = action.payload; // Set the savedPosts directly to the fetched data
        state.status = 'idle';
    })
    .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch saved posts';
    });
  },
});

export default savedSlice.reducer;

