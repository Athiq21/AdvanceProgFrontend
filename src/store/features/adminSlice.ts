import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

// Define the types for User and the state
interface User {
  id: number;
  email: string;
  role: string;
}

interface AdminState {
  users: User[]; // Store all users, you might want separate lists for admins and regular users
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: AdminState = {
  users: [], // Initialize as an empty array
  status: 'idle',
  error: null,
};

// Async thunk to promote a user to admin
export const promoteUserToAdmin = createAsyncThunk(
  'admin/promoteUserToAdmin',
  async (user: { email: string }, { rejectWithValue }) => {
    console.log(`Promoting user with email: ${user.email}`); // Log the email being sent to the API
    try {
      const response = await apiConfig.put(`/roles/users/${user.email}/ROLE_ADMIN`);
      console.log('API Response:', response.data); // Log the API response
      return response.data;
    } catch (error) {
      console.error('API Error:', error); // Log any API error
      return rejectWithValue('Failed to promote user to admin');
    }
  }
);


export const demoteUserToUser = createAsyncThunk(
    'admin/demoteUserToUser',
    async (user: { email: string }, { rejectWithValue }) => {
      try {
        const response = await apiConfig.put(`/roles/users/${user.email}/ROLE_USER`);
        return response.data;
      } catch (error) {
        return rejectWithValue('Failed to demote user to regular user');
      }
    }
  );

// Async thunk to fetch all admin users
// export const fetchAdminUsers = createAsyncThunk(
//   'admin/fetchAdminUsers',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiConfig.get<User[]>('/roles/users/admins'); // Ensure this endpoint exists in your backend
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching admin users:', error);
//       return rejectWithValue('Failed to fetch admin users');
//     }
//   }
// );

export const fetchAdminUsers = createAsyncThunk(
  'admin/fetchAdminUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConfig.post<User[]>('/permissions/role/4'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching admin users:', error);
      return rejectWithValue('Failed to fetch admin users');
    }
  }
);

export const fetchmoderatorUsers = createAsyncThunk(
  'admin/fetchmoderatorUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConfig.post<User[]>('/permissions/role/5'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching moderator users:', error);
      return rejectWithValue('Failed to fetch moderator users');
    }
  }
);

// Async thunk to fetch all regular users
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConfig.get<User[]>('/roles/users/users'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const deactivateUser = createAsyncThunk(
    'admin/deactivateUser',
    async (email: string, { rejectWithValue }) => {
      try {
        const response = await apiConfig.put(`/roles/users/deactivate/${email}`);
        return response.data;
      } catch (error) {
        return rejectWithValue('Failed to deactivate user');
      }
    }
  );

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async (data: { email: string, role: string }, { rejectWithValue }) => {
    try {
      const response = await apiConfig.post('/permissions/update', {
        email: data.email,
        role: data.role
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user role:', error);
      return rejectWithValue('Failed to update user role');
    }
  }
);

  ///FOR ROLE ADDINGS ONLY 

  export const fetchroleUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await apiConfig.get<User[]>('/permissions'); 
        return response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        return rejectWithValue('Failed to fetch users');
      }
    }  );

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(promoteUserToAdmin.pending, state => {
        state.status = 'loading';
      })
      .addCase(promoteUserToAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally, you can add the promoted user to the list of admin users
      })
      .addCase(promoteUserToAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to promote user to admin';
      })
      
      .addCase(deactivateUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally, update the user list or state if needed
      })
      .addCase(deactivateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to deactivate user';
      })
      .addCase(demoteUserToUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(demoteUserToUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(demoteUserToUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to demote user to regular user';
      })

      //role
      .addCase(fetchmoderatorUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchmoderatorUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchmoderatorUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch moderator users';
      })

      .addCase(fetchAdminUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload; // Store the list of admin users
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch admin users';
      })
      
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload; // Store the list of regular users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch users';
      })
      .addCase(updateUserRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserRole.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to update user role';
      });
  },
});

export default adminSlice.reducer;
