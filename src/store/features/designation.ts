// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import apiConfig from '../../Authentication/api'; 

// interface Designation {
//   id: number;
//   name: string;
// }

// interface DesignationState {
//   designations: Designation[];
//   status: 'idle' | 'loading' | 'failed';
//   error: string | null;
// }

// const initialState: DesignationState = {
//   designations: [],
//   status: 'idle',
//   error: null,
// };

// // Async thunks for CRUD operations
// export const fetchDesignations = createAsyncThunk(
//   'designations/fetchDesignations',
//   async () => {
//     const response = await apiConfig.get('/designations');
//     return response.data as Designation[];
//   }
// );

// export const addDesignation = createAsyncThunk(
//   'designations/addDesignation',
//   async (designation: Designation) => {
//     const response = await apiConfig.post('/designations', designation);
//     return response.data as Designation;
//   }
// );

// export const updateDesignation = createAsyncThunk(
//   'designations/updateDesignation',
//   async (designation: Designation) => {
//     const response = await apiConfig.put(`/designations/${designation.id}`, designation);
//     return response.data as Designation;
//   }
// );

// export const deleteDesignation = createAsyncThunk(
//   'designations/deleteDesignation',
//   async (id: number) => {
//     await apiConfig.delete(`/designations/${id}`);
//     return id;
//   }
// );

// // Slice
// const designationSlice = createSlice({
//   name: 'designations',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDesignations.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchDesignations.fulfilled, (state, action: PayloadAction<Designation[]>) => {
//         state.designations = action.payload;
//         state.status = 'idle';
//       })
//       .addCase(fetchDesignations.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to fetch designations';
//       })
//       .addCase(addDesignation.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addDesignation.fulfilled, (state, action: PayloadAction<Designation>) => {
//         state.designations.push(action.payload);
//         state.status = 'idle';
//       })
//       .addCase(addDesignation.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to add designation';
//       })
//       .addCase(updateDesignation.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateDesignation.fulfilled, (state, action: PayloadAction<Designation>) => {
//         const index = state.designations.findIndex(designation => designation.id === action.payload.id);
//         if (index !== -1) {
//           state.designations[index] = action.payload;
//         }
//         state.status = 'idle';
//       })
//       .addCase(updateDesignation.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to update designation';
//       })
//       .addCase(deleteDesignation.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(deleteDesignation.fulfilled, (state, action: PayloadAction<number>) => {
//         state.designations = state.designations.filter(designation => designation.id !== action.payload);
//         state.status = 'idle';
//       })
//       .addCase(deleteDesignation.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to delete designation';
//       });
//   },
// });

// // Export the reducer
// export default designationSlice.reducer;



import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface Designation {
  id: number;
  name: string;
  imageUrl?: string; // Add imageUrl property
}

interface DesignationState {
  designations: Designation[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: DesignationState = {
  designations: [],
  status: 'idle',
  error: null,
};

// Async thunks for CRUD operations
export const fetchDesignations = createAsyncThunk(
  'designations/fetchDesignations',
  async () => {
    const response = await apiConfig.get('/designations');
    return response.data as Designation[];
  }
);

export const addDesignation = createAsyncThunk(
  'designations/addDesignation',
  async (designation: Omit<Designation, 'id'>) => {
    const response = await apiConfig.post('/designations', designation);
    return response.data as Designation;
  }
);

export const updateDesignation = createAsyncThunk(
  'designations/updateDesignation',
  async (designation: Designation) => {
    const response = await apiConfig.put(`/designations/${designation.id}`, designation);
    return response.data as Designation;
  }
);

export const deleteDesignation = createAsyncThunk(
  'designations/deleteDesignation',
  async (id: number) => {
    await apiConfig.delete(`/designations/${id}`);
    return id;
  }
);

// Async thunk for image upload
export const uploadImage = createAsyncThunk(
  'designations/uploadImage',
  async ({ id, file }: { id: number; file: FormData }) => {
    await apiConfig.put(`/designations/${id}/uploadImage`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return id; // Return the designation ID to identify the updated item in the state
  }
);

// Slice
const designationSlice = createSlice({
  name: 'designations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDesignations.fulfilled, (state, action: PayloadAction<Designation[]>) => {
        state.designations = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch designations';
      })
      .addCase(addDesignation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addDesignation.fulfilled, (state, action: PayloadAction<Designation>) => {
        state.designations.push(action.payload);
        state.status = 'idle';
      })
      .addCase(addDesignation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add designation';
      })
      .addCase(updateDesignation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateDesignation.fulfilled, (state, action: PayloadAction<Designation>) => {
        const index = state.designations.findIndex(designation => designation.id === action.payload.id);
        if (index !== -1) {
          state.designations[index] = action.payload;
        }
        state.status = 'idle';
      })
      .addCase(updateDesignation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update designation';
      })
      .addCase(deleteDesignation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDesignation.fulfilled, (state, action: PayloadAction<number>) => {
        state.designations = state.designations.filter(designation => designation.id !== action.payload);
        state.status = 'idle';
      })
      .addCase(deleteDesignation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete designation';
      })
      .addCase(uploadImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action: PayloadAction<number>) => {
        // Here you can optionally fetch updated designations
        state.status = 'idle';
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to upload image';
      });
  },
});

// Export the reducer
export default designationSlice.reducer;
