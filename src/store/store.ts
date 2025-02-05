// import { configureStore } from "@reduxjs/toolkit";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// export const store = configureStore({
//   reducer: {

//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export const useAppDispatch: () => typeof store.dispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './features/userSlice';
// import postsReducer from './features/postSlice';
// import rolesReducer from './features/rolesSlice';
// import accountsReducer from './features/accountSlice'; 
import categoriesReducer from './features/categorySlice';
import subCategoryReducer from './features/subCategorySlice';
// import eventReducer from './features/eventSlice'
import itemReducer from './features/itemSlice'
import savedReducer from './features/savedSlice'

import adminReducer from './features/adminSlice'
import profileReducer from './features/profileSlice'

import orderReducer from './features/orderSlice'
// import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {

    theme: themeReducer,
    users: userReducer,
      order: orderReducer,
    // auth: authReducer,
    // posts: postsReducer,
    // roles: rolesReducer,
    // accounts: accountsReducer,
    categories: categoriesReducer,
    subCategory: subCategoryReducer,
    items:itemReducer,
    saved:savedReducer,
    admin:adminReducer,
    profile:profileReducer,
    // events: eventReducer,


    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;