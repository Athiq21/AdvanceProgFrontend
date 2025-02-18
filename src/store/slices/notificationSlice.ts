import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiConfig from '../../Authentication/api';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  isActivated: boolean;
}

interface Order {
  id: number;
}

export interface Notification {
  id: number;
  message: string;
  createdDatetime: string;
  user: User;
  order: Order;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const response = await apiConfig.get(`/notifications/`);
    const currentState = getState() as { notifications: NotificationState };
    const newNotifications = response.data.filter(
      (newNotif: Notification) => !currentState.notifications.notifications.some(
        existingNotif => existingNotif.id === newNotif.id
      )
    );
    return {
      allNotifications: response.data,
      newNotifications: newNotifications
    };
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: number) => {
    await apiConfig.post(`/notifications/read`, {
      notificationId: notificationId
    });
    return notificationId;
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.allNotifications;
        if (action.payload.newNotifications.length > 0) {
          console.log('New notifications:', action.payload.newNotifications);
        }
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notifications';
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action: PayloadAction<number>) => {
        state.notifications = state.notifications.filter(
          notification => notification.id !== action.payload
        );
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer; 