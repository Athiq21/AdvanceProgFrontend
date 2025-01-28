import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api'; // Adjust the path as needed

interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

interface SubCategoryState {
  subCategories: SubCategory[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SubCategoryState = {
  subCategories: [],
  status: 'idle',
  error: null,
};

export const fetchAllSubCategories = createAsyncThunk(
  'subCategory/fetchAllSubCategories',
  async () => {
    const response = await apiConfig.get('/subcategories'); 
    return response.data as SubCategory[];
  }
);

// Fetch subcategories by category ID with optional mapping
export const fetchSubCategoriesByCategoryId = createAsyncThunk(
  'subCategory/fetchSubCategoriesByCategoryId',
  async (categoryId: number) => {
    const response = await apiConfig.get(`/subcategories/category/${categoryId}`); // Adjust the endpoint as needed
    // Return the data with necessary mapping
    return response.data.map((sub: any) => ({
      id: sub.id,
      name: sub.name,
      categoryId: sub.category.id, // Ensure correct categoryId assignment
    })) as SubCategory[];
  }
);

export const addSubCategory = createAsyncThunk(
  'subCategory/addSubCategory',
  async (subCategory: { name: string; categoryId: number }) => {
    const response = await apiConfig.post('/subcategories/add', subCategory); // Adjust the endpoint if needed
    return response.data as SubCategory;
  }
);

export const deleteSubCategory = createAsyncThunk(
  'subCategory/deleteSubCategory',
  async (id: number) => {
    await apiConfig.delete(`/subcategories/${id}`); // Adjust the endpoint as needed
    return id;
  }
);

export const updateSubCategory = createAsyncThunk(
  'subCategory/updateSubCategory',
  async ({ id, name, categoryId }: { id: number; name: string; categoryId: number }) => {
    const response = await apiConfig.put(`/subcategories/${id}`, { name, category: { id: categoryId } }); // Adjust the endpoint as needed
    return response.data as SubCategory;
  }
);

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSubCategories.fulfilled, (state, action: PayloadAction<SubCategory[]>) => {
        state.status = 'succeeded';
        state.subCategories = action.payload;
      })
      .addCase(fetchAllSubCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch subcategories';
      })
      .addCase(fetchSubCategoriesByCategoryId.fulfilled, (state, action: PayloadAction<SubCategory[]>) => {
        state.subCategories = action.payload;
      })
      .addCase(addSubCategory.fulfilled, (state, action: PayloadAction<SubCategory>) => {
        state.subCategories.push(action.payload);
      })
      .addCase(deleteSubCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.subCategories = state.subCategories.filter(sub => sub.id !== action.payload);
      })
      .addCase(updateSubCategory.fulfilled, (state, action: PayloadAction<SubCategory>) => {
        const index = state.subCategories.findIndex(sub => sub.id === action.payload.id);
        if (index !== -1) {
          state.subCategories[index] = action.payload;
        }
      });
  },
});

export default subCategorySlice.reducer;
