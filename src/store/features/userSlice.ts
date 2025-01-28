// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import apiConfig from '../../Authentication/api';


// interface User {
//   id: number;
//   avatarUrl: string;
// }

// interface UserState {
//   users: Record<number, User>;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: UserState = {
//   users: {},
//   status: 'idle',
//   error: null,
// };

// export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
//   'users/fetchUsers',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiConfig.get<User[]>('/users');
//       return response.data; 
//     } catch (error) {
//       return rejectWithValue('Failed to fetch users');
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchUsers.pending, state => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const usersArray = action.payload;

//         state.users = usersArray.reduce((map, user) => {
//           map[user.id] = user;
//           return map;
//         }, {} as Record<number, User>);
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string || 'Failed to fetch users';
//       });
//   },
// });

// export default userSlice.reducer;

// userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface User {
  id: number;
  avatarUrl: string;
  firstName: string; // Ensure these fields are included
  lastName: string;
}

interface UserState {
  users: Record<number, User>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: {},
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConfig.get<User[]>('/users');
      return response.data; 
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

export const deactivateUser = createAsyncThunk<void, number, { rejectValue: string }>(
  'users/deactivateUser',
  async (userId, { rejectWithValue }) => {
    try {
      await apiConfig.put(`/users/deactivate`, null, {
        params: { id: userId }
      });
    } catch (error) {
      return rejectWithValue('Failed to deactivate account');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const usersArray = action.payload;

        state.users = usersArray.reduce((map, user) => {
          map[user.id] = user;
          return map;
        }, {} as Record<number, User>);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to fetch users';
      })
      .addCase(deactivateUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Optionally handle user removal from state if needed
      })
      .addCase(deactivateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Failed to deactivate account';
      });
  },
});

export default userSlice.reducer;
