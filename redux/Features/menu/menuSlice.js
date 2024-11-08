import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    selectedCategory: "Холодные закуски",
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