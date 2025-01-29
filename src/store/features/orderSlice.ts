import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface User {
  id: number;
  firstName:string;
  lastName:string;
}

interface Item {
  id: number;
  name:string
  imageBlob:string;
  price:string;
}

interface Order {
  id: number;
  status: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  user: User;
  item: Item;
}

interface OrderState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  form: {
    startDate: string;
    endDate: string;
    paymentMethod: string;
    error: string[];
  };
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  status: 'idle',
  error: null,
  form: {
    startDate: '',
    endDate: '',
    paymentMethod: '',
    error: [],
  },
  loading: false,
};

export const createOrder = createAsyncThunk<Order, Order, { rejectValue: string }>(
    'orders/createOrder',
    async (orderData, { rejectWithValue }) => {
      try {
        const payload = {
        paymentMethod: orderData.paymentMethod,
          startDate: orderData.startDate,
          endDate: orderData.endDate,
          user: {
            id: orderData.user.id, 
          },
          item: {
            id: orderData.item.id,
          }
        };
  
        const response = await apiConfig.post<Order>('/order', payload);
  
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to create order');
      }
    }
  );
  

export const fetchOrders = createAsyncThunk<Order[], void, { rejectValue: string }>(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConfig.get<Order[]>('/order');
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch orders');
    }
  }
);

// Async thunk to cancel an order
export const cancelOrder = createAsyncThunk<void, number, { rejectValue: string }>(
  'orders/cancelOrder',
  async (id: number, { rejectWithValue }) => {
    try {
      await apiConfig.delete(`/order/${id}`);
    } catch (error: any) {
      return rejectWithValue('Failed to cancel order');
    }
  }
);

export const fetchOrdersByUser = createAsyncThunk<Order[], number, { rejectValue: string }>(
  'orders/fetchOrdersByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await apiConfig.get<Order[]>(`/order/user/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch orders for the user');
    }
  }
);


const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStartDate: (state, action: { payload: string }) => {
      state.form.startDate = action.payload;
    },
    setEndDate: (state, action: { payload: string }) => {
      state.form.endDate = action.payload;
    },
    setPaymentMethod: (state, action: { payload: string }) => {
      state.form.paymentMethod = action.payload;
    },
    clearForm: (state) => {
      state.form = {
        startDate: '',
        endDate: '',
        paymentMethod: 'payOnArrival',
        error: [],
      };
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createOrder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.form.error = [];
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
        state.form = {
          startDate: '',
          endDate: '',
          paymentMethod: 'payOnArrival',
          error: [],
        };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.form.error = [action.payload as string];
      })

      // Handle fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Handle cancelOrder
      .addCase(cancelOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = state.orders.filter((order) => order.id !== action.meta.arg);
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

         // Handle fetcbybyid
         .addCase(fetchOrdersByUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.orders = action.payload;
        })
        .addCase(fetchOrdersByUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        });
  },
});

export const { setStartDate, setEndDate, setPaymentMethod, clearForm } = orderSlice.actions;

export default orderSlice.reducer;
