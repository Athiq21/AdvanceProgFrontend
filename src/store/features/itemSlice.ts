

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface BlobResponseDTO {
  id: number;
  uuid: string;
}

interface SubCategory {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    subCategories: SubCategory[];
  };
}

interface Category {
  id: number;
  name: string;
}

interface UserMinDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageBlob: BlobResponseDTO | null;
}

interface Item {
  id: number;
  description: string;
  name: string;
  mileage:string;
  fueltype:string;
  price:string;
  transmission: string;
  color:string;
  category_id:number;
  subcategory_id:number;
  image:string;
  created_by:string;
  firstName:string;
  status:string;
}

interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const response = await apiConfig.get(`/items/user`);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (itemId: number) => {
    await apiConfig.delete(`/items/${itemId}`);
    return itemId;
  }
);


export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id: number) => {
    const response = await apiConfig.get(`/items/${id}`);
    return response.data; 
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, updates }: { id: number; updates: { 
    name?: string; 
    description?: string ; 
    mileage?: string; 
    fuelType?:string; 
    price?: string;
    transmission?: string; 
    seatingCapacity?: string ; 
    luggageCapacity?: string; 
    color?:string; 
    yearOfManufacture?: string;
    engineCapacity?: string; 
    fuelEfficiency?: string; 
    deposit?: string; 
    status?:string;
    licensePlate?:string;
  } }) => {
    const response = await apiConfig.put(`/items/${id}/namedesc`, updates);
    return response.data; 
  }
);

export const addItem = createAsyncThunk(
  'items/addItem',
  async (formData: FormData, { getState }) => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      throw new Error('User is not logged in.');
    }

    formData.append('created_by', userId);

    try {
      const response = await apiConfig.post('/item/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to add item', error);
      throw new Error('Failed to add item');
    }
  }
);

export const viewItem = createAsyncThunk(
  'items/viewItem',
  async (itemId: number, { rejectWithValue }) => {
    try {
      const response = await apiConfig.get(`/item`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch item');
    }
  }
);


const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        console.log('Fetched items:', action.payload);
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch items';
        state.loading = false;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        const fetchedItem: Item = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.id === fetchedItem.id);
        if (existingItemIndex >= 0) {
          // If the item exists, update it
          state.items[existingItemIndex] = fetchedItem;
        } else {
          // Otherwise, add it to the items array
          state.items.push(fetchedItem);
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const updatedItem: Item = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.id === updatedItem.id);
        if (existingItemIndex >= 0) {
          state.items[existingItemIndex] = updatedItem;
        }
      })

      .addCase(addItem.pending, (state) => {
        state.loading = true;  // You can add a loading state here if needed
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);  // Add the newly created item to the state
        state.loading = false;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add item';
        state.loading = false;
      })

      .addCase(viewItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewItem.fulfilled, (state, action) => {
        const fetchedItem: Item = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.id === fetchedItem.id);
        if (existingItemIndex >= 0) {
          // If the item exists, update it
          state.items[existingItemIndex] = fetchedItem;
        } else {
          // Otherwise, add it to the items array
          state.items.push(fetchedItem);
        }
        state.loading = false;
      })
      .addCase(viewItem.rejected, (state, action) => {
        state.error = action.payload as string || 'Failed to fetch item';
        state.loading = false;
      });
  },
});

export const selectItemById = (state: { items: ItemState }, id: number) =>
  state.items.items.find(item => item.id === id);

export default itemSlice.reducer;
