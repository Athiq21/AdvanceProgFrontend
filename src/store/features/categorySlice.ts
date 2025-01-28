import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface Category {
  [x: string]: any;
  id?: number;
  name: string;

}

interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await apiConfig.get('/categories/all');
    return response.data as Category[];
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category: Category) => {
    const response = await apiConfig.post('/categories/add', category);
    return response.data as Category;
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category: Category) => {
    const response = await apiConfig.put(`/categories/${category.id}`, category);
    return response.data as Category;
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: number) => {
    await apiConfig.delete(`/categories/${id}`);
    return id;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
