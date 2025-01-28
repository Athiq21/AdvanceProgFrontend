import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  primary: string;
  secondary: string;
}

const initialState: ThemeState = {
  primary: '#3f51b5', 
  secondary: '#f50057', // default secondary color
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPrimaryColor: (state, action) => {
      state.primary = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondary = action.payload;
    },
  },
});

export const { setPrimaryColor, setSecondaryColor } = themeSlice.actions;
export default themeSlice.reducer;
