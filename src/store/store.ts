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
import storyReducer from './features/storySlice';
import themeReducer from './themeSlice';
import userReducer from './features/userSlice';
// import postsReducer from './features/postSlice';
// import rolesReducer from './features/rolesSlice';
// import accountsReducer from './features/accountSlice'; 
import categoriesReducer from './features/categorySlice';
import subCategoryReducer from './features/subCategorySlice';
// import eventReducer from './features/eventSlice'
import reactionReducer from './features/reactionSlice'
import userPostReducer from './features/userPostSlice'
import itemReducer from './features/itemSlice'
import savedReducer from './features/savedSlice'
import commentReducer from './features/CommentSlice'
import adminReducer from './features/adminSlice'
import profileReducer from './features/profileSlice'
import designationReducer from './features/designation'
// import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    comments:commentReducer,
    stories: storyReducer,
    theme: themeReducer,
    users: userReducer,
    // auth: authReducer,
    // posts: postsReducer,
    // roles: rolesReducer,
    // accounts: accountsReducer,
    categories: categoriesReducer,
    subCategory: subCategoryReducer,
    reactions:reactionReducer,
    userPosts:userPostReducer,
    items:itemReducer,
    saved:savedReducer,
    admin:adminReducer,
    profile:profileReducer,
    // events: eventReducer,
    designations:designationReducer,


    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;