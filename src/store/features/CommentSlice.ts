// src/slices/commentSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api'; // Adjust the path as necessary

// Define the state structure
interface UserMinDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface Post {
  id: number;
  title: string;
  description: string;
}

interface Comment {
    id: number;
    text: string;
    username: string; // Add username field
    imageUrl: string;   // Add avatar field
    createdBy: { // User details
      id: number;
      firstName: string;
      LastName:string;
      imageUrl: string;
    };
    userId: number; 
  }
  

interface CommentState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Initial state
const initialState: CommentState = {
  comments: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch comments for a post
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    try {
      const response = await apiConfig.get(`/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      throw new Error('Failed to fetch comments');
    }
  }
);


// export const createComment = createAsyncThunk(
//     'comments/createComment',
//     async ({ postId, text }: { postId: number; text: string }) => {
//       try {
//         // Send a POST request with the comment text to the server
//         const response = await apiConfig.post(`/comments/post/${postId}`, { text });
  
//         // Ensure the response includes the full comment object with all expected fields
//         return response.data;  // response.data should include id, createdBy, createdAt, etc.
//       } catch (error) {
//         console.error('Failed to create comment:', error);
//         throw new Error('Failed to create comment');
//       }
//     }
//   );
  
export const createComment = createAsyncThunk(
    'comments/createComment',
    async ({ postId, text, userId }: { postId: number; text: string; userId: number }) => {
      try {
        const response = await apiConfig.post(`/comments/post/${postId}`, {
          text,
          createdBy: {
            id: userId // Include the user ID here
          }
        });
  
        console.log('Server response:', response.data);
        return response.data as Comment;
      } catch (error) {
        console.error('Failed to create comment:', error);
        throw new Error('Failed to create comment');
      }
    }
  );
  
  
  
// Thunk to update an existing comment
export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async (comment: Comment) => {
    try {
      const response = await apiConfig.put(`/comments/${comment.id}`, comment);
      return response.data;
    } catch (error) {
      console.error('Failed to update comment:', error);
      throw new Error('Failed to update comment');
    }
  }
);


export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    try {
      await apiConfig.delete(`/comments/${commentId}`);
      return commentId;
    } catch (error) {
      console.error('Failed to delete comment:', error);
      throw new Error('Failed to delete comment');
    }
  }
);

// Comment slice
const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // Reducer to clear comments
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.status = 'idle'; // Reset status on success
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
        state.status = 'idle'; // Reset status on success
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create comment';
      })
      .addCase(updateComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        const index = state.comments.findIndex(comment => comment.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
        state.status = 'idle'; // Reset status on success
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update comment';
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
        state.status = 'idle'; // Reset status on success
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete comment';
      });

    //   .addCase(deleteComment.fulfilled, (state, action) => {
    //     state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    //   });
  },
});

// Export the action creators and reducer
export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
