import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    selectedCategory: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
} = menuSlice.actions;

export default menuSlice.reducer;