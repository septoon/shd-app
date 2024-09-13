import { createSlice } from '@reduxjs/toolkit';

const tabBarSlice = createSlice({
  name: 'tabBar',
  initialState: {
    isCart: false,
  },
  reducers: {
    setTabVisible: (state, action) => {
      state.isCart = action.payload;
    },
  },
});

export const {
  setTabVisible,
} = tabBarSlice.actions;

export default tabBarSlice.reducer;